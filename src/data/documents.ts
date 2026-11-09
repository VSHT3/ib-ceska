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
        title: 'DP Admissions Announcement 2027–2028',
        lang: 'EN',
        note: {
          en: 'Application deadline, entrance exam dates, subjects, and interview.',
          sk: 'Termín podania prihlášky, termíny prijímacích skúšok, predmety a pohovor.',
        },
      },
      {
        file: 'informacie-o-prijimacom-konani.pdf',
        title: 'Informácie o prijímacom konaní 2027/2028',
        lang: 'SK',
        note: {
          en: 'Details of the DP admissions process and exam day (Slovak).',
          sk: 'Podrobnosti o prijímacom konaní do DP a priebehu skúšok.',
        },
      },
      {
        file: 'dp-application-form.pdf',
        title: 'DP Application Form 2027–2028',
        lang: 'EN',
        note: {
          en: 'Entrance exams registration form (English).',
          sk: 'Prihláška na prijímacie skúšky (v angličtine).',
        },
      },
      {
        file: 'prihlaska-na-prijimacie-konanie.pdf',
        title: 'Prihláška na prijímacie konanie 2027/2028',
        lang: 'SK',
        note: {
          en: 'Application form for the admissions process (Slovak).',
          sk: 'Prihláška na prijímacie konanie (v slovenčine).',
        },
      },
      {
        file: 'pravidla-prijimania-ib-dp.pdf',
        title: 'Pravidlá prijímania do IB Diploma Programme 2027–2028',
        lang: 'SK',
        note: {
          en: 'Admission criteria, entrance exam syllabi, and subject options (Slovak).',
          sk: 'Kritériá prijímania, osnovy prijímacích skúšok a možnosti výberu predmetov.',
        },
      },
      {
        file: 'dp-subject-selection.pdf',
        title: 'Course Selection Sheet 2027–2028',
        lang: 'EN',
        note: {
          en: 'Non-binding subject choice form with draft subject pathways.',
          sk: 'Nezáväzný formulár na výber predmetov s návrhmi kombinácií (v angličtine).',
        },
      },
      {
        file: 'vyber-predmetov.pdf',
        title: 'Formulár na výber predmetov 2027–2028',
        lang: 'SK',
        note: {
          en: 'Subject choice form with draft subject pathways (Slovak).',
          sk: 'Nezáväzný formulár na výber predmetov s návrhmi kombinácií.',
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
 * The five IB DP school policies, shown on `/dp/policies`; relevant shared policies also appear on `/myp/policies`.
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

/** DP core handbooks, shown on `/dp/policies` and on the matching DP core pages. */
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
  {
    file: 'ee-supervision-guide.pdf',
    title: 'EE Supervision',
    lang: 'EN',
    note: {
      en: 'School supervision procedures for the Extended Essay, by the EE coordinator.',
      sk: 'Školské postupy vedenia rozšírenej eseje od koordinátorky EE.',
    },
  },
];

/** Parent-facing DP handbooks, shown on `/dp/policies`. */
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
    dp1: '5 700 €',
    dp2: '5 700 €',
  },
  {
    item: { en: 'Annual resources fee', sk: 'Ročný poplatok' },
    detail: {
      en: 'Coursebooks, subscriptions, learning platforms, ManageBac, InThinking (ThinkIB), Revision Village, question banks, etc.',
      sk: 'Učebnice, predplatné, vzdelávacie platformy, ManageBac, InThinking (ThinkIB), Revision Village, databáza otázok a pod.',
    },
    dp1: '400 €',
    dp2: '400 €',
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
    item: { en: 'IB final examinations', sk: 'Záverečné skúšky IB' },
    dp1: '-',
    dp2: '95,50 € × 6 = 573 €',
  },
];
