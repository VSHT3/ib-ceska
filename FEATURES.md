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
- [x] `keystatic.config.ts` — 4 collections with typed schemas
- [x] `@keystatic/astro` integration — admin UI at `/keystatic/`
- [x] Keystatic Reader API — pages read from Keystatic instead of Astro collections
- [x] `src/lib/keystatic.ts` — shared reader singleton
- [x] Local storage for dev, GitHub storage for production (auto-switched)
- [x] `.mdoc` content format — 16 sample entries across all collections
- [x] Markdoc rich-text editor for long-form content (subjects, CAS, TOK, news bodies)
- [x] Select fields, date pickers, array fields with validation

## Content (4 collections)
- [x] `subjects` — title, group (1-6/core), level (HL/SL), description, teacher, order, syllabus body
- [x] `news` — headline, date, excerpt, author, article body
- [x] `cas` — title, date, strand (Creativity/Activity/Service), description, learning outcomes, reflection body
- [x] `tok` — title, date, theme (12 TOK themes), summary, full essay body

## Pages (6 routes + admin)
- [x] `/` — homepage with hero and section cards
- [x] `/subjects` — grouped listing by IB group (1–6)
- [x] `/cas` — strand-based listing (Creativity, Activity, Service)
- [x] `/tok` — essay/material listing with theme badges
- [x] `/ee` — Extended Essay timeline and resources
- [x] `/news` — chronological article listing
- [x] `/keystatic/` — CMS admin UI (server-rendered, not prerendered)

## i18n (EN/SK)
- [x] Locale-prefixed routes (`/en/…`, `/sk/…`) for every page
- [x] `LanguageSwitcher` pill toggle preserving the current path
- [x] Full Slovak UI dictionary (`src/i18n/dictionaries.ts`)
- [x] Optional Slovak content fields in every Keystatic collection with English fallback
- [x] Browser-language detection on `/` (sk/cs → `/sk/`, else `/en/`)

## Layout & design
- [x] Shared `Layout.astro` with sticky nav + footer
- [x] Responsive grid cards (1 → 2 → 3 columns)
- [x] Emerald primary / stone neutral color palette
- [x] Inter Variable font (self-hosted via `@fontsource-variable/inter`)
- [x] Tailwind-only CSS (animation utilities live in `global.css`)
- [x] Full-photo homepage hero with Ken Burns zoom, badge, CTAs
- [x] Count-up stats band, scroll-reveal sections, photo marquee gallery
- [x] Astro view transitions (`<ClientRouter />`) for smooth navigation
- [x] Mobile hamburger menu + active nav link states
- [x] Dark 3-column footer with school contact details
- [x] `PageHeader` gradient hero band on all subpages; EE visual timeline
- [x] MYP candidate-school disclaimer + correct programme ages (14–16 / 16–19)
- [x] School photography from the old Framer site (`public/images/school/`)
- [x] Accessibility: `prefers-reduced-motion` honoured, content visible without JS

## Sample content
- [x] 8 subjects across all 6 IB groups
- [x] 3 CAS entries (one per strand)
- [x] 2 TOK essays/themes
- [x] 2 news articles

## Documentation
- [x] `README.md` — badges, quick start, stack, collection overview, deploy section
- [x] `AGENTS.md` — AI agent conventions, gotchas, stack details
- [x] `humans/README.md` — onboarding for non-technical collaborators
- [x] `humans/CONTENT.md` — per-collection field reference, editor workflow
- [x] `humans/DESIGN.md` — design tokens, layout rules, CMS architecture
- [x] `humans/HUMANTODO.md` — tasks for human collaborators
- [x] `TODO.md` — AI task backlog
- [x] `FEATURES.md` — this file
