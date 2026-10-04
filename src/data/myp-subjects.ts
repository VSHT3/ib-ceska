export const mypSubjectGroups = [
  {
    value: 'language-literature',
    label: { en: 'Language and literature', sk: 'Jazyk a literatúra' },
  },
  {
    value: 'language-acquisition',
    label: { en: 'Language acquisition', sk: 'Osvojovanie jazyka' },
  },
  {
    value: 'individuals-societies',
    label: { en: 'Individuals and societies', sk: 'Jednotlivci a spoločnosti' },
  },
  {
    value: 'sciences',
    label: { en: 'Sciences', sk: 'Prírodné vedy' },
  },
  {
    value: 'mathematics',
    label: { en: 'Mathematics', sk: 'Matematika' },
  },
  {
    value: 'arts',
    label: { en: 'Arts', sk: 'Umenie' },
  },
  {
    value: 'physical-health-education',
    label: { en: 'Physical and health education', sk: 'Telesná a zdravotná výchova' },
  },
  {
    value: 'design',
    label: { en: 'Design', sk: 'Dizajn' },
  },
] as const;

export type MypSubjectGroup = (typeof mypSubjectGroups)[number]['value'];
export type MypYear = '3' | '4' | '5';

export function formatMypYears(years: readonly MypYear[]): string {
  if (years.length === 1) return `MYP ${years[0]}`;
  const sorted = [...years].sort();
  const first = sorted[0];
  const last = sorted.at(-1);
  return Number(last) - Number(first) === sorted.length - 1
    ? `MYP ${first}–${last}`
    : sorted.map((year) => `MYP ${year}`).join(', ');
}
