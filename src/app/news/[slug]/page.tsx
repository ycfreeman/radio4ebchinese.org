import { allNews } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { redirect } from "next/navigation";

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

  return <MDXContent code={post.mdx} />;
}
