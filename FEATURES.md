# FEATURES

Implemented features. Production deployment is verified separately.

## Project foundation

- [x] Astro 7 hybrid mode (static prerender + Cloudflare Worker for CMS routes)
- [x] Tailwind CSS 4 via `@tailwindcss/vite` plugin (CSS-first config)
- [x] MDX integration (`@astrojs/mdx`)
- [x] Strict TypeScript (`astro/tsconfigs/strict`)
- [x] Node >= 22.12.0 engine requirement
- [x] Git + GitHub repo with topics and description

## CMS — Keystatic

- [x] `keystatic.config.ts` — 6 collections with typed schemas
- [x] `@keystatic/astro` integration — admin UI at `/keystatic/`
- [x] Keystatic Reader API — pages read from Keystatic instead of Astro collections
- [x] `src/lib/keystatic.ts` — shared reader singleton
- [x] Local storage for dev, GitHub storage for production (auto-switched)
- [x] `.mdoc` content format — 16 sample entries across all collections
- [x] Markdoc rich-text editor for long-form content (subjects, CAS, TOK, news bodies)
- [x] Select fields, date pickers, array fields with validation

## Content (6 collections)

- [x] `subjects` — title, group (1-6/core), optional secondaryGroup (interdisciplinary subjects surface in two groups), level (HL/SL), offeredLevels, description, teacher, order, syllabus body
- [x] `news` — headline, date, excerpt, author, article body
- [x] `cas` — title, date, strands (multi-select: Creativity/Activity/Service), description, learning outcomes, reflection body
- [x] `tok` — title, date, theme (12 TOK themes), summary, full essay body
- [x] `events` — title, date, endDate, time, location, description, details body; auto upcoming/past split
- [x] `testimonials` — name, role, gradYear, photo, order, featured, quote (+ SK)

## Pages (routes + detail pages + admin)

- [x] `/` — homepage with hero, stats, programmes, student benefits, gallery
- [x] `/dp/subjects` — DP-branded course catalogue: dark DP hero with dotted-leader table-of-contents index, outlined ghost numerals, scroll-spy rail with builder mini-card, grouped listing by IB group (1–6 + core), builder CTA band
- [x] `/dp/subjects/[slug]` — subject detail with rendered syllabus + meta sidebar
- [x] `/dp/cas` — strand-based listing (Creativity, Activity, Service); activities can span multiple strands and appear under each filter
- [x] `/dp/cas/[slug]` — CAS detail with reflection + multi-strand badges + learning-outcome sidebar
- [x] `/dp/tok` — photo hero, course-anatomy bento, assessment weighting panel, essay grid, and handbook band
- [x] `/dp/tok/[slug]` — dark masthead with quoted italic title, sticky theme/date rail beside a 70ch essay column, related-essay cards
- [x] `/dp/ee` — split hero, supervisor panel and reflection sessions, journey strip, resources band linking to IB and DP policies
- [x] `/news` — gazette masthead (folio line, oversized nameplate, single rule) over a 8/4 split: featured story + big-day-numeral feed with outlined year markers on the left, sticky upcoming-events panel (built from event dates ahead of the build) on the right; past events stay in the feed
- [x] `/news/[slug]` — wide masthead with oversized headline, standfirst and single rule, sticky published/author rail beside a 68ch drop-cap article column, "More news" card row
- [x] Events share the `/news` feed; event details remain at `/events/[slug]`
- [x] `/gallery` — bilingual bento-mosaic photo gallery: gapless cell-rhythm grid (orientation-aware base/tall/big tiles, deterministic packing order, width-proportional row unit, CSS-columns no-JS fallback) with full-screen lightbox (1600px variants, prev/next, keyboard + backdrop close, focus restore)
- [x] `/dp/build-your-diploma` — DP-branded interactive planner: dark DP hero with programme-model hexagon (six groups around the TOK/EE/CAS core), numbered worksheet-style group sections, live IB-rule validation, dark "Your diploma" transcript card with six fixed slots + HL target meter, mobile progress bar, anime.js micro-interactions, reduced-motion safe; promoted from `/dp` via builder CTA panel
- [x] `/admissions` — bilingual programme guidance, application steps, and direct school contact
- [x] `/dp/teachers` — separate DP leadership, teaching, and support portrait roster; `/myp/teachers` — connected MYP organisational chart only
- [x] `/myp` — bespoke bilingual MYP page: asymmetric editorial layout, hero entrance + Ken Burns, interactive global-contexts chip selector, ATL skills accordion, eight-subject-group master-detail explorer, Personal Project + Service cards, admissions band
- [x] `/dp` — bilingual DP curriculum, subject-choice, core, and admissions overview
- [x] `/{myp,dp}/mission` — programme-specific mission and vision pages; only DP displays its authorization statement and certificate, while MYP retains candidate-school wording
- [x] `/{myp,dp}/policies` — programme-specific policies and guides: MYP candidate documents and relevant shared policies are separate from DP policies, CAS/TOK handbooks, and DP parent handbooks
- [x] `404` — branded bilingual not-found page
- [x] `/keystatic/` — CMS admin UI (server-rendered, not prerendered)
- [x] Markdoc body rendering helper (`src/lib/markdoc.ts`) with EN/SK fallback
- [x] `/myp/subjects` — bilingual eight-subject-group reference, separate from DP course choices
- [x] `/myp/core/{interdisciplinary-learning,approaches-to-learning,service-as-action,personal-project}` — four bilingual MYP learning-framework pages
- [x] Programme school pages are statically generated by `src/pages/[locale]/[programme]/[section].astro` using renderers in `src/components/programme/`
- [x] Legacy locale-prefixed `/subjects` (including details), `/cas` (including details), `/tok` (including details), `/ee`, `/build-your-diploma`, `/mission`, `/teachers`, and `/policies` return HTTP 301 to their `/dp` equivalents, preserve query strings, and reject unsupported locales
- [x] Routes above are relative to `/en` or `/sk`; news, gallery, admissions, and search remain shared

