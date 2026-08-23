'use strict';
// Overlapping-text detector.
//
//   node scripts/checks/overlap.js <page path or file:// url>
//
// At each of 1440 / 1120 / 768 / 390 px, collects "leaf" text elements
// (h1–h3, p, span, strong, li, a, summary with their own text and no
// text-bearing children), skips anything inside a closed <details>
// (not rendered), and flags any pair whose bounding boxes intersect by
// more than 4px in both axes. Exit 1 on any finding.

const { chromium } = require('playwright');
const { launchOptions, toFileUrl, openPage, WIDTHS } = require('./lib');

const overlapAudit = () => {
  const leaves = [...document.querySelectorAll('h1,h2,h3,p,span,strong,li,a,summary')].filter(
    (e) =>
      e.textContent.trim() &&
      ![...e.children].some((c) => c.textContent.trim()) &&
      !e.closest('details:not([open])')
  );
  const findings = [];
  for (let i = 0; i < leaves.length; i++) {
    for (let j = i + 1; j < leaves.length; j++) {
      const A = leaves[i];
      const B = leaves[j];
      if (A.contains(B) || B.contains(A)) continue;
      const a = A.getBoundingClientRect();
      const b = B.getBoundingClientRect();
      if (!a.width || !b.width) continue;
      const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (ox > 4 && oy > 4) {
        findings.push(
          `"${A.textContent.trim().slice(0, 32)}" x "${B.textContent.trim().slice(0, 32)}" ` +
            `(${Math.round(ox)}x${Math.round(oy)}px)`
        );
      }
    }
  }
  return findings;
};

(async () => {
  const target = process.argv[2];
  if (!target) {
    console.error('usage: node scripts/checks/overlap.js <page path or file:// url>');
    process.exit(2);
  }
  const url = toFileUrl(target);
  const browser = await chromium.launch(launchOptions());
  let failed = 0;

  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await openPage(page, url);
    const findings = await page.evaluate(overlapAudit);
    if (findings.length) {
      failed += findings.length;
      console.log(`FAIL @${width}px — ${findings.length} overlapping pair(s):`);
      findings.forEach((f) => console.log(`  ${f}`));
    } else {
      console.log(`ok   @${width}px`);
    }
    await page.close();
  }

  await browser.close();
  if (failed) {
    console.log(`\noverlap: ${failed} finding(s) on ${url}`);
    process.exit(1);
  }
  console.log(`\noverlap: clean on ${url}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
