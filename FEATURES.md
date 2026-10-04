# FEATURES

Implemented and shipped.

## Project foundation

- [x] Astro 7 hybrid mode (static prerender + Cloudflare Worker for CMS routes)
- [x] Tailwind CSS 4 via `@tailwindcss/vite` plugin (CSS-first config)
- [x] MDX integration (`@astrojs/mdx`)
- [x] Strict TypeScript (`astro/tsconfigs/strict`)
- [x] Node >= 22.12.0 engine requirement
- [x] Git + GitHub repo with topics and description

## CMS — Keystatic

- [x] `keystatic.config.ts` — 12 collections with typed schemas
- [x] `@keystatic/astro` integration — admin UI at `/keystatic/`
- [x] Keystatic Reader API — pages read from Keystatic instead of Astro collections
- [x] `src/lib/keystatic.ts` — shared reader singleton
- [x] Local storage for dev, GitHub storage for production (auto-switched)
- [x] `.mdoc` content format — 16 sample entries across all collections
- [x] Markdoc rich-text editor for long-form content (subjects, CAS, TOK, news bodies)
- [x] Select fields, date pickers, array fields with validation

## Content (12 collections)

- [x] `subjects` — title, group (1-6/core), optional secondaryGroup (interdisciplinary subjects surface in two groups), level (HL/SL), offeredLevels, description, teacher, order, syllabus body
- [x] `news` — headline, date, excerpt, author, article body
- [x] `cas` — title, date, strands (multi-select: Creativity/Activity/Service), description, learning outcomes, reflection body
- [x] `tok` — title, date, theme (12 TOK themes), summary, full essay body
- [x] `events` — title, date, endDate, time, location, description, details body; auto upcoming/past split
- [x] `testimonials` — name, role, gradYear, photo, order, featured, quote (+ SK)
- [x] `team` — shared person name/portrait, independent MYP and DP publication, leadership, ordering, teaching areas, responsibilities, and Slovak list fallback; initial roster migrated to JSON
- [x] `mypSubjects` — eight-group MYP taxonomy, school-year coverage, Mathematics-only EL metadata, optional teacher/syllabus, EN/SK fallback; two confirmed Mathematics offerings seeded in JSON
- [x] Draft-first CMS collections: `resources` (policies/guides, EN/SK files), `galleryAlbums` (photos, captions, consent), `assessments` (programme/class/subject/deadlines), and `vacancies` (job details/application contacts); public-page integration pending
- [x] News and Events programme tagging: unclassified, MYP, DP, or both; existing entries are not assigned by inference

## Pages (routes + detail pages + admin)

