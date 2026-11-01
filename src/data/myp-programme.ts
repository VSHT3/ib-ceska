import { type Locale, t } from '../i18n/dictionaries';

interface LocalizedText {
  en: string;
  sk: string;
}

// Labels match the supplied MYP chart; names remain in myp-organisation.ts.
export const mypSubjectDescriptions: Record<string, LocalizedText> = {
  Design: {
    en: 'Students use a design cycle to investigate a need, develop ideas, create a solution and evaluate it. Design combines practical work with reasoned decisions: a successful solution must respond to its users and to clear criteria, not just look finished.',
    sk: 'Študenti používajú dizajnový cyklus: skúmajú potrebu, rozvíjajú nápady, vytvárajú riešenie a hodnotia ho. Dizajn prepája praktickú prácu s odôvodnenými rozhodnutiami. Úspešné riešenie má odpovedať na potreby používateľov a jasné kritériá, nielen pôsobiť dokončene.',
  },
  'Language and literature (LL)': {
    en: 'Students analyse literary and non-literary texts, consider how language shapes meaning and create texts of their own. Reading, writing, speaking, listening and viewing develop together, with attention to evidence, audience, cultural perspectives and personal expression.',
    sk: 'Študenti analyzujú literárne aj neliterárne texty, skúmajú, ako jazyk vytvára význam, a tvoria vlastné texty. Spoločne rozvíjajú čítanie, písanie, hovorenie, počúvanie aj prácu s vizuálnymi textami, s dôrazom na dôkazy, publikum, kultúrne pohľady a vlastné vyjadrovanie.',
  },
  'English as an additional language & language acquisition (EAL & LA)': {
    en: 'Language acquisition develops the ability to understand and communicate in an additional language while exploring other cultures and perspectives. Learning builds receptive and productive skills through meaningful communication. At Česká, this area brings together English as an additional language and language acquisition.',
    sk: 'Osvojovanie jazyka rozvíja porozumenie a komunikáciu v ďalšom jazyku spolu s poznávaním iných kultúr a pohľadov. Zmysluplná komunikácia rozvíja receptívne aj produktívne zručnosti. Na Českej táto oblasť spája angličtinu ako ďalší jazyk a osvojovanie jazyka.',
  },
  Mathematics: {
    en: 'Mathematics develops knowledge, patterns, logical reasoning and the ability to model situations. Students learn to select methods, communicate their reasoning and check whether an answer makes sense, including when applying mathematics to unfamiliar or real-life problems.',
    sk: 'Matematika rozvíja vedomosti, prácu so zákonitosťami, logické uvažovanie a modelovanie situácií. Študenti sa učia vyberať postupy, vysvetľovať svoje uvažovanie a overovať zmysluplnosť výsledku aj pri neznámych problémoch a úlohách z reálneho života.',
  },
  'Individuals and societies (IS)': {
    en: 'This group investigates people, communities and the environments they shape. Students ask questions about change, systems and relationships, evaluate sources and construct evidence-based explanations. Considering different perspectives helps them understand both local and global issues.',
    sk: 'Táto skupina skúma ľudí, spoločenstvá a prostredia, ktoré formujú. Študenti kladú otázky o zmenách, systémoch a vzťahoch, hodnotia zdroje a vytvárajú vysvetlenia podložené dôkazmi. Rôzne perspektívy im pomáhajú porozumieť miestnym aj globálnym otázkam.',
  },
  Sciences: {
    en: 'Students investigate the natural world through scientific knowledge and inquiry. They formulate questions, plan investigations, interpret data and evaluate methods. They also consider how scientific ideas and applications affect people and the environment, and why evidence matters when making claims.',
    sk: 'Študenti skúmajú prírodu prostredníctvom vedeckých poznatkov a bádania. Formulujú otázky, plánujú skúmanie, interpretujú údaje a hodnotia metódy. Uvažujú aj o vplyve vedeckých myšlienok a ich využitia na ľudí a životné prostredie a o význame dôkazov pri formulovaní tvrdení.',
  },
  'Physical and health education (PHE)': {
    en: 'Physical and health education connects movement with understanding well-being. Students develop skills and strategies, plan and evaluate performance, and reflect on cooperation and healthy choices. The emphasis includes understanding and reflection as well as physical participation.',
    sk: 'Telesná a zdravotná výchova prepája pohyb s porozumením zdraviu a pohode. Študenti rozvíjajú zručnosti a stratégie, plánujú a hodnotia svoj výkon a premýšľajú o spolupráci a zdravých rozhodnutiach. Okrem samotnej pohybovej účasti je dôležité aj porozumenie a reflexia.',
  },
  Arts: {
    en: 'The arts develop imagination, expression and understanding of artistic contexts. Students investigate works and practices, develop skills, explore ideas and create or perform. Reflection helps them explain artistic choices and how their work communicates with an audience.',
    sk: 'Umenie rozvíja predstavivosť, vyjadrovanie a porozumenie umeleckým súvislostiam. Študenti skúmajú diela a postupy, rozvíjajú zručnosti, hľadajú nápady a tvoria alebo interpretujú. Reflexia im pomáha vysvetliť umelecké rozhodnutia a spôsob, akým ich práca komunikuje s publikom.',
  },
};

