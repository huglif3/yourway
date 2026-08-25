# Merge-gate checks

Runnable form of the WCAG 2.2 AA merge gate from `CLAUDE.md` and
`.claude/agents/qa.md`. These used to live in a session scratchpad
(`audit.js`, `overlap.js`, `check-new.js`); this is the committed harness.

## Run

```sh
node scripts/checks/run-all.js
```

Runs all three checks against both pages (`index.html`,
`partner/index.html`) via `file://` URLs resolved from the repo root, prints
each check's output and a summary table, and exits 1 if anything failed.

Each check also runs standalone against one page:

```sh
node scripts/checks/contrast.js index.html
node scripts/checks/overlap.js partner/index.html
node scripts/checks/a11y.js index.html
```

### Dependencies

`playwright` and `axe-core`, installed locally:

```sh
npm i -D axe-core playwright     # or: npm i --no-save axe-core playwright
```

Neither `node_modules/` nor package files are committed. axe-core is injected
into the page from the local install — never from a CDN.

### Browser

The Chromium executable is resolved in this order (see `lib.js`):

1. `PLAYWRIGHT_CHROMIUM` env var, if set
2. `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, if it exists
3. playwright's own default install (`npx playwright install chromium`)

## What each check enforces

### `contrast.js` — WCAG AA text contrast

Every element carrying its own text nodes, in **both** `light` and `dark`
`colorScheme`, at 1440 / 1120 / 768 / 390 px. Normal text needs 4.5:1; large
text (≥24px, or ≥18.66px bold) needs 3:1. Failing pairs are printed with
ratio, required ratio, size, fg/bg colors, and element.

Implementation details that must not be simplified away:

- Backgrounds with alpha are **composited over the parent background stack**,
  so a semi-transparent layer is measured against what actually shows
  through it, not its own raw rgba.
- `color(srgb r g b [/ a])` values (0–1 floats) are parsed alongside `rgb()`.
- SVG text is skipped: it paints with `fill`, not `color`, and is reviewed
  separately.
- Text inside closed `<details>` is skipped (not rendered).

### `overlap.js` — overlapping text

At each of the four widths: leaf text elements (`h1–h3, p, span, strong, li,
a, summary` with their own text and no text-bearing children), excluding
anything inside a closed `<details>`, must not have bounding boxes that
intersect by more than 4px in both axes.

### `a11y.js` — axe-core + size rules

- **axe-core** at 1440px: no violation above `minor` fails the gate; minor
  findings are printed as informational.
- **No rendered text under 11px** (computed font-size), at all four widths.
- **Tap targets ≥24×24px** for visible form controls (`input`, `select`,
  `textarea`, `button`), at all four widths. The measured target is the
  *effective clickable region* per WCAG 2.5.8: a control wrapped in — or
  referenced by — a `<label>` is activated by clicks anywhere on the label,
  so the union of control + label rects is what must clear 24px. The consent
  checkbox is covered by this rule like any other control, no exemption.
- **No horizontal page overflow at 390px** — wide content scrolls inside its
  own container instead.

### `run-all.js`

Both pages × all three checks, summary table, exit 1 on any failure.

## Known accepted finding

- `html-has-lang` cannot be fixed on **artifact shells** (the published
  artifact wrapper owns the `<html>` element, out of page control) — artifact
  content carries `lang` wrappers instead. On **this repo's own pages** the
  `<html>` element does have `lang`, so no axe exclusions apply here and the
  harness runs axe with none.

## Changing a check

Don't — not to get green. Per `.claude/agents/qa.md`: never weaken an
assertion, raise a threshold, or exclude an element so a page passes. If a
check is genuinely wrong, say why and get `cto` sign-off before it changes.
When a check fails, fix the page.
