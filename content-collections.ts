import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const mdxOptions = {
  remarkPlugins: [remarkGfm],
};

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
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, mdxOptions);
    return {
      ...document,
      mdx,
      _raw: {
        sourceFilePath: document._meta.filePath,
        sourceFileName: document._meta.fileName,
        sourceFileDir: document._meta.directory,
        flattenedPath: document._meta.path,
      },
    };
  },
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
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, mdxOptions);
    return {
      ...document,
      mdx,
      _raw: {
        sourceFilePath: document._meta.filePath,
        sourceFileName: document._meta.fileName,
        sourceFileDir: document._meta.directory,
        flattenedPath: document._meta.path,
      },
    };
  },
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
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, mdxOptions);
    return {
      ...document,
      mdx,
      _raw: {
        sourceFilePath: document._meta.filePath,
        sourceFileName: document._meta.fileName,
        sourceFileDir: document._meta.directory,
        flattenedPath: document._meta.path,
      },
    };
  },
});

export default defineConfig({
  collections: [news, groups, pages],
});
