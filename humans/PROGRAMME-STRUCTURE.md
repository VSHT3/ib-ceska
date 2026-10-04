# MYP / IB DP programme structure — planning notes

Status: confirmed navigation change implemented on `feat/programme-sections`,
2026-10-04; full programme separation remains planned.
The School dropdown has been replaced by a direct Vision and mission link on
desktop and mobile, with active-page states in English and Slovak.
Separate MYP and IB DP dropdowns now contain programme navigation on desktop and
mobile. MYP and DP each have their own CMS-editable subject catalogue at
`/myp/subjects` and `/dp/subjects`, with individual course pages. MYP currently
publishes Mathematics for MYP 3 and Mathematics EL for MYP 4–5.
Personal Project, Service as Action, and MYP parent guides still link to existing
overview sections; DP core and planner use their existing pages.
Team now leads to separate `/myp/team` and `/dp/team` pages, both edited through
Keystatic Programme teams. The existing DP roster is preserved; MYP initially has
its two confirmed leaders. Policies and guides, News, Gallery, and Admissions
still use shared destinations pending attribution.

Sources: the teacher's handwritten notes and the owner's clarification of the
Programmes menu and MYP Mathematics. Confirmed requirements and recommendations
are separated below; uncertain handwriting is not treated as a final specification.

## Confirmed direction

MYP and IB DP should each lead into their own part of the website, rather than
remaining overview pages alongside a mostly DP-oriented shared navigation.
Each programme needs its own subjects, gallery, news, and team, plus the relevant
sections from the handwritten notes.

Each programme also owns its Policies and guides section. Team and Policies and
guides no longer belong under a shared School dropdown. Replace that dropdown with
a direct **Vision and mission** link to the shared `/mission` page when implementing
the split. This navigation decision is confirmed by the owner.

This is one bilingual school website with two programme branches, not two separate
websites or deployments. Preserve English and Slovak, including English fallback
for missing Slovak content. Do not add Czech content.

The owner initially requested preparation only, then authorized implementation of
confirmed changes. Implement those conservatively; do not guess programme
membership, invent school content, or publish empty programme sections.

## Proposed information architecture

The structure below is a recommendation, not an approved URL or menu specification.
Paths omit the existing `/en` or `/sk` prefix for readability.

| Section                            | MYP branch                          | IB DP branch             |
| ---------------------------------- | ----------------------------------- | ------------------------ |
| Programme overview                 | `/myp`                              | `/dp`                    |
| Subjects                           | `/myp/subjects`                     | `/dp/subjects`           |
| Assessment                         | `/myp/assessment`                   | `/dp/assessment`         |
| Programme-specific projects / core | Personal Project; Service as Action | TOK; Extended Essay; CAS |
| Admissions                         | `/myp/admissions`                   | `/dp/admissions`         |
| News                               | `/myp/news`                         | `/dp/news`               |
| Events / calendar                  | `/myp/events`                       | `/dp/events`             |
| Gallery                            | `/myp/gallery`                      | `/dp/gallery`            |
| Team                               | `/myp/team`                         | `/dp/team`               |
| Policies and guides                | `/myp/policies`                     | `/dp/policies`           |
| Parent handbook / guides           | MYP-specific resources              | DP-specific resources    |
| Subject-combination planner        | Not applicable                      | `/dp/build-your-diploma` |

Do not copy Personal Project or Service as Action into DP, or TOK/EE/CAS into MYP.
Parallel navigation does not mean identical curricula.

Recommended navigation behaviour:

- Keep a shared school header with a clear MYP / IB DP choice.
- Entering either branch exposes that programme's section navigation and identity.
- Keep the current programme visible on listing pages and individual entries.
- Keep the diploma planner within the DP branch, rather than as a third programme.
- Replace the School dropdown with a direct **Vision and mission** link.
- Keep Team and Policies and guides within each programme's navigation.
- Retain shared school information where it really is shared: vision and mission,
  contact information, and potentially vacancies.
- Programme admissions links and the Apply action should preserve the selected
  programme. The homepage can still offer a choice of both.
- Avoid a large nested hover menu as the only way to access programme sections;
  support mobile, keyboard navigation, and links on the programme landing pages.

News and events may continue sharing a feed within each programme, with a separate
calendar view if useful. The notes do not require duplicating articles to create
separate news and events sections.

## Handwritten requirements, cleaned up

