import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const news = defineCollection({
  name: "news",
  directory: "src/content/news",
  include: ["**/*.md", "**/*.mdx"],
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    featuredImage: z.string().optional(),
    galleryImage: z.array(z.string()).optional(),
    slug: z.string(),
    content: z.string(),
  }),
});

const groups = defineCollection({
  name: "groups",
  directory: "src/content/group",
  include: ["**/*.md", "**/*.mdx"],
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    featuredImage: z.string().optional(),
    galleryImage: z.array(z.string()).optional(),
    slug: z.string(),
    content: z.string(),
  }),
});

const pages = defineCollection({
  name: "pages",
  directory: "src/content/pages",
  include: ["**/*.md", "**/*.mdx"],
  schema: z.object({
    title: z.string(),
    heading: z.string().optional(),
    subheading: z.string().optional(),
    description: z.string().optional(),
    featuredImage: z.string().optional(),
    galleryImage: z.array(z.string()).optional(),
    content: z.string(),
  }),
});

export default defineConfig({
  content: [news, groups, pages],
});
