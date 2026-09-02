# Design decisions

## Why it looks the way it does

The site aims for a **modern, confident, IB-professional** feel: a full-photo hero, real school photography, smooth scroll-reveal animations, and animated page transitions — while keeping the content itself easy to scan. Motion is decoration, never a requirement: every animation respects `prefers-reduced-motion`, and content is fully visible without JavaScript.

## Motion & interactivity

| Effect           | Where                    | How it works                                            |
| ---------------- | ------------------------ | ------------------------------------------------------- |
| Page transitions | All navigation           | Astro `<ClientRouter />` view transitions               |
| Hero entrance    | Homepage + page headers  | `.hero-rise` CSS keyframe, staggered via `--rise-delay` |
| Ken Burns zoom   | Homepage hero photo      | `.ken-burns` slow alternate scale animation             |
| Scroll reveal    | Sections/cards site-wide | `data-reveal` + IntersectionObserver adds `.revealed`   |
| Count-up stats   | Homepage stats band      | `data-count` + IntersectionObserver, eased rAF counter  |
| Photo marquee    | Homepage gallery         | `.marquee-track` infinite CSS scroll, pauses on hover   |
| Card hover       | All cards                | border tint + shadow + `-translate-y` lift              |

Scroll-reveal hiding is gated on `html.js` (set by an inline script), so users without JavaScript see all content immediately. The reveal/counter/menu scripts re-initialise on `astro:page-load`, so they keep working after view-transition navigations.

## Colors

| Token               | Tailwind class            | Usage                           |
| ------------------- | ------------------------- | ------------------------------- |
| Primary             | `emerald-700`             | Links, brand, call-to-action    |
| Primary light       | `emerald-100/300/800`     | Badges, hover borders           |
| Background          | `stone-50`                | Page background                 |
| Card background     | `white`                   | Cards, content panels           |
| Text                | `stone-900`               | Body text                       |
| Text muted          | `stone-600`               | Descriptions, secondary text    |
| Text subtle         | `stone-400/500`           | Dates, metadata, footer         |
| Border              | `stone-200`               | Card borders, separators        |
| Amber accent        | `amber-100/800`           | TOK theme badges                |
| IB brand blue       | `ib-blue` (#004587)       | Official IB accent (footer bar) |
| IB brand blue light | `ib-blue-light` (#2FB4E9) | Official IB accent (footer bar) |

## Typography

- **Font:** Inter Variable (self-hosted via `@fontsource-variable/inter`), falling back to the system stack
- **Body:** `text-sm` to `text-base` (14–16px equivalent)
- **Headings:** `text-xl` for sections, `text-3xl` for page titles, `text-4xl` for homepage hero
- **Badges:** `text-xs` with `font-medium` on rounded-full pills

## Layout

| Element    | Width                     | Notes                                                                                                                                                  |
| ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Shell      | `max-w-7xl px-6 lg:px-12` | Standard wide section container. Text is narrowed by _measure_ (`max-w-xl/2xl`, `max-w-[Nch]`), never by shrinking the whole container                 |
| Nav        | full-width                | Sticky, blurred glass; Home link, Programmes + IB Core dropdowns, Apply CTA                                                                            |
| Grid cards | 1-3 columns               | Responsive: 1 col mobile, 2 sm, 3 lg — used only for genuinely parallel items (documents, people)                                                      |
| Footer     | full-width                | Dark (`stone-900`), IB-accent top bar, brand/mission column (school + IB marks) + grouped link columns (Programme / School life / Contact) + Apply CTA |
| Hero bands | full-width                | Homepage photo hero + gradient `PageHeader` on subpages (wide shell, hairline eyebrow, up to `text-6xl` title)                                         |

### Section layout grammar

Interior pages avoid the "one centered column" look by rotating layout families per section:

- **Asymmetric grids** — `lg:grid-cols-12` (text ~5 cols, media ~6 cols, flipped in alternate sections) or fractional splits like `lg:grid-cols-[0.52fr_1.48fr]` with a sticky left heading rail (`lg:sticky lg:top-24 self-start`).
- **Hairline rows over card walls** — sequential/editorial lists use `border-t border-stone-200` + `divide-y` rows, often with oversized ghost numerals (`text-4xl font-extrabold text-stone-300`), instead of stacks of boxed cards.
- **Full-bleed bands** — at least one section per page runs its background (`bg-stone-900`, `bg-stone-100 border-y`) edge-to-edge with content inside the shell; dark CTA/quote panels are bands, not rounded cards inside a column.
- **Varied rhythm** — section padding around `py-20 sm:py-28`, varied per page; no two adjacent sections share the same layout family.

### Root locale splash (`src/pages/index.astro`)

`/` is a standalone HTML document (no `Layout.astro`, so no Tailwind) that redirects to `/en/` or `/sk/` based on the visitor's browser language. Because it can flash briefly on a slow first paint, it renders a branded splash (the "IB Gymnázium Česká" wordmark, an emerald spinner, and English/Slovensky pill links) instead of a bare white page. Styling is **inline `<style>` by necessity** (Tailwind isn't loaded here); this is the one sanctioned exception to the Tailwind-only rule. Redirect is instant (JS `location.replace` plus a `<meta refresh="0">` fallback) and the spinner respects `prefers-reduced-motion`.

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
  - **Production (github):** Commits changes to the GitHub repository, triggering a Cloudflare Worker redeploy
- **Rendering:** Astro pages read content via the Keystatic Reader API (`src/lib/keystatic.ts`)
- **Content format:** `.mdoc` files (YAML frontmatter + Markdoc body) in `src/content/`
- **Types:** Defined in `keystatic.config.ts` using Keystatic's `fields.*` API

## Deployment

- **Target:** Cloudflare Workers with static assets
- **Domain:** `https://ib.gymnaziumceska.sk`
- **Build:** `pnpm run build`; deploy with `npx wrangler deploy`
- **Runtime:** static assets plus Worker routes for Keystatic
- **Secrets:** `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`
