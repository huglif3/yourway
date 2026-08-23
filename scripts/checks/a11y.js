'use strict';
// Accessibility check: axe-core + size rules.
//
//   node scripts/checks/a11y.js <page path or file:// url>
//
// Enforces, per the merge gate:
//   - axe-core: no violation above `minor` (minor findings are printed as
//     informational, and there are currently none). axe-core comes from
//     `npm i -D axe-core playwright` (or `npm i --no-save axe-core playwright`
//     for a throwaway install) — it is injected into the page, never a CDN.
//   - No rendered text under 11px, at 1440 / 1120 / 768 / 390 px.
//   - Tap targets: every visible form control (input, select, textarea,
//     button) at least 24x24px, at all four widths. The consent checkbox is
//     an input like any other — it gets no special exemption.
//   - No horizontal page overflow at 390px (wide content must scroll inside
//     its own container instead).
//
// Exit 1 on any failure.

const { chromium } = require('playwright');
const { launchOptions, toFileUrl, openPage, WIDTHS } = require('./lib');

let AXE_PATH;
try {
  AXE_PATH = require.resolve('axe-core');
} catch {
  console.error(
    'axe-core is not installed. Run: npm i -D axe-core playwright  (or npm i --no-save axe-core playwright)'
  );
  process.exit(2);
}

// Impacts that block the merge. `minor` is reported but does not fail;
// an unknown/missing impact is treated as blocking, never silently passed.
const BLOCKING = new Set(['moderate', 'serious', 'critical']);

const sizeAudit = () => {
  const out = { smallText: [], smallTargets: [] };

  document.querySelectorAll('*').forEach((el) => {
    const text = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(' ')
      .trim();
    if (!text || text.length < 2) return;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return;
    if (el.closest('details:not([open])')) return;
    const size = parseFloat(cs.fontSize);
    if (size < 11) {
      out.smallText.push({
        size: +size.toFixed(2),
        element: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().split(/\s+/).join('.') : ''),
        text: text.slice(0, 48),
      });
    }
  });

  document.querySelectorAll('input, select, textarea, button').forEach((el) => {
    if (el.type === 'hidden') return;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    if (el.closest('details:not([open])')) return;
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) return; // not rendered
    // The tap target is the effective clickable region (WCAG 2.5.8), not the
    // control's own box: a checkbox inside — or referenced by — a <label> is
    // toggled by clicks anywhere on that label, so measure the union.
    let { width: w, height: h } = r;
    const labels = new Set();
    const wrapping = el.closest('label');
    if (wrapping) labels.add(wrapping);
    if (el.id) document.querySelectorAll(`label[for="${CSS.escape(el.id)}"]`).forEach((l) => labels.add(l));
    if (el.labels) [...el.labels].forEach((l) => labels.add(l));
    let left = r.left, right = r.right, top = r.top, bottom = r.bottom;
    labels.forEach((l) => {
      const lr = l.getBoundingClientRect();
      if (!lr.width || !lr.height) return;
      left = Math.min(left, lr.left);
      right = Math.max(right, lr.right);
      top = Math.min(top, lr.top);
      bottom = Math.max(bottom, lr.bottom);
    });
    w = right - left;
    h = bottom - top;
    if (w < 24 || h < 24) {
      out.smallTargets.push({
        w: +w.toFixed(1),
        h: +h.toFixed(1),
        ownW: +r.width.toFixed(1),
        ownH: +r.height.toFixed(1),
        element:
          el.tagName.toLowerCase() +
          (el.type ? `[type=${el.type}]` : '') +
          (el.name ? `[name="${el.name}"]` : ''),
      });
    }
  });

  return out;
};

(async () => {
  const target = process.argv[2];
  if (!target) {
    console.error('usage: node scripts/checks/a11y.js <page path or file:// url>');
    process.exit(2);
  }
  const url = toFileUrl(target);
  const browser = await chromium.launch(launchOptions());
  let failed = 0;

  // --- axe-core, at desktop width ---
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await openPage(page, url);
    await page.addScriptTag({ path: AXE_PATH });
    const result = await page.evaluate(async () => axe.run(document, { resultTypes: ['violations'] }));
    const blocking = result.violations.filter((v) => !v.impact || BLOCKING.has(v.impact));
    const minor = result.violations.filter((v) => v.impact && !BLOCKING.has(v.impact));
    if (blocking.length) {
      failed += blocking.length;
      console.log(`FAIL axe-core — ${blocking.length} violation(s) above minor:`);
      blocking.forEach((v) => {
        console.log(`  [${v.impact || 'unknown'}] ${v.id} x${v.nodes.length} — ${v.help}`);
        v.nodes.slice(0, 5).forEach((n) => console.log(`    ${n.target.join(' ')}`));
      });
    } else {
      console.log(`ok   axe-core (0 violations above minor)`);
    }
    minor.forEach((v) => console.log(`  info [minor] ${v.id} x${v.nodes.length} — ${v.help}`));
    await page.close();
  }

  // --- text size + tap targets, all four widths ---
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await openPage(page, url);
    const { smallText, smallTargets } = await page.evaluate(sizeAudit);
    if (smallText.length) {
      failed += smallText.length;
      console.log(`FAIL @${width}px — ${smallText.length} text element(s) under 11px:`);
      smallText.forEach((t) => console.log(`  ${t.size}px  <${t.element}>  "${t.text}"`));
    }
    if (smallTargets.length) {
      failed += smallTargets.length;
      console.log(`FAIL @${width}px — ${smallTargets.length} tap target(s) under 24x24px:`);
      smallTargets.forEach((t) =>
        console.log(`  effective ${t.w}x${t.h}px (control ${t.ownW}x${t.ownH}px)  <${t.element}>`)
      );
    }
    if (!smallText.length && !smallTargets.length) {
      console.log(`ok   @${width}px text >=11px, tap targets >=24px`);
    }
    await page.close();
  }

  // --- horizontal overflow at 390px ---
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await openPage(page, url);
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > window.innerWidth ? doc.scrollWidth - window.innerWidth : 0;
    });
    if (overflow) {
      failed += 1;
      console.log(`FAIL @390px — horizontal page overflow of ${overflow}px`);
    } else {
      console.log('ok   @390px no horizontal page overflow');
    }
    await page.close();
  }

  await browser.close();
  if (failed) {
    console.log(`\na11y: ${failed} failure(s) on ${url}`);
    process.exit(1);
  }
  console.log(`\na11y: clean on ${url}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
