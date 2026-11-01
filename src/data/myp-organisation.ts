// Source: the school's supplied MYP organisational chart, September 2026–June 2027.
// Keep this year-specific structure separate from the general IB/DP faculty roster.
type LocalizedLabel = { en: string; sk: string };
interface MypRole {
  label: LocalizedLabel;
  name: string | null;
  children?: MypRole[];
}

export const mypLeadership = {
  head: {
    name: 'Svetlana Veselová',
    title: { en: 'Head of MYP', sk: 'Vedúca MYP' },
  },
  coordination: [
    {
      name: 'Juraj Babic',
      title: { en: 'MYP coordinator', sk: 'Koordinátor MYP' },
      detail: { en: 'MYP & ManageBac administrator', sk: 'Administrátor MYP a ManageBac' },
    },
    {
      name: 'Svetlana Veselová',
      title: { en: 'MYP procedural manager', sk: 'Manažérka procesov MYP' },
    },
  ],
};

export const mypSupport: MypRole[] = [
  { label: { en: 'MYP librarian', sk: 'Knihovník MYP' }, name: 'Brooks Guetschow' },
  { label: { en: 'MYP counsellor', sk: 'Poradca MYP' }, name: null },
  {
    label: { en: 'Interdisciplinary learning (ID)', sk: 'Medzipredmetové vzdelávanie (ID)' },
    name: 'Ivana Antoš',
  },
  {
    label: { en: 'Service as action (SA)', sk: 'Služba ako činnosť (SA)' },
    name: 'Katarína Nagy',
  },
  {
    label: { en: 'Approaches to learning (ATL)', sk: 'Prístupy k učeniu (ATL)' },
    name: 'Svetlana Veselová',
  },
  {
    label: { en: 'Personal project (PP)', sk: 'Osobný projekt (PP)' },
    name: 'Matej Krchňák',
    children: [
      {
        label: { en: 'Personal project supervisors', sk: 'Školitelia osobných projektov' },
        name: null,
      },
    ],
  },
];

export const mypSubjectLeaders: MypRole[] = [
  { label: { en: 'Design', sk: 'Dizajn' }, name: 'Kristína Javornická' },
  {
    label: { en: 'Language and literature (LL)', sk: 'Jazyk a literatúra (LL)' },
    name: 'Ján Gonda',
  },
  {
    label: {
      en: 'English as an additional language & language acquisition (EAL & LA)',
      sk: 'Angličtina ako ďalší jazyk a osvojovanie jazyka (EAL & LA)',
    },
    name: 'Katarína Nagy',
  },
  { label: { en: 'Mathematics', sk: 'Matematika' }, name: 'Miroslav Rohárik' },
  {
    label: { en: 'Individuals and societies (IS)', sk: 'Jednotlivci a spoločnosti (IS)' },
    name: 'Jana Šišmišová',
  },
  { label: { en: 'Sciences', sk: 'Prírodné vedy' }, name: 'Ivana Antoš' },
  {
    label: { en: 'Physical and health education (PHE)', sk: 'Telesná a zdravotná výchova (PHE)' },
    name: 'Matúš Vasiľ',
  },
  { label: { en: 'Arts', sk: 'Umenie' }, name: 'Sofia Nováková' },
];

export const mypHomerooms = [
  { year: 5, grade: 11, classes: ['III.D'], teachers: ['L. Hrdličková'] },
  {
    year: 4,
    grade: 10,
    classes: ['II.B', 'II.F'],
    teachers: ['Katarína Nagy', 'Jakeline Jimenez'],
  },
  { year: 3, grade: 9, classes: ['I.A'], teachers: ['H. Zacharčoková'] },
];