export const mypCurriculumCopy = {
  en: {
    subjectsTitle: 'MYP subject groups',
    subjectsSubtitle: 'Knowledge, skills and connections across eight subject groups.',
    introTitle: 'Eight connected areas of learning',
    intro:
      'Each MYP subject group develops its own knowledge and methods. Shared concepts, global contexts and approaches to learning help students connect them. Subject groups are broad areas of learning, not DP SL or HL course choices.',
    scope:
      'Explore the MYP framework and meet the subject-group leaders for 2026–2027 below. Contact the MYP team for the languages, individual subjects and timetable offered in each year. Flexibility in later years follows programme requirements and local education rules.',
    leader: 'Subject-group leader',
    assessmentTitle: 'Understanding progress',
    assessment:
      'MYP assessment uses subject-specific criteria A–D, with feedback through ManageBac. It considers knowledge, skills and learning habits. The criteria describe different aspects of achievement rather than a single percentage score, helping students understand their progress and next steps.',
    connectionsTitle: 'Learning across the groups',
    connectionsBody:
      'The subject groups do not work in isolation. Interdisciplinary learning connects their methods, ATL develops transferable skills, service puts learning into action, and the personal project brings independent learning together.',
    coreLabel: 'Learning across MYP',
    relatedTitle: 'Explore MYP',
    team: 'MYP team',
    policies: 'MYP policies and guides',
    guidesTitle: 'Programme guides',
    guidesBody:
      'Explore MYP at Česká in the school overview, or discover the wider programme in the IB parent pack.',
    skillTitle: 'Five connected skill families',
  },
  sk: {
    subjectsTitle: 'Predmetové skupiny MYP',
    subjectsSubtitle: 'Vedomosti, zručnosti a súvislosti v ôsmich predmetových skupinách.',
    introTitle: 'Osem prepojených oblastí vzdelávania',
    intro:
      'Každá predmetová skupina MYP rozvíja vlastné vedomosti a metódy. Spoločné koncepty, globálne kontexty a prístupy k učeniu pomáhajú študentom nachádzať súvislosti. Ide o širšie oblasti vzdelávania, nie o výber kurzov DP na úrovni SL alebo HL.',
    scope:
      'Nižšie spoznáte rámec MYP a vedúcich predmetových skupín na rok 2026–2027. O ponúkaných jazykoch, konkrétnych predmetoch a rozvrhu v jednotlivých ročníkoch sa informujte u tímu MYP. Flexibilita v záverečných rokoch sa riadi požiadavkami programu a miestnymi pravidlami.',
    leader: 'Vedúci predmetovej skupiny',
    assessmentTitle: 'Ako rozumieť pokroku',
    assessment:
      'Hodnotenie v MYP využíva predmetové kritériá A–D a spätnú väzbu cez ManageBac. Zohľadňuje vedomosti, zručnosti a učebné návyky. Kritériá opisujú rôzne stránky dosiahnutých výsledkov namiesto jediného percentuálneho skóre a pomáhajú študentom pochopiť vlastný pokrok aj ďalšie kroky.',
    connectionsTitle: 'Učenie naprieč skupinami',
    connectionsBody:
      'Predmetové skupiny nefungujú izolovane. Medzipredmetové vzdelávanie prepája ich metódy, ATL rozvíja prenositeľné zručnosti, služba premieňa učenie na činnosť a osobný projekt spája samostatné učenie do celku.',
    coreLabel: 'Učenie naprieč MYP',
    relatedTitle: 'Spoznajte MYP',
    team: 'Tím MYP',
    policies: 'Pravidlá a príručky MYP',
    guidesTitle: 'Príručky k programu',
    guidesBody:
      'Spoznajte MYP na Českej v školskom prehľade alebo širší program v príručke IB pre rodičov.',
    skillTitle: 'Päť prepojených oblastí zručností',
  },
} satisfies Record<Locale, object>;

