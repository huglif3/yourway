# 0001 — All colour resolves to the BRAND block in `style.css`

**Status:** accepted
**Date:** 2026-08-22

## Context

Before commit `8375785` ("Consolidate the brand into a single token block"),
the identity was spread across **96 colour literals** in the stylesheet plus
**three scopes** — `:root`, `.yourway-page`, `.partner-page` — each declaring
the same six colours under different names. Swapping the brand meant a hunt
through ~2,400 lines with three places to disagree. The FIND YOUR WAY
identity swap (`df22f51`) was only feasible because that consolidation
happened first.

## Decision

- The **BRAND block** at the top of `style.css`, inside `:root` (the
  commented section starting "BRAND. This block is the whole identity"), is
  the single source of every colour on both pages.
- Page scopes **alias** it, never redeclare it: `.yourway-page` (line ~1340)
  and `.partner-page` (line ~2093) define `--yourway-*` / `--partner-*`
  tokens only as `var(--brand-*)` references.
- Translucent surfaces use **channel tokens**: `rgb(var(--x-rgb) / a)`
  (e.g. `--brand-yellow-rgb: 253 218 36`), so a colour and its alpha
  variants change together. No frozen `rgba()` literals.
- **No colour literals in rules.** A hex or `rgb()` value outside the BRAND
  block is a defect, not a style choice. (As of this ADR a handful of
  `#000000` literals have drifted back in — `style.css` lines 1345, 1428,
  1783, 1902, 1911, 1962, 1978, 2011, 2580; fold them into
  `var(--black)` / `rgb(var(--pure-black-rgb))` on next touch, do not add
  more.)

This is also site law in `CLAUDE.md` ("All colour lives in the BRAND block of
`style.css`") and the `engineer` agent's Never column ("new colour literals
outside the BRAND block"). Palette values themselves come from
`brand/README.md` (designer's Figma `HackMeridian-2026` / 4415-2 overrides).

## Consequences

- A rebrand is an edit to one block; `8375785` verified the block is the
  only control point by overriding it alone at runtime.
- Any new colour needs a token (and a matching `*-rgb` channel if it will
  ever carry alpha) before it may appear in a rule.
- Check: `grep -nE '#[0-9a-fA-F]{3}|rgba?\(' style.css` must only hit the
  `:root` BRAND block.
- **To reverse:** it would have to become true that the two pages need
  genuinely independent identities that cannot share tokens — and even then
  the answer is a second scoped token block, not literals in rules. A human
  decision plus a replacement single-source scheme is required.
