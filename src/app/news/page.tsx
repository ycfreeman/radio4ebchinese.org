import HeroWithImage from "@/components/HeroWithImage";
import NewsCard from "@/components/NewsCard";
import { allNews, allPages } from "content-collections";

export default function Posts() {
  const post = allPages.find((post) => post._meta.path === "news")!;

  return (
    <>
      <HeroWithImage
        alt={post.title}
        heading={post.heading}
        subheading={post.subheading}
        featuredimage={post.featuredimage ?? "/placeholder.svg"}
      />
      <section className="container mx-auto my-8 p-4 max-w-xxl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {allNews.toReversed().map((post) => (
            <NewsCard key={post._meta.path} {...post} />
          ))}
        </div>
      </section>
    </>
  );
}