- **Subjects:** organise actual subjects beneath the relevant IB subject groups.
  MYP has eight groups; do not reuse DP's six-group numbering or core category as
  the MYP taxonomy. The arrow from “IB Subject Group” to “predmety” does not settle
  the exact English/Slovak label wording.
- **Assessment:** include a summative assessment calendar. This is distinct from
  the general school-events calendar; the notes do not establish a calendar format.
- **Personal Project (PP):** a dedicated MYP destination or substantial section.
- **Service as Action (SA):** a dedicated MYP destination or substantial section.
- **Admissions:** relevant process, dates, forms, and fees for the selected programme.
- **Events — Calendar:** programme-relevant events and dates.
- **Gallery:** programme-relevant photographs, not two copies of the current gallery.
- **MYP Handbook for parents:** an easily discoverable MYP resource. Confirm which
  supplied document is intended before relabelling a general parent handbook.
- **News:** included in the owner's clarification; the margin also appears to say
  “Novinky”.
- **Team:** explicitly added in the owner's clarification, even though it is not
  in the handwritten numbered list.
- **Vacancies:** the separate box names Subject, Requirements, and Job Description.
  A school-wide vacancies section with programme attribution is a recommendation;
  its location and whether any current openings exist remain unconfirmed.

These are content destinations, not a requirement to put every item in the top bar.
Whether a resource needs its own page depends on the supplied content.

## MYP Mathematics — clarified by the owner

| School year | Subject offering | Level presentation                                                          |
| ----------- | ---------------- | --------------------------------------------------------------------------- |
| MYP 3       | Mathematics      | No separate level label needed                                              |
| MYP 4–5     | Mathematics EL   | EL means Extended Level; confirm the school's preferred explanatory wording |

There is one Mathematics offering for MYP 3 and one Mathematics EL offering for
MYP 4–5. Do not invent a standard/extended choice for MYP 4–5, two options for MYP 3,
or a diploma-style HL/SL selector for MYP.

Year coverage and level are different concepts. Record the year range separately
from the subject title/level so students can find the right offering.
The handwritten “Level × → iba pri Mat.” means level presentation is relevant only
for MYP Mathematics, not every MYP subject. It does not remove DP HL/SL levels or
change the diploma planner's rules.

## Current implementation and implications

| Area                   | Current source / behaviour                                                                                                                                             | Implication for later work                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Navigation             | `src/layouts/Layout.astro`: separate MYP and IB DP dropdowns, programme-specific existing destinations, shared resources in both menus, direct Vision and mission link | Programme attribution and separate resource destinations remain pending                                |
| MYP overview           | `src/pages/[locale]/myp.astro`, UI copy in `src/i18n/dictionaries.ts`, documents from `src/data/documents.ts`                                                          | Reuse existing overview, subject-group explanation, and resources; no need to replace the design       |
| DP overview            | `src/pages/[locale]/dp.astro` composes `ProgrammeOverview.astro` and links to the planner                                                                              | Keep its overview and move programme-specific destinations into the DP branch                          |
| Subjects               | Separate DP `subjects` and MYP `mypSubjects` collections; MYP uses eight groups, year coverage, and a Mathematics-only level field                                     | Two confirmed MYP Mathematics offerings published; other school subjects need confirmation             |
| News / events          | Keystatic collections have no programme-attribution field; `/news` is the merged feed; event detail routes exist under `/events`                                       | Classify existing entries before filtering; preserve individual news and event destinations            |
| Gallery                | `src/pages/[locale]/gallery.astro`: local imported photos and bilingual captions in a code-managed array                                                               | Add explicit programme attribution; confirm photo ownership rather than guessing from generic captions |
| Team                   | `team` JSON collection and `src/lib/team.ts`; shared renderer at `/myp/team` and `/dp/team`; independent programme roles/publication/order                             | Current DP roster and two confirmed MYP leaders migrated; school must confirm remaining MYP staff      |
| Admissions / documents | `/admissions` is shared; `admissionsDocuments` already groups files by `dp` / `myp`; `mypDocuments` exists separately                                                  | Reuse verified files and programme grouping; do not assume DP fees apply to MYP                        |
| Search                 | `src/lib/search-index.ts` builds links to the current subjects/news/CAS/TOK/events routes                                                                              | Update indexed URLs and programme context alongside route migration                                    |
| Sitemap / SEO          | `src/pages/sitemap.xml.ts` lists current flat routes; Layout derives canonical and locale alternates from the path                                                     | Update static and detail paths, breadcrumbs, structured data, and both locales together                |

