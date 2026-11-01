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

- **Font stacks:** Source Sans 3 for body/UI and Source Serif 4 for display headings, declared in `global.css` with system fallbacks
- **Body:** `text-sm` to `text-base` (14–16px equivalent)
- **Headings:** clear section headings above body text; shared page titles scale from `text-4xl` through `text-6xl`
- **Badges:** `text-xs` with `font-medium` on rounded-full pills

## Layout

| Element    | Width                     | Notes                                                                                                                                           |
| ---------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Shell      | `max-w-7xl px-6 lg:px-12` | Standard wide section container. Text is narrowed by _measure_ (`max-w-xl/2xl`, `max-w-[Nch]`), never by shrinking the whole container          |
| Nav        | full-width                | Sticky, blurred glass; Home, separate MYP / IB DP programme menus, shared school-life links, Apply CTA                                          |
| Grid cards | 1-3 columns               | Responsive: 1 col mobile, 2 sm, 3 lg — used only for genuinely parallel items (documents, people)                                               |
| Footer     | full-width                | Dark (`stone-900`), school + IB marks, separate MYP / IB DP link groups, shared school-life/contact links, Apply CTA, MYP candidate-school note |
| Hero bands | full-width                | Homepage photo hero + gradient `PageHeader` on subpages (wide shell, hairline eyebrow, up to `text-6xl` title)                                  |

### Section layout grammar

Interior pages avoid the "one centered column" look by rotating layout families per section:

- **Asymmetric grids** — `lg:grid-cols-12` (text ~5 cols, media ~6 cols, flipped in alternate sections) or fractional splits like `lg:grid-cols-[0.52fr_1.48fr]` with a sticky left heading rail (`lg:sticky lg:top-24 self-start`).
- **Hairline rows over card walls** — sequential/editorial lists use `border-t border-stone-200` + `divide-y` rows, often with oversized ghost numerals (`text-4xl font-extrabold text-stone-300`), instead of stacks of boxed cards.
- **Full-bleed bands** — at least one section per page runs its background (`bg-stone-900`, `bg-stone-100 border-y`) edge-to-edge with content inside the shell; dark CTA/quote panels are bands, not rounded cards inside a column.
- **Section rhythm** — programme content uses `py-12 sm:py-16` with measure-constrained copy. Use larger spacing only for a deliberate overview or feature section, not as the default on every block.
- **Programme overview width** — split-hero copy fills the available text column (`w-full min-w-0`), not a nested `max-w-xl`. The MYP candidacy band also uses its available width so it does not stop artificially mid-band.

### Root locale splash (`src/pages/index.astro`)

`/` is a standalone HTML document (no `Layout.astro`, so no Tailwind) that redirects to `/en/` or `/sk/` based on the visitor's browser language. Because it can flash briefly on a slow first paint, it renders a branded splash (the "IB Gymnázium Česká" wordmark, an emerald spinner, and English/Slovensky pill links) instead of a bare white page. Styling is **inline `<style>` by necessity** (Tailwind isn't loaded here); this is the one sanctioned exception to the Tailwind-only rule. Redirect is instant (JS `location.replace` plus a `<meta refresh="0">` fallback) and the spinner respects `prefers-reduced-motion`.

### Programme-first information architecture

MYP and IB DP are separate top-level menus, not children of a global Programmes menu. Each owns its overview, subjects, core, mission, team, and policies. The DP core label is **IB DP Core**; MYP core is not CAS/TOK/EE.

- Desktop menus open on mouse hover or keyboard focus and can be toggled by click. Arrow Down enters the panel; links remain keyboard-accessible.
- Menu group headings use bold 18px text above 14px links, without uppercase micro-labels or explanatory programme-description lines. Keep candidacy information on the MYP content pages rather than in the menu.
- Below `xl`, a hamburger menu contains expandable MYP and IB DP sections; the language switcher remains visible.
- Below `sm`, the logo is paired with the compact “IB Česká” / “MYP & IB DP” wordmark. From `sm` upward, keep the full school name. Both retain the visible language switch and menu controls.
- Active states follow the programme URL. News, gallery, admissions, and search remain shared rather than being duplicated under each programme.

`ProgrammeContext.astro` adds a compact overview identity and Subjects, Team, and Policies links on programme pages. It wraps on narrow screens and marks the current section; it is not a second full dropdown menu. Shared pages do not display it. MYP uses its programme accent and DP its cyan accent.

Programme school pages use the same compact heading/spacing system as curriculum pages. DP leadership profiles are centered, with names larger than faculty names. Keep actual learning material and official candidacy wording, but omit internal source/provenance explanations from visitor-facing copy.

The MYP team page is chart-led rather than a generic hero page: `MypOrganisation.astro` owns its single `h1` and school-year line. It opts out of the context bar with `showProgrammeContext={false}` on `Layout`; do not add a second hero/title above the chart. Its official candidacy notice appears after the diagram, before contact information.

All programme routes are prefixed with `/en` or `/sk`:

