# FEATURES

Implemented and shipped.

## Project foundation

- [x] Astro 6 hybrid mode (static prerender + Node adapter for CMS routes)
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

- [x] `subjects` — title, group (1-6/core), level (HL/SL), offeredLevels, description, teacher, order, syllabus body
- [x] `news` — headline, date, excerpt, author, article body
- [x] `cas` — title, date, strands (multi-select: Creativity/Activity/Service), description, learning outcomes, reflection body
- [x] `tok` — title, date, theme (12 TOK themes), summary, full essay body
- [x] `events` — title, date, endDate, time, location, description, details body; auto upcoming/past split
- [x] `testimonials` — name, role, gradYear, photo, order, featured, quote (+ SK)

## Pages (routes + detail pages + admin)

- [x] `/` — homepage with hero, stats, programmes, student benefits, gallery
- [x] `/subjects` — DP-branded course catalogue: dark DP hero with dotted-leader table-of-contents index, outlined ghost numerals, scroll-spy rail with builder mini-card, grouped listing by IB group (1–6 + core), builder CTA band
- [x] `/subjects/[slug]` — subject detail with rendered syllabus + meta sidebar
- [x] `/cas` — strand-based listing (Creativity, Activity, Service); activities can span multiple strands and appear under each filter
- [x] `/cas/[slug]` — CAS detail with reflection + multi-strand badges + learning-outcome sidebar
- [x] `/tok` — essay/material listing with theme badges
- [x] `/tok/[slug]` — TOK detail with full rendered essay
- [x] `/ee` — Extended Essay timeline and resources
- [x] `/news` — newspaper-style gazette: folio line (school · Bratislava · RSS chip), nameplate masthead with double rule, featured story with column rule, chronological feed with outlined year markers
- [x] `/news/[slug]` — editorial article page: badge + date kicker, headline, standfirst, byline, double rule, print-style drop cap on the opening paragraph
- [x] `/events` — calendar page, auto-split into upcoming/past
- [x] `/gallery` — bilingual bento-mosaic photo gallery: gapless cell-rhythm grid (orientation-aware base/tall/big tiles, deterministic packing order, width-proportional row unit, CSS-columns no-JS fallback) with full-screen lightbox (1600px variants, prev/next, keyboard + backdrop close, focus restore)
- [x] `/build-your-diploma` — DP-branded interactive planner: dark DP hero with programme-model hexagon (six groups around the TOK/EE/CAS core), numbered worksheet-style group sections, live IB-rule validation, dark "Your diploma" transcript card with six fixed slots + HL target meter, mobile progress bar, anime.js micro-interactions, reduced-motion safe; promoted from `/dp` via builder CTA panel
- [x] `/admissions` — bilingual programme guidance, application steps, and direct school contact
- [x] `/testimonials` — student-voice cards (quote, name, role, optional photo) + homepage featured strip
- [x] `/teachers` — verified IB leadership, teaching, and support roster with published school portraits
- [x] `/myp` — bespoke bilingual MYP page: asymmetric editorial layout, hero entrance + Ken Burns, interactive global-contexts chip selector, ATL skills accordion, eight-subject-group master-detail explorer, Personal Project + Service cards, admissions band
- [x] `/dp` — bilingual DP curriculum, subject-choice, core, and admissions overview
- [x] `404` — branded bilingual not-found page
- [x] `/keystatic/` — CMS admin UI (server-rendered, not prerendered)
- [x] Markdoc body rendering helper (`src/lib/markdoc.ts`) with EN/SK fallback

## SEO & feeds

