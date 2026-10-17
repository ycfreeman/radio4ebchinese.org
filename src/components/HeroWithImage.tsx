import type { GetImageResult, ImageMetadata } from "astro";
import OptimizedImage, { optimizeImage } from "./OptimizedImage";

export function getHeroImage(src: ImageMetadata) {
  return optimizeImage(src, [640, 960, 1280, 1600, 2048], "100vw");
}

interface Props {
  image: GetImageResult;
  alt: string;
  heading?: string;
  subheading?: string;
}

export default function HeroWithImage(post: Props) {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <OptimizedImage
          image={post.image}
          alt={post.alt}
          loading="eager"
          fetchPriority="high"
          className="w-full lg:h-[400px] h-[300px] object-cover"
        />
      </div>

      <div className="hero-content text-neutral-content text-center">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="mb-5 lg:text-5xl text-4xl font-bold text-shadow-lg text-shadow-neutral glass rounded-box px-5 py-2 pb-4">
            {post.heading}
          </h1>
          {post.subheading && (
            <h2 className="mb-5 lg:text-2xl text-2xl font-bold text-shadow-sm text-shadow-neutral glass rounded-box px-5 py-2 pb-3">
              {post.subheading}
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}