| Programme | Overview and curriculum                                                                                                                                          | School sections                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| MYP       | `/myp`, `/myp/subjects`, `/myp/core/interdisciplinary-learning`, `/myp/core/approaches-to-learning`, `/myp/core/service-as-action`, `/myp/core/personal-project` | `/myp/mission`, `/myp/teachers`, `/myp/policies` |
| IB DP     | `/dp`, `/dp/subjects`, `/dp/cas`, `/dp/tok`, `/dp/ee`, `/dp/build-your-diploma`; subjects/CAS/TOK include `/[slug]` details                                      | `/dp/mission`, `/dp/teachers`, `/dp/policies`    |

The connected organisational chart belongs **only to `/myp/teachers`**; `/dp/teachers` has a separate portrait roster. Preserve actual hierarchy and class-first homeroom labels rather than flattening the chart into a role directory.

MYP remains a **candidate programme**, with text-only branding and its candidate-school disclaimer; candidacy does not guarantee authorization. DP is authorized. Its logo, authorization statement, and certificate do not confer MYP authorization and must stay on DP surfaces.

Legacy locale-prefixed `/subjects`, `/cas`, `/tok`, `/ee`, `/build-your-diploma`, `/mission`, `/teachers`, and `/policies` are HTTP 301 redirects to `/dp` equivalents (including subject/CAS/TOK details). Query strings are preserved and unsupported locales are rejected. New navigation must target programme URLs directly.

## Styling rules

- **Use Tailwind utility classes only.** No custom CSS unless absolutely unavoidable
- No inline styles except for one-off overrides
- Custom CSS goes in `src/styles/global.css` — but prefer utilities
- Tailwind 4 uses CSS-based configuration (`@import "tailwindcss"` in global.css). There is no `tailwind.config.js` file and one should not be created

## Components

Keep components reusable and small. Each `.astro` component should do one thing:

- `Layout.astro` — page shell (head, nav with mobile menu, dark footer, page scripts)
- `PageHeader.astro` — compact tone-specific hero band (48px mobile / 64px desktop vertical padding; title, concise subtitle, optional label)
- `ProgrammeContext.astro` — localized programme overview and three quick links with current-section state and natural mobile wrapping
- `LanguageSwitcher.astro` — EN/SK pill toggle that preserves the current path
- `ProgrammeOverview.astro` — DP overview template used by `/dp`; `/myp` has its own editorial overview
- `src/components/programme/` — programme-aware mission, team, and policies renderers plus bilingual school copy, generated as static pages by `src/pages/[locale]/[programme]/[section].astro`
- `src/data/myp-programme.ts` — bilingual MYP curriculum reference; `src/data/myp-organisation.ts` — MYP chart roster and hierarchy; `src/data/teachers.ts` — separate DP portrait roster
- Existing Keystatic subjects/CAS/TOK collections and storage paths stay unchanged and serve DP pages; the MYP reference pages are not new CMS collections

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
- Nav collapses to a hamburger menu below `xl`, with expandable programme sections; the language switcher stays visible
- Cards stack vertically on mobile, 2 columns on sm, 3 on lg

## Photography

School photos live in `src/assets/school/` and run through Astro's responsive image pipeline. The homepage uses `school-building.jpg` for the hero and the person-free `hallway-library.jpg` for the "What is the IB?" section.

Published IB faculty portraits live in `src/assets/teachers/` and are rendered through Astro's image pipeline on `/teachers`. The verified roster and bilingual roles live in `src/data/teachers.ts`; update that file when the [official IB team page](https://ib.gymnaziumceska.sk/about) changes.

The Team page includes `MypOrganisation.astro`, a connected, HTML/CSS organisational chart. The Head of MYP branches into coordination and procedural management, then into programme support, subject leaders and homerooms. Thin orthogonal connectors express relationships; the nodes use the site's emerald accent, sans-serif data typography and 12px corners. Below 1024px it becomes a single-column tree, with readable text and no horizontal canvas or JavaScript dependency. Do not replace it with directory tables, a generated image or source-commentary placeholders.

The September 2026 - June 2027 assignments live in `src/data/myp-organisation.ts`; UI copy lives under `teachers.organisation` in the EN/SK dictionaries. Update the period and assignments together. Unnamed roles show only their role title. Each homeroom node puts the class first, followed by its MYP year, grade and explicitly labelled teacher names. The source groups II.B and II.F with K. Nagy and J. Jimenez but does not specify individual pairings, so keep those classes and teachers together. Their full names are available in the general teacher roster; preserve initials for the other homeroom teachers until the school supplies their full names.

Chart role metadata may provide an unlocalized `href`; linked nodes render as native anchors with an arrow, hover treatment and keyboard focus. All eight subject leaders point to stable `id` fragments on `/myp/subjects`, shared by EN/SK. Four support roles point to their MYP core pages. Keep IDs stable and give targets scroll margin beneath the sticky header. Roles without real destinations remain plain text; do not invent profile pages or use JavaScript-only card clicks.

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
- **Cloud CMS config:** `cloud.project` is `ib-ceska/ib-ceska` in `keystatic.config.ts`; old GitHub App secrets belong only to the previous live deployment and must be removed after cutover.
