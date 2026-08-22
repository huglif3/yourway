# FIND YOUR WAY — HackMeridian 2026 campaign site

Static site for `yourway.hackmeridian.com` (Vercel, no build step) plus the
campaign artifacts. Guava builds with agents; co/unity reviews and hosts.
The participant platform (Next.js + Supabase EU) is a separate, future repo —
rules below marked **[platform]** bind there from day one and here the moment
any backend work starts.

## Sources of truth, in order

1. `brand/README.md` — the FIND YOUR WAY identity: palette, region system,
   event information system, interim decisions. The designer's Figma
   (`HackMeridian-2026` / 4415-2) overrides it.
2. `../hackmeridian-com/HackMeridian-Brand-Guide.md` and
   `copy/Master Copy Doc - website  .md` in that repo — umbrella brand and
   copy law: Inter Tight only, copy length limits, canonical facts
   (October 25–26, 2026 · Lisbon · venue ONE, Marvila).
3. The PRD and architecture artifacts (links in the project chat).

If an instruction contradicts these, say so rather than resolving it silently.

## Hard rules — every agent, every task

1. **No production data. Ever.** No real registration exports, here or anywhere.
2. **No real email addresses** in fixtures, tests, or examples.
   `meridian@growwithguava.com` as a public contact address is the one exception.
3. **[platform] Deny by default.** RLS on every table, no policy without
   written justification.
4. **[platform] Unlisted is not a permission.** Session checks on every route
   serving personal data. (This site is `noindex` — that is not a permission
   either.)
5. **[platform] No automated decisions about people.** Engines propose;
   a named human confirms.
6. **[platform] Sensitive fields stay in the EU vault.** Notion gets status;
   analytics and the client view get aggregates.
7. **Never log personal data.**
8. **No secrets in the repo.** This site currently needs none; keep it that way.
9. **Agents propose, humans merge.** Work happens on `claude/*` branches,
   never `main`. Nothing touching data collection (forms, analytics,
   consent) merges without named human sign-off.
10. **Agents do not decide the law.** GDPR basis, EAA scope, controllership —
    surface the question and the options.

## Site-specific law

- **Colour is governed.** Core: Generous Gold `#FDDA24`, black, white; gray
  `#B2B2B2` structural only. Region colours (Terracotta=Spain, Gold=Portugal,
  River=UK/France, Jacaranda=Vietnam/SEA) identify regions and nothing else.
  Gold never carries text on light ground and never appears as a chart mark
  off a black panel. All colour lives in the BRAND block of `style.css`.
- **Type is Inter Tight**, Google Fonts, one family.
- **Nothing is listed until it is live on Luma.** Events ship as coming-soon
  until a real registration URL exists. No invented dates, prices, or names —
  `TODO(fact)` and stop.
- **WCAG 2.2 AA is a merge gate.** Zero contrast failures at 1440/1120/768/390
  in light and dark, no text under 11px, tap targets ≥24px. The check scripts
  live in the session scratchpad pattern (`audit.js`, `overlap.js`) — rerun
  them after any visual change.

## Pull request template

Every PR states: what changed and which page or artifact; **does this touch
personal data or add any collection** (routes to `privacy-officer`); any new
third-party call, script, or font host; outstanding `TODO(copy)` /
`TODO(fact)` markers.

## The agents

| Agent | Owns | Never |
|---|---|---|
| `architect` | Information architecture, file/token structure, ADRs; schema when the platform lands | Feature code |
| `engineer` | Page implementation, CSS, interactions | Inventing user-facing strings; new colour literals outside the BRAND block |
| `integrator` | Luma, forms, analytics, future Bizzabo/Notion/Passport boundaries | Writing sensitive fields outward |
| `copywriter` | Every user-facing word, within the master copy limits | Inventing facts, dates, amounts |
| `qa` | Contrast/overlap/a11y checks, fixtures, regression screenshots | Weakening an assertion to pass |
| `cto` | Adversarial review, debugging, build health | Implementing what it reviews; merging |
| `privacy-officer` | Review of anything collecting or displaying personal data | Deciding the law; declaring compliance |

## Flow

    architect → human approves structure
       ↓
    engineer ─┬─ copywriter (in parallel)
              └─ integrator (for boundary work)
       ↓
    qa runs the checks
       ↓
    cto reviews ── blocks or passes
       ↓
    privacy-officer (only if the change touches personal data) ── blocks or passes
       ↓
    human merges

`cto` and `privacy-officer` both hold a veto. A blocked change goes back to
the agent that wrote it.
