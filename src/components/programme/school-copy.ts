import type { Locale } from '../../i18n/dictionaries';
import { t } from '../../i18n/dictionaries';

export type Programme = 'myp' | 'dp';
export type SchoolSection = 'mission' | 'teachers' | 'policies';

export function schoolCopy(locale: Locale, programme: Programme) {
  const dict = t(locale);
  const sk = locale === 'sk';
  const myp = programme === 'myp';
  const name = myp ? 'MYP' : 'IB DP';

  return {
    mission: {
      ...dict.mission,
      authTitle: myp
        ? sk
          ? 'Kandidátska škola pre MYP'
          : 'A candidate school for the MYP'
        : sk
          ? 'Autorizovaná škola pre IB DP'
          : 'Authorized to offer the IB Diploma Programme',
      authBody: myp
        ? dict.home.mypNote
        : sk
          ? 'Súkromné gymnázium Česká má od júla 2022 autorizáciu ponúkať IB Diploma Programme.'
          : 'Súkromné gymnázium Česká has been authorized to offer the IB Diploma Programme since July 2022.',
      policiesCta: sk ? `Politiky a príručky ${name}` : `${name} policies and guides`,
    },
    teachers: {
      ...dict.teachers,
      title: sk ? 'Náš tím' : 'Our team',
      leadershipTitle: sk ? 'Vedenie programu' : 'Programme leadership',
      subtitle: myp
        ? sk
          ? 'Vedenie, koordinácia, vedúci predmetových skupín a triedni učitelia kandidátskeho programu MYP.'
          : 'Leadership, coordination, subject-group leaders, and homeroom teachers for the MYP candidate programme.'
        : sk
          ? 'Vedenie diplomového programu, učitelia predmetov, koordinátori jadra IB DP a podpora študentov.'
          : 'Diploma Programme leadership, subject teachers, IB DP Core coordinators, and student support.',
      facultyTitle: sk ? 'Učitelia predmetov a jadra IB DP' : 'Subject and IB DP Core teachers',
      contactBody: myp
        ? sk
          ? 'Kontaktujte IB tím s otázkami o kandidátskom programe MYP a prijímacom konaní.'
          : 'Contact the IB team with questions about the MYP candidate programme and admissions.'
        : sk
          ? 'IB tím vám pomôže porozumieť diplomovému programu, ponuke predmetov a prijímaciemu procesu.'
          : 'The IB team can help you understand the Diploma Programme, subject options, and admissions.',
    },
    policies: {
      ...dict.policies,
      subtitle: myp
        ? sk
          ? 'Dokumenty kandidátskeho programu MYP, informácie pre rodičov a súvisiace celoškolské politiky.'
          : 'MYP candidate programme documents, information for parents, and relevant school-wide policies.'
        : sk
          ? 'Politiky diplomového programu, príručky CAS a TOK a príručky IB DP pre rodičov.'
          : 'Diploma Programme policies, CAS and TOK handbooks, and IB DP parent handbooks.',
      guidesIntro: sk
        ? 'Školské príručky CAS a TOK pre študentov diplomového programu.'
        : 'School CAS and TOK handbooks for Diploma Programme students.',
      mypTitle: sk
        ? 'Dokumenty MYP a informácie pre rodičov'
        : 'MYP documents and parent information',
      mypIntro: sk
        ? 'Prehľad MYP na Českej a oficiálny sprievodca IB pre rodičov.'
        : 'An overview of MYP at Česká and the official IB guide for parents.',
      sharedTitle: sk ? 'Súvisiace celoškolské politiky' : 'Relevant school-wide policies',
      sharedIntro: sk
        ? 'Akademická integrita platí pre celú školskú komunitu; jazyková politika zahŕňa MYP aj DP. Osobitné pravidlá DP v týchto dokumentoch sa nevzťahujú na MYP.'
        : 'Academic integrity applies across the school; the language policy covers MYP and DP. DP-specific arrangements in these documents do not apply to MYP.',
    },
    candidateNote: dict.home.mypNote,
  };
}
