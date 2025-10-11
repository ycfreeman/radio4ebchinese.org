import HeroWithImage from "@/components/HeroWithImage";
import NewsCard from "@/components/NewsCard";
import { allNews, allPages } from "content-collections";
import { Metadata, ResolvingMetadata } from "next";

const post = allPages.find((post) => post._meta.path === "news")!;

type Props = {
  params: Promise<never>;
};

/**
 * Build the page metadata title by combining the news post title with the parent's absolute title.
 *
 * @param parent - Resolver for the parent route's metadata used to derive the parent's absolute title
 * @returns A `Metadata` object with `title` set to "`{post.title} | {parent absolute title}`"
 */
export async function generateMetadata(
  { params: _params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const parentMetadata = await parent;

  return {
    title: `${post?.title} | ${parentMetadata.title?.absolute}`,
  };
}

export default function Posts() {
  return (
    <>
      <HeroWithImage
        alt={post.title}
        heading={post.heading}
        subheading={post.subheading}
        featuredimage={post.featuredImage ?? "/placeholder.svg"}
      />
      <section className="container mx-auto my-8 p-4 max-w-xxl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {allNews.toReversed().map((post) => (
            <NewsCard key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </>
  );
}