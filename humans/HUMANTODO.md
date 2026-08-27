# HUMANTODO

Things the humans (IB coordinators, teachers, school staff) must provide or decide. AI cannot do these without your input.

## Critical — before launch

- [x] ~~**Set up the production CMS login (developer task).**~~ Done — `IB Ceska CMS` GitHub App registered, the three `KEYSTATIC_*` env vars set in Coolify, site served over HTTPS, and login + Save verified on the temporary URL. Only people with write access to `VSHT3/ib-ceska` can edit. (When the real domain goes live, the App callback URL must be updated — see root `TODO.md` → "Domain switch".)
- [ ] **Decide who gets edit access** and add their GitHub accounts as collaborators on the repo. Removing access = removing them from the repo.
- [ ] Provide high-quality school logo (vector SVG preferred, minimum 500px wide) — current `logo.png` is low resolution; the nav and favicon currently use it
- [x] ~~Confirm final domain name~~ — set to `ib.gymnaziumceska.sk` in `astro.config.mjs`
- [x] ~~Provide real teacher names and titles for all IB subjects~~ — current IB roster and responsibilities were taken from the school’s published IB website on 15 June 2026
- [ ] Confirm which subjects the school actually offers (current list is a template)
- [ ] Provide actual CAS activity records with dates, descriptions, and learning outcomes
- [ ] Provide real TOK essay titles and themes
- [ ] Provide real news/announcement content
- [ ] Provide the real subjects list (incl. HL/SL offerings and any preset subject combinations students choose from)
- [x] ~~Provide teachers list — names, roles, subjects, photos~~ — `/teachers` now uses the roster and portraits already published on the school’s official IB website; keep that source page current
- [ ] Provide student testimonials — quotes, names, year (with consent). The `/testimonials` page is **built and live** with three clearly-marked **sample** entries; replace them via Keystatic (Testimonials collection) with real, consented quotes. Tick "Feature on homepage" on the best 2–3. Only add a photo with the student's written consent.
- [ ] Provide school events list (dates, descriptions, photos)
- [ ] Provide public works to showcase: student EEs, exhibition materials, science collaboration project details — **needs student/parent consent to publish**
- [ ] Provide real CAS project records to feature

## IB documents — content the IB coordinator must provide

Per the coordinator's requested page structure (see root `TODO.md` → "IB site IA"). The site can link to these, but the actual documents/content are school/IB property the AI cannot write. **Note:** the old website's `/documents` page (`ib.gymnaziumceska.sk/documents`) is a Framer mockup — every "View" button points to the same pdf.js demo PDF, not a real file. So these must be supplied directly by the school, not pulled from the old site.

- [x] ~~The five **IB School Policies**~~ — supplied 2026-07-25 and published on `/policies`: Admissions, Assessment, Academic Integrity, Language, Inclusion.
- [x] ~~**Handbook for parents**~~ — supplied 2026-08-15 in English and Slovak; both on `/policies`.
- [x] ~~**CAS Handbook** and **TOK Handbook**~~ — supplied 2026-07-23; on `/policies` and linked from `/cas` and `/tok`.
- [ ] **EE Guide** — Simona was still writing it on 2026-07-23. Send it when ready; it slots straight into `/policies` → Core handbooks.
- [x] ~~**School Fees**~~ — supplied; rendered as an HTML table on `/admissions` (DP1/DP2, bilingual). Replace the `dpFees` data in `src/data/documents.ts` if the schedule changes.
- [x] ~~**Application Form**~~ — supplied: `dp-application-form.pdf` (EN) + `prihlaska-na-prijimacie-konanie.pdf` (SK), linked on `/admissions`. **Subject Choice Form still needed** — the supplied set had no subject-choice form (`/build-your-diploma` is a picker, not a downloadable form).
- [x] ~~**Entrance Exams info**~~ — supplied: `dp-admissions-announcement.pdf`, `informacie-o-prijimacom-konani.pdf`, `myp-admissions-announcement.pdf` (dates, subjects, interview), linked on `/admissions`.
- [x] ~~**School Mission Statement**~~ — supplied 2026-08-27 (`Our IB Identity.docx`) together with the school vision; both live on `/mission` beside the IB mission statement.
- [ ] **Complaints or appeals procedure** — on the coordinator's own "essential public information" list (2026-07-21) but never supplied. Send it and it goes on `/policies`.
- [ ] **Organizational Chart** — decision needed, not content. The chart we have is role-only (no names) and its visual language does not match the site. Confirmed on 2026-07-21 that the IB does not require it on the website. Options: (a) leave it off the site, (b) we redraw the same structure in the site's own styling as a section on `/teachers`. Tell us which.
- [ ] **Non-teaching staff** to list on `/teachers` (if they should appear)
- [ ] **University Admission** data: which countries/universities graduates go to, average + highest Diploma points, entry requirements — feeds the new University Admission page
- [ ] **Print-quality prospectus PDF under 5 MB** — the 2026/27 prospectus is published as web pages in News. The supplied PDF is 38 MB, too large to host; send a compressed version if a download link is wanted.

## Content review

- [ ] Review English translations once AI replaces Czech placeholders
- [ ] Review/approve the AI-generated Slovak UI strings (`src/i18n/dictionaries.ts`)
- [ ] Fill Slovak translations of content entries via the CMS ("Slovak translation" section in each entry — English shows wherever Slovak is left empty)
- [ ] Review EE timeline — adjust dates to match school calendar
- [ ] Provide downloadable EE documents (EE Guide PDF, RPPF form, assessment criteria)

## Branding & design

- [ ] Provide brand color if emerald-700 is not the right primary
- [ ] Confirm IB logo usage is allowed (candidate schools have restrictions — check the school's IB agreement before AI adds official IB/MYP/DP logos)
- [ ] Decide if external fonts should replace the system font stack
- [x] ~~Provide any photography or imagery for pages~~ — photos pulled from the old website (`public/images/school/`); replace with higher-quality originals if available

## Legal & compliance

- [ ] Confirm GDPR/privacy policy content for the footer
- [ ] Confirm copyright statement in footer
- [ ] Decide if cookie consent banner is needed

## Succession (current maintainer leaving within ~a year)

- [ ] Transfer GitHub repository ownership/admin to the school or the next maintainer
- [ ] Transfer the hosting account (Coolify on the VPS) and document the server login — the site is already deployed there (Coolify project `IB Česká`); see `humans/DEPLOY.md`
- [ ] Transfer DNS control for `ib.gymnaziumceska.sk`
- [ ] Hand over the production environment variables (Keystatic GitHub secrets) — these are **not** in the repo
- [ ] Identify and brief the next developer; point them at `humans/README.md` → "Succession" and the root `AGENTS.md`

## Future decisions

- [ ] Prioritize which i18n languages to implement first (English, Slovak, others?)
- [ ] Decide if CAS entries should be publicly visible or login-gated
- [ ] Decide if TOK essays should be public or restricted to students
- [x] ~~Decide on hosting provider~~ — Coolify on a VPS; **site is live and auto-deploys on push** (see `humans/DEPLOY.md`)
