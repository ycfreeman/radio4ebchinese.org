import { allPages, allNews } from "content-collections";

import Link from "next/link";
import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import siteMetadata from "./site-metadata";
import { MDXContent } from "@content-collections/mdx/react";

export default function Home() {
  const post = allPages.find((post) => post._meta.path === "home")!;

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <Image
            src={post.featuredimage ?? "/placeholder.svg"}
            alt={siteMetadata.title}
            width={1200}
            height={600}
            className="w-full h-[400px] object-cover"
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

      <section className="container mx-auto my-8 p-4 max-w-xxl">
        <div className="prose max-w-none lg:prose-md">
          <MDXContent code={post.mdx} />
        </div>
      </section>
      {/* Additional sections (News, Footer, etc.) would follow similar conversion */}

      <section className="container mx-auto my-8 p-4 max-w-xxl ">
        <h2 className="text-2xl font-bold mb-4">最新動態 | Latest stories</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {allNews.map((post) => (
            <div
              key={post._meta.path}
              className="card lg:card-side bg-neutral-100 shadow-sm"
            >
              <figure>
                <Image
                  src={post.featuredimage ?? "/placeholder.svg"}
                  alt="Album"
                  width={200}
                  height={200}
                />
              </figure>
              <div className="card-body">
                <Link href={`/news/${post._meta.path}`}>
                  <h2 className="card-title">{post.title}</h2>
                </Link>

                <p className="lg:max-w-2xs">{post.description}</p>
                <div className="card-actions justify-end">
                  <Link
                    href={`/news/${post._meta.path}`}
                    className="btn btn-primary"
                  >
                    閱讀詳情 | Keep Reading <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
