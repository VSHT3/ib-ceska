# TODO

Tasks the AI must complete. Checked = done.

## Content
- [ ] Replace all Czech placeholder text with English
- [ ] Add body content to subject `.mdx` files (syllabus details, IA criteria)
- [ ] Add body content to CAS entries (reflections, evidence)
- [ ] Add body content to TOK entries (full essays, discussion prompts)

## Pages
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

## SEO & meta
- [ ] `sitemap.xml` generation
- [ ] `robots.txt`
- [x] Open Graph meta tags on all pages (incl. og:image)
- [x] Proper `<title>` structure across all pages
- [ ] `hreflang` alternate links between /en/ and /sk/ pages

## UI & UX
- [ ] Replace default Astro favicon with school logo
- [ ] Update nav logo with high-quality version when provided
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
