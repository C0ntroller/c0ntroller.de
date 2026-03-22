import { z, defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    pubDate: z.date(),
  }),
});

const portfolioCollection = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).optional(),
    pubDate: z.date(),
    repository: z.url().regex(/git/).optional(),
  }),
});

const bookChapters = defineCollection({
    loader: file("./src/content/book/chapters.json"),
    schema: z.object({
        name: z.string(),
        order: z.number(),
        subtitle: z.string(),
    })
});

const bookCollection = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/content/book" }),
  schema: z.object({
    chapter: reference("bookChapters"),
    title: z.string(),
    summary: z.string().optional(),
    part: z.number(),
  }),
});

export const collections = {
  blog: blogCollection,
  portfolio: portfolioCollection,
  book: bookCollection,
};
