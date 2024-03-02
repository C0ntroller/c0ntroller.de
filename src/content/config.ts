import { z, defineCollection } from 'astro:content';

// Schema for projects
const projectsCol = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    site_title: z.string().optional(),
    description: z.string(),
    descriptionShort: z.string(),
    repository: z.string().url().optional(),
    relatedWebsite: z.string().url().optional(),
    published: z.date(),
    tags: z.array(z.string()).optional(),
    isDraft: z.boolean().optional(),
  }),
});

const diaryMainPages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    site_title: z.string().optional(),
    description: z.string(),
    descriptionShort: z.string(),
    repository: z.string().url().optional(),
    relatedWebsite: z.string().url().optional(),
    lastUpdated: z.date(),
    tags: z.array(z.string()).optional(),
    isDraft: z.boolean().optional(),
  }),
});

const diarySubPages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    site_title: z.string().optional(),
    repository: z.string().url().optional(),
    relatedWebsite: z.string().url().optional(),
    published: z.date().optional(),
    isDraft: z.boolean().optional(),
    sorting: z.number(),
  }),
});

export const collections = {
  "projects": projectsCol,
  "rust": diarySubPages,
  "diaryMainPages": diaryMainPages,
};