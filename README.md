# 2026 IEEE NEPCON — Multipage Website

A self-contained static website for the 2026 IEEE NEPCON (International Signature
Conference of the **IEEE Nepal Section**). Kathmandu, Nepal · December 11–13, 2026.

Open `index.html` in a browser to view. Host anywhere static (GitHub Pages,
Netlify, any web server) — no build step required.

## Pages
| File | Page |
|------|------|
| `index.html` | Home — hero, countdown, about, tracks, dates, technical co-sponsor |
| `call-for-papers.html` | Call for Papers — 8 tracks + how to submit |
| `important-dates.html` | Important Dates — auto-status timeline |
| `committee.html` | Committee — chairs + 26 TPC members |
| `speakers.html` | Speakers — "to be announced" |
| `registration.html` | Registration — fees, **no kit for online presenters**, **non-refundable** |
| `venue.html` | Venue & Kathmandu |
| `ieee-policy.html` | IEEE author obligations & publication policy |
| `contact.html` | Contact |
| `privacy.html` · `terms.html` · `refund.html` | Legal policies |

Shared chrome (header, nav, footer, countdown, timeline) lives in
`assets/site.js`; all styling is in `assets/style.css`. Each page sets
`<body data-page="…">` to highlight the active nav item.

## IEEE brand compliance
- **Colors:** IEEE Blue `#00629B` (primary), IEEE Dark Blue `#002855`, and the
  IEEE-approved red `#BA0C2F` accent. No off-brand colors.
- **Type:** Open Sans (IEEE's recommended web font), 16px base, 1.5+ line-height.
- **IEEE logo — important:** the IEEE Master Brand ("kite" + I‑E‑E‑E wordmark)
  **must not be recreated, redrawn, recolored, or altered**. This site does **not**
  fake it. The conference wordmark (Himalaya mark + "NEPCON 2026") is the
  conference's own identity and is safe to use.
  - **Official IEEE logo (in place):** the official artwork lives at
    **`assets/ieee-logo.svg`** and appears automatically in **four places**: the
    **header** (co-branding, next to the NEPCON wordmark), the home **Technical
    Co-Sponsor** section, the **footer**, and the **CFP poster**. To replace it,
    overwrite that file (keep the same name). If the file is ever missing, a
    compliant **text placeholder** (the letters "IEEE") shows — never a redrawn
    kite. Reproduce the logo only in IEEE blue/black/white, keep ½‑x clear space,
    and never below 100 × 33 px.

## Real data already filled in
- **Submission:** ConfConnects — `app.confconnects.com/conference/m8BpmCrWuCTHCgJbGHs0`
- **Dates:** submission 15 Jul · notification 15 Sep · camera-ready 15 Oct ·
  registration 20 Oct · conference 11–13 Dec 2026
- **Fees:** IEEE 125 / late 150 · Non-IEEE 150 / late 200 (USD; indicative NPR)
- **Committee:** real chairs + 26 TPC members
- **Tracks:** 8 official topic areas

## Still to add
- Official **IEEE / IEEE Nepal Section logo** file (see above)
- Committee **photos** (replace the placeholder avatars)
- **IEEE paper template** link and **page limit** (marked in Call for Papers)
- Official **conference email** (Contact page) and **exact venue** (Venue page)
- Confirm fee **currency** (shown as USD) and legal **policy** wording
