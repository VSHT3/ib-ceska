# TODO

Tasks the AI must complete. Checked = done.

## IB branding

- [x] Add official IB brand colors as design tokens — IB corporate blue (`#004587`) + light blue (`#2FB4E9`) added to `@theme` in `global.css` as `--color-ib-blue` / `--color-ib-blue-light`. (Programme-specific PYP/MYP/DP hexes are not publicly published by the IB; not added.)
- [x] Add official IB logos (IB Org, MYP, DP) — `public/ib-logo.svg` (IB sphere mark) in footer + homepage What-is-IB; `public/ib-dp-logo.png` / `ib-myp-logo.png` on the `/dp` `/myp` page headers and the homepage programme cards. (Mind IB logo usage rules for candidate schools.)
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
- [x] Teachers list page (verified current IB roster, published portraits, roles, and subjects)

## i18n

- [ ] Slovak translations for sample content (fill `sk` fields via /keystatic)

## SEO & meta

- [x] Full SEO pass (structured data, localized meta descriptions, complete sitemap)

## UI & UX

- [ ] Update nav logo with high-quality version when provided (still missing better logo)
- [x] Optimize school photos via Astro `<Image>` (responsive sizes, AVIF/WebP)
- [x] Gallery page (photos now in `src/assets/school/`)
- [x] Admissions/contact page with bilingual application guidance and direct school contact
- [x] Dark mode — reverted. Light mode only, single theme. All `dark:` variants stripped site-wide.
- [x] Loading/empty states for empty collections
- [x] News + Events merged into unified `/news` feed — chronological stream of articles and events with type badges. `/events` page removed.
- [x] Search nav link hidden — page kept at `/search`, link removed from nav/footer.
- [x] Teacher data corrected — Latková: English A Lang & Lit, not leadership; Hrušková: Chemistry added.

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

- [x] Add `astro sync` to pre-build hook — `prebuild` script runs `astro sync` before every `npm run build`.
- [x] Biome linter config — `biome.json` (linter only, formatter disabled to avoid clashing with Prettier; `noExplicitAny` off for Keystatic loose types).
- [x] Prettier config for `.astro` and `.mdx` files — `.prettierrc` with `prettier-plugin-astro`; `.prettierignore` excludes `src/content/` (Keystatic-managed).
- [x] Pre-commit hook (lint + typecheck) — husky + lint-staged: `prettier --write` + `biome check --write` on staged files, then `npm run check`.

## Content features

- [x] Search across all collections — `/[locale]/search` page with build-time index (all 6 Keystatic collections, 27 items), client-side vanilla-JS filtering, bilingual, nav + footer link, sitemap entry.
- [ ] Tag/category filtering for CAS entries
- [ ] PDF upload support for EE resources

## Ideas (unprioritized)

- [x] Interactive DP subject-combination picker ("build your diploma") — `/build-your-diploma`, driven by the `offeredLevels` subject field
- [ ] Countdown to exam session / application deadline on homepage
- [x] FAQ accordion for admissions
- [ ] Instagram/social feed embed
- [ ] Downloadable school calendar (ICS)
