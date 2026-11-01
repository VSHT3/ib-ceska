# TODO

Tasks the AI must complete. Checked = done.
Umami analytics
PDFs should open in a new tab

## IB branding

- [x] Add official IB brand colors as design tokens — IB corporate blue (`#004587`) + light blue (`#2FB4E9`) added to `@theme` in `global.css` as `--color-ib-blue` / `--color-ib-blue-light`. (Programme-specific PYP/MYP/DP hexes are not publicly published by the IB; not added.)
- [x] Add official IB logos where authorized — `public/ib-logo.svg` (IB sphere mark) in the footer + homepage What-is-IB and `public/ib-dp-logo.png` on IB DP surfaces. MYP uses text-only branding until authorization.
- [x] Dedicated bilingual MYP subpage (`/myp`)
- [x] Dedicated bilingual DP subpage (`/dp`)

## Programme-first restructure

- [x] Implement separate MYP and IB DP top-level menus: desktop hover/click/keyboard support and expandable mobile sections, each with its own subjects, core, mission, team, and policies. Use **IB DP Core** for DP core navigation.
- [x] Fill the mobile header's empty space with a compact school wordmark and both programme names.
- [x] Remove programme-menu description text and strengthen the visual hierarchy of group headings above links.
- [x] Apply programme-page consistency pass: compact context links, tighter copy, stronger headings and unified spacing; fix the 320px homepage programme-badge overflow.
- [x] Make MYP chart subject/core cards interactive with real EN/SK destinations and accessible link states; keep people without profile destinations as plain text.
- [x] Simplify the MYP team page to a single chart heading; remove stacked hero/context bands and move the candidacy notice below the chart.
- [x] Remove narrow copy-width caps from programme overview heroes and the MYP candidacy band.
- [x] Keep `/myp` and `/dp` overviews; add `/myp/subjects` and `/myp/core/{interdisciplinary-learning,approaches-to-learning,service-as-action,personal-project}`; move DP subjects, CAS, TOK, EE, and diploma builder under `/dp`.
- [x] Provide `/{myp,dp}/{mission,teachers,policies}` with the organisational chart only on `/myp/teachers` and the separate portrait roster on `/dp/teachers`.
- [x] Keep MYP candidate-school wording and text-only branding separate from authorized DP claims and its certificate.
- [x] Keep existing DP subjects/CAS/TOK CMS storage unchanged; maintain bilingual MYP reference data in `src/data/myp-programme.ts` and chart data in `src/data/myp-organisation.ts`.
- [x] Redirect legacy locale-prefixed programme URLs and subject/CAS/TOK detail URLs to DP equivalents with HTTP 301, preserving query strings and rejecting unsupported locales. Shared news, gallery, admissions, and search remain outside programmes.

Completion marks implementation; confirm production deployment separately.

## Content

- [ ] Replace all Czech placeholder text with English
- [ ] Proper subjects list with the school's REAL subjects (replace template entries) + subject "presets"/package combinations students can pick
- [ ] Add real CAS projects the school has done

## Pages

- [x] School events page/section (Keystatic collection)
- [ ] Public works showcase — student EEs, exhibitions, science collaboration project
- [ ] Publish student testimonials once real quotes and consent are supplied; the CMS collection stays available, but the public page, homepage strip, search results, navigation, and sitemap are hidden.
- [x] Teachers list page (verified current IB roster, published portraits, roles, and subjects)
- [x] Add Vanda Cvrkalová's supplied portrait and German B profile in English and Slovak (2026-10-28)
- [x] Rebuild the supplied 2026-27 MYP organisational chart as a connected, responsive EN/SK hierarchy with class-first homerooms and no source-commentary placeholders.

## Important

- [x] Center DP leadership profiles and make portraits and names more prominent than the faculty grid.
- [ ] twitter OG image something (the site "preview" on whatsapp and stuff)

## i18n

- [ ] Slovak translations for sample content (fill `sk` fields via /keystatic)

## SEO & meta

- [x] Full SEO pass (structured data, localized meta descriptions, complete sitemap)

## UI & UX

- [x] Update nav logo with the school-supplied burgundy triangle logo; regenerate favicons and structured-data logo
- [x] Optimize school photos via Astro `<Image>` (responsive sizes, AVIF/WebP)
- [x] Gallery page (photos now in `src/assets/school/`)
- [x] Admissions/contact page with bilingual application guidance and direct school contact
- [x] Dark mode — reverted. Light mode only, single theme. All `dark:` variants stripped site-wide.
- [x] Loading/empty states for empty collections
- [x] News + Events merged into unified `/news` feed — chronological stream of articles and events with type badges. `/events` page removed.
- [x] Search nav link hidden — page kept at `/search`, link removed from nav/footer.
- [x] Teacher data corrected — Latková: English A Lang & Lit, not leadership; Hrušková: Chemistry added.

