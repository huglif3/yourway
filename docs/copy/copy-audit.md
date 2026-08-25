# Copy audit — FIND YOUR WAY campaign site

**Scope:** every user-facing string on `/index.html` and `/partner/index.html`.
**Law:** `../hackmeridian-com/copy/Master Copy Doc - website  .md` (limits, canonical facts) and `brand/README.md` (voice, event information system, confirmed schedule).
**Auditor:** copywriter agent · 2026-08-22.

**Limits applied:** eyebrow/short label ≤30 chars / 4 words · headline ≤60 chars / 8 words · body 20–30 words / ≤180 chars · CTA and hyperlink text ≤30 chars / 4 words · FAQ question ≤100 chars / 15 words · FAQ answer ≤300 chars / 50 words, leading with the direct answer.

**Counting method:** characters include spaces and punctuation; word counts exclude standalone separators (`·`, `—`, `→`, `+`, `×`). Every count below was machine-counted, not estimated. Under-length body copy (below the 20-word floor) is not failed — only over-limit is.

**Verdicts:** PASS · OVER-LIMIT · OFF-VOICE · FACT-CHECK. Every non-PASS row carries a full, paste-ready replacement. Where a fact cannot be verified from the master doc or `brand/README.md`, the replacement carries `TODO(fact)` rather than a guess — per CLAUDE.md, no invented dates, prices, or names.

**Canonical facts:** October 25–26, 2026 · Lisbon · venue ONE, Marvila. Oct 27 optional learning day (aimed at grantees). Oct 28 Meridian day 1, mandatory for grantees. Oct 29 recommended. Tracks: Genesis and Scale. Meridian ticket fact verifiable from master doc: "discounted Developer tickets" — no price given.

---

## Page 1 — `/index.html`

