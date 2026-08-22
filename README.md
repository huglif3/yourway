# Find Your Way

Standalone static site for `yourway.hackmeridian.com`.

## Routes

- `/` -> landing page
- `/partner` -> partner application page

## Files

- `index.html`
- `partner/index.html`
- `style.css`
- `assets/event-icon.png`

## Brand

The entire visual identity lives in one block: the `BRAND` section at the top
of `style.css` (`:root`). Every colour on both pages resolves back to it —
there are no colour literals anywhere else in the stylesheet.

To change the brand, edit that block only. The `*-rgb` channel tokens back the
translucent surfaces, so update a colour and its matching channel together:

```css
--brand-blue: #39aef3;
--brand-blue-rgb: 57 174 243;   /* same colour, space-separated channels */
```

`--brand-orange-ink` is a darker cast of the brand orange used for text on
light backgrounds, where the full-strength orange only reaches 2.6:1. Keep an
equivalent when swapping the palette.

Both pages are checked against WCAG AA. After changing the brand, re-check
contrast — a new palette will not inherit the old one's guarantees.

## Deploy

Deploy as a static site on Vercel.
