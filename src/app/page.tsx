import { allPages, allNews } from "content-collections";

import { MDXContent } from "@content-collections/mdx/react";
import NewsCard from "@/components/NewsCard";
import HeroWithImage from "@/components/HeroWithImage";

export default function Home() {
  const post = allPages.find((post) => post._meta.path === "index")!;

  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        alt={post.title}
        heading={post.heading}
        subheading={post.subheading}
        featuredimage={post.featuredimage ?? "/placeholder.svg"}
      />

      <section className="container mx-auto my-8 p-4 max-w-xxl">
        <div className="prose max-w-none lg:prose-md">
          <MDXContent code={post.mdx} />
        </div>
      </section>
      {/* Additional sections (News, Footer, etc.) would follow similar conversion */}

      <section className="container mx-auto my-8 p-4 max-w-xxl ">
        <h2 className="text-2xl font-bold mb-4">最新動態 | Latest stories</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {allNews.toReversed().map((post) => (
            <NewsCard key={post._meta.path} {...post} />
          ))}
        </div>
      </section>
    </>
  );
}