## SEO & feeds

- [x] `sitemap.xml` — all locales + collection detail pages, with hreflang
- [x] `robots.txt` — disallow `/keystatic/` + `/api/`, sitemap reference
- [x] Per-page canonical + `hreflang` (en/sk/x-default) alternates
- [x] Open Graph `og:url` + `og:locale`, Twitter card meta
- [x] Localized page descriptions, normalized canonical URLs, and indexable-page robots directives
- [x] Schema.org JSON-LD for the school, website, breadcrumbs, courses, articles, events, and admissions FAQ
- [x] Search-safe 404 response metadata (`noindex`, no canonical)

## i18n (EN/SK)

- [x] Locale-prefixed routes (`/en/…`, `/sk/…`) for every page
- [x] `LanguageSwitcher` pill toggle preserving the current path
- [x] Full Slovak UI dictionary (`src/i18n/dictionaries.ts`)
- [x] Optional Slovak content fields in every Keystatic collection with English fallback
- [x] Browser-language detection on `/` (sk/cs → `/sk/`, else `/en/`)

## Layout & design

- [x] Shared `Layout.astro` with sticky nav + footer
- [x] Programme-first nav: separate top-level MYP and IB DP menus, each with overview, subjects, its own core, mission, team, and policies; DP core is labelled **IB DP Core**
- [x] Official burgundy triangle school logo (`/logo-mark.png`) supplied by the school; used in the nav, footer, schema.org metadata, and regenerated favicons
- [x] Desktop programme menus support mouse hover, click, and keyboard navigation; mobile programme sections expand independently
- [x] Programme menu group headings are larger and bolder than their links; explanatory programme-description lines are omitted on desktop and mobile.
- [x] Compact mobile header wordmark: “IB Česká” with “MYP & IB DP” beside the school logo; language and menu controls remain visible.
- [x] Compact programme context links, consistent page-header and section spacing, clearer programme-coloured headings, and tighter EN/SK curriculum copy
- [x] Homepage programme cards wrap their branding and age labels without horizontal overflow at 320px in either language
- [x] Responsive grid cards (1 → 2 → 3 columns)
- [x] Emerald primary / stone neutral color palette
- [x] Official IB brand colour tokens in `@theme` (`--color-ib-blue` #004587, `--color-ib-blue-light` #2FB4E9)
- [x] Official IB sphere mark (`/ib-logo.svg`) in the footer and What-is-IB section; official IB DP banner (`/ib-dp-logo.png`) on DP surfaces. MYP uses text-only branding while the school is awaiting authorization.
- [x] Source Serif 4 + Source Sans 3 superfamily, self-hosted, latin + latin-ext only (hand-declared `@font-face`, 284 KB shipped vs 1.1 MB from a wholesale import). Serif on `h1`/`h2`/`h3`/`blockquote`, sans for UI, labels and data
- [x] Tailwind-only CSS (animation utilities live in `global.css`)
- [x] Full-photo homepage hero with a slow one-shot settle + staggered fade-in entrance, CTAs
- [x] Count-up stats band, scroll-reveal sections, photo marquee gallery
- [x] Astro view transitions (`<ClientRouter />`) for smooth navigation
- [x] Mobile hamburger menu + active nav link states
- [x] Dark brand footer with separate MYP / IB DP programme links, shared school-life/contact links, Apply CTA, and MYP candidate-school note
- [x] Student-work homepage feature linking directly to CAS, TOK, and EE materials
- [x] School-seal favicon set (ico, 192/512 PNG, apple-touch) + PWA manifest
- [x] Language switch preserves scroll position
- [x] Overscroll background matches design (no white flash)
- [x] Compact tone-specific `PageHeader` mastheads with 48px mobile / 64px desktop vertical spacing, readable titles and measure-constrained subtitles; EE visual timeline
- [x] Programme overview hero copy fills its text column; the MYP candidacy band uses its full available width instead of wrapping at an arbitrary cap
- [x] MYP candidate-school disclaimer + correct programme ages (14–16 / 16–19)
- [x] School photography from the old Framer site (`public/images/school/`)
- [x] Accessibility: WCAG AA contrast verified across all pages in both locales, one global `:focus-visible` outline, `prefers-reduced-motion` honoured, content visible without JS
- [x] Light mode only — single theme, no dark mode (reverted)
- [x] Editorial layout pass on interior pages (mission, admissions, TOK, CAS, policies, teachers, EE, search): wide `max-w-7xl` shells with measure-constrained text, asymmetric 12-col/fractional grids, sticky heading rails, ghost-numeral hairline rows, full-bleed dark/neutral bands; recomposed `PageHeader` (hairline eyebrow, larger display title)

## Sample content

- [x] 12 subjects across all 6 IB groups (incl. German B, Slovak A: Literature, Language A: Literature SSST SL, and ESS shown under both Group 3 & Group 4) — each with a full rendered syllabus body (overview, assessment table, IA detail)
- [x] 4 CAS entries (incl. Daffodil Day 2026, a real multi-strand fundraising project) — each with a reflection mapped to learning outcomes
- [x] 2 TOK essays — each with a knowledge question, full essay, and discussion prompts
- [x] 2 news articles — with full article bodies
- [x] Search page (`/[locale]/search`) — build-time index of 5 public Keystatic collections (testimonials excluded until published), client-side vanilla-JS filtering (no dependency), bilingual, results grouped by type with counts. Nav link hidden (page accessible by URL).
- [x] News + Events merged into unified `/news` feed — chronological stream of articles and events with type badges. `/events` page removed; events Keystatic collection retained.
- [x] Bilingual school resources in `src/data/documents.ts`; programme policies pages select relevant documents, DP parent handbooks also appear on admissions, and only `/dp/mission` embeds the authorization certificate
- [x] News: 2026/27 prospectus published as 4 web-optimized flyer pages, and the S.A.V.E. Ambassador diploma congratulation
- [x] IB team profile for English B teacher Katarína Nagy, with her supplied portrait
- [x] IB team profile for German B teacher Vanda Cvrkalová, with her supplied portrait and Slovak subject label
- [x] Connected HTML/CSS MYP organisation chart only on `/myp/teachers` (September 2026 - June 2027), backed by `src/data/myp-organisation.ts`; leadership branches, programme support, eight subject groups and explicit class/year/teacher homeroom nodes in EN/SK; single-column tree on mobile
- [x] Chart subject-leader cards link to all eight localized MYP subject sections; ID, ATL, service and personal-project cards open their core pages, with visible link arrows, hover states and keyboard focus
- [x] Chart-led MYP team page: one heading and period, no duplicate hero or secondary navigation; candidacy notice follows the chart
- [x] MYP bilingual curriculum reference data lives in `src/data/myp-programme.ts`; DP subjects/CAS/TOK retain their existing Keystatic collections and storage paths

## Deployment

- [x] Keystatic Cloud production CMS (`ib-ceska/ib-ceska`) is deployed; the owner confirmed editing on `workers.dev`. The school-hostname login/Save path still needs an authenticated check.
- [x] Cloudflare Workers deployment at `ib.gymnaziumceska.sk` via the `morumori.com` Cloudflare for SaaS zone; originless fallback, Worker routing, and automatic HTTP-validated TLS are active. The zone routes preserve the studio site and analytics.

## DX & tooling

- [x] Prettier (single formatter, incl. `.astro` via `prettier-plugin-astro` + native `.mdx`)
- [x] Biome linter (formatter disabled; `noExplicitAny` off for Keystatic types)
- [x] `astro sync` pre-build hook (`prebuild` script)
- [x] husky + lint-staged pre-commit (Prettier + Biome on staged files, then `astro check`)

## Documentation

- [x] `README.md` — badges, quick start, stack, collection overview, deploy section
- [x] Lean remote repository — local AI/editor files and duplicate source documents excluded from Git
- [x] `humans/README.md` — onboarding for non-technical collaborators
- [x] `humans/CONTENT.md` — per-collection field reference, editor workflow
- [x] `humans/DESIGN.md` — design tokens, layout rules, CMS architecture
- [x] `humans/DEPLOY.md` — hosting, build config, auto-deploy, troubleshooting
- [x] `humans/HUMANTODO.md` — tasks for human collaborators
- [x] `TODO.md` — AI task backlog
- [x] `FEATURES.md` — this file
