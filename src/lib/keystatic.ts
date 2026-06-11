import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

export const reader = createReader(process.cwd(), config);

/** Pick the Slovak translation when present, otherwise fall back to English. */
export function pick(locale: string, sk: string | null | undefined, en: string): string {
  return locale === 'sk' && sk ? sk : en;
}
