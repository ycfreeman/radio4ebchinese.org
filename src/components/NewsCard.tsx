import { News } from "content-collections";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DateTime } from "luxon";

const NewsCard = (post: News) => {
  const postUrl = `/news/${post.slug}`;

  return (
    <div className="card lg:card-side bg-neutral-100 shadow-sm">
      <figure>
        <Image
          src={post.featuredImage ?? "/placeholder.svg"}
          alt="Album"
          width={200}
          height={200}
        />
      </figure>
      <div className="card-body">
        <Link href={postUrl}>
          <h2 className="card-title">{post.title}</h2>
        </Link>
        <p className="text-sm">
          {DateTime.fromJSDate(post.date).toFormat("LLLL dd, yyyy")}
        </p>
        <p className="lg:max-w-2xs">{post.description}</p>
        <div className="card-actions justify-end">
          <Link href={postUrl} className="btn btn-primary">
            閱讀詳情 | Keep Reading <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