| # | Location | Current string | Count | Verdict | Replacement (paste-ready) |
|---|---|---|---|---|---|
| 1 | `<title>` | Find Your Way to HackMeridian | 29c / 5w | PASS | — |
| 2 | `.site-nav` links | Journey / Activations / Partners / FAQ | 7c / 11c / 8c / 3c | PASS | — |
| 3 | `.site-nav__cta` | Find an Event | 13c / 3w | PASS | — (nit: sentence case elsewhere — prefer "Find an event" to match the hero CTA) |
| 4 | `.hero .eyebrow` | Guava Global x Stellar | 22c / 3w | PASS | — |
| 5 | `.hero h1` | Find your way | 13c / 3w | PASS | — |
| 6 | `.hero__lede` | Regional activations start the route. Learn Stellar, meet builders, ship faster, and earn your path toward Lisbon in October 2026. | 130c / 20w | PASS | — |
| 7 | `.hero__meta` | September-October 2026 · Europe + Online | 40c / 4w | FACT-CHECK | "September–October 2026 · In person + online" (43c / 5w). "Europe" contradicts row 22 on this same page, which lists Buenos Aires and Mexico City as coming next. Replacement drops the geographic claim; restore a region list only once the route map is confirmed. |
| 8 | `.yourway-hero__actions` (two buttons) | Find an event / Host an activation | 13c / 3w · 18c / 3w | OFF-VOICE | Both strings pass individually (13c and 18c, 3w each). The violation is structural: two CTAs on one hero against the one-action rule (brand/README logs this as a team call). Keep "Find an event" as the button; demote "Host an activation" to a plain text hyperlink (18c / 3w — fits hyperlink limit unchanged). |
| 9 | `.yourway-hero__tags` | You are here / Builder sessions / Travel grant path | 12c / 16c / 17c | PASS | — |
| 10 | `.yourway-hero__board` | Route opening soon / Spain Sessions / Barcelona → Madrid → Online | 18c / 14c / 27c | PASS | No dates invented; board correctly ships as coming-soon. |
| 11 | `.yourway-upcoming .stats__eyebrow` | Upcoming events | 15c / 2w | PASS | — |
| 12 | `.yourway-upcoming .stats__heading` | Next stops on the route | 23c / 5w | PASS | — |
| 13 | `.yourway-upcoming__date` | Coming soon | 11c / 2w | PASS | — |
| 14 | `.yourway-upcoming__soon p` | Stops are listed here once their Luma registration page is live. Nothing is bookable yet. | 89c / 15w | PASS | — |
| 15 | `.yourway-upcoming__soon a` | Get notified when the first stop opens | 38c / 7w | OVER-LIMIT | "Get notified" (12c / 2w). Hyperlink text limit is ≤30 chars / 4 words; also matches the board CTA at row 25, one verb per action. |
| 16 | `#journey .eyebrow` | A HackMeridian journey | 22c / 3w | PASS | — |
| 17 | `#journey h2` | You are here. Here is what comes next. | 38c / 8w | PASS | Exactly at the 8-word cap. |
| 18 | `.yourway-stop__label` (×5) | Start / Step 01 / Step 02 / Step 03 / Destination | 5c / 7c / 7c / 7c / 11c | OFF-VOICE | "Start" / "Way 01" / "Way 02" / "Way 03" / "Destination" (6c / 2w each for the numbered ones). The campaign frames every event as a route chosen, not a step assigned — "Step 01" is literally an assigned step. "Way NN" matches the partner brief's own "YOUR WAY 01" identifier convention. |
| 19 | `.yourway-stop` h3 + body (×5) | Find your route (15c) · Join an activation (18c) · Build on Stellar (16c) · Get referred (12c) · Join us in Lisbon (17c); bodies 92c/16w · 93c/13w · 96c/15w · 97c/14w · 133c/20w | see left | PASS | Stop 5 body's facts check out: "two days in Lisbon, October 25–26, then Meridian" matches canon; travel support framed as review, not promise. |
| 20 | `#events .eyebrow` | Regional activations | 20c / 2w | PASS | — |
| 21 | `#events h2` | Start with the Spain route. | 27c / 5w | PASS | — |
| 22 | `.yourway-events__note` | Portugal, France, the UK, Buenos Aires, and Mexico City are coming next. Registration links will be added as each stop goes live. | 129c / 22w | PASS | Buenos Aires and Mexico City are verifiable as "the next listed markets" in brand/README (region colours pending, markets listed). Note the conflict this creates with row 7. |
| 23 | `.yourway-regions` chips | Spain / Portugal / France / Buenos Aires / Mexico City / UK | ≤11c each | PASS | — |
| 24 | `.yourway-board__row` | Spain route (11c) / Stops open here as they go live (31c / 7w) / body (173c / 28w) | see left | PASS | Body is 7 chars under the 180 cap and inside 30 words. No dates published before Luma is live — correct per site law. |
| 25 | `.yourway-board__meta` CTA | Get notified | 12c / 2w | PASS | — |
| 26 | `#partners .support--black h2` | Build local. Arrive ready. | 26c / 4w | PASS | — |
| 27 | `.yourway-benefits__chips` (×8) | Stellar onboarding … HackMeridian pathway | ≤20c each | PASS | — |
| 28 | `.support__note` | These sessions are designed to turn interest into active building, with a clear route toward October in Lisbon. | 111c / 18w | PASS | — |
| 29 | `.yourway-benefits__aside .eyebrow` | Host the journey | 16c / 3w | PASS | — |
| 30 | `.yourway-benefits__aside h2` | Bring your city onto the map. | 29c / 6w | PASS | — |
| 31 | `.yourway-benefits__aside p` | Partners can host activations that create local builder momentum and feed qualified talent into HackMeridian. Ready to bring your city into the route? | 150c / 23w | PASS | — |
| 32 | `.yourway-benefits__cta` | Open partner application | 24c / 3w | PASS | — |
| 33 | `#registration-updates .eyebrow` | For builders | 12c / 2w | PASS | — |
| 34 | `#registration-updates h2` | Event links are the next layer. | 31c / 6w | PASS | — |
| 35 | `#registration-updates p` | Luma registration links will be added to each event stop. Until then, use this page to track dates, pick your city, and prepare to join. | 136c / 25w | PASS | — |
| 36 | `.yourway-resource` (×3) | About HackMeridian (18c) + 71c span · Build on Stellar (16c) + 48c span · Get registration updates (24c) + 53c span | see left | PASS | "Build something worth shipping. October 25–26, 2026 · Lisbon, Portugal." matches the master doc verbatim. |
| 37 | `#faq h2` | Questions, then your move. | 26c / 4w | PASS | — |
| 38 | FAQ q1 + a1 | Who can attend an activation? (29c / 5w) · answer 116c / 15w | see left | PASS | Answer leads directly with the who-list. |
| 39 | FAQ q2 + a2 | Who can host an activation? (27c / 5w) · answer 127c / 18w | see left | PASS | — |
| 40 | FAQ q3 + a3 | What support do partners receive? (33c / 5w) · answer 143c / 18w | see left | PASS | Leads with the direct answer ("Partners can receive …"). |
| 41 | FAQ q4 + a4 | Do I need prior Stellar experience? (35c / 6w) · answer 123c / 20w | see left | PASS | Leads with "No." — matches master doc FAQ. |
| 42 | FAQ q5 + a5 | Is this the travel grant application page? (42c / 7w) · answer 133c / 20w | see left | PASS | Leads with "No." |
| 43 | Footer meta | 2026 HackMeridian. All rights reserved. / Contact | 39c · 7c | PASS | — |
| 44 | Logo `alt` (header + footer) | HackMeridian 2026 Lisbon | 24c / 4w | PASS | — |
| 45 | End of page (missing string) | — | — | OFF-VOICE | The page never closes on the campaign line. Add above or in the footer: "FIND YOUR WAY → HACKMERIDIAN" (28c / 4w — fits the CTA limit). Every campaign piece closes on this per the voice law. |

