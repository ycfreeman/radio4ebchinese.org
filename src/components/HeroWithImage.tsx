import Image from "next/image";

const HeroWithImage = (post: {
  featuredimage: string;
  alt: string;
  heading?: string;
  subheading?: string;
}) => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <Image
          src={post.featuredimage}
          alt={post.alt}
          width={1200}
          height={600}
          className="w-full lg:h-[400px] h-[300px] object-cover"
        />
      </div>

      <div className="hero-content text-neutral-content text-center">
        <div className="w-full">
          <h1 className="mb-5 lg:text-5xl text-4xl font-bold text-shadow-lg text-shadow-neutral">
            {post.heading}
          </h1>
          <h2 className="mb-5 lg:text-2xl text-2xl font-bold text-shadow-sm text-shadow-neutral">
            {post.subheading}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HeroWithImage;