## Security & access

- [x] Keystatic Cloud mode deployed on `workers.dev`; owner confirmed CMS works. Old GitHub-mode `KEYSTATIC_*` Worker secrets removed on 2026-09-27.
- [ ] Invite two teachers to Keystatic Cloud when ready; no GitHub accounts required.
- [ ] GitHub App owner: revoke the exposed `IB Ceska CMS` client secret and remove its obsolete installation/callbacks in GitHub. Deleting Worker secrets did not revoke this credential.
- [ ] Optionally gate `/keystatic/` (and any CMS API paths still used) on each editor-facing origin behind Cloudflare Access, using the same approved individual email addresses. Keep public pages accessible and test the full sign-in flow.

## Cloudflare Workers and live school domain

The site is live at `https://ib.gymnaziumceska.sk`; remaining items are operational verification and access cleanup:

- [x] Cloudflare → Workers & Pages → Create → Import repository `VSHT3/ib-ceska`, production branch `main`
- [x] Set build command `pnpm run build` and deploy command `npx wrangler deploy`
- [x] Existing live Worker was configured with GitHub App secrets and the `workers.dev` callback; this is historical and must be retired after Cloud login works.
- [x] Existing GitHub login + Save and automatic rebuild were verified on `https://ib-ceska.vsht.workers.dev` before migration.
- [x] Enable SaaS on `morumori.com`, set an Active originless fallback, create `ib-ceska.morumori.com` as the CNAME target, and route `*/*` to `ib-ceska`. More-specific routes preserve `analytics.morumori.com/*` and the `morumori.com` studio site; all three were checked after the changes.
- [x] `ib.gymnaziumceska.sk` now CNAMEs to `ib-ceska.morumori.com`. The Cloudflare for SaaS hostname and certificate are Active using automatic HTTP validation, with no school TXT records required. Both localized homepages and the CMS sign-in screen load over HTTPS.
- [ ] Add the school hostname to Keystatic Cloud's allowed URLs if needed, then verify an authenticated login and Save from `/keystatic/` on the school origin.
- [ ] Provide a professional contact email if the existing `ib@gymnaziumceska.sk` is not the intended address.

## DX

- [x] Add `astro sync` to pre-build hook — `prebuild` script runs `astro sync` before every `pnpm run build`.
- [x] Biome linter config — `biome.json` (linter only, formatter disabled to avoid clashing with Prettier; `noExplicitAny` off for Keystatic loose types).
- [x] Prettier config for `.astro` and `.mdx` files — `.prettierrc` with `prettier-plugin-astro`; `.prettierignore` excludes `src/content/` (Keystatic-managed).
- [x] Pre-commit hook (lint + typecheck) — husky + lint-staged: `prettier --write` + `biome check --write` on staged files, then `pnpm run check`.

## Content features

- [x] Search across the 5 public collections — `/[locale]/search` page with build-time index, client-side vanilla-JS filtering, bilingual results and sitemap entry; testimonials remain unpublished.
- [ ] Tag/category filtering for CAS entries
- [ ] PDF upload support for EE resources

## IB site IA — coordinator's requested section structure

Source: IB coordinator's proposed site map (top-level sections → sub-items). Core ask: **"Základné IB dokumenty by mali byť na stránke ľahko nájditeľné"** — basic IB documents must be easy to find _on the site_. This is a whole-site information-architecture proposal, NOT a spec for the `/dp` page.

### DONE — admissions & MYP documents hosted and wired

The coordinator supplied the real PDFs (the old site had none — see below). Documents now live in `public/documents/` and are linked from the relevant pages:

