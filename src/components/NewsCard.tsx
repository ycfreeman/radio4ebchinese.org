import type { GetImageResult } from "astro";
import type { CollectionEntry } from "astro:content";
import ArrowRight from "./ArrowRight";
import OptimizedImage, { optimizeImage } from "./OptimizedImage";
import { formatDate } from "@/lib/content";

export function getNewsCards(news: CollectionEntry<"news">[]) {
  return Promise.all(
    news.toReversed().map(async ({ data }) => ({
      ...data,
      image: await optimizeImage(
        data.featuredImage,
        [320, 480, 640, 960],
        "(min-width: 1024px) 28vw, 100vw",
      ),
    })),
  );
}

type Props = CollectionEntry<"news">["data"] & { image: GetImageResult };

export default function NewsCard(post: Props) {
  const postUrl = `/news/${post.slug}`;

  return (
    <div className="card lg:card-side bg-neutral-100 shadow-sm">
      <figure className="aspect-square lg:min-w-[55%] sm:min-w-[30%]">
        <OptimizedImage image={post.image} alt="Album" className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <a href={postUrl}>
          <h2 className="card-title">{post.title}</h2>
        </a>
        <p className="text-sm">{formatDate(post.date)}</p>
        <p className="lg:max-w-2xs">{post.description}</p>
        <div className="card-actions justify-end">
          <a href={postUrl} className="btn btn-primary rounded-field">
            閱讀詳情 | Keep Reading <ArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
}
