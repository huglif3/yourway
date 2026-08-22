# 0002 — This surface is unlisted: both pages ship `noindex,nofollow`

**Status:** accepted
**Date:** 2026-08-22

## Context

The PRD defines surface 1 (`yourway.hackmeridian.com`) as an **unlisted
campaign destination**: people arrive via QR codes, partner links, and the
event pieces — never via search. The umbrella site `hackmeridian.com` is the
indexed brand presence; this site competing with it in brand-term results
would split traffic and surface unfinished campaign state (coming-soon
boards, interim mailto flows) to searchers.

## Decision

Both pages carry, in `<head>`:

```html
<meta name="robots" content="noindex, nofollow" />
```

- `/home/user/yourway/index.html` line 7
- `/home/user/yourway/partner/index.html` line 7

Any new page added to this site ships the same line before first deploy.
This is standing structure in `.claude/agents/architect.md` ("Both pages ship
`noindex,nofollow` — this surface is unlisted by design") and echoed in
`CLAUDE.md` hard rule 4's aside ("This site is `noindex` — that is not a
permission either"): unlisted status is a distribution choice, never an
access-control or privacy measure.

## Acceptance

The site is **absent from brand-term search results** (searches for
"HackMeridian", "Find Your Way HackMeridian", etc. return
`hackmeridian.com`, not this surface). Presence in an index is a regression
even if every other check passes.

## Consequences

- Do not add sitemaps, canonical tags pointing here, Open Graph is fine but
  no SEO work of any kind belongs on this surface.
- Deleting the meta line "because the page should be findable" is the exact
  failure this ADR exists to prevent.
- **To reverse:** mechanically trivial — remove one meta line per page — but
  it requires a **human decision** that the campaign strategy has changed
  (e.g. the site becomes the public registration hub), plus awareness that
  de-indexed pages take time to appear and that indexing exposes whatever
  interim state the pages are in. No agent makes this call.