---

## Page 2 — `/partner/index.html`

| # | Location | Current string | Count | Verdict | Replacement (paste-ready) |
|---|---|---|---|---|---|
| 1 | `<title>` | Activation Partner Brief - Find your way | 40c / 7w | PASS | — |
| 2 | `.site-nav` links + CTA | Model / Formats / Metrics / Apply / Back to route | ≤13c each | PASS | — |
| 3 | `.partner-hero .eyebrow` | Activation partner brief | 24c / 3w | PASS | — |
| 4 | `.partner-hero h1` | Your activation is a route. | 27c / 5w | PASS | On-voice: route chosen, not step assigned. |
| 5 | `.partner-hero__lede` | There is no single prescribed path into HackMeridian. Your event is one legitimate entry point among many — a workshop, a founder night, a mini-hack — not a checkpoint on a fixed roadshow. | 188c / 31w | OVER-LIMIT | "No single prescribed path leads into HackMeridian. Your event — a workshop, a founder night, a mini-hack — is one entry point among many, not a checkpoint on a roadshow." (169c / 28w) |
| 6 | `.partner-hero__meta` | Guava Global × Stellar Development Foundation · September-October 2026 | 70c / 7w | PASS | — |
| 7 | `.partner-hero__card` | Frame it this way (17c) / YOUR WAY 01 / your city (23c) / span 122c / 21w | see left | PASS | Card closes on FIND YOUR WAY → HACKMERIDIAN — the voice law, stated as instruction to partners. |
| 8 | `.partner-beats .eyebrow` | Map to one beat | 15c / 4w | PASS | — |
| 9 | `.partner-beats h2` | Every activation lands on a single campaign beat. | 49c / 8w | PASS | Exactly at the 8-word cap. |
| 10 | `.partner-beats__copy p` | Pick the one your format serves. It sets the framing, the content modules, and the conversion ask. | 98c / 17w | PASS | — |
| 11 | `.partner-beats__list` (×6) | Find your people … Find your next move + descriptors | ≤19c each | PASS | On-voice beat names. |
| 12 | `#opportunity .eyebrow` | 01 · The opportunity | 20c / 3w | PASS | — |
| 13 | `#opportunity h2` | 250+ builders arrive in Lisbon ready. | 37c / 6w | FACT-CHECK | "250+" is not verifiable from the master doc or brand/README. If confirmed against the Activation Partner Playbook, keep as-is (fits: 37c / 6w). If not: "Builders arrive in Lisbon ready." (32c / 5w) and TODO(fact: headline count). |
| 14 | `.partner-lede` (opportunity) | HackMeridian Lisbon runs October 25-26, 2026, with a suggested third day … attend Meridian for $49, two days beside SocGen, Amundi, DTCC and MoneyGram-level institutional participation. | 378c / 52w | OVER-LIMIT + FACT-CHECK | "HackMeridian runs October 25–26, 2026 in Lisbon, directly before Meridian on October 28–29. Builders who travel for the hackathon get discounted Developer tickets to Meridian." (175c / 25w). Fixes: 2.1× over the body cap; "$49" is not in the master doc (which says only "discounted Developer tickets") — TODO(fact: Meridian ticket price) before any price ships; SocGen/Amundi/DTCC/MoneyGram names moved out (see row 25); the Oct 27 detail is already carried by the schedule list directly below. |
| 15 | `.partner-schedule` (×4) | Oct 25-26 HackMeridian … Oct 29 Meridian day 2 — recommended | ≤41c each | PASS | Matches the confirmed schedule in brand/README exactly, including "mandatory for grantees" on Oct 28. |
| 16 | `.partner-track--genesis` | Genesis / First-time founders and emerging builders (41c / 5w) / Validating a new idea or an early prototype. (44c / 8w) | see left | PASS | Matches master doc track definitions. |
| 17 | `.partner-track__prize` (Genesis) | Prize pool ($30k+) plus travel grants | 37c / 5w | FACT-CHECK | "$30k+" is not verifiable from the master doc or brand/README. If confirmed, keep as-is (fits). If not: "Prize pool plus travel grants" (29c / 5w) and TODO(fact: Genesis prize amount). |
| 18 | `.partner-track--scale` | Scale / Experienced founders and product teams (38c / 5w) / Building production-ready solutions. (36c / 3w) | see left | PASS | — |
| 19 | `.partner-track__prize` (Scale) | Cash prizes TBD · SCF pathway up to $150k · direct SDF and ecosystem access | 75c / 13w | FACT-CHECK | "up to $150k" is not verifiable from the master doc or brand/README. If confirmed, keep as-is. If not: "Cash prizes TBD · SCF pathway · direct SDF and ecosystem access" (63c / 10w) and TODO(fact: SCF pathway ceiling). |
| 20 | `.partner-goal` (opportunity) | Programme goal. 250+ builders from Europe and APAC arrive in Lisbon … September and October 2026. | 197c / 30w | OVER-LIMIT + FACT-CHECK | "Programme goal: 250+ builders arrive in Lisbon with a project idea, a team, and hands-on Stellar experience — driven through regional activations in September and October 2026." (176c / 26w). 17 chars over cap; "250+" TODO(fact) as row 13; "Europe and APAC" dropped — it half-matches brand/README regions (Vietnam/SEA yes) but omits the listed Buenos Aires / Mexico City markets. |
| 21 | `#model` eyebrow / h2 / lede | 02 · The delegated model (24c / 4w) / You run the activation. We run the infrastructure. (50c / 8w) / One partner, one city, one focused activation. (46c / 7w) | see left | PASS | h2 exactly at the 8-word cap. |
| 22 | `.partner-panel` lists (You provide / Guava provides) | 5 + 3 list items | ≤80c each | PASS | List items, not body copy; terse and concrete. |
| 23 | `.partner-goal` (grants note) | Travel grants are managed and paid out by Guava based on demo-day performance — they are not something you distribute yourselves. | 129c / 20w | PASS | — |
| 24 | `#rules .eyebrow` | 03 · Before you design anything | 31c / 5w | OVER-LIMIT | "03 · The ground rules" (21c / 4w). Current is 1 char and 1 word over the eyebrow cap — the only eyebrow on either page that breaks it. |
| 25 | `#rules h2` + rule cards | Three non-negotiables. (22c) / Qualification moment / Conversion moment / 48-hour follow-up; bodies 149c/21w · 138c/27w · 143c/23w | see left | PASS | 48-hour commitment is this brief's own programme policy, not an external fact. |
| 26 | `#formats` eyebrow / h2 | 04 · Choose your format (23c / 4w) / Three formats. Pick the one your community fits. (48c / 8w) | see left | PASS | — |
| 27 | `.partner-table` cells | Format rows with attendance 30-60 / 150-300 / 15-30 and conversion 25-30% / 30-50% | ≤103c each | FACT-CHECK | Table copy is within reasonable length (longest cell 103c). The attendance and conversion figures are programme targets — confirm them against the Activation Partner Playbook before external distribution; if unconfirmed, TODO(fact: format benchmarks). No wording change needed. |
| 28 | `#content` eyebrow / h2 / lede | 05 · Content and workshops (26c / 4w) / Use the library. Don't build from scratch. (42c / 7w) / lede 112c / 19w | see left | PASS | — |
| 29 | `.partner-module` 1 body | Institutional credibility briefing — SocGen, Amundi, Spiko, DTCC, EURC. Opening session, all builders. | 102c / 12w | FACT-CHECK | Institution names are not verifiable from the master doc or brand/README. If confirmed against the Playbook, keep as-is (fits). If not: "Institutional credibility briefing — why institutions build on Stellar. Opening session, all builders." (102c / 12w) and TODO(fact: named institutions). |
| 30 | `.partner-module` 2–3 bodies | Matches a builder's problem … (79c / 13w) / Using Claude, Cursor, and Copilot … (112c / 15w) | see left | PASS | Tool names describe the workshop's own content. |
| 31 | `.partner-module` 4 body | The closing session. SCF pathway, CV Labs EMEA Accelerator, and the Ambassador Program, told through past winner stories — 4Bridge, Stellar Forge, The Simple Fund. | 163c / 24w | FACT-CHECK | Winner names (4Bridge, Stellar Forge, The Simple Fund) and CV Labs EMEA Accelerator are not verifiable from the master doc or brand/README. If confirmed, keep as-is (fits: 163c / 24w). If not: "The closing session: the SCF pathway, accelerator routes, and the Ambassador Program, told through past winner stories." (119c / 17w) and TODO(fact: winner names, accelerator name). |
| 32 | `.partner-goal` (menu para) | The full menu — Zero to Soroban, Rust for Web2 Developers, Validating Your Idea in 48 Hours, Landing Page with AI, Pitch Like a Founder and more — is in the Activation Partner Playbook. Most modules are available live or as async video for virtual delivery. | 257c / 44w | OVER-LIMIT | "The full menu — Zero to Soroban, Rust for Web2 Developers, Pitch Like a Founder and more — lives in the Activation Partner Playbook, live or as async video." (156c / 27w). 77 chars and 14 words over cap; three named modules carry the point, the Playbook carries the rest. |
| 33 | `#metrics` eyebrow / h2 / panels | 06 · Measuring success (22c / 3w) / What we track, and what counts. (31c / 6w) / three list panels | see left | PASS | Panel items ≤45c each; "A qualified builder meets 4+" is the programme's own definition. |
| 34 | `.partner-thresholds` | Minimum threshold. 10% … (74c) / Strong performance. 25%+ … (103c) / Note. Travel grants go to demo-day performers … (71c) | see left | PASS | Thresholds are this brief's own commitments to partners, consistent with the grants note (row 23). Lengths all inside body cap. |
| 35 | `#apply` eyebrow / h2 / body | 07 · The proposal (17c / 3w) / Submit your activation proposal. (32c / 4w) / body 154c / 24w | see left | PASS | — |
| 36 | `.partner-outcomes` + SLA | Approved / Returned for revision / Declined descriptors; Reviewed within 5 business days. (32c) | ≤90c each | PASS | 5-day SLA is the brief's own commitment; keep it honoured or change it here first. |
| 37 | Form legends, labels, hints | Your organization … Specific dates; longest label 90c (q5); hints ≤130c | see left | PASS | Functional microcopy; concrete, on-voice ("Fintech engineers from the neobanking sector", not "developers in London"). |
| 38 | `.partner-form__actions p` + button | Submit opens an email draft to meridian@growwithguava.com until backend storage is connected. (93c) / Send proposal (13c / 2w) | see left | PASS | Honest about the mailto fallback; single CTA. |
| 39 | `#next .eyebrow` | 08 · How to get started | 23c / 5w | OVER-LIMIT | "08 · Getting started" (20c / 3w). One word over the 4-word eyebrow cap. |
| 40 | `#next h2` + steps | Three steps. (12c) / three `<li>` pairs, spans 98c · 71c · 58c | see left | PASS | "5 business days" and "7 days" are the brief's own process commitments, consistent with rows 34 and 36. |
| 41 | Footer | Find your way / Apply / 2026 HackMeridian. All rights reserved. / Contact | ≤39c each | PASS | — |
| 42 | End of page (missing string) | — | — | OFF-VOICE | Like the index, the page never closes on the campaign line it tells partners to close on. Add before the footer: "FIND YOUR WAY → HACKMERIDIAN" (28c / 4w). |

