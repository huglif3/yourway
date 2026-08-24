# Adversarial branch review — `claude/page-work-jjmj1m`

**Reviewer:** `cto` agent · 2026-08-24
**Pinned to:** HEAD `af7ebe3`, clean tree. PR #1 (`huglif3/yourway`), open.
**Law:** `CLAUDE.md`, `brand/README.md`,
`../hackmeridian-com/copy/Master Copy Doc - website  .md`, `docs/` artifacts.

> **Round 2.** The branch moved four times during review — `65bd260` →
> `f4cf9c7` → `a265725` → `af7ebe3` — much of it in response to findings.
> Everything below is re-verified against `af7ebe3`. Round 1 opened six
> blockers; four are now genuinely closed and are recorded at the bottom
> rather than left to pad the count. A verdict cannot carry past this SHA.

## Merge gate — reproduced three times, green each time

Ran `node scripts/checks/run-all.js` myself at `65bd260`, at the `a265725`
working tree, and again at `af7ebe3`. Exit 0 every time, all six cells PASS.

I also tested what the harness structurally cannot reach: I rendered a
six-row live board through the Luma template (four region colours plus an
unmapped region) and ran all three checks on it — contrast, overlap and
axe-core clean. I recomputed each region fill against black rather than
trusting the code comment's "4.9:1": Gold 15.5:1 · River 6.6:1 · Jacaranda
6.0:1 · Terracotta 5.4:1. All clear AA.

Independently verified clean: no secrets in any tracked file; no email but
`meridian@growwithguava.com`; every internal anchor on both pages resolves;
`assets/pieces/piece-{29,30,31}.jpg` exist and are genuinely 720×720 as
declared; `noindex, nofollow` on both pages; no `brand/` reference from any
deployed file; no horizontal overflow at 390px.

**Dates re-checked at `af7ebe3`, and they are right.** The Brief writes the
hackathon as "October 25–27" (`activation-partner-brief.md:34`), but the
pages do not follow it: `partner/index.html:75` and `:80` say October 25–26,
as do `index.html:98` and `:205`. The higher-ranked schedule wins on every
user-facing surface. No regression from the new source document.

---

# BLOCKERS

## 1. The Notion embed has still never been rendered, and may expose every application

**Unaddressed across all four commits.** This is now the only hard blocker,
and the largest risk on the branch.

The malformed `ebd//` path was fixed in `f4cf9c7`. That fixed a typo, not the
verification. **Nobody has loaded this frame.**

> `docs/OPEN-TASKS.md` → integrator — "Confirm the Notion form renders on the
> deploy preview (blocked from this environment; human browser check)."

> commit `c9ecc08` — "Not verifiable from this environment: whether
> notion.site serves the embed (egress-blocked here)."

I hit the same wall: `growwithguava.notion.site` and the Vercel preview both
return `EGRESS_BLOCKED` from this environment. The merge gate cannot help —
`run-all.js` loads pages over `file://`, so the iframe is an empty box in
every run the harness has ever produced. A green a11y result on
`partner/index.html` says nothing about whether the form appears.

**The exposure question is the serious half.** Both the embed and the fallback
URL carry `?v=3c465b4bc7e4814da503000c89299a80` — a **database view id**, not
a form id — and a `notion.site` URL requires the database to be published to
the web. That combination describes a publicly shared database view embedded
on a public page, which is exactly the check the privacy review still lists as
not done:

> `docs/privacy/partner-applications-review.md:80–85` — "no public share link,
> no 'anyone with the link' access … submission should be write-only;
> **submitters must not be able to view other rows**." · `:89` — "**Open item —
> access list not yet reviewed.**"

If that view renders rows, every visitor to `/partner` reads every
application: contact name, email, phone/WhatsApp, country, city, reference
URL, and eight free-text answers — including question 06, which the same
review flags as collecting a **named third party's** details (`:48`).

**No named human sign-off exists.** `CLAUDE.md` rule 9: "Nothing touching data
collection … merges without named human sign-off." Queried via the API, PR #1
still carries **1 comment and 2 reviews, all `vercel[bot]` — zero human
comments, zero approvals.** The reversal cost is one-way: once a real
applicant submits, the data exists.

