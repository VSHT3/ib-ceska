# TODO

Tasks the AI must complete. Checked = done.

## IB branding
- [ ] Add official IB brand colors as design tokens — IB Organization, MYP, and DP each have their own specific color (verify against current IB brand guidelines)
- [ ] Add official IB logos (IB Org, MYP, DP) — mind IB logo usage rules for candidate schools
- [x] Dedicated bilingual MYP subpage (`/myp`)
- [x] Dedicated bilingual DP subpage (`/dp`)

## Content
- [ ] Replace all Czech placeholder text with English
- [ ] Proper subjects list with the school's REAL subjects (replace template entries) + subject "presets"/package combinations students can pick
- [ ] Add real CAS projects the school has done

## Pages
- [x] School events page/section (Keystatic collection)
- [ ] Public works showcase — student EEs, exhibitions, science collaboration project
- [x] Student testimonials — `/testimonials` page + homepage featured strip (Keystatic collection; sample entries seeded, real ones await consent)
- [ ] Teachers list page (photo, role, subjects)

## i18n
- [ ] Slovak translations for sample content (fill `sk` fields via /keystatic)

## SEO & meta
- [x] Full SEO pass (structured data, localized meta descriptions, complete sitemap)

## UI & UX
- [ ] Update nav logo with high-quality version when provided (still missing better logo)
- [x] Optimize school photos via Astro `<Image>` (responsive sizes, AVIF/WebP)
- [x] Gallery page (photos now in `src/assets/school/`)
- [x] Admissions/contact page with bilingual application guidance and direct school contact
- [ ] Dark mode support (respects `prefers-color-scheme`)
- [x] Loading/empty states for empty collections

## Security & access
- [x] Wire up Keystatic GitHub OAuth for production so only repo collaborators can save content — `IB Ceska CMS` GitHub App (ID 4043810) + 3 env vars (`KEYSTATIC_GITHUB_CLIENT_ID` / `_SECRET` / `KEYSTATIC_SECRET`) set in Coolify; login + Save verified
- [ ] Defence-in-depth: gate the `/keystatic/` route behind reverse-proxy basic-auth in Coolify (the admin UI is publicly reachable even though saves require GitHub auth)
- [ ] Rotate the `IB Ceska CMS` client secret — the initial value was pasted into a chat during setup; regenerate on GitHub and update `KEYSTATIC_GITHUB_CLIENT_SECRET` in Coolify

## Domain switch — when DNS for `ib.gymnaziumceska.sk` is available
Everything below is currently pinned to the temporary `https://jgnxdfbe0xrwuk0oz0i06hyg.87.106.7.54.sslip.io` URL. When the real domain is ready:
- [ ] Point DNS: `A` record `ib.gymnaziumceska.sk` → VPS IP `87.106.7.54` (wait for propagation)
- [ ] Coolify → app `IB Česká` → **Domains**: set FQDN to `https://ib.gymnaziumceska.sk` and redeploy (Traefik auto-requests a Let's Encrypt cert — must stay `https://`, the CMS needs a secure origin)
- [ ] `IB Ceska CMS` GitHub App → **Callback URL** → `https://ib.gymnaziumceska.sk/api/keystatic/github/oauth/callback` (and update Homepage URL)
- [ ] Verify Keystatic login + Save still work on the new origin
- [ ] (Optional) keep or remove the old sslip.io domain in Coolify; if removed, the temp callback URL can come off the GitHub App
- [ ] No code change needed — `astro.config.mjs` `site` is already `https://ib.gymnaziumceska.sk`; `keystatic.config.ts` repo is `VSHT3/ib-ceska` (origin-independent)

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
- [x] Interactive DP subject-combination picker ("build your diploma") — `/build-your-diploma`, driven by the `offeredLevels` subject field
- [ ] Countdown to exam session / application deadline on homepage
- [ ] FAQ accordion for admissions
- [ ] Instagram/social feed embed
- [ ] Downloadable school calendar (ICS)
