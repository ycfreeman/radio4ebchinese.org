import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";

const mdxOptions = {
  remarkPlugins: [remarkGfm],
};

const news = defineCollection({
  name: "news",
  directory: "src/content/news",
  include: ["**/*.md", "**/*.mdx"],
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    featuredimage: z.string().optional(),
    galleryImage: z.array(z.string()).optional(),
    slug: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, mdxOptions);
    return {
      ...document,
      mdx,
    };
  },
});

const groups = defineCollection({
  name: "groups",
  directory: "src/content/group",
  include: ["**/*.md", "**/*.mdx"],
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    galleryImage: z.array(z.string()).optional(),
    slug: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, mdxOptions);
    return {
      ...document,
      mdx,
    };
  },
});

const pages = defineCollection({
  name: "pages",
  directory: "src/content/pages",
  include: ["**/*.md", "**/*.mdx"],
  schema: (z) => ({
    title: z.string(),
    heading: z.string().optional(),
    subheading: z.string().optional(),
    description: z.string().optional(),
    featuredimage: z.string().optional(),
    galleryImage: z.array(z.string()).optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, mdxOptions);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [news, groups, pages],
});
