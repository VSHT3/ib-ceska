# Design decisions

## Why it looks the way it does

The design is intentionally minimal. The IB website is an information resource — students, parents, and teachers come here to find specific facts about subjects, deadlines, and activities. Decoration is kept to a minimum so content is easy to scan and find.

## Colors

| Token             | Tailwind class      | Usage                          |
| ----------------- | ------------------- | ------------------------------ |
| Primary           | `emerald-700`       | Links, brand, call-to-action   |
| Primary light     | `emerald-100/300/800` | Badges, hover borders         |
| Background        | `stone-50`          | Page background                |
| Card background   | `white`             | Cards, content panels          |
| Text              | `stone-900`         | Body text                      |
| Text muted        | `stone-600`         | Descriptions, secondary text   |
| Text subtle       | `stone-400/500`     | Dates, metadata, footer        |
| Border            | `stone-200`         | Card borders, separators       |
| Amber accent      | `amber-100/800`     | TOK theme badges               |

## Typography

- **Font:** System font stack (`font-sans`) — no external webfonts
- **Body:** `text-sm` to `text-base` (14–16px equivalent)
- **Headings:** `text-xl` for sections, `text-3xl` for page titles, `text-4xl` for homepage hero
- **Badges:** `text-xs` with `font-medium` on rounded-full pills

## Layout

| Element    | Width       | Notes                                    |
| ---------- | ----------- | ---------------------------------------- |
| Container  | `max-w-5xl` | 1024px max, centered, 16px padding       |
| Nav        | full-width  | Sticky, blurred glass background          |
| Grid cards | 1-3 columns | Responsive: 1 col mobile, 2 sm, 3 lg     |
| Footer     | full-width  | Centered text, `mt-16` spacing from body |

## Styling rules

- **Use Tailwind utility classes only.** No custom CSS unless absolutely unavoidable
- No inline styles except for one-off overrides
- Custom CSS goes in `src/styles/global.css` — but prefer utilities
- Tailwind 4 uses CSS-based configuration (`@import "tailwindcss"` in global.css). There is no `tailwind.config.js` file and one should not be created

## Components

Keep components reusable and small. Each `.astro` component should do one thing:
- `Layout.astro` — page shell (head, nav, footer)
- Future components can be added under `src/components/`

## Icons and assets

- **Favicon:** `public/favicon.svg` (vector) + `public/favicon.ico` (fallback)
- **Other assets:** Place in `public/` for direct URL access, or `src/assets/` for imported assets
- **No external icon libraries** unless specifically needed

## Responsive behaviour

- Mobile-first: base styles target small screens, breakpoints add columns/layout
- Nav stays horizontal (no hamburger yet — add if content grows)
- Cards stack vertically on mobile, 2 columns on sm, 3 on lg
