import { allNews } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";
import ImageGallery from "@/components/ImageGallery";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURI(slug);
  const post = allNews.find((post) => post._meta.path === decodedSlug);

  const parentMetadata = await parent;

  return {
    title: `${post?.title} | ${parentMetadata.title?.absolute}`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURI(slug);
  const post = allNews.find((post) => post._meta.path === decodedSlug);

  if (!post) {
    return redirect("/not-found");
  }

  return (
    <section className="container mx-auto my-8 p-4 max-w-4xl">
      <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm mb-4">
        {DateTime.fromJSDate(post.date).toFormat("LLLL dd, yyyy")}
      </p>
      <div className="prose max-w-none lg:prose-md">
        <MDXContent code={post.mdx} />
      </div>

      {post.galleryImage ? <ImageGallery images={post.galleryImage} /> : null}
    </section>
  );
}
