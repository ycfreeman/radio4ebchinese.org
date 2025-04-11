import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import { Play } from "lucide-react";
import siteMetadata from "./site-metadata";

import { allGroups } from "content-collections";
import Image from "next/image";

const notosans = Noto_Sans({
  variable: "--font-noto-sans",
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
});

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notosans.variable} ${notoSansMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 w-full border-b bg-base-100 backdrop-blur">
            <div className="container mx-auto flex h-22 items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <Link
                  href={`/`}
                  className="text-md font-medium hover:text-primary"
                >
                  <Image
                    className="p-2"
                    src="/assets/logo.png"
                    alt={siteMetadata.title}
                    width={203}
                    height={80}
                  />
                </Link>
              </div>

              <nav className="hidden md:flex gap-6">
                <Link
                  href={`/news`}
                  className="text-md font-medium hover:text-primary btn-ghost"
                >
                  最新動態 | News
                </Link>

                <span className="dropdown dropdown-hover">
                  <span
                    tabIndex={0}
                    role="button"
                    className="btn-ghost text-md font-medium m-1"
                  >
                    節目組 | Groups
                  </span>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    {allGroups.map((post) => (
                      <li key={post._meta.path}>
                        <Link
                          href={`/${post._meta.path}`}
                          className="link link-hover"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </span>

                <Link
                  href={`https://www.4eb.org.au/guide/`}
                  target="_blank"
                  className="text-md font-medium hover:text-primary btn-ghost"
                >
                  時間表 | Programme Timetable
                </Link>
              </nav>

              <div className="flex items-center gap-4">
                <Link
                  href="https://www.4eb.org.au/"
                  target="_blank"
                  className="hidden md:flex btn btn-primary btn-sm gap-2"
                >
                  <Play className="h-4 w-4" /> Listen Live on 4EB
                </Link>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            <aside>
              <p>
                © {new Date().getFullYear()} - {siteMetadata.title}
              </p>
            </aside>

            <nav>
              <h6 className="footer-title">節目組 | Groups</h6>
              <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-6  gap-x-6 gap-y-2">
                {allGroups.map((post) => (
                  <Link
                    key={post._meta.path}
                    href={`/${post._meta.path}`}
                    className="link link-hover"
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            </nav>
            <nav>
              <Link href="/" className="link link-hover">
                首頁 | Home
              </Link>

              <Link className="link link-hover" href="/news">
                最新動態 | News
              </Link>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
