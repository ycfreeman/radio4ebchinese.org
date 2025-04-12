import HeroWithImage from "@/components/HeroWithImage";
import { MDXContent } from "@content-collections/mdx/react";
import { allPages } from "content-collections";
import { ArrowRight } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";

const post = allPages.find(
  (post) => post._meta.path === "programme-timetable"
)!;

export async function generateMetadata(
  _params: never,
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
        featuredimage={post.featuredimage ?? "/placeholder.svg"}
      />
      <section className="container mx-auto my-8 p-4 max-w-4xl">
        <div className="prose max-w-none lg:prose-md">
          <MDXContent
            code={post.mdx}
            components={{
              ArrowRight,
            }}
          />
        </div>
      </section>
    </>
  );
}
