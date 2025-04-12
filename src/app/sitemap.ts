import type { MetadataRoute } from "next";
import { allGroups, allNews } from "content-collections";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.radio4ebchinese.org",
      lastModified: new Date(),
    },
    ...[
      ...allGroups.map((post) => ({
        url: `https://www.radio4ebchinese.org/${post._meta.path}`,
        lastModified: new Date(),
      })),
    ],
    {
      url: `https://www.radio4ebchinese.org/news`,
      lastModified: new Date(),
    },
    ...[
      ...allNews.map((post) => ({
        url: `https://www.radio4ebchinese.org/news/${post._meta.path}`,
        lastModified: new Date(post.date),
      })),
    ],
  ];
}
