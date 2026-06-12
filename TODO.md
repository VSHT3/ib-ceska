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
- [ ] Add real CAS projects the school has done

## Pages
- [ ] School events page/section (Keystatic collection)
- [ ] Public works showcase — student EEs, exhibitions, science collaboration project
- [ ] Student testimonials section (homepage + own page?)
- [ ] Teachers list page (photo, role, subjects)

## i18n
- [ ] Slovak translations for sample content (fill `sk` fields via /keystatic)

## SEO & meta
- [ ] Full SEO pass (structured data, meta descriptions per page) — later

## UI & UX
- [ ] Update nav logo with high-quality version when provided (still missing better logo)
- [ ] Optimize school photos via Astro `<Image>` (responsive sizes, AVIF/WebP)
- [ ] Gallery page (old site had one; photos already in `public/images/school/`)
- [ ] Admissions/contact page (old site had "Apply Now" flow)
- [ ] Dark mode support (respects `prefers-color-scheme`)
- [ ] Loading/empty states for empty collections

## Security & access
- [ ] Wire up Keystatic GitHub OAuth for production so only repo collaborators can save content (`KEYSTATIC_GITHUB_CLIENT_ID` / `_SECRET` + GitHub App) — human setup tracked in `humans/HUMANTODO.md`
- [ ] Defence-in-depth: gate the `/keystatic/` route behind reverse-proxy basic-auth in Coolify (the admin UI is publicly reachable even though saves require GitHub auth)

## DX
- [ ] Add `astro sync` to pre-build hook
- [ ] Biome or ESLint config
- [ ] Prettier config for `.astro` and `.mdx` files
- [ ] Pre-commit hook (lint + typecheck)

## Content features
- [ ] Search across all collections
- [ ] Tag/category filtering for CAS entries
- [ ] PDF upload support for EE resources

## Ideas (unprioritized)
- [ ] Interactive DP subject-combination picker ("build your diploma")
- [ ] Countdown to exam session / application deadline on homepage
- [ ] FAQ accordion for admissions
- [ ] Instagram/social feed embed
- [ ] Downloadable school calendar (ICS)
