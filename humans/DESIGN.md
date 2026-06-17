# Design decisions

## Why it looks the way it does

The site aims for a **modern, confident, IB-professional** feel: a full-photo hero, real school photography, smooth scroll-reveal animations, and animated page transitions — while keeping the content itself easy to scan. Motion is decoration, never a requirement: every animation respects `prefers-reduced-motion`, and content is fully visible without JavaScript.

## Motion & interactivity

| Effect            | Where                          | How it works                                              |
| ----------------- | ------------------------------ | --------------------------------------------------------- |
| Page transitions  | All navigation                 | Astro `<ClientRouter />` view transitions                 |
| Hero entrance     | Homepage + page headers        | `.hero-rise` CSS keyframe, staggered via `--rise-delay`   |
| Ken Burns zoom    | Homepage hero photo            | `.ken-burns` slow alternate scale animation               |
| Scroll reveal     | Sections/cards site-wide       | `data-reveal` + IntersectionObserver adds `.revealed`     |
| Count-up stats    | Homepage stats band            | `data-count` + IntersectionObserver, eased rAF counter    |
| Photo marquee     | Homepage gallery               | `.marquee-track` infinite CSS scroll, pauses on hover     |
| Card hover        | All cards                      | border tint + shadow + `-translate-y` lift                |

Scroll-reveal hiding is gated on `html.js` (set by an inline script), so users without JavaScript see all content immediately. The reveal/counter/menu scripts re-initialise on `astro:page-load`, so they keep working after view-transition navigations.

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
| IB brand blue     | `ib-blue` (#004587) | Official IB accent (footer bar) |
| IB brand blue light | `ib-blue-light` (#2FB4E9) | Official IB accent (footer bar) |

## Typography

- **Font:** Inter Variable (self-hosted via `@fontsource-variable/inter`), falling back to the system stack
- **Body:** `text-sm` to `text-base` (14–16px equivalent)
- **Headings:** `text-xl` for sections, `text-3xl` for page titles, `text-4xl` for homepage hero
- **Badges:** `text-xs` with `font-medium` on rounded-full pills

## Layout

| Element    | Width       | Notes                                    |
| ---------- | ----------- | ---------------------------------------- |
| Container  | `max-w-5xl` | 1024px max, centered, 16px padding       |
| Nav        | full-width  | Sticky, blurred glass; Home link, Programmes + IB Core dropdowns, Apply CTA |
| Grid cards | 1-3 columns | Responsive: 1 col mobile, 2 sm, 3 lg     |
| Footer     | full-width  | Dark (`stone-900`), IB-accent top bar, brand/mission column (school + IB marks) + grouped link columns (Programme / School life / Contact) + Apply CTA |
| Hero bands | full-width  | Homepage photo hero + gradient `PageHeader` on subpages |

## Styling rules

- **Use Tailwind utility classes only.** No custom CSS unless absolutely unavoidable
- No inline styles except for one-off overrides
- Custom CSS goes in `src/styles/global.css` — but prefer utilities
- Tailwind 4 uses CSS-based configuration (`@import "tailwindcss"` in global.css). There is no `tailwind.config.js` file and one should not be created

## Components

Keep components reusable and small. Each `.astro` component should do one thing:
- `Layout.astro` — page shell (head, nav with mobile menu, dark footer, page scripts)
- `PageHeader.astro` — gradient hero band for subpages (title, subtitle, label)
- `LanguageSwitcher.astro` — EN/SK pill toggle that preserves the current path
- `ProgrammeOverview.astro` — full programme-page template (hero, principles, curriculum, admissions CTA; amber tone for MYP, emerald for DP) used by `/myp` and `/dp`
- Future components can be added under `src/components/`

## Search metadata

`Layout.astro` owns the shared search and social metadata so every public page stays consistent:

- canonical URLs always use the same trailing-slash format as `sitemap.xml`
- English and Slovak routes link to each other with `hreflang`
- page titles, descriptions, Open Graph, and Twitter cards come from localized page content
- JSON-LD describes the school, website, current page, and breadcrumb trail

Pages add more specific schema where useful: subjects are `Course` entries, news/CAS/TOK detail pages are articles, the events page publishes `Event` entries, and admissions exposes its FAQ. Keep `sitemap.xml.ts` updated whenever a new static route is added. Error pages must stay `noindex`.

## Icons and assets

- **Favicon:** `public/favicon.svg` (vector) + `public/favicon.ico` (fallback)
- **Other assets:** Place in `public/` for direct URL access, or `src/assets/` for imported assets
- **CMS images:** Uploaded via Keystatic's rich text editor, stored in `public/images/`

## Responsive behaviour

- Mobile-first: base styles target small screens, breakpoints add columns/layout
- Nav collapses to a hamburger menu below `md`; the language switcher stays visible
- Cards stack vertically on mobile, 2 columns on sm, 3 on lg

## Photography

School photos live in `public/images/school/` (sourced from the previous Framer website, resized to ≤1920px). Used on the homepage hero (`school-building.jpg`), the "What is the IB?" section (`students-reading.jpg`), and the gallery marquee.

Published IB faculty portraits live in `src/assets/teachers/` and are rendered through Astro's image pipeline on `/teachers`. The verified roster and bilingual roles live in `src/data/teachers.ts`; update that file when the [official IB team page](https://ib.gymnaziumceska.sk/about) changes.

## CMS architecture

The site uses **Keystatic CMS** for content management:

- **Admin panel** at `/keystatic/` — visual editor with no coding required
- **Storage:**
  - **Dev (local):** Writes to `.mdoc` files directly on disk
  - **Production (github):** Commits changes to the GitHub repository, triggering Coolify redeploy
- **Rendering:** Astro pages read content via the Keystatic Reader API (`src/lib/keystatic.ts`)
- **Content format:** `.mdoc` files (YAML frontmatter + Markdoc body) in `src/content/`
- **Types:** Defined in `keystatic.config.ts` using Keystatic's `fields.*` API

## Deployment

- **Target:** Coolify on VPS
- **Domain:** `https://ib.gymnaziumceska.sk`
- **Build:** `npm run build` produces `dist/client/` (static pages) + `dist/server/` (Node server)
- **Start:** `node dist/server/entry.mjs` on port 4321
- **Env vars:** `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET` (for GitHub OAuth in production)
