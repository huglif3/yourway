'use strict';
// WCAG 2.2 AA text-contrast check.
//
//   node scripts/checks/contrast.js <page path or file:// url>
//
// Checks every element carrying its own text nodes, in BOTH light and dark
// colorScheme, at 1440 / 1120 / 768 / 390 px. Exit 1 on any failing pair.
//
// Details that matter (do not simplify these away):
//   - Backgrounds with alpha are composited over the parent background stack,
//     so a semi-transparent layer is measured against what actually shows
//     through it, not against its own raw rgba.
//   - `color(srgb r g b [/ a])` values (0–1 floats) are parsed alongside rgb().
//   - SVG text is skipped here: it paints with `fill`, not `color`, and is
//     reviewed separately.
//   - Text inside closed <details> is skipped (it is not rendered).

const { chromium } = require('playwright');
const { launchOptions, toFileUrl, openPage, WIDTHS } = require('./lib');

// Runs in the browser. Returns the list of AA failures on the page.
const contrastAudit = () => {
  const lum = ([r, g, b]) => {
    const f = (c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };

  // Parse a computed color into [r, g, b] 0–255. Handles rgb()/rgba() and
  // color(srgb …) whose channels are 0–1 floats.
  const parseColor = (s) => {
    const nums = (s.match(/-?[\d.]+/g) || []).map(Number);
    if (s.startsWith('color(')) return nums.slice(0, 3).map((x) => Math.round(x * 255));
    return nums.slice(0, 3);
  };

  // Composite the element's background stack bottom-up so alpha layers are
  // measured against what really shows through them.
  const bgOf = (el) => {
    const layers = [];
    let n = el;
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n).backgroundColor;
      let p = (c.match(/-?[\d.]+/g) || []).map(Number);
      if (c.startsWith('color(')) p = p.map((x, i) => (i < 3 ? x * 255 : x));
      if (p.length) {
        const a = p.length > 3 ? p[3] : 1;
        if (a > 0) {
          layers.push([p[0], p[1], p[2], a]);
          if (a >= 1) break;
        }
      }
      n = n.parentElement;
    }
    // Base: the root background if opaque, else white.
    let out = [255, 255, 255];
    const rootBg = getComputedStyle(document.documentElement).backgroundColor;
    let rp = (rootBg.match(/-?[\d.]+/g) || []).map(Number);
    if (rootBg.startsWith('color(')) rp = rp.map((x, i) => (i < 3 ? x * 255 : x));
    if (rp.length && (rp.length < 4 || rp[3] >= 1)) out = rp.slice(0, 3);
    for (let i = layers.length - 1; i >= 0; i--) {
      const [r, g, b, a] = layers[i];
      out = [r * a + out[0] * (1 - a), g * a + out[1] * (1 - a), b * a + out[2] * (1 - a)];
    }
    return out.map(Math.round);
  };

  const failures = [];
  document.querySelectorAll('*').forEach((el) => {
    const text = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(' ')
      .trim();
    if (!text || text.length < 2) return;
    // SVG text paints with fill, not color — out of scope for this check.
    if (el.namespaceURI === 'http://www.w3.org/2000/svg') return;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return;
    // Closed <details> content is not rendered.
    if (el.closest('details:not([open])')) return;

    const fg = parseColor(cs.color);
    const bg = bgOf(el);
    const L1 = lum(fg);
    const L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const size = parseFloat(cs.fontSize);
    const bold = +cs.fontWeight >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    if (ratio < need) {
      failures.push({
        ratio: +ratio.toFixed(2),
        need,
        size: +size.toFixed(1),
        fg: cs.color,
        bg: 'rgb(' + bg.join(',') + ')',
        element: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().split(/\s+/).join('.') : ''),
        text: text.slice(0, 60),
      });
    }
  });
  return failures;
};

(async () => {
  const target = process.argv[2];
  if (!target) {
    console.error('usage: node scripts/checks/contrast.js <page path or file:// url>');
    process.exit(2);
  }
  const url = toFileUrl(target);
  const browser = await chromium.launch(launchOptions());
  let failed = 0;

  for (const scheme of ['light', 'dark']) {
    for (const width of WIDTHS) {
      const ctx = await browser.newContext({
        viewport: { width, height: 900 },
        colorScheme: scheme,
      });
      const page = await ctx.newPage();
      await openPage(page, url);
      const failures = await page.evaluate(contrastAudit);
      if (failures.length) {
        failed += failures.length;
        console.log(`FAIL ${scheme} @${width}px — ${failures.length} contrast failure(s):`);
        for (const f of failures) {
          console.log(
            `  ${f.ratio}:1 (need ${f.need}:1, ${f.size}px)  <${f.element}>  fg ${f.fg} on ${f.bg}  "${f.text}"`
          );
        }
      } else {
        console.log(`ok   ${scheme} @${width}px`);
      }
      await ctx.close();
    }
  }

  await browser.close();
  if (failed) {
    console.log(`\ncontrast: ${failed} failure(s) on ${url}`);
    process.exit(1);
  }
  console.log(`\ncontrast: clean on ${url}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