- [x] `/` — homepage with hero, stats, programmes, student benefits, gallery
- [x] `/dp/subjects` — DP-owned course catalogue: dark DP hero with dotted-leader table-of-contents index, outlined ghost numerals, scroll-spy rail with builder mini-card, grouped listing by IB group (1–6 + core), builder CTA band; legacy `/subjects` redirects here
- [x] `/dp/subjects/[slug]` — subject detail with rendered syllabus + meta sidebar; migrated teacher/search links and course metadata, with HTTP 301 redirects from legacy subject URLs
- [x] `/myp/subjects` and `/myp/subjects/[slug]` — bilingual MYP catalogue and course pages; Mathematics for MYP 3 and Mathematics EL for MYP 4–5, no HL/SL controls, indexed in search and sitemap
- [x] `/cas` — strand-based listing (Creativity, Activity, Service); activities can span multiple strands and appear under each filter
- [x] `/cas/[slug]` — CAS detail with reflection + multi-strand badges + learning-outcome sidebar
- [x] `/tok` — photo hero (classroom behind a left-to-right scrim, central question anchored bottom-right), course-anatomy bento (emerald core-theme tile, numbered optional themes, area-of-knowledge chips, 100 h / 3 pt figures), assessment panel whose column widths carry the ⅓ exhibition / ⅔ essay weighting, essay card grid, handbook band
- [x] `/tok/[slug]` — dark masthead with quoted italic title, sticky theme/date rail beside a 70ch essay column, related-essay cards
- [x] `/ee` — full-bleed split hero (copy + four IB facts left, library photograph to the edge right), sticky "what it is" column beside supervisor panel and numbered reflection sessions, five-cell hairline journey strip, dark resources band (IB page, academic integrity policy, policies index)
- [x] `/news` — gazette masthead (folio line, oversized nameplate, single rule) over a 8/4 split: featured story + big-day-numeral feed with outlined year markers on the left, sticky upcoming-events panel (built from event dates ahead of the build) on the right; past events stay in the feed
- [x] `/news/[slug]` — wide masthead with oversized headline, standfirst and single rule, sticky published/author rail beside a 68ch drop-cap article column, "More news" card row
- [x] `/events` — calendar page, auto-split into upcoming/past
- [x] `/gallery` — bilingual bento-mosaic photo gallery: gapless cell-rhythm grid (orientation-aware base/tall/big tiles, deterministic packing order, width-proportional row unit, CSS-columns no-JS fallback) with full-screen lightbox (1600px variants, prev/next, keyboard + backdrop close, focus restore)
- [x] `/build-your-diploma` — DP-branded interactive planner: dark DP hero with programme-model hexagon (six groups around the TOK/EE/CAS core), numbered worksheet-style group sections, live IB-rule validation, dark "Your diploma" transcript card with six fixed slots + HL target meter, mobile progress bar, anime.js micro-interactions, reduced-motion safe; promoted from `/dp` via builder CTA panel
- [x] `/admissions` — bilingual programme guidance, application steps, and direct school contact
- [x] `/dp/team` and `/myp/team` — separate bilingual CMS-editable teams; current DP roster preserved, confirmed MYP leadership seeded, portraitless published profiles show initials; legacy `/teachers` redirects to DP team
- [x] `/myp` — bespoke bilingual MYP page: asymmetric editorial layout, hero entrance + Ken Burns, interactive global-contexts chip selector, ATL skills accordion, eight-subject-group master-detail explorer, Personal Project + Service cards, admissions band
- [x] `/dp` — bilingual DP curriculum, subject-choice, core, and admissions overview
- [x] `/mission` — IB mission statement, school mission and vision, authorized-IB-World-School statement with the IB Certificate of Authorization embedded on the page
- [x] `/policies` — "Policies and guides": the five IB school policies, CAS + TOK handbooks, parent handbook (EN + SK), cross-links to admissions and mission
- [x] `404` — branded bilingual not-found page
- [x] `/keystatic/` — CMS admin UI (server-rendered, not prerendered)
- [x] Markdoc body rendering helper (`src/lib/markdoc.ts`) with EN/SK fallback

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
- [x] Nav: Home, separate MYP and IB DP dropdowns, Vision and mission, and Apply; each programme menu includes Home, Subjects, Team, Policies and guides, News, Gallery, and Admissions, with MYP projects/parent guides and DP core/planner inside their respective menus; mobile uses native expandable sections
- [x] Programme dropdowns highlight Home only on their landing page, leaving Team or Subjects as the sole active destination on nested pages
- [x] Official burgundy triangle school logo (`/logo-mark.png`) supplied by the school; used in the nav, footer, schema.org metadata, and regenerated favicons
- [x] Nav: direct bilingual Vision and mission link replaces the School dropdown on desktop and mobile; current Team and Policies and guides pages remain reachable from the footer pending programme separation
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
- [x] Dark brand footer: IB-accent top bar, brand/mission column with school + IB marks, grouped links (Programme / School life / Contact), Apply CTA, candidate-school note
- [x] Student-work homepage feature linking directly to CAS, TOK, and EE materials
- [x] School-seal favicon set (ico, 192/512 PNG, apple-touch) + PWA manifest
- [x] Language switch preserves scroll position
- [x] Overscroll background matches design (no white flash)
- [x] `PageHeader` editorial masthead on all subpages (light band, asymmetric title/standfirst, tone-tinted keyline); EE visual timeline
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
- [x] Search page (`/[locale]/search`) — build-time index of 6 public Keystatic collections, including programme-specific subject links; client-side filtering, bilingual results, and type grouping. Team/testimonials are not indexed. Nav link hidden.
- [x] News + Events merged into unified `/news` feed — chronological stream of articles and events with type badges. `/events` page removed; events Keystatic collection retained.
- [x] 13 downloadable school resources described bilingually via `src/data/documents.ts` (`policyDocuments`, `guideDocuments`, `parentDocuments`, `admissionsDocuments`, `mypDocuments`); EN + SK parent handbooks appear with application documents and on `/policies`, plus the authorization certificate embedded as an image on `/mission`
- [x] News: 2026/27 prospectus published as 4 web-optimized flyer pages, and the S.A.V.E. Ambassador diploma congratulation
- [x] IB team profile for English B teacher Katarína Nagy, with her supplied portrait

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
- [x] `humans/PROGRAMME-STRUCTURE.md` — MYP / IB DP separation brief with clarified Mathematics, content requirements, future acceptance criteria, and the implemented direct Vision and mission navigation change; full programme split remains planned
