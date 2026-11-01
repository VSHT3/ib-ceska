import { schoolCopy } from '../components/programme/school-copy';
import { getMypCurriculumPages } from '../data/myp-programme';
import type { Locale } from '../i18n/dictionaries';
import { l } from '../i18n/dictionaries';
import { pick, reader } from './keystatic';

/** A single searchable public page or Keystatic collection entry. */
export interface SearchItem {
  title: string;
  description: string;
  /** Human-readable collection label, e.g. 'Subject', 'News', 'CAS'. */
  type: string;
  href: string;
  locale: Locale;
  /** Concatenated searchable text: title + description/excerpt. */
  body: string;
}

/**
 * Build a flat, locale-resolved search index across public pages and Keystatic content.
 * Runs at build time inside page frontmatter; the result is serialized to JSON
 * and filtered client-side - no runtime reader calls.
 */
export async function buildSearchIndex(locale: Locale): Promise<SearchItem[]> {
  const [subjects, news, cas, tok, events] = await Promise.all([
    reader.collections.subjects.all(),
    reader.collections.news.all(),
    reader.collections.cas.all(),
    reader.collections.tok.all(),
    reader.collections.events.all(),
  ]);

  const items: SearchItem[] = [];

  for (const { href, title, description } of getMypCurriculumPages(locale)) {
    items.push({
      title,
      description,
      type: 'MYP',
      href: l(href, locale),
      locale,
      body: `${title} ${description}`,
    });
  }

  for (const programme of ['myp', 'dp'] as const) {
    const copy = schoolCopy(locale, programme);
    for (const section of ['mission', 'teachers', 'policies'] as const) {
      const { title, subtitle: description } = copy[section];
      items.push({
        title,
        description,
        type: programme === 'myp' ? 'MYP' : 'IB DP',
        href: l(`/${programme}/${section}`, locale),
        locale,
        body: `${title} ${description}`,
      });
    }
  }

  for (const { slug, entry } of subjects) {
    const title = pick(locale, entry.sk.title, entry.title);
    const description = pick(locale, entry.sk.description, entry.description);
    items.push({
      title,
      description,
      type: 'Subject',
      href: l(`/dp/subjects/${slug}`, locale),
      locale,
      body: `${title} ${description}`,
    });
  }

  for (const { slug, entry } of news) {
    const title = pick(locale, entry.sk.title, entry.title);
    const description = pick(locale, entry.sk.excerpt, entry.excerpt);
    items.push({
      title,
      description,
      type: 'News',
      href: l(`/news/${slug}`, locale),
      locale,
      body: `${title} ${description}`,
    });
  }

  for (const { slug, entry } of cas) {
    const title = pick(locale, entry.sk.title, entry.title);
    const description = pick(locale, entry.sk.description, entry.description);
    items.push({
      title,
      description,
      type: 'CAS',
      href: l(`/dp/cas/${slug}`, locale),
      locale,
      body: `${title} ${description}`,
    });
  }

  for (const { slug, entry } of tok) {
    const title = pick(locale, entry.sk.title, entry.title);
    const description = pick(locale, entry.sk.description, entry.description);
    items.push({
      title,
      description,
      type: 'TOK',
      href: l(`/dp/tok/${slug}`, locale),
      locale,
      body: `${title} ${description}`,
    });
  }

  // Events have their own detail page under /events/[slug].
  for (const { slug, entry } of events) {
    const title = pick(locale, entry.sk.title, entry.title);
    const description = pick(locale, entry.sk.description, entry.description);
    items.push({
      title,
      description,
      type: 'Event',
      href: l(`/events/${slug}`, locale),
      locale,
      body: `${title} ${description}`,
    });
  }

  return items;
}
