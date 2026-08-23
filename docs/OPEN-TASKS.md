# Open tasks — FIND YOUR WAY build

Status as of 2026-08-23. Owner per item is the agent whose brief covers it;
"NEEDS" lines are inputs only the team can supply. Sources: the agents' own
wave-1 deliverables (docs/adr/, docs/privacy/, docs/copy/) and CLAUDE.md.

## engineer — wave 2, blocked mostly on approvals
- Apply the approved copy-audit rewrites (docs/copy/copy-audit.md, 16 rows).
- Fold the nine drifted #000000 literals back into tokens (ADR 0001 lists lines).
- Drop Luma links into the marked points as each stop goes live; restore the
  Spain board rows from the HTML comment (ADR 0003 — restored, never retyped).
- NEEDS: Luma URLs (expected this week) · decision on "Step 01–03" → "Way
  01–03" relabel · decision on hero one-CTA vs two.

## copywriter — done wave 1; follow-ups
- Resolve $49 vs "discounted Developer tickets": partner brief says $49, the
  master copy doc does not. One of the two documents should change.
- Add the closing FIND YOUR WAY → HACKMERIDIAN line to both pages once
  approved.
- NEEDS: approve/reject the 16 replacement strings · confirm the dollar
  figures and institution names (SocGen, Amundi, DTCC, MoneyGram) are cleared
  for public pages, not just the internal brief.

## qa — in flight
- Finish scripts/checks/ harness, pass its own self-test, then it gets
  committed. After that: propose a GitHub Action so the checks run on PRs.
- NEEDS: nothing yet; later, a yes/no on CI via GitHub Actions.

## integrator — next up
- Confirm the Notion form renders on the deploy preview (blocked from this
  environment; human browser check).
- Verify each Luma URL resolves before its Register button ships.
- Newsletter capture build is spec'd (docs/privacy N1–N10 gates) but needs an
  email provider decision before any code.
- NEEDS: deploy-preview check of the form · Luma URLs · email/newsletter
  provider choice · analytics stance (none today; per-source tracking from
  the PRD will need consent design).

## cto — wave 2 gate
- Adversarial review of the full branch (claude/page-work-jjmj1m, 13 commits)
  before any merge to main.
- NEEDS: who merges and when — the program doc's open decision on repository
  ownership and the co/unity review boundary.

## privacy-officer — done wave 1; three urgent items stand
- Verify Notion workspace hosting region + DPA (EU residency is plan-
  dependent; unconfirmed).
- Access review on the Partner Applications database (reviewers only) and a
  retention decision (options in the review doc).
- A real privacy notice page — the form's minimum notice is live, the full
  notice is a counsel item, and the site has no privacy page yet.
- NEEDS: Notion plan/region details · reviewer list · retention pick ·
  counsel contact/timeline · exact Guava legal entity name.

## architect — done wave 1; parked
- ADR for Buenos Aires / Mexico City region-colour assignment (Black/White
  are the free slots) once the designer weighs in.
- Platform-repo schema work starts when that repo exists.
- NEEDS: designer's confirmation of the interim region mapping · the
  repository-ownership decision above.

## Not agent-owned
- Grants artifact share pin still shows the pre-rebrand version to link
  viewers — move the pin in the share menu when ready.
- Logo: assets/event-icon.png is the old mark on both headers ("fine for
  now" per the team; revisit before launch).
- Formal answer to whether this repo is PRD Surface 1 (/way) or its
  precursor — noindex is applied either way.
- Main site's style.css ships Instrument Sans against its own brand guide
  (hackmeridian-com repo; separate fix).
