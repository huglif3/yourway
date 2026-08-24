# Privacy review — partner applications and planned newsletter capture

**Reviewer:** `privacy-officer` agent
**Date:** 2026-08-22
**Scope:** the two personal-data surfaces currently in flight on
`yourway.hackmeridian.com`: (1) the partner application form and its planned
move to Notion, (2) the newsletter capture planned in the PRD.
**Status:** review notes. This document states what was verified and what
remains open. It does not declare anything compliant — legal conclusions
belong to Portuguese counsel and the humans (CLAUDE.md rule 10).

---

## Surface 1 — Partner application → Notion

### Current state (verified in code)

`/home/user/yourway/partner/index.html` submits via `mailto:` to
`meridian@growwithguava.com` — a JS handler builds the email body; the plain
`mailto:` form action is the no-JS fallback. Nothing is stored by the site
itself and no third-party form backend is called today.

One line worth keeping in view: the mailto path transmits the application
through the **applicant's own mail client and their email provider**. That is
a different processor story from Notion — the applicant's provider is their
own choice, not a processor engaged by Guava — but the receiving inbox
(`meridian@growwithguava.com`, Google Workspace or equivalent) *is* part of
Guava's processing chain and should appear in any processor inventory.

### Planned state

Submissions move to a **Notion form** writing into the **"Partner
Applications" database** in the **Hack Meridian workspace**, with anonymous
submissions enabled (applicants do not need a Notion account; Notion still
receives and stores everything they type).

### What is collected

| Field | Personal data? | Notes |
|---|---|---|
| Organization name | Indirectly (sole traders, personal brands) | |
| Contact full name | **Yes** | |
| Email | **Yes** | Required |
| Phone / WhatsApp | **Yes** | Optional in the current form — keep it optional |
| Country | Yes, in combination | |
| City | Yes, in combination | |
| Reference URL (website / social / past event page) | Often yes (personal profiles) | |
| Eight free-text proposal answers (01–08) | **Potentially yes, uncontrolled** | Question 06 explicitly asks for the **facilitator's name, background, and language** — a named third party who never sees this form and is told nothing. Free-text fields can also carry anything else the applicant types. |

The facilitator field means this surface collects personal data about people
**other than the submitter**. The form page (or the review process) needs a
line addressing this — e.g. instructing applicants to confirm the facilitator
knows their details are being shared, and/or a transparency route to the
facilitator. Flagged for counsel below is whether that duty sits with Guava
or the applicant.

### Where it lives

Notion, in the Hack Meridian workspace. **Hosting region unknown.** Notion's
EU data residency is **plan-dependent** (offered on certain Business/
Enterprise plans, and only prospectively for newly created workspaces/
teamspaces on some configurations) — someone with workspace admin access must
verify (a) the plan, (b) whether EU residency is actually enabled for this
workspace, not merely available on the plan. If data is hosted in the US,
the transfer mechanism (Notion's participation in the EU–US Data Privacy
Framework and/or SCCs in its DPA) must be confirmed, not assumed.
**Open item — not verified.**

"Somewhere in the form backend" fails this review; "Notion, region TBD" only
passes as an interim state with the verification assigned to a named person.

### Who can see it

**All members of the Hack Meridian workspace** who can see the database —
which, absent deliberate restriction, tends to mean everyone in the
workspace, including people with no role in partner review. Required before
go-live:

- An **access review**: list who is in the workspace (members and guests),
  restrict the Partner Applications database to the people who actually
  score applications, and record that list.
- A check on **database sharing settings** — no public share link, no
  "anyone with the link" access, and confirm what "anonymous submissions
  enabled" exposes (submission should be write-only; submitters must not be
  able to view other rows).
- A check on **Notion integrations/connections** attached to the workspace —
  any bot or connected app with database read access is another recipient.

**Open item — access list not yet reviewed.**

### How long it lives

**Undefined.** No retention rule exists for either the Notion database or
the mailto-era submissions sitting in the `meridian@growwithguava.com` inbox.

