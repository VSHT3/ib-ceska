# Content editing guide

Keystatic manages **DP subjects, CAS activities, TOK materials, news, events, and unpublished testimonials** through a visual editor. Programme reference pages and team data are maintained by a developer, not through new CMS collections.

## Programme ownership

- **MYP curriculum:** bilingual reference content in `src/data/myp-programme.ts`, used by `/myp/subjects` and the four `/myp/core/…` pages. This is the MYP learning framework, not a DP HL/SL course catalogue or a confirmed yearly timetable.
- **MYP team:** the connected organisational chart appears only on `/myp/teachers`. Its roster and hierarchy come from `src/data/myp-organisation.ts`; keep class/year labels and teacher assignments explicit.
- **DP team:** the separate portrait roster on `/dp/teachers` comes from `src/data/teachers.ts` and local portraits in `src/assets/teachers/`. Use school-confirmed staff information and supplied portraits; provide both English and Slovak subject labels. Astro generates responsive image variants.
- **Programme mission and policies:** renderers and bilingual school copy live in `src/components/programme/`; the prerendered route `src/pages/[locale]/[programme]/[section].astro` generates mission, teachers, and policies for both programmes. Document metadata is maintained in `src/data/documents.ts`.
- **DP CMS content:** existing `src/content/subjects/`, `src/content/cas/`, and `src/content/tok/` storage stays unchanged. Only public URLs move under `/dp`; do not create duplicate MYP entries in those collections.

**Authorization boundary:** MYP remains a **candidate programme** and must retain the candidate-school disclaimer and text-only branding. Candidacy is not authorization and does not guarantee authorization. DP is authorized; its authorization wording, official DP branding, and certificate must not be presented as evidence of MYP authorization. MYP service as action and personal project are not DP CAS and EE.

## How to edit content

1. **Open the admin panel** — go to `/keystatic/` on the live website or `http://localhost:4321/keystatic/` during development
2. **Choose a collection** — Subjects, News, Events, CAS Activities, TOK Materials, or Testimonials (6 collections)
3. **Click an entry** to edit, or **"Create"** to add a new one
4. **Fill in the fields** — use the form controls (text inputs, dropdowns, date pickers, rich text editor)
5. **Save** — changes are committed to GitHub

## Production workflow (Keystatic Cloud)

On the live site, editors log in to Keystatic Cloud with their
own invited accounts. **Teachers do not need GitHub accounts.** The site owner
connects Keystatic Cloud to the GitHub repository once; editors save content
through Cloud, which commits to `main` and triggers an automatic Worker rebuild.
Changes appear after the build succeeds, not immediately upon pressing Save.

### Adding or removing an editor

1. A Keystatic Cloud team administrator invites each teacher using their own email
   address. Do not share one login.
2. The teacher accepts the invitation and signs in at `/keystatic/`.
3. To remove access, remove that user from the Keystatic Cloud team. Team access
   applies to every project in that team, so keep unrelated sites in other teams.

