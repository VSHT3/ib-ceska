# Content editing guide

Most website content is managed through the **Keystatic CMS admin panel** — a visual editor that requires no coding knowledge. You edit content in your browser, and changes are saved directly to the repository.

Both programme teams are editable in **Programme teams** in Keystatic:
`/dp/team` keeps the existing IB DP roster and `/myp/team` starts with the
confirmed MYP leadership. Each person has one shared name and portrait, with
separate programme profiles for roles, publication, leadership, and display order.

## MYP / IB DP navigation — content separation still pending

MYP and IB DP have separate dropdowns, team pages, and subject catalogues.
Policies and guides, News, Gallery, and Admissions still use shared destinations
pending programme attribution. The MYP catalogue currently contains the two
confirmed Mathematics offerings; add other courses only when the school confirms them.
See [PROGRAMME-STRUCTURE.md](PROGRAMME-STRUCTURE.md) for the remaining plan.

### Preparing the remaining materials

Four new collections are ready for data entry, but do not feed public pages yet:
**Policies and guides** (category, academic year/version, EN/SK documents or web text),
**Gallery albums** (photos, bilingual captions/alt text, permission confirmation),
**Assessment calendar** (subject, year/class, date, teacher), and **Vacancies**
(employment type, dates, application contact, bilingual job details).
All start as **Draft** and **Unclassified**. Mark MYP, DP, or Both only after confirmation;
use Approved once the school has reviewed the material. News/Events now have the same
programme selector; their existing public feed is unchanged.

**Uploaded files/images are public even in drafts.** Upload only materials cleared
for public hosting; do not upload confidential documents or unconsented photos.

## How to edit content

1. **Open the admin panel** — go to `/keystatic/` on the live website or `http://localhost:4321/keystatic/` during development
2. **Choose a collection** — Programme teams, IB DP subjects, IB MYP subjects, News, Events, CAS Activities, TOK Materials, Testimonials, Policies and guides, Gallery albums, Assessment calendar, or Vacancies (12 collections)
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
- Edits write to `.mdoc` files or `.json` records in `src/content/`
- No GitHub auth required — changes stay local

## Collections

### Programme teams (`src/content/team/`)

One entry represents one person, even if they work in both programmes.

- **Name / Slug:** keep the name consistent with the subject's Teacher field;
  DP subject links use exact trimmed name equality.
- **Portrait:** upload one shared photo; without a photo, the page shows initials.
- **IB Diploma Programme / Middle Years Programme:** edit each profile independently.
  Check **Publish on this programme’s team page** only for confirmed membership.
- **Leadership:** places that programme profile in the leadership section rather
  than the teaching/support grid.
- **Display Order:** lower numbers appear first within that programme and section.
- **Teaching areas / Responsibilities:** English lists with optional Slovak lists.
  Each empty Slovak list falls back to its English counterpart.

The migration retains all 17 existing people. The 14 previously visible profiles
remain published for DP; the three previously hidden, portraitless profiles remain
unpublished. MYP initially publishes Svetlana Veselová (Head of MYP, ATL Coordinator)
and Juraj Babic (MYP Coordinator). Confirm other MYP staff before publishing them.
Changing one programme's profile does not change the other programme's roles,
ordering, or publication; changing the shared name or portrait affects both.
Live saves trigger a rebuild as usual. Do not edit the JSON or portrait paths manually.

### IB MYP subjects (`src/content/myp-subjects/`)

Published at `/myp/subjects` and `/myp/subjects/<slug>`, separately from DP.
Choose the MYP subject group and at least one school year (MYP 3, 4, or 5).
Only Mathematics exposes a level field: **No separate level label** or
**Extended Level (EL)**. Other groups have no level field; MYP never uses HL/SL.
The current offerings are Mathematics in MYP 3 and Mathematics EL in MYP 4–5.

Edit the name, English description, optional teacher, display order, and optional
syllabus through Keystatic. Leave unknown teachers or syllabus details empty;
empty syllabus panels are omitted rather than showing “coming soon”.
Optional Slovak title/description/body fall back to English field by field.
Teacher names link from the MYP team only through exact trimmed name equality.
Add real school courses when confirmed; empty subject groups are not published.

### IB DP subjects (`src/content/subjects/`)

Each entry represents one IB DP subject offering, published under `/dp/subjects`.

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

Each entry is one CAS activity or project.

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

Theory of Knowledge essays, themes, and discussion materials.

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

Open evenings, deadlines, exhibitions, and key calendar dates. The `/events`
page automatically splits entries into **Upcoming** and **Past** based on
today's date — no manual archiving needed.

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

Each entry shows up in two places, both generated automatically:

- A **listing page** — the card grid at `/dp/subjects`, `/cas`, `/tok`, or `/news`. Shows the title, short description, and badges from the top fields.
- A **detail page** — its own page at `/dp/subjects/<name>`, `/cas/<name>`, `/tok/<name>`, or `/news/<name>`. This is where the **rich-text body** (`content` field) is shown in full. Cards on the listing pages link to these detail pages.

So: put the one-line summary in `description`/`excerpt`, and the full write-up (syllabus, reflection, essay, article) in the rich-text body.

## File format (for developers)

Content is stored as `.mdoc` files (YAML frontmatter + Markdoc body) in `src/content/`. The CMS handles this automatically — manual editing is not recommended unless you know what you're doing.

**Example `.mdoc` file:**

```yaml
---
title: Mathematics Analysis and Approaches
group: '5'
level: HL
description: Calculus, statistics, probability, and algebra
teacher: Lucia Horáčiková
order: 1
---
Full syllabus content here using rich text...
```

## Adding a new field

If a field is missing from the editor:

1. Update `keystatic.config.ts` — add the field to the schema
2. Restart the dev server (`pnpm run dev`)
3. The new field appears in the admin UI automatically
