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

## Important

- [ ] Leadership in @team should be centered and bit bigger than the rest.
- [ ] twitter OG image something (the site "preview" on whatsapp and stuff)

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
- [ ] have real professional email for website

## DX

- [x] Add `astro sync` to pre-build hook — `prebuild` script runs `astro sync` before every `npm run build`.
- [x] Biome linter config — `biome.json` (linter only, formatter disabled to avoid clashing with Prettier; `noExplicitAny` off for Keystatic loose types).
- [x] Prettier config for `.astro` and `.mdx` files — `.prettierrc` with `prettier-plugin-astro`; `.prettierignore` excludes `src/content/` (Keystatic-managed).
- [x] Pre-commit hook (lint + typecheck) — husky + lint-staged: `prettier --write` + `biome check --write` on staged files, then `npm run check`.

## Content features

- [x] Search across all collections — `/[locale]/search` page with build-time index (all 6 Keystatic collections, 27 items), client-side vanilla-JS filtering, bilingual, nav + footer link, sitemap entry.
- [ ] Tag/category filtering for CAS entries
- [ ] PDF upload support for EE resources

## IB site IA — coordinator's requested section structure

Source: IB coordinator's proposed site map (top-level sections → sub-items). Core ask: **"Základné IB dokumenty by mali byť na stránke ľahko nájditeľné"** — basic IB documents must be easy to find _on the site_. This is a whole-site information-architecture proposal, NOT a spec for the `/dp` page.

### DONE — admissions & MYP documents hosted and wired

The coordinator supplied the real PDFs (the old site had none — see below). 7 PDFs now live in `public/documents/` and are linked from the site:

- `/admissions` — **School fees** rendered as an HTML table (reconstructed from the school's fee schedule; DP1/DP2 columns, bilingual), plus a **Documents & forms** section grouped by programme: DP Admissions Announcement, DP Application Form, Prihláška na prijímacie konanie, Informácie o prijímacom konaní (DP group); MYP Admissions Announcement (MYP group). Each link shows a language badge (EN/SK).
- `/myp` — **MYP guides for parents** section: MYP at Česká (short info, SK), MYP Parent Pack (official IB, EN).
- Manifest: `src/data/documents.ts` (`admissionsDocuments`, `mypDocuments`, `dpFees`). Component: `src/components/DocumentList.astro`. i18n strings added to `admissions` + `myp` blocks (EN + SK).
- Skipped per coordinator: `program comparison` (content already covered on the site). Fees PDF not hosted — rendered as HTML instead, per coordinator.

Section → current coverage:

1. **What is IBDP?** — `/dp` exists (explainer + core-element links) but does NOT surface: IBO Mission Statement ❌, School Mission Statement ❌, IB Learner Profile ❌
2. **Subjects & DP Core** — Subjects `/subjects` ✅, EE `/ee` ✅, TOK `/tok` ✅, CAS `/cas` ✅
3. **School Policies** — Admissions ❌ (referenced but not supplied) / Assessment ❌ / Language ❌ / Academic Integrity ❌ / Inclusion ❌ (no policies page or collection at all)
4. **Admissions & Fees** — process `/admissions` ✅ / Entrance Exams info ✅ (announcement + informácie PDFs) / Application Form ✅ (DP form + Prihláška PDFs) / School Fees ✅ (HTML table) / Subject Choice Form ❌ (not supplied; `/build-your-diploma` is a picker, not a form) / Handbook for parents ❌ (not supplied) / Admissions Policy ❌ (referenced by announcements but not supplied — see HUMANTODO)
5. **Activities/Events** — `/news` merged feed ✅
6. **Gallery** — `/gallery` ✅
7. **Staff** — Leadership + pedagogical faculty on `/teachers` ✅ / Non-teaching staff ❌ / Organizational Chart ❌
8. **University Admission** — ❌ no page (where graduates go: countries/universities, entry requirements, outcomes)
9. **Contacts** — footer only ❌ no dedicated page

Gaps to build (per-page, not crammed onto `/dp`) once approved:

- [ ] **Policies page** — index for the 5 IB policies; links to the actual policy documents (documents themselves are a human item — see HUMANTODO)
- [ ] **University Admission page** — general structure; destination-university list + outcome stats are human items
- [ ] **Contacts page** — dedicated page (school contact data already in `i18n/dictionaries.ts`)
- [x] **Admissions docs & fees** — Entrance Exams info, Application Form (DP + Prihláška), School Fees (HTML table) wired into `/admissions`; MYP docs wired into `/myp` ✅ 2026-06-29
- [ ] **Admissions gaps still pending** — Subject Choice Form + Parent Handbook (not yet supplied — see HUMANTODO)
- [ ] **Staff gaps** — add Non-teaching staff + Organizational Chart to `/teachers` (content is a human item)
- [ ] **Mission & Learner Profile** — surface IBO Mission Statement (public IB text) + IB Learner Profile (public IB framework); school's own mission statement is a human item
- [ ] **Nav wiring** — make the new + existing sections reachable from the main nav so the 9 sections are findable from anywhere; don't bury them on `/dp`

Scope rule: no empty/"coming soon" stubs shipped as finished — a page is built only when its content exists or is a human item the school will supply imminently.

### Old-site `/documents` is a placeholder mockup — NOT a source of real files

Investigated `https://ib.gymnaziumceska.sk/documents` (Framer SPA). All 13 document cards (MYP FAQs, Application Form, Admissions Policy, School fees, Course Selection, Prihláška, Pravidlá prijímania, Voľba predmetov, etc.) render a "View" button whose `fileURL` prop points to the **same** pdf.js demo PDF (`raw.githubusercontent.com/mozilla/pdf.js/.../compressed.tracemonkey-pldi-09.pdf` — a 2009 TraceMonkey JIT paper). No real school documents are hosted on the old site. Confirms the coordinator's note that her list was "len ako inšpiráciu" (inspiration only). The actual PDFs must come from the school (see HUMANTODO). Do not attempt to "download from the old site" — there is nothing real there to fetch.

## Ideas (unprioritized)

- [x] Interactive DP subject-combination picker ("build your diploma") — `/build-your-diploma`, driven by the `offeredLevels` subject field
- [ ] Countdown to exam session / application deadline on homepage
- [x] FAQ accordion for admissions
- [ ] Instagram/social feed embed
- [ ] Downloadable school calendar (ICS)
- [ ] to which countries and schools our students get?
- [ ] our average Diplomma points
- [ ] highest diplomma points
- [ ] opportunities and stuff
- [ ] self taught languages (like mother tongue), is also possible
