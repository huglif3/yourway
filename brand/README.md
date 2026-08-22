# YOUR WAY — brand working notes

Working material for the 2026 identity transition. **Not deployed** — see
`/.vercelignore`. Source of truth is the designer's Figma
(`HackMeridian-2026`, node `4415-2`); this folder is what we could extract
from it plus the delivered assets.

## Status

The site has **not** been re-branded yet. `style.css` still carries the old
palette. Everything below is recorded, not applied.

## Colour

Verified two ways: read off the guide's Color page, and sampled from the
delivered piece PDFs. The guide hexes are authoritative — sampled values sit
within ±1 per channel, which is PDF colour conversion, not a discrepancy.

| Token | Name | Hex | Sampled | Role |
| --- | --- | --- | --- | --- |
| `color/generous-gold` | Generous Gold · R01 | `#FDDA24` | `#FDDA23` | Anchors the master identity |
| `color/black` | Black · R05 | `#000000` | `#000000` | Core + region |
| `color/white` | White · R06 | `#FFFFFF` | `#FFFFFF` | Core + region |
| `color/gray` | Gray · Neutral | `#B2B2B2` | — | **Structural only, never a region** |
| — | Jacaranda · R02 | `#8A7FCC` | `#897ECC` | Region |
| — | River · R03 | `#4F98BF` | `#4F97BF` | Region |
| — | Terracotta · R04 | `#D45C39` | `#D45B38` | Region |

Six region colours. One colour per region, held consistent across every event
in that region.

### Contrast constraint

Generous Gold is ~1.4:1 against white — it cannot carry text on a light
ground. The guide pairs gold with black throughout, and the event templates
put white text on black rather than anything on gold. Any gold surface on the
site needs black text.

## Campaign system

Every event is a **numbered crop** of one continuous composition. Colour
identifies the region, the piece number identifies the event, and the full
image — the MERIDIAN wordmark over Lisbon photography — only resolves once the
series is assembled.

Region → Piece → Puzzle → Destination.

**Image cues:** Learning (sky, sun, river, light, natural systems) · Location
(terrain, architecture, streets, infrastructure) · People (hands, groups,
motion, partial bodies; collective energy, no identifiable portraits).

## Event information system

Fixed order, taken from the guide and confirmed against the delivered
templates:

```
01  IDENTIFIER         YOUR WAY 2026 · RXX · PXX/YY · FORMAT · TRACK
02  EVENT TITLE        One clear promise. Maximum two lines.
03  OPERATIONAL LINE   DD MMM YYYY · HH:MM TZ · CITY · VENUE
04  ACTION             REGISTER FOR HACKMERIDIAN     (one CTA only)
05  PL                 Partner logo
```

The guide's Event Information page writes the operational line as
`DD MMM YYYY · 24H TIME · TIMEZONE · CITY · VENUE.`; the templates render it
as `DD MMM YYYY · HH:MM TZ · CITY · VENUE`. Same fields, tighter notation.

**Do:** copy off the artwork · one region colour · brand + partner lockups ·
one action.
**Don't:** wordmark fragment as an event code · colour change mid-series ·
detached masters · a second CTA.

### Template layout

1080 × 1080. A black information bar runs the full width of one long edge —
280pt, ~26% — carrying items 01–05; artwork takes the remaining ~74%. Which
edge depends on the piece (see *Two bar positions* below). The region colour
and the knocked-out wordmark fragment live in the artwork; all copy sits on
the black bar, never over the image.

Type scale measured on the 1080pt canvas:

| Element | Size | % of canvas |
| --- | --- | --- |
| Wordmark fragment | 1253.9 pt | oversized, cropped by the frame |
| Event title | 48 pt | 4.44% |
| `REGISTER FOR HACKMERIDIAN` | 18 pt | 1.67% |
| Identifier / operational line | 14 pt | 1.30% |
| `PL` | 12 pt | 1.11% |

Identifier and operational lines are set in caps with wide letterspacing; the
event title is a light weight; the CTA is bold.

## Delivered pieces

`pieces/` holds 24 PDFs (29–52, no gaps), `pieces/preview/` a 720px PNG of
each.

**12 artwork masters** (29–40) and **12 event templates** (41–52) — six
regions, two variants each, in both kinds.

