import { allGroups } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import NotFound from "../not-found";

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

  // return (
  //   <>
  //     {decodeURI(slug)}
  //     {/* {JSON.stringify(allGroups)} */}
  //   </>
  // );

  return (
    <div className="prose">
      <h1>{post.title}</h1>
      <MDXContent code={post.mdx} />
    </div>
  );
}