- `/admissions` — **School fees** rendered as an HTML table (reconstructed from the school's fee schedule; DP1/DP2 columns, bilingual), plus a **Documents & forms** section grouped by programme: IB DP Admissions Announcement, IB DP Application Form, Prihláška na prijímacie konanie, Informácie o prijímacom konaní (IB DP group); MYP Admissions Announcement (MYP group); Parent Handbook in English and Slovak.
- `/myp` — **MYP guides for parents** section: MYP at Česká (short info, SK), MYP Parent Pack (official IB, EN).
- Manifest: `src/data/documents.ts` (`admissionsDocuments`, `parentDocuments`, `mypDocuments`, `dpFees`). Component: `src/components/DocumentList.astro`. i18n strings added to `admissions` + `myp` blocks (EN + SK).
- Skipped per coordinator: `program comparison` (content already covered on the site). Fees PDF not hosted — rendered as HTML instead, per coordinator.

Section → current coverage:

1. **What is IBDP?** — `/dp` overview and IB DP Core links; IBO Mission Statement and School Mission + Vision on `/dp/mission` ✅; IB Learner Profile ❌
2. **Subjects & IB DP Core** — `/dp/subjects` ✅, `/dp/ee` ✅, `/dp/tok` ✅, `/dp/cas` ✅
3. **School Policies** — five supplied DP policies on `/dp/policies` ✅; MYP documents and relevant shared policies separately on `/myp/policies` ✅
4. **Admissions & Fees** — `/admissions` process, Entrance Exams info, Application Form, School Fees, and parent handbooks ✅ (handbooks also on `/dp/policies`); Subject Choice Form ❌ (not supplied; `/dp/build-your-diploma` is a picker, not a form)
5. **Activities/Events** — `/news` merged feed ✅
6. **Gallery** — `/gallery` ✅
7. **Staff** — DP leadership and portrait roster on `/dp/teachers` ✅; supplied MYP organisational chart on `/myp/teachers` ✅. Broader non-teaching staff content remains pending.
8. **University Admission** — ❌ no page (where graduates go: countries/universities, entry requirements, outcomes)
9. **Contacts** — footer only ❌ no dedicated page

Gaps to build (per-page, not crammed onto `/dp`) once approved:

- [x] **Policies pages** — `/dp/policies` for five DP policies, CAS/TOK handbooks, and parent handbooks; `/myp/policies` for MYP documents and relevant shared policies. Document manifest: `src/data/documents.ts`.
- [x] **Mission & vision pages** — `/dp/mission` and `/myp/mission`; only DP includes its authorization statement and Certificate of Authorization (July 2022), while MYP remains a candidate programme.
- [ ] **University Admission page** — general structure; destination-university list + outcome stats are human items
- [ ] **Contacts page** — dedicated page (school contact data already in `i18n/dictionaries.ts`)
- [x] **Admissions docs & fees** — Entrance Exams info, Application Form (DP + Prihláška), School Fees (HTML table) wired into `/admissions`; MYP docs wired into `/myp` ✅ 2026-06-29
- [ ] **Admissions gaps still pending** — Subject Choice Form (not yet supplied — see HUMANTODO)
- [ ] **Staff gaps** — broader non-teaching staff content remains a human item; the supplied MYP organisational chart is implemented on `/myp/teachers`.
- [ ] **IB Learner Profile** — surface the public IB Learner Profile framework (mission statements are on each programme's `/mission` page).
- [x] **Nav wiring** — separate MYP / IB DP menus and programme-specific footer links; shared school-life links remain outside programmes, and testimonials stay hidden pending real consented quotes.
- [ ] **EE guide** — coordinator said Simona is still writing it (2026-07-23); slot it into `/dp/policies` → Core handbooks when it arrives.

Scope rule: no empty/"coming soon" stubs shipped as finished — a page is built only when its content exists or is a human item the school will supply imminently.

### Old-site `/documents` is a placeholder mockup — NOT a source of real files

Investigated `https://ib.gymnaziumceska.sk/documents` (Framer SPA). All 13 document cards (MYP FAQs, Application Form, Admissions Policy, School fees, Course Selection, Prihláška, Pravidlá prijímania, Voľba predmetov, etc.) render a "View" button whose `fileURL` prop points to the **same** pdf.js demo PDF (`raw.githubusercontent.com/mozilla/pdf.js/.../compressed.tracemonkey-pldi-09.pdf` — a 2009 TraceMonkey JIT paper). No real school documents are hosted on the old site. Confirms the coordinator's note that her list was "len ako inšpiráciu" (inspiration only). The actual PDFs must come from the school (see HUMANTODO). Do not attempt to "download from the old site" — there is nothing real there to fetch.

## Ideas (unprioritized)

- [x] Interactive DP subject-combination picker ("build your diploma") — `/dp/build-your-diploma`, driven by the `offeredLevels` subject field
- [ ] Countdown to exam session / application deadline on homepage
- [x] FAQ accordion for admissions
- [ ] Instagram/social feed embed
- [ ] Downloadable school calendar (ICS)
- [ ] to which countries and schools our students get?
- [ ] our average Diplomma points
- [ ] highest diplomma points
- [ ] opportunities and stuff
- [ ] self taught languages (like mother tongue), is also possible