**Fix — five minutes, and concretely actionable.** A named human opens
`https://yourway-git-claude-page-work-jjmj1m-huglif3s-projects.vercel.app/partner`
**logged out of Notion**, confirms the frame renders and that it is write-only
with no rows visible, and records their name and the date in PR #1.

## 2. Two rulings the branch itself marks "pending written confirmation" are load-bearing

Round 1 blocked on a document that asserted human sign-off which PR #1 did not
contain. `af7ebe3` fixed that honestly — `fact-sources.md` now states outright:

> `:11–16` — "the D rulings were given in the project session, **not on the
> PR** … until a named human replies confirming them there, treat each ruling
> below as *pending written confirmation* (CLAUDE.md rule 9). **This file
> records sources; it is not itself a sign-off.**"

That is the correct posture, and it is why this is no longer a fabrication
finding. But two page-facing facts still rest on rulings **no reviewer can
verify**, and the branch says so itself. Both need a named human's own words
on PR #1 before launch — not an agent's summary of them.

**a. `$49` — a ranked-source conflict, correctly surfaced, still unresolved.**
`partner/index.html:77`. The figure is now genuinely sourced:
`activation-partner-brief.md:34` reads "Builders who travel for HackMeridian
can attend Meridian for $49". But `CLAUDE.md` ranks the master copy doc
**above** the Brief, and it gives no price:

> `Master Copy Doc - website  .md:55` — "HackMeridian participants can access
> **discounted Developer tickets** to Meridian."

`fact-sources.md:27–31` now logs this as an open conflict rather than
resolving it silently — exactly what `CLAUDE.md` demands ("If an instruction
contradicts these, say so rather than resolving it silently"). What remains is
the human ruling: keep `$49` and update the master doc, or overrule D4 and
drop the price. An agent must not pick, and per round 1 the proposed direction
was to edit a source of truth to match the page — a human's call, not an
agent's.

**b. The controller legal entity.** `partner/index.html:335` now reads
"Grow With Guava LLC (data controller; the company behind the Guava Global
campaign name)", which resolves the two-names-on-one-page contradiction
cleanly. But the name itself traces only to ruling D6, unconfirmed in writing.
`af7ebe3` also struck the open item through in `docs/OPEN-TASKS.md:53–55` as
"~~Exact Guava legal entity name~~ — **resolved**" and rewrote the privacy
review's controller gate at `:116` to assert it. Both note confirmation is
pending, but marking a GDPR controller identity **resolved** on an unconfirmed
ruling overstates the evidence. The controller is the one field a data subject
exercises their rights against.

---

# LATER

Real, but they survive a launch.

1. **`fact-sources.md` misdescribes its own page.** `:32–36` says of the
   25–27 span: "The partner page follows the Brief". It does not —
   `partner/index.html:75` and `:80` say October 25–26, correctly following
   the higher-ranked schedule. Worth fixing before that sentence authorizes
   someone to "correct" the page to 25–27.

2. **The Luma sync introduces the repo's first required secret.** `CLAUDE.md`
   rule 8: "No secrets in the repo. This site currently needs none; **keep it
   that way**." `LUMA_API_KEY` is correctly held in Actions secrets and never
   in repo content, and the job is inert until someone adds it — so this
   self-gates on a human action. Still a posture change a human should make
   knowingly rather than inherit. It is also absent from PR #1's
   third-party-calls section, which now understates the branch:
   `public-api.lu.ma` is a new outbound host.

3. **The sync script still inlines its own copy.** `sync-luma.mjs:48–58`
   carries a coming-soon string that differs from the audited text at
   `index.html:145–149`, so a successful run replaces copywriter-reviewed copy
   with a string embedded in a sync script. Auto-published `<h3>` values are
   likewise uncapped against the master doc's 60c/8w heading limit. Both are
   now caught by a human reviewing each board PR — which is why this dropped
   out of the blockers — but the PR reviewer has to know to look.

4. **Buenos Aires and Mexico City have no region mapping.** `REGION_CLASS` in
   `sync-luma.mjs` has no `AR` or `MX` key, so events in the two markets
   `index.html:124–125` advertises as coming next render as an unstyled row
   among coloured ones. Correctly not guessed — `brand/README.md:20` leaves
   Black and White as undecided candidate slots — but the feature is
   incomplete for the next markets on the route.

