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
- [ ] English/Slovak language switcher component
- [ ] Slovak translation strings for all UI
- [ ] Slovak translations for sample content

## SEO & meta
- [ ] `sitemap.xml` generation
- [ ] `robots.txt`
- [ ] Open Graph meta tags on all pages
- [ ] Proper `<title>` structure across all pages

## UI & UX
- [ ] Replace default Astro favicon with school logo
- [ ] Update nav logo with high-quality version when provided
- [ ] Responsive mobile navigation (hamburger menu)
- [ ] Dark mode support (respects `prefers-color-scheme`)
- [ ] Loading/empty states for empty collections

## DX
- [ ] Add `astro check` script alias to `package.json`
- [ ] Add `astro sync` to pre-build hook
- [ ] Biome or ESLint config
- [ ] Prettier config for `.astro` and `.mdx` files
- [ ] Pre-commit hook (lint + typecheck)

## Content features
- [ ] RSS/Atom feed for news collection
- [ ] Search across all collections
- [ ] Tag/category filtering for CAS entries
- [ ] PDF upload support for EE resources
