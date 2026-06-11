# Content editing guide

All website content is managed through the **Keystatic CMS admin panel** — a visual editor that requires no coding knowledge. You edit content in your browser, and changes are saved directly to the repository.

## How to edit content

1. **Open the admin panel** — go to `/keystatic/` on the live website or `http://localhost:4321/keystatic/` during development
2. **Choose a collection** — Subjects, News, CAS Activities, or TOK Materials
3. **Click an entry** to edit, or **"Create"** to add a new one
4. **Fill in the fields** — use the form controls (text inputs, dropdowns, date pickers, rich text editor)
5. **Save** — changes are committed to GitHub

## Production workflow (GitHub OAuth)

When editing on the live site:
- You log in with your GitHub account
- Edits create commits directly to the repository
- Coolify detects the push and automatically redeploys the site
- Changes go live within seconds

## Local workflow

When running `npm run dev` locally:
- The admin panel is available at `http://localhost:4321/keystatic/`
- Edits write directly to `.mdoc` files in `src/content/`
- No GitHub auth required — changes stay local

## Collections

### Subjects (`src/content/subjects/`)

Each entry represents one IB subject offering.

**Fields:**

| Field        | Type     | Required | Description                                          |
| ------------ | -------- | -------- | ---------------------------------------------------- |
| `title`      | slug     | yes      | Subject name — also used as the URL slug             |
| `group`      | select   | yes      | IB group: 1 through 6, or Core                       |
| `level`      | select   | no       | HL or SL                                             |
| `description`| textarea | yes      | Brief course description                             |
| `teacher`    | text     | no       | Teacher's name and title                             |
| `order`      | number   | no       | Display order within the group (default: 0)          |
| `sk`         | group    | no       | Slovak translation (title, description, syllabus)    |
| `content`    | richtext | no       | Full syllabus details, assessment criteria, etc.     |

### CAS Activities (`src/content/cas/`)

Each entry is one CAS activity or project.

**Fields:**

| Field             | Type       | Required | Description                              |
| ----------------- | ---------- | -------- | ---------------------------------------- |
| `title`           | slug       | yes      | Activity name                            |
| `date`            | date       | yes      | When it took place                       |
| `strand`          | select     | yes      | Creativity, Activity, or Service         |
| `description`     | textarea   | yes      | Summary of the activity                  |
| `learningOutcomes`| list       | no       | IB learning outcomes addressed           |
| `sk`              | group      | no       | Slovak translation (title, description, reflection) |
| `content`         | richtext   | no       | Full reflection, evidence, photos        |

### TOK Materials (`src/content/tok/`)

Theory of Knowledge essays, themes, and discussion materials.

**Fields:**

| Field         | Type     | Required | Description                              |
| ------------- | -------- | -------- | ---------------------------------------- |
| `title`       | slug     | yes      | Essay or topic title                     |
| `date`        | date     | yes      | Publication date                         |
| `theme`       | select   | yes      | TOK theme (12 options)                   |
| `description` | textarea | yes      | Summary of the essay or discussion       |
| `sk`          | group    | no       | Slovak translation (title, summary, essay) |
| `content`     | richtext | no       | Full essay text                          |

### News (`src/content/news/`)

Announcements, exam schedules, and events.

**Fields:**

| Field     | Type     | Required | Description                     |
| --------- | -------- | -------- | ------------------------------- |
| `title`   | slug     | yes      | Headline                        |
| `date`    | date     | yes      | Publication date                |
| `excerpt` | textarea | no       | Short summary shown on listing  |
| `author`  | text     | no       | Author attribution              |
| `sk`      | group    | no       | Slovak translation (title, excerpt, body) |
| `content` | richtext | no       | Full article body               |

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
- Fixed UI text (menus, headings, buttons) is translated in code — you don't need to touch it.

## File format (for developers)

Content is stored as `.mdoc` files (YAML frontmatter + Markdoc body) in `src/content/`. The CMS handles this automatically — manual editing is not recommended unless you know what you're doing.

**Example `.mdoc` file:**
```yaml
---
title: Mathematics Analysis and Approaches
group: "5"
level: HL
description: Calculus, statistics, probability, and algebra
teacher: Mgr. Ondřej Bílý
order: 1
---

Full syllabus content here using rich text...
```

## Adding a new field

If a field is missing from the editor:

1. Update `keystatic.config.ts` — add the field to the schema
2. Restart the dev server (`npm run dev`)
3. The new field appears in the admin UI automatically