## Recommended content approach — not yet implemented

- DP subjects and the diploma planner remain intact. The separate MYP subject
  schema/collection is implemented, keeping its year and group models independent.
- For news and general events, prefer one editorial record with explicit programme
  attribution: MYP, DP, or both. Do not infer attribution from titles, authors, dates,
  or the fact that old content lacks a field.
- Maintain a single teacher record with explicit programme membership and, where
  necessary, programme-specific responsibilities. Membership must be school-confirmed.
- Give each programme its own Policies and guides destination and an explicitly
  attributed resource list. A document that genuinely applies to both may be linked
  from both lists without duplicating the file; do not assume current policies or
  handbooks apply equally to MYP and DP.
- Keep optimized local gallery assets unless editor-managed gallery uploads are
  requested. A developer-maintained programme-tagged manifest can serve both branches.
- Keep assessment dates distinguishable from general events. Decide their editor
  workflow after seeing the school's actual calendar; no calendar integration is
  implied by the paper.
- Shared entries may appear in both programme listings. Decide a canonical detail
  URL policy before implementation so shared news does not accidentally create
  competing indexable copies.
- Do not manually edit Keystatic-managed `.mdoc` files. Plan classification and
  new subject entry creation through `/keystatic/` before the schema cutover.

## Information needed before publishing the split

These are not blockers to the notes; they are inputs for the later implementation.

- Actual MYP subject list by year, group, teacher, and English/Slovak naming.
- Remaining MYP teaching/support memberships and roles; DP roster and confirmed MYP leadership are already migrated to Keystatic.
- Attribution of existing news, events, and gallery photographs to MYP, DP, or both.
- School assessment guidance and the actual summative assessment calendar, including
  its academic year, year-group scope, and who updates it.
- School-approved Personal Project and Service as Action content. Existing MYP
  overview copy can be reused, but does not establish project examples or detailed rules.
- Which parent handbooks apply to each programme and whether the existing MYP Parent
  Pack satisfies the handwritten handbook request.
- Which policies and guides apply to MYP, DP, or both, and any missing
  programme-specific versions.
- Programme-specific admissions dates, fees, and forms not already supplied.
- Whether vacancies should be school-wide or programme-owned, and real vacancy text.
- Approval of the route/menu structure and the shared-entry canonical URL policy.

## Later implementation sequence

1. Confirm the section map and classify existing content; identify destinations that
   have enough real content to publish. Record explicit editorial ownership.
2. Add the required CMS/data support, preserving current DP subjects and planner
   behaviour. Prepare real MYP entries and programme attribution through the CMS.
3. Build programme-owned routes using existing components and visual conventions.
   Separate MYP projects from DP core content; retain shared school pages.
4. Cut over navigation, homepage links, footer, teacher-subject links, related items,
   search, sitemap, canonical URLs, and structured data together. Inventory old links
   and use explicit permanent redirects where a legacy URL has one clear successor;
   do not silently redirect ambiguous shared pages to DP.
5. Verify real content in both languages and the production Worker runtime before
   merging. Do not publish empty or “coming soon” destinations as finished pages.

## Acceptance checklist for that later work

- MYP and DP each have a coherent branch with their own subjects, news, gallery,
  team, policies and guides, admissions, assessment, events, and relevant resources.
- The shared School dropdown is gone; Vision and mission is a direct link to
  `/mission`, while Team and Policies and guides are in the programme branches.
- MYP Personal Project / Service as Action and DP TOK / EE / CAS stay distinct.
- MYP 3 shows Mathematics; MYP 4–5 shows Mathematics EL, without fabricated choices.
- Other MYP subjects do not display HL/SL or irrelevant level controls; DP rules
  and the diploma planner still work.
- Content is attributed deliberately; shared teachers/news/assets are not blindly
  copied, and neither programme claims the other's activities.
- Programme identity survives detail navigation, Apply links, and language switching.
- Desktop, mobile, keyboard, no-JS, and reduced-motion behaviour remain usable.
- Old URLs have a deliberate migration outcome; search and sitemap point to valid,
  correctly localized destinations with consistent SEO metadata.
- Run format, lint, Astro/TypeScript checks, and the production build; then exercise
  both branches in English and Slovak in a browser and confirm prerendered content.

The first confirmed navigation change is implemented; this plan records the
remaining programme separation work. No deployment was performed.