- [x] `sitemap.xml` — all locales + collection detail pages, with hreflang
- [x] `robots.txt` — disallow `/keystatic/` + `/api/`, sitemap reference
- [x] RSS 2.0 feed for news at `/rss.xml` + `<link>` autodiscovery
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
- [x] Nav: explicit Home link, Programmes dropdown, IB Core dropdown (CAS/TOK/EE), Apply CTA
- [x] Higher-resolution nav logo (`/logo.png`)
- [x] Responsive grid cards (1 → 2 → 3 columns)
- [x] Emerald primary / stone neutral color palette
- [x] Official IB brand colour tokens in `@theme` (`--color-ib-blue` #004587, `--color-ib-blue-light` #2FB4E9)
- [x] Official IB logos: IB sphere mark (`/ib-logo.svg`) in footer + What-is-IB; DP/MYP banner logos (`/ib-dp-logo.png`, `/ib-myp-logo.png`) on `/dp` `/myp` headers + homepage programme cards
- [x] Inter Variable font (self-hosted via `@fontsource-variable/inter`)
- [x] Tailwind-only CSS (animation utilities live in `global.css`)
- [x] Full-photo homepage hero with Ken Burns zoom + staggered fade-in entrance, CTAs
- [x] Count-up stats band, scroll-reveal sections, photo marquee gallery
- [x] Astro view transitions (`<ClientRouter />`) for smooth navigation
- [x] Mobile hamburger menu + active nav link states
- [x] Dark brand footer: IB-accent top bar, brand/mission column with school + IB marks, grouped links (Programme / School life / Contact), Apply CTA, candidate-school note
- [x] Student-work homepage feature linking directly to CAS, TOK, and EE materials
- [x] School-seal favicon set (ico, 192/512 PNG, apple-touch) + PWA manifest
- [x] Language switch preserves scroll position
- [x] Overscroll background matches design (no white flash)
- [x] `PageHeader` gradient hero band on all subpages; EE visual timeline
- [x] MYP candidate-school disclaimer + correct programme ages (14–16 / 16–19)
- [x] School photography from the old Framer site (`public/images/school/`)
- [x] Accessibility: `prefers-reduced-motion` honoured, content visible without JS
- [x] Light mode only — single theme, no dark mode (reverted)

## Sample content

- [x] 9 subjects across all 6 IB groups — each with a full rendered syllabus body (overview, assessment table, IA detail)
- [x] 4 CAS entries (incl. Daffodil Day 2026, a real multi-strand fundraising project) — each with a reflection mapped to learning outcomes
- [x] 2 TOK essays — each with a knowledge question, full essay, and discussion prompts
- [x] 2 news articles — with full article bodies
- [x] Search page (`/[locale]/search`) — build-time index of all 6 Keystatic collections, client-side vanilla-JS filtering (no dependency), bilingual, results grouped by type with counts. Nav link hidden (page accessible by URL).
- [x] News + Events merged into unified `/news` feed — chronological stream of articles and events with type badges. `/events` page removed; events Keystatic collection retained.

## Deployment

- [x] Live on Coolify (VPS) — project `IB Česká`, app via GitHub App on `VSHT3/ib-ceska` `main`
- [x] nixpacks build (Node 22): `npm run build` → start `node dist/server/entry.mjs`, port 4321
- [x] `HOST=0.0.0.0` + `PORT=4321` runtime env so the Node adapter binds inside the container
- [x] Auto-deploy on push to `main` (GitHub App webhook); first deploy verified (`/`, `/en/`, `/keystatic` all 200)
- [x] Production Keystatic GitHub OAuth wired (`IB Ceska CMS` app + 3 `KEYSTATIC_*` env vars); login + content Save verified
- [x] HTTPS via Let's Encrypt (required — Keystatic's `crypto.subtle` needs a secure origin)

## DX & tooling

- [x] Prettier (single formatter, incl. `.astro` via `prettier-plugin-astro` + native `.mdx`)
- [x] Biome linter (formatter disabled; `noExplicitAny` off for Keystatic types)
- [x] `astro sync` pre-build hook (`prebuild` script)
- [x] husky + lint-staged pre-commit (Prettier + Biome on staged files, then `astro check`)

## Documentation

- [x] `README.md` — badges, quick start, stack, collection overview, deploy section
- [x] `AGENTS.md` — AI agent conventions, gotchas, stack details
- [x] `humans/README.md` — onboarding for non-technical collaborators
- [x] `humans/CONTENT.md` — per-collection field reference, editor workflow
- [x] `humans/DESIGN.md` — design tokens, layout rules, CMS architecture
- [x] `humans/DEPLOY.md` — hosting, build config, auto-deploy, troubleshooting
- [x] `humans/HUMANTODO.md` — tasks for human collaborators
- [x] `TODO.md` — AI task backlog
- [x] `FEATURES.md` — this file
