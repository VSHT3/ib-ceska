// Source: the school's supplied MYP organisational chart, September 2026–June 2027.
// Keep this year-specific structure separate from the general IB/DP faculty roster.
type LocalizedLabel = { en: string; sk: string };
interface MypRole {
  id?: string;
  href?: string;
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
    href: '/myp/core/interdisciplinary-learning',
  },
  {
    label: { en: 'Service as action (SA)', sk: 'Služba ako činnosť (SA)' },
    name: 'Katarína Nagy',
    href: '/myp/core/service-as-action',
  },
  {
    label: { en: 'Approaches to learning (ATL)', sk: 'Prístupy k učeniu (ATL)' },
    name: 'Svetlana Veselová',
    href: '/myp/core/approaches-to-learning',
  },
  {
    label: { en: 'Personal project (PP)', sk: 'Osobný projekt (PP)' },
    name: 'Matej Krchňák',
    href: '/myp/core/personal-project',
    children: [
      {
        label: { en: 'Personal project supervisors', sk: 'Školitelia osobných projektov' },
        name: null,
      },
    ],
  },
];

export const mypSubjectLeaders: MypRole[] = [
  {
    id: 'design',
    href: '/myp/subjects#design',
    label: { en: 'Design', sk: 'Dizajn' },
    name: 'Kristína Javornická',
  },
  {
    id: 'language-and-literature',
    href: '/myp/subjects#language-and-literature',
    label: { en: 'Language and literature (LL)', sk: 'Jazyk a literatúra (LL)' },
    name: 'Ján Gonda',
  },
  {
    id: 'language-acquisition',
    href: '/myp/subjects#language-acquisition',
    label: {
      en: 'English as an additional language & language acquisition (EAL & LA)',
      sk: 'Angličtina ako ďalší jazyk a osvojovanie jazyka (EAL & LA)',
    },
    name: 'Katarína Nagy',
  },
  {
    id: 'mathematics',
    href: '/myp/subjects#mathematics',
    label: { en: 'Mathematics', sk: 'Matematika' },
    name: 'Miroslav Rohárik',
  },
  {
    id: 'individuals-and-societies',
    href: '/myp/subjects#individuals-and-societies',
    label: { en: 'Individuals and societies (IS)', sk: 'Jednotlivci a spoločnosti (IS)' },
    name: 'Jana Šišmišová',
  },
  {
    id: 'sciences',
    href: '/myp/subjects#sciences',
    label: { en: 'Sciences', sk: 'Prírodné vedy' },
    name: 'Ivana Antoš',
  },
  {
    id: 'physical-and-health-education',
    href: '/myp/subjects#physical-and-health-education',
    label: { en: 'Physical and health education (PHE)', sk: 'Telesná a zdravotná výchova (PHE)' },
    name: 'Matúš Vasiľ',
  },
  {
    id: 'arts',
    href: '/myp/subjects#arts',
    label: { en: 'Arts', sk: 'Umenie' },
    name: 'Sofia Nováková',
  },
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
