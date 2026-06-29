/**
 * Admissions & programme documents hosted at `/documents/<file>`.
 * Titles are the documents' own titles (proper nouns) — shown as-is,
 * with a language badge so visitors know which language a file is in.
 * Fees are rendered as HTML (see `dpFees`), not a PDF.
 */

export type DocLang = 'EN' | 'SK';

export interface DocItem {
  file: string;
  title: string;
  lang: DocLang;
  note: { en: string; sk: string };
}

/** DP + MYP admissions-process documents, shown on `/admissions`. */
export const admissionsDocuments: { group: 'dp' | 'myp'; items: DocItem[] }[] = [
  {
    group: 'dp',
    items: [
      {
        file: 'dp-admissions-announcement.pdf',
        title: 'DP Admissions Announcement',
        lang: 'EN',
        note: {
          en: 'Overview of the DP entrance exam dates, subjects, and interview.',
          sk: 'Prehľad termínov prijímacích skúšok, predmetov a pohovoru do DP.',
        },
      },
      {
        file: 'dp-application-form.pdf',
        title: 'DP Application Form',
        lang: 'EN',
        note: {
          en: 'Entrance exams registration form (English).',
          sk: 'Prihláška na prijímacie skúšky (v angličtine).',
        },
      },
      {
        file: 'prihlaska-na-prijimacie-konanie.pdf',
        title: 'Prihláška na prijímacie konanie',
        lang: 'SK',
        note: {
          en: 'Application form for the admissions process (Slovak).',
          sk: 'Prihláška na prijímacie konanie (v slovenčine).',
        },
      },
      {
        file: 'informacie-o-prijimacom-konani.pdf',
        title: 'Informácie o prijímacom konaní',
        lang: 'SK',
        note: {
          en: 'Details of the DP admissions process and exam day (Slovak).',
          sk: 'Podrobnosti o prijímacom konaní do DP a priebehu skúšok.',
        },
      },
    ],
  },
  {
    group: 'myp',
    items: [
      {
        file: 'myp-admissions-announcement.pdf',
        title: 'MYP Admissions Announcement',
        lang: 'SK',
        note: {
          en: 'MYP admissions announcement with deadlines and contacts (Slovak).',
          sk: 'Oznam o prijímacom konaní do MYP s termínmi a kontaktmi.',
        },
      },
    ],
  },
];

/** MYP programme-info documents, shown on `/myp`. */
export const mypDocuments: DocItem[] = [
  {
    file: 'myp-on-ceska.pdf',
    title: 'MYP at Česká',
    lang: 'SK',
    note: {
      en: 'Short overview of MYP at our school (Slovak).',
      sk: 'Krátky prehľad MYP na našej škole.',
    },
  },
  {
    file: 'myp-parent-pack.pdf',
    title: 'MYP Parent Pack',
    lang: 'EN',
    note: {
      en: 'Official IB guide to the MYP for parents (English).',
      sk: 'Oficiálne IB vydanie MYP pre rodičov (v angličtine).',
    },
  },
];

/** DP school fees, rendered as an HTML table on `/admissions`. */
export interface FeeRow {
  item: { en: string; sk: string };
  detail?: { en: string; sk: string };
  dp1: string;
  dp2: string;
}

export const dpFees: FeeRow[] = [
  {
    item: { en: 'School fees', sk: 'Školné' },
    detail: { en: 'in 3 instalments', sk: 'v 3 splátkach' },
    dp1: '5 100 €',
    dp2: '5 100 €',
  },
  {
    item: { en: 'Function fee', sk: 'Ročný poplatok' },
    detail: {
      en: 'Coursebooks, subscriptions, learning platforms, ManageBac, ThinkIB, Revision Village, Question Bank, etc.',
      sk: 'Učebnice, predplatné, vzdelávacie platformy, ManageBac, ThinkIB, Revision Village, Question Bank atď.',
    },
    dp1: '350 €',
    dp2: '350 €',
  },
  {
    item: { en: 'Entry fee (external students)', sk: 'Zápisné pre študentov z iných škôl' },
    dp1: '300 €',
    dp2: '—',
  },
  {
    item: { en: 'Class fund', sk: 'Triedny fond' },
    detail: {
      en: 'cinema, theatre, trips, excursions',
      sk: 'kino, divadlo, výlety, exkurzie',
    },
    dp1: '100 €',
    dp2: '100 €',
  },
  {
    item: { en: 'IB Final Exams', sk: 'IB záverečné skúšky' },
    dp1: '—',
    dp2: '89 € × 6 = 534 €',
  },
];
