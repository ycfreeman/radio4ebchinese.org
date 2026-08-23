import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sharedFields = {
  title: z.string(),
  description: z.string().optional(),
  featuredImage: z.string().optional(),
  galleryImage: z.array(z.string()).optional(),
  slug: z.string(),
};

const news = defineCollection({
  loader: glob({ base: "./src/content/news", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    ...sharedFields,
    date: z.coerce.date(),
  }),
});

const groups = defineCollection({
  loader: glob({ base: "./src/content/group", pattern: "**/*.{md,mdx}" }),
  schema: z.object(sharedFields),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    ...sharedFields,
    heading: z.string().optional(),
    subheading: z.string().optional(),
  }),
});

export const collections = { news, groups, pages };
