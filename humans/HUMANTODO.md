# HUMANTODO

Things the humans (IB coordinators, teachers, school staff) must provide or decide. AI cannot do these without your input.

## Critical — before launch
- [x] ~~**Set up the production CMS login (developer task).**~~ Done — `IB Ceska CMS` GitHub App registered, the three `KEYSTATIC_*` env vars set in Coolify, site served over HTTPS, and login + Save verified on the temporary URL. Only people with write access to `VSHT3/ib-ceska` can edit. (When the real domain goes live, the App callback URL must be updated — see root `TODO.md` → "Domain switch".)
- [ ] **Decide who gets edit access** and add their GitHub accounts as collaborators on the repo. Removing access = removing them from the repo.
- [ ] Provide high-quality school logo (vector SVG preferred, minimum 500px wide) — current `logo.png` is low resolution; the nav and favicon currently use it
- [x] ~~Confirm final domain name~~ — set to `ib.gymnaziumceska.sk` in `astro.config.mjs`
- [ ] Provide real teacher names and titles for all IB subjects
- [ ] Confirm which subjects the school actually offers (current list is a template)
- [ ] Provide actual CAS activity records with dates, descriptions, and learning outcomes
- [ ] Provide real TOK essay titles and themes
- [ ] Provide real news/announcement content
- [ ] Provide the real subjects list (incl. HL/SL offerings and any preset subject combinations students choose from)
- [ ] Provide teachers list — names, roles, subjects, photos (with their consent)
- [ ] Provide student testimonials — quotes, names, year (with consent)
- [ ] Provide school events list (dates, descriptions, photos)
- [ ] Provide public works to showcase: student EEs, exhibition materials, science collaboration project details — **needs student/parent consent to publish**
- [ ] Provide real CAS project records to feature

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
