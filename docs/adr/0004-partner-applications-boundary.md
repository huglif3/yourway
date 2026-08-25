# 0004 — Partner applications: Notion is the destination, the site only links out

**Status:** accepted
**Date:** 2026-08-22

## Context

The partner page (`/home/user/yourway/partner/index.html`, section
`#apply`, ~line 319) collects activation proposals. The review pipeline
lives in Notion: the **"Partner Applications"** database under the
**Activations Playbook** (data source
`collection://f0befe13-f72c-441c-ae8e-594e601f50c5`). This static site has
no backend, and `CLAUDE.md` hard rules apply: no secrets in the repo, never
log personal data, and anything touching data collection routes to
`privacy-officer` and needs named human sign-off.

## Decision

- **Applications flow to the Notion database "Partner Applications".** The
  site's job is to get the applicant there, not to store or process
  anything itself.
- **Target state:** the site links out to a Notion form (embed/URL details
  pending). This boundary belongs to `integrator`.
- **Interim state (current):** the mailto builder stays until the form link
  is live. `partner/index.html` posts `#partner-form` to
  `mailto:meridian@growwithguava.com` (~line 339) as the no-JS fallback,
  and the inline script (~lines 563–596) builds the draft with subject
  "Find Your Way — Activation Partner Proposal" so every answer survives
  browser mailto quirks (documented in the comment at ~line 557). Do not
  "upgrade" this to a fetch/POST to any API.
- **No API tokens ever in client JS.** No Notion token, no proxy key,
  nothing. If direct submission is ever wanted, that is server-side work in
  the future platform repo, behind `privacy-officer` review — not here.
- **Statuses mirror the Activation Partner Brief outcomes:**
  `New / In review / Approved / Returned for revision / Declined`. The
  page already teaches applicants the reviewed outcomes (`partner-outcomes`
  list, ~lines 328–332: Approved / Returned for revision / Declined, with
  "Reviewed within 5 business days"). Page copy and the Notion database's
  status property must not drift apart — change them together.

## Consequences

- Swapping mailto → Notion form link is a one-element change (form action /
  CTA href) plus removal of the builder script; no new data handling on the
  site, but the PR still declares it touches collection.
- The Notion database schema (statuses above) is shared vocabulary between
  page copy, reviewers, and any future automation; renaming a status is a
  cross-surface change.
- **To reverse:** the destination changes only if the review pipeline
  itself moves out of Notion (a human/ops decision, `integrator` executing).
  Client-side tokens become acceptable never — that part is a `CLAUDE.md`
  hard rule, not revisitable at this layer.
