import { config, fields, collection } from '@keystatic/core';

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
      ...(opts.excerpt ? { excerpt: fields.text({ label: 'Excerpt (Slovak)', multiline: true }) } : {}),
      ...(opts.body ? { body: fields.markdoc.inline({ label: `${opts.body} (Slovak)` }) } : {}),
    },
    {
      label: 'Slovak translation',
      description: 'Optional — visitors see the English version where a Slovak field is left empty.',
    }
  );

export default config({
  storage: isDev
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: { owner: 'VSHT3', name: 'ib-ceska' },
      },
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
        level: fields.select({
          label: 'Level',
          options: [
            { label: 'HL', value: 'HL' },
            { label: 'SL', value: 'SL' },
          ],
          defaultValue: 'HL',
        }),
        offeredLevels: fields.select({
          label: 'Offered at',
          description: 'Levels a student can choose for this subject in the diploma builder.',
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
        content: fields.markdoc({ label: 'Syllabus Details', options: { image: { directory: 'public/images/subjects', publicPath: '/images/subjects' } } }),
      },
    }),
    news: collection({
      label: 'News',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Headline' } }),
        date: fields.date({ label: 'Date' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        author: fields.text({ label: 'Author' }),
        sk: slovakFields({ excerpt: true, body: 'Article Body' }),
        content: fields.markdoc({ label: 'Article Body', options: { image: { directory: 'public/images/news', publicPath: '/images/news' } } }),
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
        learningOutcomes: fields.array(
          fields.text({ label: 'Learning Outcome' }),
          { label: 'Learning Outcomes', itemLabel: (props) => props.value ?? 'LO' }
        ),
        sk: slovakFields({ description: 'Description', body: 'Reflection' }),
        content: fields.markdoc({ label: 'Reflection', options: { image: { directory: 'public/images/cas', publicPath: '/images/cas' } } }),
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
            { label: 'Knowledge & Indigenous Societies', value: 'Knowledge & Indigenous Societies' },
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
        content: fields.markdoc({ label: 'Full Essay', options: { image: { directory: 'public/images/tok', publicPath: '/images/tok' } } }),
      },
    }),
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/events/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Event Name' } }),
        date: fields.date({ label: 'Date' }),
        endDate: fields.date({ label: 'End date (optional, for multi-day events)' }),
        time: fields.text({ label: 'Time (e.g. 17:00–19:00)' }),
        location: fields.text({ label: 'Location' }),
        description: fields.text({ label: 'Description', multiline: true }),
        sk: slovakFields({ description: 'Description', body: 'Details' }),
        content: fields.markdoc({ label: 'Details', options: { image: { directory: 'public/images/events', publicPath: '/images/events' } } }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      schema: {
        name: fields.slug({ name: { label: 'Student / alumnus name' } }),
        role: fields.text({ label: 'Role', description: 'e.g. "DP2 student" or "Alumna, Class of 2024 — now at LSE"' }),
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
            description: 'Optional — visitors see the English version where a Slovak field is left empty.',
          }
        ),
        quote: fields.text({ label: 'Quote', multiline: true }),
      },
    }),
  },
});
