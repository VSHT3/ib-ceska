# Humans — collaborate on the IB website

Welcome. This is the documentation hub for human collaborators of the IB at Súkromné Gymnázium Česká website. No prior web dev experience required — these docs explain everything you need to contribute.

## What's here

| File               | Purpose                                       |
| ------------------ | --------------------------------------------- |
| `handover.pdf`     | Original handover brief from project inception |
| `README.md`        | This file — where to start                    |
| `CONTENT.md`       | How to add and edit content                   |
| `DESIGN.md`        | Design choices and style guide                |

## Who this is for

- **IB coordinators** adding subjects, CAS entries, or news
- **Teachers** updating their subject pages
- **Students** logging CAS activities
- **Anyone** who needs to change what appears on the site

## Quickest path to making a change

1. Find the matching `.mdx` file under `src/content/`
2. Edit the frontmatter (the stuff between the `---` lines)
3. Ask someone technical to run `npm run build` and deploy

That's it. No HTML, no CSS, no JavaScript required. The frontmatter fields are documented in [`CONTENT.md`](CONTENT.md).

## When you need help

- For content questions, start with [`CONTENT.md`](CONTENT.md)
- For visual/style questions, see [`DESIGN.md`](DESIGN.md)
- For technical issues, find a developer and point them to the root `AGENTS.md`

## Project overview

The site is built with **Astro**, a modern static site framework. Content lives in Markdown files (`.mdx`) with structured metadata called *frontmatter*. The framework reads these files, applies the layout and design, and outputs a static website — no database, no server-side code.