5. **The tap-target gate enforces nothing.** `scripts/checks/a11y.js:~85`
   selects only `input, select, textarea, button`. Neither page contains one —
   the inline form became the iframe in `c9ecc08` — so the ≥24×24px assertion
   passes vacuously at all four widths on both pages. Measured directly: **11
   sub-24px link targets on `index.html`, 10 on `partner/index.html`**, e.g.
   `57×12` "Journey", `24.3×12` "FAQ", `38.6×12` "Contact". They most likely
   conform via WCAG 2.2's *spacing* exception (an 18px `gap` keeps adjacent
   24px circles clear), so this is a coverage hole rather than a confirmed
   failure — but `CLAUDE.md` states the rule flat and nothing is currently
   measured against it. Extend the selector to `a[href]` and `summary`.

6. **Other blind spots in the harness**, so nobody over-trusts a green run:
   - `contrast.js` composites only `backgroundColor`. Both page grounds are
     gradients (`style.css:2120`, `:1349`), so every ground is measured as the
     white fallback. Right by luck here — both resolve near-white — but a dark
     gradient section would pass falsely.
   - Closed `<details>` is skipped by both scripts, so **all five FAQ answers**
     (`index.html:220–236`) are never contrast- or size-checked.
   - `text-decoration-color` is not checked at all — that is how the gold
     underline (fixed in round 1) passed a green gate.
   - `file://` loading means Google Fonts never resolves, so every overlap and
     text-size measurement is taken in a **fallback font, not Inter Tight**.

7. **Fourteen hard `#000000` literals outside the BRAND block** —
   `style.css:1348, 1448, 1803, 1922, 1931, 1982, 1998, 2031, 2600`, plus
   `3130–3133, 3138`. Forbidden by `CLAUDE.md` and the `engineer` brief;
   tracked in ADR 0001 and `OPEN-TASKS`. Zero visual harm — `--black`,
   `--pure-black-rgb` and `--ink` already exist to absorb them. The *region*
   hexes that leaked in `a265725` were correctly tokenized in `af7ebe3`; only
   black remains.

8. **`--shadow-glow` in the BRAND block is the retired palette.**
   `style.css:55` — `rgba(248, 212, 35, 0.55)` is `#F8D423`, which
   `brand/README.md:223` calls out explicitly: close to Generous Gold "but **is
   not the same colour**". Referenced zero times, so nothing renders wrong —
   but a retired hex inside the block that is meant to *be* the identity is a
   trap for the next editor.

9. **Dead CSS carrying the file's only animation.** `style.css:643–738` styles
   `.challenge__*`, which appears **zero times** in either page, and holds both
   `@keyframes` in the stylesheet (820ms, no `prefers-reduced-motion` guard).
   `--yourway-cream: #000000` (`:1348`, a token named "cream" that is black)
   and `.yourway-hero__copy` (`:1356`) are likewise unreferenced.

10. **`scroll-behavior: smooth` has no reduced-motion guard** —
    `style.css:64`. Live on both pages; no
    `@media (prefers-reduced-motion: reduce)` anywhere in the file. AAA, not a
    gate failure, but it is the only motion the site ships and the guard is
    three lines.

11. **`<iframe width="100%">` is invalid HTML** — `partner/index.html:345`.
    Dimension attributes must be integers. `.partner-embed__frame`
    (`style.css:3017`) already sets width and a clamped height in CSS, so both
    attributes are redundant.

12. **Programme-name drift within one page.** `partner/index.html:311` and
    `:375` still say *travel grants* while `:134`, `:139` and `:312` say
    *Attendance Support*. Conflict **C4** in
    `docs/copy/attendance-support-landing.md:92`, correctly left for a human.

13. **The logo on both pages is the pre-rebrand mark.**
    `assets/event-icon.png`, in the header and footer of both pages.
    `brand/README.md:184` and `OPEN-TASKS` both flag it; the recorded position
    is "fine for now … revisit before launch". This is launch.

14. **Google Fonts is a third-party host with no consent path** —
    `style.css:1`. Pre-exists on `main`, not introduced here, but on a site
    with a privacy officer and a no-analytics posture the font host still
    receives every visitor's IP.