| Piece | Fragment | Region | | Piece | Fragment | Region |
| --- | --- | --- | --- | --- | --- | --- |
| 29 | M | Gold R01 | | 41 | — | Gold R01 |
| 30 | MER | Terracotta R04 | | 42 | M | Black R05 |
| 31 | RI | Jacaranda R02 | | 43 | — | Terracotta R04 |
| 32 | DI | Black R05 | | 44 | MER | Gold R01 |
| 33 | IA | River R03 | | 45 | — | Jacaranda R02 |
| 34 | AN | White R06 | | 46 | RI | River R03 |
| 35 | M | Black R05 | | 47 | — | River R03 |
| 36 | MER | Gold R01 | | 48 | IA | Jacaranda R02 |
| 37 | RI | River R03 | | 49 | — | Black R05 |
| 38 | IA | Jacaranda R02 | | 50 | DI | White R06 |
| 39 | DI | White R06 | | 51 | — | White R06 |
| 40 | AN | Terracotta R04 | | 52 | AN | Terracotta R04 |

Artwork sets 29–34 and 35–40 each cover all six regions. The templates pair
across their two sets, giving two per region: Gold 41/44, Jacaranda 45/48,
River 46/47, Terracotta 43/52, Black 42/49, White 50/51.

### The fragment is not an event code

Six wordmark fragments — `M · MER · RI · DI · IA · AN` — spell MERIDIAN. The
same fragment appears in **different regions** across sets: `M` is Gold in
piece 29 and Black in piece 35; `MER` is Terracotta in 30 and Gold in 36.

So the fragment marks crop position only. Region is carried by colour and the
event by its piece number — which is exactly why the guide says *don't use the
wordmark fragment as an event code*. The delivery bears the rule out.

### Two bar positions, alternating

Every template puts the black information bar on one long edge, 280pt of 1080
(~26%), with the artwork taking the rest. It alternates strictly by piece
number:

- **Odd pieces — bar at the top.** Copy begins 56pt from the top edge.
- **Even pieces — bar at the bottom.** Copy begins 836pt down.

Holds across all twelve templates without exception, so a region's two
variants always offer one of each.

## Open questions

1. **Typeface.** Text in the PDFs is converted to outlines (Type3), so the
   family name is not recoverable from the files. The cover wordmark is heavy
   and tight; section headings are a light, wide grotesque. Need the family
   and how it is licensed for web — self-hosted, Adobe Fonts, or a Google
   Fonts substitute.
2. **Spain's region colour.** Spain is the only live route and needs one of
   the six assigned.
3. ~~**Date conflict.**~~ **Resolved** — see Schedule below. `ONE16` still
   looks like a venue and appears nowhere in the brief; confirm it.
4. **Logo.** `assets/event-icon.png` is the site's only image asset and is
   still the old mark. The templates use an "M" chevron in gold plus a play
   triangle. Need those as web assets if they are to ship.
5. **Region 06 is White.** On a white page the artwork has no edge of its
   own — piece 51 relies entirely on the black bar and the photographic
   knockout for definition. If White is used on the site, those surfaces need
   a border or an off-white ground to hold their shape.

## Schedule

Confirmed by the team, and it supersedes the apparent conflict between the
guide and the brief — they were describing different things.

| Date | What | Who |
| --- | --- | --- |
| **Oct 25–26** | HackMeridian — the hackathon itself | All participants |
| **Oct 27** | Suggested extra day, learning sessions | Optional; aimed at grantees |
| **Oct 28** | Meridian day 1 | **Mandatory for grantees** |
| **Oct 29** | Meridian day 2 | Recommended |

So the guide's *Oct 25–26* is the hackathon proper, and the brief's
*October 25–27* folds in the suggested third day. Both are right about
different spans — copy should say which it means rather than give a bare
range.

## Conflicts with the current site

Recorded now so they are not discovered mid-implementation.

- **The event board breaks the region rule.** It renders each Spain stop in a
  different colour (blue, pink, coral, lime, black). The system says one
  colour identifies a region and forbids changing colour mid-series. Spain
  should be a single region colour, with the piece number differentiating
  events.
- **The hero runs two CTAs** ("Find an event" / "Host an activation") against
  a one-action rule. The rule is written for event pieces; whether it governs
  the site hero is a call for the team.
- **The whole current palette is retired.** Lime, pink, blue, orange and coral
  have no counterpart in the new system. The old yellow `#F8D423` is close to
  Generous Gold `#FDDA24` but is not the same colour.
