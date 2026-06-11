import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const subjects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/subjects' }),
  schema: z.object({
    title: z.string(),
    group: z.enum(['1', '2', '3', '4', '5', '6', 'core']),
    level: z.enum(['HL', 'SL', 'both']).optional(),
    description: z.string(),
    teacher: z.string().optional(),
    order: z.number().default(0),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
    author: z.string().optional(),
  }),
});

const cas = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cas' }),
  schema: z.object({
    title: z.string(),
    strand: z.enum(['Creativity', 'Activity', 'Service']),
    date: z.date(),
    description: z.string(),
    learningOutcomes: z.array(z.string()).optional(),
  }),
});

const tok = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/tok' }),
  schema: z.object({
    title: z.string(),
    theme: z.string(),
    date: z.date(),
    description: z.string(),
  }),
});

export const collections = { subjects, news, cas, tok };
