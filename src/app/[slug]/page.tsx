import { allGroups } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import NotFound from "../not-found";
import ImageGallery from "@/components/ImageGallery";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURI(slug);

  const post = allGroups.find((post) => post._meta.path === decodedSlug);
  if (!post) {
    return <NotFound />;
  }

  return (
    <section className="container mx-auto my-8 p-4 max-w-4xl">
      <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
      <div className="prose max-w-none lg:prose-md">
        <MDXContent code={post.mdx} />
      </div>

      {post.galleryImage ? <ImageGallery images={post.galleryImage} /> : null}
    </section>
  );
}
