import { collection, config, fields } from '@keystatic/core';

const isDev = process.env.NODE_ENV !== 'production';

// Grouped Slovak translation fields. All optional — pages fall back to the
// English fields when a translation is empty.
const slovakFields = (opts: { description?: string; excerpt?: boolean; body?: string } = {}) =>
  fields.object(
    {
      title: fields.text({ label: 'Title (Slovak)' }),
      ...(opts.description
        ? { description: fields.text({ label: `${opts.description} (Slovak)`, multiline: true }) }
        : {}),
      ...(opts.excerpt
        ? { excerpt: fields.text({ label: 'Excerpt (Slovak)', multiline: true }) }
        : {}),
      ...(opts.body ? { body: fields.markdoc.inline({ label: `${opts.body} (Slovak)` }) } : {}),
    },
    {
      label: 'Slovak translation',
      description:
        'Optional — visitors see the English version where a Slovak field is left empty.',
    },
  );

const programmeField = () =>
  fields.select({
    label: 'Programme',
    description:
      'Choose only confirmed applicability. Existing content is unclassified by default.',
    options: [
      { label: 'Unclassified — needs confirmation', value: 'unclassified' },
      { label: 'IB MYP', value: 'myp' },
      { label: 'IB DP', value: 'dp' },
      { label: 'Both programmes / shared', value: 'both' },
    ],
    defaultValue: 'unclassified',
  });

// Collections prepared for upcoming pages: editors can collect material now, but
// no public page reads them yet. Uploaded files are publicly hosted regardless.
const editorialStatus = () =>
  fields.select({
    label: 'Editorial status',
    description:
      'Not on the website yet: this collection does not feed public pages. Uploaded files and photos are publicly hosted even in drafts.',
    options: [
      { label: 'Draft — collecting materials', value: 'draft' },
      { label: 'Approved — ready for publication', value: 'approved' },
    ],
    defaultValue: 'draft',
  });

