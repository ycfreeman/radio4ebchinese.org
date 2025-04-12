import Image from "next/image";
import Fancybox from "./Fancybox";

const ImageGallery = ({ images }: { images: string[] }) => {
  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: false,
        },
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {images.map((image, i) => (
          <a
            className="block aspect-square shadow-sm overflow-hidden rounded-lg"
            href={image}
            data-fancybox="gallery"
            key={`image-${i}`}
          >
            <Image
              key={`image-${i}`}
              width={400}
              height={400}
              className="w-full h-full object-cover max-w-none"
              src={image}
              alt={image}
            />
          </a>
        ))}
      </div>
    </Fancybox>
  );
};

export default ImageGallery;
