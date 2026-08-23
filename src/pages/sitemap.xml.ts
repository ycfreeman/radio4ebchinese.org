import type { APIRoute } from "astro";
import { getGroups, getNews } from "@/lib/content";
import siteMetadata from "@/lib/site-metadata";

export const GET: APIRoute = async () => {
  const [groups, news] = await Promise.all([getGroups(), getNews()]);
  const buildDate = new Date().toISOString();
  const urls = [
    { loc: siteMetadata.siteUrl, lastmod: buildDate },
    ...groups.map((post) => ({
      loc: `${siteMetadata.siteUrl}/${post.data.slug}`,
      lastmod: buildDate,
    })),
    { loc: `${siteMetadata.siteUrl}/news`, lastmod: buildDate },
    ...news.map((post) => ({
      loc: `${siteMetadata.siteUrl}/news/${post.data.slug}`,
      lastmod: post.data.date.toISOString(),
    })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, lastmod }) => `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
