import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    episode: z.number(),
    series: z.literal('docs'),
    description: z.string().optional(),
    publishedAt: z.string().optional(),
  }),
});

const meetings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    series: z.literal('meetings'),
    description: z.string().optional(),
    participants: z.array(z.string()).optional(),
  }),
});

export const collections = { docs, meetings };
