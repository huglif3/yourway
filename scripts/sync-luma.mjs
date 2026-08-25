// Aggregates live events from the Luma calendar into index.html.
// Runs in CI with LUMA_API_KEY from repo secrets — never hardcode a key here
// (CLAUDE.md rule 8). Only events Luma reports are listed: this script is the
// enforcement of "nothing is listed until it is live on Luma" (ADR 0003).
import { readFileSync, writeFileSync } from 'node:fs';

const KEY = process.env.LUMA_API_KEY;
if (!KEY) { console.error('LUMA_API_KEY missing'); process.exit(1); }

const API = 'https://public-api.lu.ma/public/v1/calendar/list-events';

// Region colours mark regions and nothing else (brand/README).
const REGION_CLASS = {
  ES: 'r04', PT: 'r01', GB: 'r03', UK: 'r03', FR: 'r03', VN: 'r02',
};

const res = await fetch(`${API}?pagination_limit=50`, {
  headers: { accept: 'application/json', 'x-luma-api-key': KEY },
});
if (!res.ok) { console.error(`Luma API ${res.status}: ${await res.text()}`); process.exit(1); }
const data = await res.json();

const now = Date.now();
const events = (data.entries ?? [])
  .map(e => e.event ?? e)
  .filter(e => e && e.start_at && Date.parse(e.start_at) > now)
  .sort((a, b) => Date.parse(a.start_at) - Date.parse(b.start_at))
  .slice(0, 8);

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function cityOf(e) {
  const g = e.geo_address_json ?? {};
  return g.city || g.city_state || (e.timezone === 'UTC' ? 'Online' : '') || 'Online';
}
function countryOf(e) {
  return ((e.geo_address_json ?? {}).country_code || '').toUpperCase();
}
function fmt(e) {
  const d = new Date(e.start_at);
  const tz = e.timezone || 'Europe/Lisbon';
  const day = d.toLocaleDateString('en-GB', { weekday: 'short', timeZone: tz });
  const dm = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: tz });
  const hm = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz });
  return { day, dm, hm };
}

let rows;
if (events.length === 0) {
  rows = `        <article class="yourway-board__row yourway-board__row--soon">
          <div class="yourway-board__main">
            <p class="yourway-board__city">Spain route</p>
            <h3>Stops open here as they go live</h3>
            <p>
              Each stop appears on this board the moment its Luma registration
              page is live. Nothing is bookable yet.
            </p>
          </div>
          <div class="yourway-board__meta">
            <a class="button button--yellow" href="#registration-updates">Get notified</a>
          </div>
        </article>`;
} else {
  rows = events.map(e => {
    const { day, dm, hm } = fmt(e);
    const cls = REGION_CLASS[countryOf(e)];
    const rowCls = cls ? ` yourway-board__row--${cls}` : '';
    const url = e.url && e.url.startsWith('http') ? e.url : `https://lu.ma/${e.url ?? ''}`;
    return `        <article class="yourway-board__row${rowCls}">
          <div class="yourway-board__date">
            <span>${esc(day)}</span>
            <strong>${esc(dm)}</strong>
          </div>
          <div class="yourway-board__main">
            <p class="yourway-board__city">${esc(cityOf(e))}</p>
            <h3>${esc(e.name)}</h3>
            <p>${esc(hm)} · Live on Luma</p>
          </div>
          <div class="yourway-board__meta">
            <a class="button button--yellow" href="${esc(url)}" rel="noopener">Register</a>
          </div>
        </article>`;
  }).join('\n');
}

const FILE = 'index.html';
const src = readFileSync(FILE, 'utf8');
const START = '<!-- LUMA:EVENTS:START -->', END = '<!-- LUMA:EVENTS:END -->';
const a = src.indexOf(START), b = src.indexOf(END);
if (a === -1 || b === -1 || b < a) { console.error('markers missing'); process.exit(1); }
const out = src.slice(0, a + START.length) + '\n' + rows + '\n        ' + src.slice(b);
if (out === src) { console.log('no change'); process.exit(0); }
writeFileSync(FILE, out);
console.log(`wrote ${events.length} event row(s)`);
