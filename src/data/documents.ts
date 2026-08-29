/**
 * Admissions & programme documents hosted at `/documents/<file>`.
 * Titles are the documents' own titles (proper nouns), shown as-is,
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

/**
 * The five IB school policies, shown on `/policies`.
 * Supplied by the IB DP coordinator (2026-07-25).
 */
export const policyDocuments: DocItem[] = [
  {
    file: 'admissions-policy.pdf',
    title: 'Admissions Policy',
    lang: 'EN',
    note: {
      en: 'Entrance exams, interviews, and how places on the Diploma Programme are offered.',
      sk: 'Prijímacie skúšky, pohovory a spôsob prideľovania miest v diplomovom programe.',
    },
  },
  {
    file: 'assessment-policy.pdf',
    title: 'Assessment Policy',
    lang: 'EN',
    note: {
      en: 'Internal assessment, predicted grades, and how progress is reported to families.',
      sk: 'Interné hodnotenie, predikované známky a spôsob informovania rodín o pokroku.',
    },
  },
  {
    file: 'academic-integrity-policy.pdf',
    title: 'Academic Integrity Policy',
    lang: 'EN',
    note: {
      en: 'Authentic work, referencing, malpractice, and guidance on the use of AI tools.',
      sk: 'Originálna práca, citovanie, nekalé praktiky a pokyny k používaniu nástrojov AI.',
    },
  },
  {
    file: 'language-policy.pdf',
    title: 'Language Policy',
    lang: 'EN',
    note: {
      en: 'Language of instruction, mother-tongue provision, and school-supported self-taught courses.',
      sk: 'Jazyk vyučovania, podpora materinského jazyka a kurzy so samostatným štúdiom pod vedením školy.',
    },
  },
  {
    file: 'inclusion-policy.pdf',
    title: 'Inclusion Policy',
    lang: 'EN',
    note: {
      en: 'Support for diverse learning needs, including IB inclusive access arrangements.',
      sk: 'Podpora rôznych vzdelávacích potrieb vrátane inkluzívnych opatrení IB.',
    },
  },
];

/** DP core handbooks, shown on `/policies` and on the matching core pages. */
export const guideDocuments: DocItem[] = [
  {
    file: 'cas-handbook.pdf',
    title: 'CAS Handbook',
    lang: 'EN',
    note: {
      en: 'Strands, timelines, reflection, and the seven CAS learning outcomes.',
      sk: 'Oblasti, termíny, reflexia a sedem vzdelávacích výstupov CAS.',
    },
  },
  {
    file: 'tok-handbook.pdf',
    title: 'TOK Handbook',
    lang: 'EN',
    note: {
      en: 'Course outline with guidance on the TOK exhibition and the TOK essay.',
      sk: 'Prehľad kurzu s pokynmi k TOK výstave a TOK eseji.',
    },
  },
];

/** Parent-facing handbooks, shown on `/policies`. */
export const parentDocuments: DocItem[] = [
  {
    file: 'ib-dp-parent-handbook.pdf',
    title: 'IB DP Parent Handbook',
    lang: 'EN',
    note: {
      en: 'Overview of the Diploma Programme and the school policies that matter most to families.',
      sk: 'Prehľad diplomového programu a školských politík, ktoré sú pre rodiny najdôležitejšie.',
    },
  },
  {
    file: 'ib-dp-prirucka-pre-rodicov.pdf',
    title: 'Príručka IB DP pre rodičov',
    lang: 'SK',
    note: {
      en: 'Slovak version of the parent handbook.',
      sk: 'Slovenská verzia príručky pre rodičov.',
    },
  },
];

/** IB certificate of authorization for the Diploma Programme, shown on `/mission`. */
export const authorizationDocument: DocItem = {
  file: 'ib-dp-authorization-certificate.pdf',
  title: 'Certificate of Authorization',
  lang: 'EN',
  note: {
    en: 'IB certificate authorizing the school to offer the Diploma Programme, signed July 2022.',
    sk: 'Certifikát IB, ktorý škole umožňuje ponúkať diplomový program, podpísaný v júli 2022.',
  },
};

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
    dp2: '-',
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
    dp1: '-',
    dp2: '89 € × 6 = 534 €',
  },
];
