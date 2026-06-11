# TODO

Tasks the AI must complete. Checked = done.

## IB branding
- [ ] Add official IB brand colors as design tokens — IB Organization, MYP, and DP each have their own specific color (verify against current IB brand guidelines)
- [ ] Add official IB logos (IB Org, MYP, DP) — mind IB logo usage rules for candidate schools
- [ ] Dedicated MYP subpage (`/myp`) using MYP color + logo
- [ ] Dedicated DP subpage (`/dp`) using DP color + logo

## Content
- [ ] Replace all Czech placeholder text with English
- [ ] Proper subjects list with the school's REAL subjects (replace template entries) + subject "presets"/package combinations students can pick
- [ ] Add body content to subject `.mdx` files (syllabus details, IA criteria)
- [ ] Add body content to CAS entries (reflections, evidence)
- [ ] Add body content to TOK entries (full essays, discussion prompts)
- [ ] Add real CAS projects the school has done
- [ ] Student benefits section sourced from https://www.ibo.org/programmes/diploma-programme/ (university recognition, critical thinking, etc.)

## Pages
- [ ] School events page/section (Keystatic collection)
- [ ] Public works showcase — student EEs, exhibitions, science collaboration project
- [ ] Student testimonials section (homepage + own page?)
- [ ] Teachers list page (photo, role, subjects)
- [ ] Individual subject detail pages (`/subjects/[slug]`)
- [ ] Individual CAS entry detail pages (`/cas/[slug]`)
- [ ] Individual TOK entry detail pages (`/tok/[slug]`)
- [ ] Individual news article pages (`/news/[slug]`)
- [ ] 404 error page

## i18n
- [x] English/Slovak language switcher component
- [x] Slovak translation strings for all UI
- [x] Slovak content fields in Keystatic (optional, EN fallback)
- [ ] Slovak translations for sample content (fill `sk` fields via /keystatic)
- [x] Browser-language detection on `/` (sk/cs → `/sk/`, else `/en/`)
- [ ] Language switch should keep scroll position (currently jumps to top of page)

## SEO & meta
- [ ] `sitemap.xml` generation
- [ ] `robots.txt`
- [x] Open Graph meta tags on all pages (incl. og:image)
- [x] Proper `<title>` structure across all pages
- [ ] `hreflang` alternate links between /en/ and /sk/ pages
- [ ] Full SEO pass (structured data, meta descriptions per page) — later

## UI & UX
- [ ] Replace default Astro favicon with school logo
- [ ] Update nav logo with high-quality version when provided (still missing better logo)
- [ ] Link to the main school website (gymnaziumceska.sk) — footer and/or nav
- [ ] Better footer (richer layout, school-website link, IB logos, legal links)
- [ ] Fix scroll overflow color (overscroll background doesn't match design — set `background-color` on `html` / `overscroll-behavior`)
- [x] Responsive mobile navigation (hamburger menu)
- [x] Scroll-reveal animations, view transitions, count-up stats, photo marquee
- [ ] Optimize school photos via Astro `<Image>` (responsive sizes, AVIF/WebP)
- [ ] Gallery page (old site had one; photos already in `public/images/school/`)
- [ ] Admissions/contact page (old site had "Apply Now" flow)
- [ ] Dark mode support (respects `prefers-color-scheme`)
- [ ] Loading/empty states for empty collections

## DX
- [x] Add `astro check` script alias to `package.json` (`npm run check`)
- [ ] Add `astro sync` to pre-build hook
- [ ] Biome or ESLint config
- [ ] Prettier config for `.astro` and `.mdx` files
- [ ] Pre-commit hook (lint + typecheck)

## Content features
- [ ] RSS/Atom feed for news collection
- [ ] Search across all collections
- [ ] Tag/category filtering for CAS entries
- [ ] PDF upload support for EE resources

## Ideas (unprioritized)
- [ ] Interactive DP subject-combination picker ("build your diploma")
- [ ] Countdown to exam session / application deadline on homepage
- [ ] FAQ accordion for admissions
- [ ] Instagram/social feed embed
- [ ] Downloadable school calendar (ICS)
