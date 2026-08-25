# 0003 — Nothing is listed until it is live on Luma

**Status:** accepted
**Date:** 2026-08-22

## Context

Activation stops (Spain first: Barcelona, Madrid, online closing) have
planned dates but no registration pages yet. A published date without a
working registration link creates commitments nobody can act on and facts
that go stale silently. `CLAUDE.md` site law: "Nothing is listed until it is
live on Luma. … No invented dates, prices, or names — `TODO(fact)` and stop."
Implemented in commit `7ce5af9` ("Hold events until Luma is live").

## Decision

- Events render as **coming-soon** until a real Luma registration URL
  exists. In `/home/user/yourway/index.html`: the "Upcoming events" section
  (~line 60) shows "Coming soon" with "Stops are listed here once their Luma
  registration page is live. Nothing is bookable yet."; the Spain activation
  board (~line 154) ships a single `yourway-board__row--soon` row.
- **Planned schedules survive as HTML comments at the drop-in points** —
  they are held back, not deleted. The Spain schedule (18–19 Sep Barcelona/
  Madrid Round 1, 01–02 Oct Round 2, week of 05 Oct online) lives in the
  comment at `index.html` ~line 142: "Restore a row here as its registration
  opens". Restoring a stop means uncommenting its row and attaching the live
  Luma URL — never retyping facts from memory.
- Until links exist, the only CTAs are internal (`#registration-updates`)
  and the update-request mailto (`meridian@growwithguava.com`).
- When a stop does go live, the registration CTA wording is
  **`REGISTER FOR HACKMERIDIAN`** — item 04 (ACTION) of the event
  information system in `brand/README.md`, "one CTA only". No second CTA,
  no alternative phrasing.

## Consequences

- The events section looks sparse until Luma pages exist. That is correct,
  not a bug for an agent to "fix" by inventing listings.
- An agent finding the commented schedule must not surface it: the comment
  is the staging area, and the trigger for restoring a row is a live Luma
  URL, nothing else.
- Copy changes to the eventual CTA go through `brand/README.md`'s event
  information system, not ad-hoc wording.
- **To reverse:** it would have to become true that a source other than
  Luma is the registration system of record (a human/tooling decision, with
  `integrator` owning the new boundary), or that the campaign accepts
  publishing non-bookable dates — which contradicts `CLAUDE.md` and would
  need that law changed first.
