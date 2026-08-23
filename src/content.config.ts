import { defineCollection, type ImageFunction } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sharedFields = (image: ImageFunction) => ({
  title: z.string(),
  description: z.string().optional(),
  galleryImage: z.array(image()).optional(),
  slug: z.string(),
});

const news = defineCollection({
  loader: glob({ base: "./src/content/news", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      ...sharedFields(image),
      featuredImage: image(),
      date: z.coerce.date(),
    }),
});

const groups = defineCollection({
  loader: glob({ base: "./src/content/group", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      ...sharedFields(image),
      featuredImage: image().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      ...sharedFields(image),
      featuredImage: image(),
      heading: z.string().optional(),
      subheading: z.string().optional(),
    }),
});

export const collections = { news, groups, pages };