interface CoreSection {
  title: string;
  paragraphs: string[];
  points?: string[];
}

export interface MypCoreTopic {
  slug: string;
  title: string;
  intro: string;
  supportLabel: string;
  sections: CoreSection[];
}

export function getMypCoreTopics(locale: Locale): MypCoreTopic[] {
  const p = t(locale).myp;
  if (locale === 'sk') {
    return [
      {
        slug: 'interdisciplinary-learning',
        title: 'Medzipredmetové vzdelávanie',
        intro:
          'Poznatky a metódy z viacerých predmetov pomáhajú študentom porozumieť zložitým otázkam.',
        supportLabel: 'Interdisciplinary learning (ID)',
        sections: [
          {
            title: 'Viac než spoločná téma',
            paragraphs: [
              'Medzipredmetové učenie vychádza z pevného porozumenia jednotlivým predmetom. Študenti ich poznatky vedome spájajú, aby vytvorili nové vysvetlenie, riešenie alebo produkt. Nestačí tú istú tému spomenúť na dvoch hodinách: prepojenie má priniesť porozumenie, ktoré by samostatné pohľady nepriniesli.',
              'Koncepty a globálne kontexty pomáhajú hľadať zmysluplné súvislosti. Otázka udržateľnosti napríklad môže vyžadovať prírodovedné dôkazy aj pochopenie ľudských rozhodnutí.',
            ],
          },
          {
            title: 'Ako sa rozvíja porozumenie',
            paragraphs: [
              'Študenti skúmajú, čo každá disciplína dokáže objasniť a aké má obmedzenia. Následne vysvetľujú, prečo je spojenie pohľadov užitočné, a hodnotia výsledok svojho učenia.',
            ],
            points: [
              'Vychádzať z overených predmetových poznatkov a metód.',
              'Prepájať ich pri jasnej otázke alebo zámere.',
              'Vysvetliť, čo nové prepojenie prinieslo.',
              'Reflektovať vlastný postup a hranice výsledného porozumenia.',
            ],
          },
          {
            title: 'Súvis s ďalším učením',
            paragraphs: [
              p.principles[2].body,
              'Medzipredmetové úlohy využívajú ATL: výskum pri práci so zdrojmi, komunikáciu pri vysvetľovaní a myslenie pri prenose poznatkov. Osobný projekt môže tieto zručnosti ďalej rozvíjať, nie je však totožný s medzipredmetovou jednotkou.',
            ],
          },
        ],
      },
      {
        slug: 'approaches-to-learning',
        title: p.atlLabel,
        intro:
          'Zručnosti pre samostatné učenie: myslenie, výskum, komunikácia, spolupráca a sebaorganizácia.',
        supportLabel: 'Approaches to learning (ATL)',
        sections: [
          {
            title: 'Zručnosti, ktoré sa dajú prenášať',
            paragraphs: [
              'ATL pomenúva zručnosti, ktoré študent používa pri získavaní a uplatňovaní vedomostí. Nejde o ďalší samostatný predmet. Zručnosti sa rozvíjajú naprieč predmetovými skupinami a pomáhajú študentovi postupne preberať väčšiu zodpovednosť za učenie.',
              'Nestačí povedať „lepšie si zorganizuj čas“. Študent potrebuje poznať konkrétne postupy, vyskúšať ich a zhodnotiť, čo mu pomáha. Plánovanie, vedenie poznámok, overovanie zdrojov a využívanie spätnej väzby sa môžu uplatniť v rôznych predmetoch.',
            ],
          },
          {
            title: 'Od postupu k samostatnosti',
            paragraphs: [
              'Užitočná reflexia spája použitú stratégiu s dôkazom o učení. Študent si môže všimnúť, čo mu pomohlo porozumieť textu alebo zvládnuť dlhšiu úlohu, a podľa toho zmeniť ďalší postup.',
            ],
            points: [
              'Určiť, akú zručnosť si úloha vyžaduje.',
              'Vybrať konkrétnu stratégiu a použiť ju.',
              'Požiadať o spätnú väzbu a upraviť postup.',
              'Pomenovať, kde sa dá rovnaká zručnosť využiť nabudúce.',
            ],
          },
          {
            title: 'ATL v celom MYP',
            paragraphs: [
              'Pri medzipredmetovom učení pomáha prenos poznatkov medzi disciplínami. Pri službe komunite sú dôležité spolupráca a komunikácia. Osobný projekt vyžaduje dlhodobejšie plánovanie, výskum a reflexiu.',
              'Rozvoj ATL sprevádza kritériové hodnotenie a spätná väzba cez ManageBac. Podstatné je, ako študent zručnosti využíva pri učení; samotný zoznam zručností nie je známkou.',
            ],
          },
        ],
      },
      {
        slug: 'service-as-action',
        title: 'Služba ako činnosť',
        intro: 'Učenie sa mení na zodpovednú činnosť, ktorá reaguje na skutočné potreby druhých.',
        supportLabel: 'Service as action (SA)',
        sections: [
          {
            title: 'Učiť sa prostredníctvom činnosti',
            paragraphs: [
              'Študenti MYP premýšľajú o tom, ako môžu poznatky a zručnosti využiť vo svojej komunite. Služba nie je iba záznam účasti alebo počítanie hodín. Dôležité je porozumieť potrebe, počúvať ľudí, ktorých sa týka, a uvažovať o prínose aj dôsledkoch činnosti.',
              'O vhodnej činnosti a aktuálnych školských požiadavkách sa poraďte s tímom MYP.',
            ],
          },
          {
            title: 'Od potreby k reflexii',
            paragraphs: [
              'Zodpovedná činnosť sa začína skúmaním situácie a pokračuje plánovaním, spoluprácou a vyhodnotením. Reflexia sprevádza celý proces, nielen jeho záver.',
            ],
            points: [
              'Zistiť, komu má činnosť pomôcť a čo skutočne potrebuje.',
              'Zvážiť svoje schopnosti, možnosti spolupráce a zodpovednosť.',
              'Naplánovať a uskutočniť primeranú činnosť.',
              'Vyhodnotiť jej prínos, ťažkosti a vlastné učenie.',
            ],
          },
          {
            title: 'Rozvoj človeka aj vzťahov',
            paragraphs: [
              'Služba pomáha rozvíjať sebapoznanie, vytrvalosť, spoluprácu a citlivosť voči rôznym perspektívam. Vedie aj k otázkam o etike: je pomoc vítaná, rešpektuje dôstojnosť druhých a má zamýšľaný účinok?',
              'ATL poskytuje nástroje na výskum, komunikáciu a organizáciu činnosti. Service as action patrí do MYP; nie je to CAS diplomového programu a nemá sa zamieňať s jeho požiadavkami.',
            ],
          },
        ],
      },
      {
        slug: 'personal-project',
        title: p.personalProjectTitle,
        intro:
          'Samostatný projekt v záverečnom roku MYP spája osobný záujem, cieľ učenia a vlastný výsledok.',
        supportLabel: 'Personal project (PP)',
        sections: [
          {
            title: 'Vlastný záujem, jasný cieľ',
            paragraphs: [
              'Osobný projekt v záverečnom roku MYP je dlhodobejšia samostatná práca vychádzajúca zo záujmu študenta. Spája cieľ učenia s plánovaným produktom alebo výsledkom. Nestačí len niečo vyrobiť: študent vysvetľuje, čo sa chce naučiť, ako bude postupovať a podľa čoho posúdi výsledok.',
              'Výsledkom môže byť napríklad krátky film, funkčný prototyp, komunitná akcia alebo rozsiahlejší text. Premyslený proces, autentická práca a dôkazy o učení sú dôležitejšie než veľkosť či efektnosť výstupu.',
            ],
          },
          {
            title: 'Plánovanie, využitie zručností a reflexia',
            paragraphs: [
              'V súčasnom rámci osobného projektu sa učenie sústreďuje na plánovanie, využitie ATL zručností a reflexiu. Študent dokumentuje rozhodnutia a hodnotí výsledok podľa vlastných vopred stanovených kritérií úspechu.',
            ],
            points: [
              'Určiť cieľ učenia, zamýšľaný produkt a kritériá úspechu.',
              'Vytvoriť uskutočniteľný plán a priebežne ho upravovať.',
              'Vysvetliť a doložiť využitie ATL zručností.',
              'Zhodnotiť výsledný produkt aj vplyv projektu na vlastné učenie.',
            ],
          },
          {
            title: 'Samostatnosť s podporou',
            paragraphs: [
              'Školiteľ poskytuje usmernenie a spätnú väzbu; autorstvo, rozhodnutia a zodpovednosť za prácu zostávajú študentovi. Priebežné poznámky, zdroje a dôkazy o vývoji pomáhajú vysvetliť proces a preukázať vlastnú prácu.',
              'O aktuálnych termínoch, pridelení školiteľa, konzultáciách a spôsobe odovzdania sa informujte u tímu MYP. Osobný projekt nie je rozšírená esej (EE) diplomového programu.',
            ],
          },
        ],
      },
    ];
  }
  return [
    {
      slug: 'interdisciplinary-learning',
      title: 'Interdisciplinary learning',
      intro:
        'Knowledge and methods from different subjects come together to explore complex questions.',
      supportLabel: 'Interdisciplinary learning (ID)',
      sections: [
        {
          title: 'More than a shared topic',
          paragraphs: [
            'Interdisciplinary learning starts with sound understanding of individual subjects. Students deliberately combine their knowledge to develop a new explanation, solution or product. Mentioning the same topic in two lessons is not enough: the connection should create understanding that separate perspectives would not provide.',
            'Concepts and global contexts help make these connections meaningful. A question about sustainability, for example, might need both scientific evidence and an understanding of human decisions.',
          ],
        },
        {
          title: 'How understanding develops',
          paragraphs: [
            'Students consider what each discipline can explain and where its limits lie. They then explain why bringing perspectives together is useful and evaluate the outcome of their learning.',
          ],
          points: [
            'Start from reliable subject knowledge and methods.',
            'Integrate them around a clear question or purpose.',
            'Explain what new understanding the connection made possible.',
            'Reflect on the process and the limits of the resulting understanding.',
          ],
        },
        {
          title: 'Connections to wider learning',
          paragraphs: [
            p.principles[2].body,
            'Interdisciplinary work draws on ATL: research when evaluating sources, communication when explaining ideas, and thinking when transferring knowledge. The personal project can develop these skills further, but it is not the same as an interdisciplinary unit.',
          ],
        },
      ],
    },
    {
      slug: 'approaches-to-learning',
      title: p.atlLabel,
      intro:
        'Skills for independent learning: thinking, research, communication, collaboration and self-management.',
      supportLabel: 'Approaches to learning (ATL)',
      sections: [
        {
          title: 'Skills that travel between subjects',
          paragraphs: [
            'ATL describes the skills students use to acquire and apply knowledge. It is not another stand-alone subject. Skills develop across the subject groups and help students take increasing responsibility for their own learning.',
            'Simply telling a student to “manage time better” is not enough. They need specific strategies, opportunities to practise and a way to judge what helps. Planning, note-taking, checking sources and using feedback can all transfer between subjects.',
          ],
        },
        {
          title: 'From a strategy to independence',
          paragraphs: [
            'Useful reflection connects a strategy to evidence of learning. Students can identify what helped them understand a text or complete a longer task, then adapt the way they work next time.',
          ],
          points: [
            'Identify the skill a task requires.',
            'Choose and practise a specific strategy.',
            'Seek feedback and adjust the approach.',
            'Recognise where the same skill could be useful next.',
          ],
        },
        {
          title: 'ATL throughout the MYP',
          paragraphs: [
            'Interdisciplinary learning calls for transferring knowledge between disciplines. Service draws on collaboration and communication. The personal project requires sustained planning, research and reflection.',
            'ATL development works alongside criterion-related assessment and feedback through ManageBac. What matters is how a student uses these skills to learn; a list of skills is not itself a grade.',
          ],
        },
      ],
    },
    {
      slug: 'service-as-action',
      title: 'Service as action',
      intro:
        'Students turn learning into responsible action that responds to the genuine needs of others.',
      supportLabel: 'Service as action (SA)',
      sections: [
        {
          title: 'Learning through action',
          paragraphs: [
            'MYP students consider how their knowledge and skills can contribute to their community. Service is more than recording participation or accumulating hours. It involves understanding a need, listening to the people concerned, and considering the benefits and consequences of an action.',
            'Discuss suitable activities and current school requirements with the MYP team.',
          ],
        },
        {
          title: 'From a need to reflection',
          paragraphs: [
            'Responsible action starts with investigating a situation and continues through planning, collaboration and evaluation. Reflection accompanies the process rather than appearing only at its end.',
          ],
          points: [
            'Understand whom an action should benefit and what they actually need.',
            'Consider your abilities, opportunities to collaborate and responsibilities.',
            'Plan and carry out an appropriate action.',
            'Evaluate its contribution, challenges and your own learning.',
          ],
        },
        {
          title: 'Growth in understanding and relationships',
          paragraphs: [
            'Service develops self-awareness, perseverance, collaboration and sensitivity to different perspectives. It also raises ethical questions: is help welcome, does it respect others’ dignity, and does it have the intended effect?',
            'ATL provides tools for research, communication and organisation. Service as action belongs to the MYP; it is not Diploma Programme CAS and should not be confused with CAS requirements.',
          ],
        },
      ],
    },
    {
      slug: 'personal-project',
      title: p.personalProjectTitle,
      intro:
        'An independent project in the final MYP year connects a personal interest, a learning goal and an original outcome.',
      supportLabel: 'Personal project (PP)',
      sections: [
        {
          title: 'A personal interest and a clear goal',
          paragraphs: [
            'The personal project in the final MYP year is an extended piece of independent work rooted in a student’s interests. It connects a learning goal with an intended product or outcome. Making something is not enough: the student explains what they want to learn, how they will work and how they will judge the result.',
            'Possible outcomes include a short film, a working prototype, a community event or a piece of writing. A thoughtful process, authentic work and evidence of learning matter more than the scale or spectacle of the outcome.',
          ],
        },
        {
          title: 'Planning, applying skills and reflecting',
          paragraphs: [
            'The current personal project framework focuses on planning, applying ATL skills and reflecting. Students document decisions and evaluate their product against success criteria established in advance.',
          ],
          points: [
            'Define a learning goal, an intended product and success criteria.',
            'Develop a workable plan and adapt it as the work progresses.',
            'Explain and demonstrate how ATL skills were applied.',
            'Evaluate the product and the project’s impact on personal learning.',
          ],
        },
        {
          title: 'Independent work with guidance',
          paragraphs: [
            'A supervisor provides guidance and feedback; authorship, decisions and responsibility remain with the student. Ongoing notes, sources and evidence of development help explain the process and establish authentic work.',
            'Contact the MYP team for current deadlines, supervisor allocation, consultation arrangements and submission instructions. The personal project is not the Diploma Programme extended essay (EE).',
          ],
        },
      ],
    },
  ];
}

export function getMypCurriculumPages(locale: Locale) {
  const copy = mypCurriculumCopy[locale];
  return [
    {
      slug: 'subjects',
      href: '/myp/subjects',
      title: copy.subjectsTitle,
      description: copy.subjectsSubtitle,
    },
    ...getMypCoreTopics(locale).map((topic) => ({
      slug: topic.slug,
      href: `/myp/core/${topic.slug}`,
      title: topic.title,
      description: topic.intro,
    })),
  ];
}
