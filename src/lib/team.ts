import type { Locale } from '../i18n/dictionaries';
import { reader } from './keystatic';

export type Programme = 'myp' | 'dp';

export interface TeamMember {
  slug: string;
  name: string;
  image: string | null;
  leadership: boolean;
  areas: readonly string[];
  responsibilities: readonly string[];
}

export async function getTeam(programme: Programme, locale: Locale): Promise<TeamMember[]> {
  const members = await reader.collections.team.all();

  return members
    .filter(({ entry }) => entry[programme].published)
    .sort(
      (a, b) =>
        (a.entry[programme].order ?? 0) - (b.entry[programme].order ?? 0) ||
        a.slug.localeCompare(b.slug),
    )
    .map(({ slug, entry }) => {
      const profile = entry[programme];
      return {
        slug,
        name: entry.name,
        image: entry.photo,
        leadership: profile.leadership,
        areas: locale === 'sk' && profile.sk.areas.length ? profile.sk.areas : profile.areas,
        responsibilities:
          locale === 'sk' && profile.sk.responsibilities.length
            ? profile.sk.responsibilities
            : profile.responsibilities,
      };
    });
}
