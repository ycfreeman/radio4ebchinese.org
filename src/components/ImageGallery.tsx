import type { GetImageResult, ImageMetadata } from "astro";
import OptimizedImage, { optimizeImage } from "./OptimizedImage";

export function getGalleryImages(images: ImageMetadata[]) {
  return Promise.all(
    images.map(async (src) => ({
      // Reading src.src is what makes Astro emit the full-size original for the lightbox link.
      href: src.src,
      image: await optimizeImage(
        src,
        [200, 320, 480, 640, 800],
        "(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw",
      ),
    })),
  );
}

interface Props {
  images: { href: string; image: GetImageResult }[];
}

export default function ImageGallery({ images }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map(({ href, image }) => (
        <a
          key={href}
          className="block aspect-square shadow-sm overflow-hidden rounded-lg"
          href={href}
          data-fancybox="gallery"
        >
          <OptimizedImage
            image={image}
            className="w-full h-full object-cover max-w-none"
            alt={href}
          />
        </a>
      ))}
    </div>
  );
}
