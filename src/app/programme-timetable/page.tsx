import HeroWithImage from "@/components/HeroWithImage";
import { MDXContent } from "@content-collections/mdx/react";
import { allPages } from "content-collections";
import { ArrowRight } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";

const post = allPages.find(
  (post) => post._meta.path === "programme-timetable"
)!;

type Props = {
  params: Promise<never>;
};

/**
 * Build the page metadata title by combining the page's title with the parent's absolute title.
 *
 * @param params - Unused route params placeholder.
 * @param parent - A resolving metadata object whose resolved `title.absolute` value is appended to the page title.
 * @returns An object with `title` set to "`<post.title> | <parent.title.absolute>`".
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