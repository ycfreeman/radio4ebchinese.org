import { allGroups } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import NotFound from "../not-found";
import ImageGallery from "@/components/ImageGallery";
import { Metadata, ResolvingMetadata } from "next";
import HeroWithImage from "@/components/HeroWithImage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURI(slug);
  const post = allGroups.find((post) => post.slug === decodedSlug);

  const parentMetadata = await parent;
  return {
    title: `${post?.title} | ${parentMetadata.title?.absolute}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURI(slug);

  const post = allGroups.find((post) => post.slug === decodedSlug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      {post.featuredImage && (
        <HeroWithImage
          alt={post.title}
          heading={post.title}
          featuredimage={post.featuredImage ?? "/placeholder.svg"}
        />
      )}

      <section className="container mx-auto my-8 p-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
        <div className="prose max-w-none lg:prose-md">
          <MDXContent code={post.mdx} />
        </div>
        <div className="my-4">
          {post.galleryImage ? (
            <ImageGallery images={post.galleryImage} />
          ) : null}
        </div>
      </section>
    </>
  );
}
