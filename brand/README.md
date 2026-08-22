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

1080 × 1080. Artwork fills the top ~72%; a black information bar runs across
the bottom ~28% carrying items 01–05. The region colour and the knocked-out
wordmark fragment live in the artwork; all copy sits on the black bar.

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

`pieces/` holds 20 PDFs, `pieces/preview/` a 720px PNG of each.

**Artwork only** — 29 · 30 · 31 · 32 · 33 · 35 · 36 · 37 · 38 · 39
**Full event templates** — 41 · 42 · 43 · 44 · 45 · 47 · 48 · 49 · 50 · 51

| Piece | Fragment | Region | Piece | Fragment | Region |
| --- | --- | --- | --- | --- | --- |
| 29 | M | Gold | 41 | — | Gold |
| 30 | MER | Terracotta | 42 | M | Black |
| 31 | RI | Jacaranda | 43 | — | Terracotta |
| 32 | DI | Black | 44 | MER | Gold |
| 33 | IA | River | 45 | — | Jacaranda |
| 35 | M | Black | 47 | — | River |
| 36 | MER | Gold | 48 | IA | Jacaranda |
| 37 | RI | River | 49 | — | Black |
| 38 | IA | Jacaranda | 50 | DI | White |
| 39 | DI | White | 51 | — | White |

Not delivered: 34, 40, 46.

## Open questions

1. **Typeface.** Text in the PDFs is converted to outlines (Type3), so the
   family name is not recoverable from the files. The cover wordmark is heavy
   and tight; section headings are a light, wide grotesque. Need the family
   and how it is licensed for web — self-hosted, Adobe Fonts, or a Google
   Fonts substitute.
2. **Spain's region colour.** Spain is the only live route and needs one of
   the six assigned.
3. **Date conflict.** The guide's Destination card reads
   *HackMeridian 2026 · Oct 25–26 · ONE16*. The Activation Partner Brief says
   *October 25–27, 2026*, which is what the partner page currently states.
   `ONE16` looks like a venue and does not appear in the brief.
4. **Logo.** `assets/event-icon.png` is the site's only image asset and is
   still the old mark. The templates use an "M" chevron in gold plus a play
   triangle. Need those as web assets if they are to ship.
5. **Missing pieces** 34, 40, 46 — intentional gaps or still to come?

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