The free team has a three-user limit: one owner and two teachers fit. See the
[Keystatic Cloud guide](https://keystatic.com/docs/cloud) for current plan details.
The owner still needs GitHub access to connect and maintain the repository.

## Local workflow

When running `pnpm run dev` locally:

- The admin panel is available at `http://localhost:4321/keystatic/`
- Edits write directly to `.mdoc` files in `src/content/`
- No GitHub auth required — changes stay local

## Collections

### Subjects (`src/content/subjects/`)

Each entry represents one **DP** subject offering, published under `/dp/subjects`. MYP subject groups are maintained separately as reference data.

**Fields:**

| Field           | Type     | Required | Description                                                                                                    |
| --------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `title`         | slug     | yes      | Subject name — also used as the URL slug                                                                       |
| `group`         | select   | yes      | IB group: 1 through 6, or Core                                                                                 |
| `level`         | select   | no       | HL or SL — the level shown on the catalogue card                                                               |
| `offeredLevels` | select   | no       | HL & SL / HL only / SL only — controls which levels the diploma builder lets a student pick (default: HL & SL) |
| `description`   | textarea | yes      | Brief course description                                                                                       |
| `teacher`       | text     | no       | Teacher's name and title                                                                                       |
| `order`         | number   | no       | Display order within the group (default: 0)                                                                    |
| `sk`            | group    | no       | Slovak translation (title, description, syllabus)                                                              |
| `content`       | richtext | no       | Full syllabus details, assessment criteria, etc.                                                               |

### CAS Activities (`src/content/cas/`)

Each entry is one **DP CAS** activity or project, published under `/dp/cas`, not an MYP service-as-action record.

**Fields:**

| Field              | Type         | Required | Description                                                                 |
| ------------------ | ------------ | -------- | --------------------------------------------------------------------------- |
| `title`            | slug         | yes      | Activity name                                                               |
| `date`             | date         | yes      | When it took place                                                          |
| `strands`          | multi-select | yes      | One or more of Creativity, Activity, Service (an activity can span several) |
| `description`      | textarea     | yes      | Summary of the activity                                                     |
| `learningOutcomes` | list         | no       | IB learning outcomes addressed                                              |
| `sk`               | group        | no       | Slovak translation (title, description, reflection)                         |
| `content`          | richtext     | no       | Full reflection, evidence, photos                                           |

### TOK Materials (`src/content/tok/`)

**DP Theory of Knowledge** essays, themes, and discussion materials, published under `/dp/tok`.

**Fields:**

| Field         | Type     | Required | Description                                |
| ------------- | -------- | -------- | ------------------------------------------ |
| `title`       | slug     | yes      | Essay or topic title                       |
| `date`        | date     | yes      | Publication date                           |
| `theme`       | select   | yes      | TOK theme (12 options)                     |
| `description` | textarea | yes      | Summary of the essay or discussion         |
| `sk`          | group    | no       | Slovak translation (title, summary, essay) |
| `content`     | richtext | no       | Full essay text                            |

### News (`src/content/news/`)

Announcements, exam schedules, and events.

**Fields:**

| Field     | Type     | Required | Description                               |
| --------- | -------- | -------- | ----------------------------------------- |
| `title`   | slug     | yes      | Headline                                  |
| `date`    | date     | yes      | Publication date                          |
| `excerpt` | textarea | no       | Short summary shown on listing            |
| `author`  | text     | no       | Author attribution                        |
| `sk`      | group    | no       | Slovak translation (title, excerpt, body) |
| `content` | richtext | no       | Full article body                         |

### Events (`src/content/events/`)

Open evenings, deadlines, exhibitions, and key calendar dates. Events share the
`/news` feed with news articles and link to detail pages at `/events/<slug>`.

**Fields:**

| Field         | Type     | Required | Description                                      |
| ------------- | -------- | -------- | ------------------------------------------------ |
| `title`       | slug     | yes      | Event name                                       |
| `date`        | date     | yes      | Start date                                       |
| `endDate`     | date     | no       | End date — only for multi-day events             |
| `time`        | text     | no       | e.g. `17:00–19:30`; blank shows "All day"        |
| `location`    | text     | no       | Where it happens                                 |
| `description` | textarea | no       | Short summary shown on the card                  |
| `sk`          | group    | no       | Slovak translation (title, description, details) |
| `content`     | richtext | no       | Full details                                     |

### Testimonials (`src/content/testimonials/`)

The CMS collection contains three sample templates, but testimonials are currently
**not published** on the site. Editing or featuring an entry does not make it public:
the public page, homepage strip, search results and links must be restored separately
once the school supplies real quotes and written consent (including parental consent
for minors). Do not share a student's name, quote or photo without that consent.

**Fields:**

| Field      | Type     | Required | Description                                                                 |
| ---------- | -------- | -------- | --------------------------------------------------------------------------- |
| `name`     | slug     | yes      | Student/alumnus name (or first name + initial for privacy)                  |
| `role`     | text     | no       | e.g. "DP2 student" or "Alumna, Class of 2024 — now at LSE"                  |
| `gradYear` | number   | no       | Graduation year                                                             |
| `photo`    | image    | no       | Headshot — **only with written consent**; a coloured initial shows if empty |
| `order`    | number   | no       | Display order (lower = first)                                               |
| `featured` | checkbox | no       | Reserved for the homepage strip when testimonials are restored              |
| `sk`       | group    | no       | Slovak translation (role, quote)                                            |
| `quote`    | textarea | yes      | The testimonial itself                                                      |

## Language — English + Slovak

The website shows every page in **English** (`/en/…`) and **Slovak** (`/sk/…`). Content works like this:

- **English is the primary language.** Write the main fields (title, description, body) in English.
- Every entry has a **"Slovak translation"** section at the bottom of the editor form with optional Slovak fields (title, description/excerpt, body).
- **Fill in what you can — leave the rest empty.** Wherever a Slovak field is empty, visitors on the Slovak site automatically see the English text instead. Nothing breaks.
- Slovak fields per collection:
  - **Subjects** — title, description, syllabus details
  - **News** — title, excerpt, article body
  - **CAS** — title, description, reflection
  - **TOK** — title, summary, full essay
  - **Events** — title, description, details
- Fixed UI text (menus, headings, buttons) is translated in code — you don't need to touch it.

## Where content appears on the site

Public collection entries have a listing and a detail page (testimonials remain unpublished):

- **DP subjects:** `/dp/subjects` and `/dp/subjects/<slug>`
- **DP CAS:** `/dp/cas` and `/dp/cas/<slug>`
- **DP TOK:** `/dp/tok` and `/dp/tok/<slug>`
- **Shared news:** `/news` and `/news/<slug>`; events share this feed and use `/events/<slug>` details

Listing cards show summaries and badges; detail pages display the rich-text body (`content` field).

So: put the one-line summary in `description`/`excerpt`, and the full write-up (syllabus, reflection, essay, article) in the rich-text body.

## Programme routes and old links

All public paths here are relative to `/en` or `/sk` (for example, `/sk/myp/teachers`).

| Section         | MYP                                                                                                                                     | IB DP                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Overview        | `/myp`                                                                                                                                  | `/dp`                                                                               |
| Subjects        | `/myp/subjects`                                                                                                                         | `/dp/subjects` and `/dp/subjects/<slug>`                                            |
| Core            | `/myp/core/interdisciplinary-learning`, `/myp/core/approaches-to-learning`, `/myp/core/service-as-action`, `/myp/core/personal-project` | **IB DP Core**: `/dp/cas`, `/dp/tok`, `/dp/ee`; CAS/TOK also have `/<slug>` details |
| Mission         | `/myp/mission`                                                                                                                          | `/dp/mission`                                                                       |
| Team            | `/myp/teachers`                                                                                                                         | `/dp/teachers`                                                                      |
| Policies        | `/myp/policies`                                                                                                                         | `/dp/policies`                                                                      |
| Diploma builder | Not applicable                                                                                                                          | `/dp/build-your-diploma`                                                            |

The top-level **MYP** and **IB DP** menus expose each programme's own sections. Desktop menus support hover, click, and keyboard use; mobile menus have expandable programme sections. News, gallery, admissions, and search remain shared.

Old locale-prefixed `/subjects`, `/cas`, `/tok`, `/ee`, `/build-your-diploma`, `/mission`, `/teachers`, and `/policies` links return **HTTP 301** to their `/dp` equivalents, including subject/CAS/TOK detail slugs. Query strings are preserved; unsupported locales are rejected. Use the new programme URLs in new links.

## File storage (for developers)

Keystatic stores YAML frontmatter and Markdoc bodies as `.mdoc` files in `src/content/`. **Use `/keystatic/` to edit entries; do not edit `.mdoc` files manually.** Moving a public page under `/dp` does not move its collection files or add CMS fields.

## Adding a new field

If a field is missing from the editor:

1. Update `keystatic.config.ts` — add the field to the schema
2. Restart the dev server (`pnpm run dev`)
3. The new field appears in the admin UI automatically
