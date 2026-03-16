# ARS Academy – CLAUDE.md

## Project Overview
Sales landing page for **ARS Academy's Astro Numerology Essential Course** (₹499).
Founder: **A.S. Rakuraj** | Tamil Nadu, India | Target audience: Tamil-speaking Indians.

## File Structure
```
ARS/
├── index.html     — Full landing page (10 sections)
├── styles.css     — All styles (no framework, pure CSS)
├── script.js      — Vanilla JS (FAQ, smooth scroll, carousel, animations)
├── founder.png    — Founder photo (used in trainer section)
└── CLAUDE.md      — This file
```

## Tech Stack
- **HTML5** — semantic, `lang="ta"` (Tamil)
- **CSS3** — custom properties, Grid, Flexbox, no frameworks
- **JavaScript** — vanilla only, no libraries
- **Fonts** — Google Fonts: Noto Sans Tamil + Poppins
- **Embeds** — YouTube iframes (hero video + testimonial carousel)

## Design System

### Colors (CSS variables in `:root`)
| Variable           | Value     | Usage                        |
|--------------------|-----------|------------------------------|
| `--gold`           | `#D4AF37` | Primary accent, CTAs         |
| `--gold-light`     | `#F4E4BC` | Backgrounds, highlights      |
| `--gold-dark`      | `#B8960C` | Hover states, borders        |
| `--deep-blue`      | `#1a237e` | Hero bg, headings, cards     |
| `--deep-blue-light`| `#3949ab` | Hover states                 |
| `--text-dark`      | `#1a1a2e` | Body text                    |
| `--text-muted`     | `#555`    | Secondary text               |

### Fonts
- **Noto Sans Tamil** — primary (supports Tamil script)
- **Poppins** — fallback

### Breakpoints
- Mobile: default (single column)
- Tablet+: `@media (min-width: 768px)` — two-column grids
- Desktop: `@media (min-width: 1024px)` — larger padding/font

## Page Sections (index.html)
1. **Hero** — headline, feature list, YouTube embed, CTA
2. **Transformation** — 4 benefit cards
3. **Who Is This For** — 4 audience cards
4. **Curriculum** — 9-item list, image placeholder
5. **Trainer** — A.S. Rakuraj bio + founder.png
6. **Testimonials** — 7-video carousel + 6 text testimonial cards + trust stats
7. **Pricing** — ₹499 price box (`id="enroll"`)
8. **Guarantee** — 30-day money-back
9. **FAQ** — accordion (5 items)
10. **Final CTA** — urgency section with pulse button
11. **Footer**

## JavaScript Features (script.js)
- **FAQ accordion** — one open at a time, icon rotates
- **Smooth scroll** — all `href="#..."` anchors
- **Video carousel** — 7 YouTube videos, auto-advances every 6s, pauses on hover, postMessage API stops video on slide change
- **Card stagger animations** — IntersectionObserver, 120ms delay between cards
- **Element animations** — price-box, guarantee-box, trust-stats fade in on scroll
- **Counter animation** — `.stat span` numbers count up when visible

## CSS Animations
- **Hero entrance** — `.hero-content` slides from left, `.hero-video` from right (on load)
- **CTA shimmer** — shine sweep on hover via `::before` pseudo-element
- **Card stagger** — `.anim-card` + `.visible` class (JS-applied)
- **Element fade** — `.anim-el` + `.visible` class (JS-applied)
- **Pulse** — `.pulse` class on final CTA button (infinite)
- **Shake** — `.urgency-icon` in final CTA (infinite)

## Conventions
- Always use CSS variables — never hardcode colors
- Keep JS vanilla — no jQuery, no frameworks
- Mobile-first CSS — base styles for mobile, media queries for larger screens
- YouTube embeds use `?rel=0&modestbranding=1&enablejsapi=1`
- Never add `autoplay=1` to YouTube URLs (bad UX for sales pages)
- Always ask before adding new sections or changing existing structure

## Language
Content mixes **Tamil script**, **Thanglish** (Tamil in English letters), and **English**.
Do not translate or alter Tamil/Thanglish content unless explicitly asked.