Proposed decision point for the humans (pick one, record it, and note it in
the form's privacy text):

- Delete all applications **N months after the event** (e.g. 3 or 6 months
  after October 2026), keeping only anonymised/aggregate records
  (counts, countries, formats) for reporting; or
- Delete rejected/declined applications shortly after decision, retain
  accepted partners' records for the duration of the partnership plus a
  defined wind-down period; or
- Retain with consent for future editions (requires asking, separately).

Whichever is chosen: the same rule must be applied to the **email inbox
copies** and to any exports, not just the Notion rows.

### What the applicant is told

**Currently nothing.** The page contains no privacy notice, no controller
identity, no purpose statement, no mention of where the data goes. Before
the Notion form ships, the form page must state, at minimum:

- **Controller identity:** **Grow With Guava LLC** (ruling D6, 24 Aug —
  written confirmation on PR #1 pending; the controllership *model* question
  for counsel below remains open regardless).
- **Purpose:** evaluating activation partner proposals for HackMeridian
  2026 and contacting applicants about them.
- **Notion named as processor** (and storage location once verified), plus
  the receiving email inbox provider if the mailto path stays live in
  parallel.
- Retention period (once decided), the applicant's GDPR rights, and a
  contact point for exercising them.
- Lawful basis — wording depends on counsel's answer (see open questions).

This notice text routes through `copywriter` for wording but its content is
a merge gate for the Notion switch.

### DPA status with Notion

**Open item.** No Data Processing Addendum with Notion has been located or
verified. Notion offers a standard DPA; whether it applies automatically to
this workspace's plan tier, or must be executed, needs checking by whoever
administers the workspace. Until confirmed: open.

### Verified / open summary for this surface

Verified: what the current code collects and transmits; that no site-side
storage or third-party call exists today; that the current page tells the
applicant nothing.

Open (all must close before the Notion form ships): Notion hosting region
and residency plan check; DPA; access review and sharing settings; retention
decision; privacy notice on the form page; facilitator third-party-data
handling; lawful basis (counsel).

---

## Surface 2 — Planned newsletter capture (from the PRD)

Planned collection: **email + city**, **double opt-in**, with a **separable,
unticked consent checkbox**, plus **per-source tracking codes** that become
linkable to a person at account creation on the future platform.

No build exists yet. The following are the requirements a build must meet;
**each is a gate-for-merge** — a PR failing any of them is blocked under
this agent's veto, per the flow in CLAUDE.md.

| # | Requirement | Gate |
|---|---|---|
| N1 | Consent checkbox is **unticked by default** and **separable** — it is not bundled with submitting the form for any other purpose, not folded into a T&C acceptance, and its label states specifically what is being consented to (the newsletter) and who sends it. | **Gate-for-merge** |
| N2 | **Double opt-in actually enforced**: no address enters the send list until the confirmation link is clicked. Unconfirmed sign-ups are stored separately and **auto-deleted after a short window** (propose 7–30 days — decision needed). | **Gate-for-merge** |
| N3 | **Consent records kept**: timestamp, source page, the exact notice/checkbox text shown, and confirmation timestamp — stored in a named location, not reconstructed later. | **Gate-for-merge** |
| N4 | **Storage location named** in the PR: which system holds the list, in which region, under what DPA. "The form backend" or an unnamed ESP fails. If the platform's Supabase EU instance is the store, rules 3–6 (RLS deny-by-default, etc.) apply from day one. | **Gate-for-merge** |
| N5 | **Data minimisation**: email + city only. City's necessity is stated in the PR (regional event targeting) or city is made optional. No silent extra fields, no IP/user-agent retention beyond what the consent record and anti-abuse strictly need — and whatever is kept is listed. | **Gate-for-merge** |
| N6 | **No personal data in logs or analytics** (rule 7): the email address must not appear in server logs, error trackers, analytics events, or URL query strings (confirmation links use opaque tokens, not the address). | **Gate-for-merge** |
| N7 | **Unsubscribe works and is complete**: one-click or equivalent in every send, processed without login, and it removes/suppresses the address in the actual store — with the same withdrawal route noted at sign-up. | **Gate-for-merge** |
| N8 | **Privacy notice at the point of capture**: controller identity, purpose, processor/ESP named, retention, rights — same content bar as Surface 1. | **Gate-for-merge** |
| N9 | **Per-source tracking codes**: while unlinked to a person they are low-risk, but the PRD says they become **linkable to a person at account creation**. The build must (a) document exactly when and where linkage happens, (b) ensure the privacy notice at account creation discloses that acquisition source is joined to the account, and (c) route the linkage design through this review again before the platform ships it. A tracking code that silently becomes a per-person marketing-attribution field fails. | **Gate-for-merge** (the linkage step is a second, separate gate on the platform repo) |
| N10 | **Named human sign-off** on the PR per CLAUDE.md rule 9 — nothing touching consent merges on agent approval alone. | **Gate-for-merge** |

---

## Open questions for counsel

Questions and options only. No conclusions are drawn here (CLAUDE.md
rule 10); counsel and the humans decide.

### Q1 — Lawful basis, partner application surface

Applicants are business contacts submitting on behalf of organisations, but
names, personal emails, phone/WhatsApp numbers, and a third party's
(facilitator's) details are processed.

- **Option A — Legitimate interest** (Art. 6(1)(f)) for processing B2B
  contact data to evaluate and respond to a proposal the person initiated;
  would require a documented legitimate-interest assessment and balancing
  test.
- **Option B — Pre-contractual steps** (Art. 6(1)(b)) — the application is
  a step toward a partnership agreement; note counsel should address that
  6(1)(b) is read as applying to the data subject's own contract, which fits
  sole traders better than employees of applicant organisations.
- **Option C — Consent** (Art. 6(1)(a)) — cleanest disclosure story, but
  consent as a basis for data the applicant must supply to be considered may
  be problematic (conditionality), and withdrawal mid-review has operational
  consequences.
- Sub-question: the **facilitator's data** is supplied by someone else —
  which basis covers it, and does Art. 14 (information to be provided when
  data is not obtained from the data subject) oblige Guava to notify the
  facilitator, or does an exemption apply?

### Q2 — Lawful basis, newsletter surface

- **Option A — Consent** (Art. 6(1)(a)), which the planned double opt-in +
  unticked checkbox design presupposes; also engages ePrivacy rules on
  electronic marketing as implemented in Portugal (Lei n.º 41/2004 regime).
- **Option B — Legitimate interest / soft opt-in** for existing
  relationships — likely unavailable for a cold campaign-site capture, but
  counsel should confirm whether any soft-opt-in path exists under the
  Portuguese implementation, if only to rule it out in writing.
- Sub-question: does the **source-code-to-person linkage at account
  creation** require its own basis/notice separate from the newsletter
  consent (marketing attribution vs. newsletter delivery are different
  purposes)?

### Q3 — Retention periods

For each surface, counsel to endorse a number:

- Partner applications: options — (a) delete all N months post-event
  (3/6/12), (b) split: declined deleted promptly, accepted kept for the
  partnership term + wind-down, (c) keep with fresh consent for future
  editions. Include the email-inbox copies and travel-grant/payment records
  (which may carry their own statutory retention under Portuguese
  accounting/tax law — counsel to specify).
- Newsletter: options — (a) until unsubscribe plus a suppression-list
  remainder, (b) periodic re-permission (e.g. 24 months of inactivity),
  and the auto-delete window for unconfirmed double-opt-in records
  (7 vs. 14 vs. 30 days).

### Q4 — Controllership: Guava vs. SDF

The site is Guava-built; the campaign is "Guava Global × Stellar Development
Foundation"; travel grants are paid by Guava; conversion data flows toward
HackMeridian/SDF-adjacent systems.

- **Option A — Guava sole controller**, SDF a recipient of aggregates only
  (matches CLAUDE.md rule 6's aggregate-outward posture).
- **Option B — Joint controllers** (Art. 26) for the campaign funnel, which
  would require a joint-controllership arrangement and its essence disclosed
  to data subjects.
- **Option C — Separate/independent controllers** for their respective
  stages, with a data-sharing agreement covering any personal-data handoff.
- Whichever is chosen determines whose name goes in every privacy notice.
  The entity behind "Guava" is **Grow With Guava LLC** (ruling D6, 24 Aug;
  the notices now use it) — counsel still owns the controllership model.

### Q5 — EAA micro-enterprise exemption and this site

The European Accessibility Act (in force for services since June 2025;
Portuguese transposition via DL 82/2022) exempts **micro-enterprises**
(<10 staff and ≤€2M turnover/balance) providing services from its
obligations.

- **Option A** — Guava qualifies as a micro-enterprise and the exemption
  covers this site's forms/newsletter as parts of a service in scope; note
  the exemption is entity-based, so growth or the SDF relationship
  (whose obligations are not Guava's exemption) could change the analysis.
- **Option B** — The exemption applies to Guava but the site should meet
  WCAG 2.2 AA anyway (already a merge gate in CLAUDE.md), so the legal
  question changes nothing operationally — counsel to confirm that relying
  on the merge gate rather than formal EAA conformity documentation is
  acceptable.
- **Option C** — The site or the future participant platform falls in scope
  regardless (e.g. if characterised as e-commerce-like or as SDF's service),
  requiring the EAA's accessibility statement and documentation duties, not
  just WCAG conformance.
- Sub-question: does the answer differ between this static campaign site
  and the future participant platform?

---

*Next review trigger: any PR that adds the Notion form, any newsletter
build, or any change to the fields collected on `/partner/`.*
