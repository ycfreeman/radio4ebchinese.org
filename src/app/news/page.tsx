import NewsCard from "@/components/NewsCard";
import { allNews, allPages } from "content-collections";
import Image from "next/image";

export default function Posts() {
  const post = allPages.find((post) => post._meta.path === "news")!;

  return (
    <>
      <section className="hero">
        <div className="hero-overlay">
          <Image
            src={post.featuredimage ?? "/placeholder.svg"}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="hero-content text-neutral-content text-center">
          <div className="w-full">
            <h1 className="mb-5 lg:text-5xl text-4xl font-bold text-shadow-lg text-shadow-neutral">
              {post.heading}
            </h1>
            <h2 className="mb-5 lg:text-2xl text-2xl font-bold text-shadow-sm text-shadow-neutral">
              {post.subheading}
            </h2>
          </div>
        </div>
      </section>
      <section className="container mx-auto my-8 p-4 max-w-xxl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {allNews.toReversed().map((post) => (
            <NewsCard key={post._meta.path} {...post} />
          ))}
        </div>
      </section>
    </>
    // <ul>
    //   {allNews.map((post) => (
    //     <li key={post._meta.path}>
    //       <a href={`/news/${post._meta.path}`}>
    //         <h3>{post.title}</h3>
    //       </a>
    //     </li>
    //   ))}
    // </ul>
  );
}
