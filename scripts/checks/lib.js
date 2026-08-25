'use strict';
// Shared helpers for the merge-gate check scripts.
const fs = require('fs');
const path = require('path');

// Chromium resolution order:
//   1. PLAYWRIGHT_CHROMIUM env var, if set
//   2. the known sandbox install, if it exists
//   3. playwright's own default (no executablePath passed)
const FALLBACK_CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

function launchOptions() {
  if (process.env.PLAYWRIGHT_CHROMIUM) {
    return { executablePath: process.env.PLAYWRIGHT_CHROMIUM };
  }
  if (fs.existsSync(FALLBACK_CHROMIUM)) {
    return { executablePath: FALLBACK_CHROMIUM };
  }
  return {};
}

const REPO_ROOT = path.resolve(__dirname, '..', '..');

function toFileUrl(target) {
  if (/^(file|https?):\/\//.test(target)) return target;
  return 'file://' + path.resolve(target);
}

// Navigate and settle. networkidle can time out when an external request
// (e.g. Google Fonts through a proxy) never resolves cleanly; the page is
// still usable, so fall through and wait for fonts with a bounded race.
async function openPage(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (err) {
    if (!/Timeout/i.test(String(err))) throw err;
  }
  await page
    .evaluate(() => Promise.race([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((r) => setTimeout(r, 3000)),
    ]))
    .catch(() => {});
}

const WIDTHS = [1440, 1120, 768, 390];

module.exports = { launchOptions, toFileUrl, openPage, REPO_ROOT, WIDTHS };