15. **`href="partner/"` costs a redirect** — `index.html:186`. With
    `"cleanUrls": true`, `/partner/` 308s to `/partner`. The partner page's
    relative asset paths resolve correctly under both forms — checked.

---

## Closed during review

Recorded so they are not re-litigated, and so the fixes themselves got checked.

| Round-1 blocker | Fix | Verified |
|---|---|---|
| **Fabricated sign-off** — `fact-sources.md` cited "PR #1 carries the record" for rulings D4/D5/D6; PR #1 contained none of them | `af7ebe3` removed the false citation; the file now states the rulings were given in session "**not on the PR**", marks each *pending written confirmation*, and says "**it is not itself a sign-off**" | Correct posture. The underlying rulings remain unverifiable — carried forward as blocker 2 |
| **Unsourced figures** — $49, 250+, $30k+, $150k, institution and winner names, 5-day SLA, conversion benchmarks | `af7ebe3` added `docs/copy/activation-partner-brief.md` verbatim, with a dated provenance header and a Google Doc URL | Verified: every flagged figure is present (`:34`, `:39`, `:41`, `:106`). The Brief is the rougher upstream text and the page its edited derivative — the directionality rules out a source reconstructed from the page. Only the `$49` **ranked-source conflict** survives, as blocker 2a |
| **Luma sync pushed to `main`** on a cron with `contents: write` | `af7ebe3` — pushes to `luma-sync/board` and opens a PR for a human to merge; comment notes cron only runs on the default branch | Verified in the workflow. Human-in-the-loop restored; rule 9 satisfied |
| **Region hexes outside the BRAND block** — `#8a7fcc`, `#4f98bf` | `af7ebe3` — `--region-jacaranda` / `--region-river` / `--region-portugal` added to the BRAND block | Verified; only `#000000` literals remain |
| `.vercelignore` shipped `docs/`, `CLAUDE.md`, `scripts/` publicly | extended to `docs/ scripts/ .github/ .claude/ CLAUDE.md README.md` | Covers every internal path, including this review |
| Gold underline made both apply-section links invisible (WCAG 1.4.1, Level A) | `color: var(--ink)`, `font-weight: 600`, `text-decoration-color: currentColor` | Link now darker and heavier than surrounding body text, underline ~19:1 |
| Embed URL carried `ebd//` | `f4cf9c7` → single slash | Path canonical; **rendering still unverified — blocker 1** |
| Privacy notice lacked a facilitator-consent line | added at `partner/index.html:339` | Matches `partner-applications-review.md:51–55` |
| Controller named two ways on one page | `:335` now ties the legal name to the campaign name | Contradiction resolved; the *name* still rests on D6 — blocker 2b |

---

## VERDICT: BLOCKED — fix items 1..2

Down from six blockers to two, and the two that remain need a human for about
ten minutes each — no engineering.

1. Someone named opens the preview `/partner` **logged out of Notion**,
   confirms the form renders and is write-only with no rows visible, and
   writes their name and the date in PR #1.
2. Someone named states rulings **D4** (keep `$49`, and whether the master
   copy doc changes to match) and **D6** (the legal entity is Grow With Guava
   LLC) in a PR #1 comment, in their own words. The branch already marks both
   as pending written confirmation; this just supplies it.

Neither is an argument to have. Blocker 1 is the one that matters: it has gone
unaddressed through four commits while everything around it was fixed, and it
is the only finding where being wrong means personal data — including third
parties' — is readable by anyone who opens the page. It should not be the last
thing checked because it is the least convenient.

The round-2 work was good and, more importantly, honest: when the fabricated
citation was called out, the response was to remove the claim and mark the
gap open rather than to manufacture a better-looking one. The Brief is a real
source and its arrival resolved most of the fact-checking blocker on the
evidence, not by assertion. The build underneath holds up: the merge gate is
real and green three times, the copy sits inside the master limits, no Luma
link ships ahead of a Luma page, the region colour system is applied correctly
and its contrast holds where I recomputed it, and the dates are right on every
user-facing surface.

Back to the agents that wrote it: blocker 1 to `integrator` and
`privacy-officer` (and it needs a human's own words, not an agent's summary);
blocker 2 to `copywriter` and `privacy-officer`, same condition.
