import { allNews } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";
import ImageGallery from "@/components/ImageGallery";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