export default config({
  storage: isDev ? { kind: 'local' } : { kind: 'cloud' },
  cloud: { project: 'ib-ceska/ib-ceska' },
  collections: {
    subjects: collection({
      label: 'Subjects',
      slugField: 'title',
      path: 'src/content/subjects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Subject Name' } }),
        group: fields.select({
          label: 'IB Group',
          options: [
            { label: 'Group 1 — Language & Literature', value: '1' },
            { label: 'Group 2 — Language Acquisition', value: '2' },
            { label: 'Group 3 — Individuals & Societies', value: '3' },
            { label: 'Group 4 — Sciences', value: '4' },
            { label: 'Group 5 — Mathematics', value: '5' },
            { label: 'Group 6 — The Arts', value: '6' },
            { label: 'Core', value: 'core' },
          ],
          defaultValue: '1',
        }),
        secondaryGroup: fields.select({
          label: 'Secondary IB Group (optional)',
          description:
            'For interdisciplinary subjects offered in a second group (e.g. ESS counts for Group 3 or Group 4). Leave as None for most subjects.',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Group 1 — Language & Literature', value: '1' },
            { label: 'Group 2 — Language Acquisition', value: '2' },
            { label: 'Group 3 — Individuals & Societies', value: '3' },
            { label: 'Group 4 — Sciences', value: '4' },
            { label: 'Group 5 — Mathematics', value: '5' },
            { label: 'Group 6 — The Arts', value: '6' },
          ],
          defaultValue: 'none',
        }),
        offeredLevels: fields.select({
          label: 'Level',
          description:
            'Which levels this subject is offered at. Shown as a badge and used in the diploma builder.',
          options: [
            { label: 'HL & SL', value: 'both' },
            { label: 'HL only', value: 'HL' },
            { label: 'SL only', value: 'SL' },
          ],
          defaultValue: 'both',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        teacher: fields.text({ label: 'Teacher' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
        sk: slovakFields({ description: 'Description', body: 'Syllabus Details' }),
        content: fields.markdoc({
          label: 'Syllabus Details',
          options: {
            image: { directory: 'public/images/subjects', publicPath: '/images/subjects' },
          },
        }),
      },
    }),
    news: collection({
      label: 'News',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Headline' } }),
        programme: programmeField(),
        date: fields.date({ label: 'Date' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        author: fields.text({ label: 'Author' }),
        sk: slovakFields({ excerpt: true, body: 'Article Body' }),
        content: fields.markdoc({
          label: 'Article Body',
          options: { image: { directory: 'public/images/news', publicPath: '/images/news' } },
        }),
      },
    }),
    cas: collection({
      label: 'CAS Activities',
      slugField: 'title',
      path: 'src/content/cas/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Activity Name' } }),
        date: fields.date({ label: 'Date' }),
        strands: fields.multiselect({
          label: 'Strands',
          description: 'One or more CAS strands this activity covers.',
          options: [
            { label: 'Creativity', value: 'Creativity' },
            { label: 'Activity', value: 'Activity' },
            { label: 'Service', value: 'Service' },
          ],
          defaultValue: ['Creativity'],
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        learningOutcomes: fields.array(fields.text({ label: 'Learning Outcome' }), {
          label: 'Learning Outcomes',
          itemLabel: (props) => props.value ?? 'LO',
        }),
        sk: slovakFields({ description: 'Description', body: 'Reflection' }),
        content: fields.markdoc({
          label: 'Reflection',
          options: { image: { directory: 'public/images/cas', publicPath: '/images/cas' } },
        }),
      },
    }),
    tok: collection({
      label: 'TOK Materials',
      slugField: 'title',
      path: 'src/content/tok/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        theme: fields.select({
          label: 'Theme',
          options: [
            { label: 'Knowledge & the Knower', value: 'Knowledge & the Knower' },
            { label: 'Knowledge & Technology', value: 'Knowledge & Technology' },
            { label: 'Knowledge & Language', value: 'Knowledge & Language' },
            { label: 'Knowledge & Politics', value: 'Knowledge & Politics' },
            { label: 'Knowledge & Religion', value: 'Knowledge & Religion' },
            {
              label: 'Knowledge & Indigenous Societies',
              value: 'Knowledge & Indigenous Societies',
            },
            { label: 'Ethics', value: 'Ethics' },
            { label: 'Natural Sciences', value: 'Natural Sciences' },
            { label: 'Human Sciences', value: 'Human Sciences' },
            { label: 'History', value: 'History' },
            { label: 'The Arts', value: 'The Arts' },
            { label: 'Mathematics', value: 'Mathematics' },
          ],
          defaultValue: 'Ethics',
        }),
        description: fields.text({ label: 'Summary', multiline: true }),
        sk: slovakFields({ description: 'Summary', body: 'Full Essay' }),
        content: fields.markdoc({
          label: 'Full Essay',
          options: { image: { directory: 'public/images/tok', publicPath: '/images/tok' } },
        }),
      },
    }),
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/events/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Event Name' } }),
        programme: programmeField(),
        date: fields.date({ label: 'Date' }),
        endDate: fields.date({ label: 'End date (optional, for multi-day events)' }),
        time: fields.text({ label: 'Time (e.g. 17:00–19:00)' }),
        location: fields.text({ label: 'Location' }),
        description: fields.text({ label: 'Description', multiline: true }),
        sk: slovakFields({ description: 'Description', body: 'Details' }),
        content: fields.markdoc({
          label: 'Details',
          options: { image: { directory: 'public/images/events', publicPath: '/images/events' } },
        }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      schema: {
        name: fields.slug({ name: { label: 'Student / alumnus name' } }),
        role: fields.text({
          label: 'Role',
          description: 'e.g. "DP2 student" or "Alumna, Class of 2024 — now at LSE"',
        }),
        gradYear: fields.integer({ label: 'Graduation year (optional)' }),
        photo: fields.image({
          label: 'Photo (optional)',
          description: 'Headshot. Only publish with the student’s written consent.',
          directory: 'public/images/testimonials',
          publicPath: '/images/testimonials',
        }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
        featured: fields.checkbox({ label: 'Feature on homepage', defaultValue: false }),
        sk: fields.object(
          {
            role: fields.text({ label: 'Role (Slovak)' }),
            quote: fields.text({ label: 'Quote (Slovak)', multiline: true }),
          },
          {
            label: 'Slovak translation',
            description:
              'Optional — visitors see the English version where a Slovak field is left empty.',
          },
        ),
        quote: fields.text({ label: 'Quote', multiline: true }),
      },
    }),
    resources: collection({
      label: 'Policies and guides (not public yet)',
      slugField: 'title',
      path: 'src/content/resources/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({
          name: { label: 'Document title', validation: { isRequired: true } },
        }),
        programme: programmeField(),
        status: editorialStatus(),
        category: fields.select({
          label: 'Document category',
          options: [
            { label: 'Policy', value: 'policy' },
            { label: 'Parent handbook', value: 'parent-handbook' },
            { label: 'Subject / course guide', value: 'subject-guide' },
            { label: 'Personal Project', value: 'personal-project' },
            { label: 'Service as Action', value: 'service-as-action' },
            { label: 'Admissions / application form', value: 'admissions' },
            { label: 'Other guide or form', value: 'other' },
          ],
          defaultValue: 'other',
        }),
        academicYear: fields.text({ label: 'Academic year (e.g. 2026/27)' }),
        version: fields.text({ label: 'Version / revision identifier' }),
        updatedDate: fields.date({ label: 'Document revision date (optional)' }),
        description: fields.text({ label: 'Description', multiline: true }),
        englishFile: fields.file({
          label: 'English document (optional)',
          description: 'Upload only files cleared for public hosting.',
          directory: 'public/documents/resources',
          publicPath: '/documents/resources',
        }),
        slovakFile: fields.file({
          label: 'Slovak document (optional)',
          directory: 'public/documents/resources',
          publicPath: '/documents/resources',
        }),
        externalUrl: fields.text({ label: 'Official external document URL (optional)' }),
        owner: fields.text({ label: 'Responsible staff member / maintenance owner' }),
        order: fields.integer({ label: 'Display order', defaultValue: 0 }),
        content: fields.markdoc.inline({ label: 'Guidance / web content (optional)' }),
        sk: slovakFields({ description: 'Description', body: 'Guidance / web content' }),
      },
    }),
    galleryAlbums: collection({
      label: 'Gallery albums (not public yet)',
      slugField: 'title',
      path: 'src/content/gallery-albums/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({
          name: { label: 'Album / activity name', validation: { isRequired: true } },
        }),
        programme: programmeField(),
        status: editorialStatus(),
        date: fields.date({ label: 'Activity date (optional)' }),
        description: fields.text({ label: 'Description', multiline: true }),
        permissionConfirmed: fields.checkbox({
          label: 'Publication permission confirmed for every photograph',
          description: 'Only upload approved photos: draft albums do not make image URLs private.',
          defaultValue: false,
        }),
        credit: fields.text({ label: 'Photographer / image credit (if known)' }),
        photos: fields.array(
          fields.object({
            image: fields.image({
              label: 'Photograph',
              directory: 'public/images/gallery-albums',
              publicPath: '/images/gallery-albums',
              validation: { isRequired: true },
            }),
            alt: fields.text({
              label: 'Accessible image description (English)',
              validation: { isRequired: true },
            }),
            caption: fields.text({ label: 'Caption (English)', multiline: true }),
            sk: fields.object(
              {
                alt: fields.text({ label: 'Accessible image description (Slovak)' }),
                caption: fields.text({ label: 'Caption (Slovak)', multiline: true }),
              },
              { label: 'Slovak translation — optional, falls back to English' },
            ),
          }),
          { label: 'Photographs', itemLabel: (props) => props.fields.alt.value || 'Photograph' },
        ),
        order: fields.integer({ label: 'Display order', defaultValue: 0 }),
        sk: slovakFields({ description: 'Description' }),
      },
    }),
    assessments: collection({
      label: 'Assessment calendar (not public yet)',
      slugField: 'title',
      path: 'src/content/assessments/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({
          name: { label: 'Assessment name', validation: { isRequired: true } },
        }),
        programme: programmeField(),
        status: editorialStatus(),
        academicYear: fields.text({ label: 'Academic year (e.g. 2026/27)' }),
        subject: fields.text({ label: 'Subject' }),
        yearGroup: fields.text({
          label: 'Year / class',
          description: 'Use the school’s actual year or class, e.g. MYP 3 or DP 1.',
        }),
        date: fields.date({ label: 'Assessment date / deadline (optional while drafting)' }),
        time: fields.text({ label: 'Time (optional)' }),
        teacher: fields.text({ label: 'Teacher / assessment owner' }),
        description: fields.text({ label: 'Assessment details', multiline: true }),
        sk: slovakFields({ description: 'Assessment details' }),
      },
    }),
    vacancies: collection({
      label: 'Vacancies (not public yet)',
      slugField: 'title',
      path: 'src/content/vacancies/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({
          name: { label: 'Job title', validation: { isRequired: true } },
        }),
        programme: programmeField(),
        status: editorialStatus(),
        subject: fields.text({ label: 'Subject / teaching area (optional)' }),
        employmentType: fields.select({
          label: 'Employment type',
          options: [
            { label: 'Not yet confirmed', value: 'unconfirmed' },
            { label: 'Full-time', value: 'full-time' },
            { label: 'Part-time', value: 'part-time' },
            { label: 'Other — describe in job details', value: 'other' },
          ],
          defaultValue: 'unconfirmed',
        }),
        startDate: fields.date({ label: 'Expected start date (optional)' }),
        deadline: fields.date({ label: 'Application deadline (optional)' }),
        closed: fields.checkbox({ label: 'Applications closed', defaultValue: false }),
        description: fields.text({ label: 'Short description', multiline: true }),
        applicationEmail: fields.text({ label: 'Application contact email' }),
        applicationUrl: fields.text({ label: 'Application form URL (optional)' }),
        content: fields.markdoc.inline({
          label: 'Job details, qualifications, required documents, and how to apply',
        }),
        sk: slovakFields({ description: 'Short description', body: 'Job details / how to apply' }),
      },
    }),
  },
});
