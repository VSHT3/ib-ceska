import type { ImageMetadata } from 'astro';

import danielZahumenicky from '../assets/teachers/daniel-zahumenicky.png';
import danielaMojzisova from '../assets/teachers/daniela-mojzisova.jpg';
import janGonda from '../assets/teachers/jan-gonda.jpg';
import janaSismisova from '../assets/teachers/jana-sismisova.jpg';
import jurajBabic from '../assets/teachers/juraj-babic.jpg';
import lubomirTancer from '../assets/teachers/lubomir-tancer.jpg';
import luciaHoracikova from '../assets/teachers/lucia-horacikova.jpg';
import martinaDanisova from '../assets/teachers/martina-danisova.png';
import miroslavRoharik from '../assets/teachers/miroslav-roharik.jpg';
import miroslavaHruskova from '../assets/teachers/miroslava-hruskova.jpg';
import simonaLatkova from '../assets/teachers/simona-latkova.jpg';
import stanislavKuznetsov from '../assets/teachers/stanislav-kuznetsov.jpg';
import svetlanaVeselova from '../assets/teachers/svetlana-veselova.jpeg';

// Verified against the school's published IB roster on 15 June 2026.
type LocalizedList = {
  en: string[];
  sk: string[];
};

export interface Teacher {
  name: string;
  image: ImageMetadata | null;
  leadership: boolean;
  areas: LocalizedList;
  responsibilities: LocalizedList;
}

export const teachers: Teacher[] = [
  {
    name: 'Martina Danišová',
    image: martinaDanisova,
    leadership: true,
    areas: { en: [], sk: [] },
    responsibilities: {
      en: ['Overall Principal of SG Česká'],
      sk: ['Riaditeľka SG Česká'],
    },
  },
  {
    name: 'Juraj Babic',
    image: jurajBabic,
    leadership: true,
    areas: { en: [], sk: [] },
    responsibilities: {
      en: ['Head of IB', 'Head of IB DP', 'MYP Coordinator', 'CAS Coordinator'],
      sk: ['Vedúci IB', 'Vedúci IB DP', 'Koordinátor MYP', 'Koordinátor CAS'],
    },
  },
  {
    name: 'Svetlana Veselová',
    image: svetlanaVeselova,
    leadership: true,
    areas: { en: [], sk: [] },
    responsibilities: {
      en: ['Head of MYP', 'IB DP Coordinator'],
      sk: ['Vedúca MYP', 'Koordinátorka IB DP'],
    },
  },
  {
    name: 'Simona Latková',
    image: simonaLatkova,
    leadership: false,
    areas: {
      en: ['English A: Language and Literature'],
      sk: ['Anglický jazyk a literatúra A'],
    },
    responsibilities: {
      en: ['Extended Essay Coordinator'],
      sk: ['Koordinátorka Extended Essay'],
    },
  },
  {
    name: 'Lucia Horáčiková',
    image: luciaHoracikova,
    leadership: false,
    areas: {
      en: ['Slovak A: Language and Literature'],
      sk: ['Slovenský jazyk a literatúra A'],
    },
    responsibilities: { en: [], sk: [] },
  },
  {
    name: 'Jana Šišmišová',
    image: janaSismisova,
    leadership: false,
    areas: {
      en: ['English B'],
      sk: ['Anglický jazyk B'],
    },
    responsibilities: {
      en: ['Head of Languages Department'],
      sk: ['Vedúca jazykového oddelenia'],
    },
  },
  {
    name: 'Jakeline Jimenez',
    image: null,
    leadership: false,
    areas: {
      en: ['Spanish'],
      sk: ['Španielsky jazyk'],
    },
    responsibilities: { en: [], sk: [] },
  },
  {
    name: 'Abier Alaroush',
    image: null,
    leadership: false,
    areas: {
      en: ['Economics'],
      sk: ['Ekonómia'],
    },
    responsibilities: { en: [], sk: [] },
  },
  {
    name: 'Stanislav Kuznetsov',
    image: stanislavKuznetsov,
    leadership: false,
    areas: {
      en: ['Psychology', 'Biology'],
      sk: ['Psychológia', 'Biológia'],
    },
    responsibilities: {
      en: ['Head of Humanities Department', 'University Counselor'],
      sk: ['Vedúci humanitného oddelenia', 'Univerzitný poradca'],
    },
  },
  {
    name: 'Miroslava Hrušková',
    image: miroslavaHruskova,
    leadership: false,
    areas: { en: ['Chemistry'], sk: ['Chémia'] },
    responsibilities: {
      en: ['Head of Sciences Department'],
      sk: ['Vedúca prírodovedného oddelenia'],
    },
  },
  {
    name: 'Daniel Zahumenický',
    image: danielZahumenicky,
    leadership: false,
    areas: {
      en: ['Computer Science'],
      sk: ['Informatika'],
    },
    responsibilities: { en: [], sk: [] },
  },
  {
    name: 'Daniela Mojžišová',
    image: danielaMojzisova,
    leadership: false,
    areas: {
      en: ['Geography', 'Environmental Systems and Societies'],
      sk: ['Geografia', 'Environmentálne systémy a spoločnosti'],
    },
    responsibilities: {
      en: ['IB Partnerships and Relations Coordinator'],
      sk: ['Koordinátorka IB partnerstiev a vzťahov'],
    },
  },
  {
    name: 'Ľubomír Tancer',
    image: lubomirTancer,
    leadership: false,
    areas: {
      en: ['Physics'],
      sk: ['Fyzika'],
    },
    responsibilities: { en: [], sk: [] },
  },
  {
    name: 'Miroslav Rohárik',
    image: miroslavRoharik,
    leadership: false,
    areas: {
      en: ['Mathematics'],
      sk: ['Matematika'],
    },
    responsibilities: { en: [], sk: [] },
  },
  {
    name: 'Ján Gonda',
    image: janGonda,
    leadership: false,
    areas: {
      en: ['Theory of Knowledge'],
      sk: ['Teória poznania'],
    },
    responsibilities: { en: [], sk: [] },
  },
  {
    name: 'Brooks Guetschow',
    image: null,
    leadership: false,
    areas: { en: [], sk: [] },
    responsibilities: {
      en: ['Librarian'],
      sk: ['Knihovník'],
    },
  },
];