---

## Cross-page notes

- **Dash discipline.** The partner page writes "October 25-26" and "September-October" with hyphens; the canonical form and the index use en dashes ("October 25–26"). All replacement strings above use en dashes — sweep the remaining hyphens when applying.
- **One CTA per piece** holds everywhere except the index hero (index row 8) — brand/README already logs it as a team call; the copy fix costs nothing either way.
- **No invented dates anywhere** — both pages correctly hold event listings behind "Nothing is listed until it is live on Luma." The Spain schedule stays in an HTML comment. Good.
- **TODO(fact) register** (all on the partner page): Meridian ticket price ($49) · Genesis prize pool ($30k+) · SCF pathway ceiling ($150k) · 250+ builder goal (×2) · institution names (SocGen, Amundi, Spiko, DTCC, EURC, MoneyGram) · past winner names (4Bridge, Stellar Forge, The Simple Fund) · CV Labs EMEA Accelerator · format attendance/conversion benchmarks. None are contradicted by the master doc — they are simply not in it or in brand/README, so each needs a named source (the Activation Partner Playbook) before this brief circulates.

## Summary

Audited 87 distinct user-facing strings (45 locations on `/index.html`, 42 on `/partner/index.html`, several covering grouped strings). 16 rows need work: 6 OVER-LIMIT (index newsletter link at 38c/7w; partner hero lede 188c/31w; opportunity lede 378c/52w; programme goal 197c; rules eyebrow 31c/5w; content menu paragraph 257c/44w — plus the 5-word "How to get started" eyebrow), 5 OFF-VOICE (the "Step 01–03" journey labels that assign steps on a routes-chosen campaign, the two-CTA hero, and both pages failing to close on FIND YOUR WAY → HACKMERIDIAN), and 8 FACT-CHECK rows covering every dollar figure, the 250+ goal, and all institution and winner names — none verifiable from the master doc or brand/README, so each replacement carries TODO(fact) rather than a guess. The three worst offenders: the partner opportunity lede at 378 characters (2.1× the body cap, and the only place the unverifiable "$49" Meridian price appears — the master doc says only "discounted Developer tickets"); the content-menu paragraph at 257 characters/44 words; and the index journey labels "Step 01/02/03", which contradict the campaign's core frame in three words — replaced with "Way 01/02/03" to match the partner brief's own YOUR WAY identifier system.
