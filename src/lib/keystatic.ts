import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

export const reader = createReader(process.cwd(), config);

/** Pick the Slovak translation when present, otherwise fall back to English. */
export function pick(locale: string, sk: string | null | undefined, en: string): string {
  return locale === 'sk' && sk ? sk : en;
}

/**
 * Seeded content carries a `SAMPLE —` prefix so editors can see the expected shape
 * of an entry in Keystatic before real content exists. It must never reach visitors:
 * a school's credibility does not survive fake quotes attributed to named students.
 *
 * Filtering here rather than deleting the entries keeps them available as templates
 * in the CMS, and means an entry publishes itself the moment an editor replaces the
 * placeholder text — there is no second flag to remember to flip.
 */
export const PLACEHOLDER = /^\s*SAMPLE\s*[—–-]/;
