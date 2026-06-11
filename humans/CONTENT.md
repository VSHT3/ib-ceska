# Content editing guide

All website content lives in `.mdx` files under `src/content/`. Each file has *frontmatter* (metadata between `---` markers) that the site uses to display the content correctly.

## Collections

### subjects (`src/content/subjects/`)

Each file represents one IB subject offering.

**Fields:**

| Field        | Type     | Required | Description                                          |
| ------------ | -------- | -------- | ---------------------------------------------------- |
| `title`      | string   | yes      | Subject name (e.g. "English Language and Literature") |
| `group`      | enum     | yes      | IB group: `"1"`, `"2"`, `"3"`, `"4"`, `"5"`, `"6"`, or `"core"` |
| `level`      | enum     | no       | Offering level: `"HL"`, `"SL"`, or `"both"`         |
| `description`| string   | yes      | Brief description of the course                      |
| `teacher`    | string   | no       | Teacher's name and title                             |
| `order`      | number   | no       | Display order within the group (default: 0)          |

**Example:**
```mdx
---
title: "Mathematics: Analysis and Approaches"
group: "5"
level: "HL"
order: 1
description: "Calculus, statistics, probability, and algebra."
teacher: "Mgr. Ondřej Bílý"
---
```

### cas (`src/content/cas/`)

Each file is one CAS activity entry.

**Fields:**

| Field             | Type           | Required | Description                              |
| ----------------- | -------------- | -------- | ---------------------------------------- |
| `title`           | string         | yes      | Activity name                            |
| `date`            | date           | yes      | When it happened (YYYY-MM-DD)            |
| `strand`          | enum           | yes      | `"Creativity"`, `"Activity"`, or `"Service"` |
| `description`     | string         | yes      | What was done                            |
| `learningOutcomes`| array of string| no       | IB learning outcomes addressed (e.g. `"LO1: Awareness of strengths"`) |

**Example:**
```mdx
---
title: "School theatre production"
date: 2025-11-20
strand: "Creativity"
description: "IB students wrote and performed an original play."
learningOutcomes:
  - "LO1: Awareness of strengths"
  - "LO4: Perseverance and commitment"
---
```

### tok (`src/content/tok/`)

Theory of Knowledge essays, themes, and discussion materials.

**Fields:**

| Field         | Type   | Required | Description                            |
| ------------- | ------ | -------- | -------------------------------------- |
| `title`       | string | yes      | Essay or topic title                   |
| `date`        | date   | yes      | Publication date (YYYY-MM-DD)         |
| `theme`       | string | yes      | TOK theme (e.g. "Ethics", "Language as a Way of Knowing") |
| `description` | string | yes      | Summary of the essay or discussion     |

**Example:**
```mdx
---
title: "Ethical limits of artificial intelligence"
date: 2025-11-10
theme: "Ethics"
description: "Discussion material on AI ethics — connecting natural and human sciences."
---
```

### news (`src/content/news/`)

Announcements, exam schedules, and events.

**Fields:**

| Field     | Type   | Required | Description                     |
| --------- | ------ | -------- | ------------------------------- |
| `title`   | string | yes      | Headline                        |
| `date`    | date   | yes      | Publication date (YYYY-MM-DD)  |
| `excerpt` | string | no       | Short summary shown on listing  |
| `author`  | string | no       | Author attribution              |

**Example:**
```mdx
---
title: "IB exams 2026 — schedule published"
date: 2025-11-01
excerpt: "The IB has released the official exam schedule for the May 2026 session."
author: "IB Coordinator"
---
```

## Language

**All new content must be written in English.** Czech placeholder text that already exists will be replaced with English. Slovak translations will be added later as an i18n option.

## Adding a new file

1. Create a new `.mdx` file in the appropriate `src/content/` subdirectory
2. Add the required frontmatter fields (see tables above)
3. Rebuild the site: `npm run build`

**File naming:** Use lowercase, hyphenated slugs (e.g. `ib-exams-2026.mdx`). The filename becomes part of the URL if individual pages are added later.

## Adding a new frontmatter field

If you need a field that doesn't exist yet:

1. Update the Zod schema in `src/content.config.ts`
2. Add the field to all existing files in that collection
3. Use it in the relevant Astro page component under `src/pages/`
