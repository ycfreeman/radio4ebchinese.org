import type { GetImageResult, ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import type { ImgHTMLAttributes } from "react";

// fit and position match the defaults <Image> applies for the configured layout.
export function optimizeImage(src: ImageMetadata, widths: number[], sizes: string) {
  return getImage({ src, widths, sizes, format: "webp", fit: "cover", position: "center" });
}

type Props = ImgHTMLAttributes<HTMLImageElement> & { image: GetImageResult };

export default function OptimizedImage({ image, ...props }: Props) {
  return <img src={image.src} srcSet={image.srcSet.attribute} {...image.attributes} {...props} />;
}
