'use strict';
// Merge-gate harness: runs contrast, overlap, and a11y against both pages.
//
//   node scripts/checks/run-all.js
//
// Pages are loaded via file:// URLs resolved from the repo root.
// Prints each check's output, then a summary table. Exit 1 if anything failed.

const { spawnSync } = require('child_process');
const path = require('path');
const { REPO_ROOT, toFileUrl } = require('./lib');

const PAGES = ['index.html', 'partner/index.html'];
const CHECKS = ['contrast.js', 'overlap.js', 'a11y.js'];

const results = [];
let anyFailed = false;

for (const page of PAGES) {
  const url = toFileUrl(path.join(REPO_ROOT, page));
  for (const check of CHECKS) {
    const label = `${check.replace('.js', '')} × ${page}`;
    console.log(`\n=== ${label} ===`);
    const run = spawnSync(process.execPath, [path.join(__dirname, check), url], {
      encoding: 'utf8',
      timeout: 300000,
    });
    process.stdout.write(run.stdout || '');
    process.stderr.write(run.stderr || '');
    const pass = run.status === 0;
    if (!pass) anyFailed = true;
    results.push({ page, check: check.replace('.js', ''), pass, status: run.status });
  }
}

console.log('\n================= SUMMARY =================');
console.log('page                 check      result');
console.log('-------------------- ---------- ------');
for (const r of results) {
  console.log(
    `${r.page.padEnd(20)} ${r.check.padEnd(10)} ${r.pass ? 'PASS' : `FAIL (exit ${r.status})`}`
  );
}
console.log('===========================================');
console.log(anyFailed ? 'MERGE GATE: FAIL' : 'MERGE GATE: PASS');
process.exit(anyFailed ? 1 : 0);
