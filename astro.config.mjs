import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "./src/lib/markdown.mjs";

export default defineConfig({
  site: "https://www.radio4ebchinese.org",
  output: "static",
  outDir: "./out",
  build: { format: "file" },
  image: {
    breakpoints: [320, 480, 640, 960, 1280, 1600, 2048],
    layout: "constrained",
    responsiveStyles: true,
  },
  integrations: [mdx()],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    processor: unified({
      gfm: true,
      smartypants: false,
      rehypePlugins: [rehypeExternalLinks],
    }),
  },
});
