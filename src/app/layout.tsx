import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import { Play, Menu } from "lucide-react";
import siteMetadata from "@/app/site-metadata";

import { allGroups } from "content-collections";
import Image from "next/image";

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  display: "swap",
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
  display: "swap",
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
    <html
      lang="en"
      className={`${notoSansSC.variable} ${notoSansMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon-32x32.png" sizes="any" />
      </head>
      <body className="antialiased font-sans drawer">
        <div className="flex min-h-screen flex-col drawer-content">
          {/* Header */}
          <header className="navbar w-full shadow-sm">
            <div className="flex items-center gap-2 flex-1 md:flex-none">
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
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost md:hidden drawer-button rounded-field"
              >
                <Menu />
              </label>
            </div>

            <nav className="hidden md:flex gap-6 flex-1 justify-center">
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
                    <li key={post.slug}>
                      <Link href={`/${post.slug}`} className="link link-hover">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </span>

              <Link
                href={`/programme-timetable`}
                className="text-md font-medium hover:text-primary btn-ghost"
              >
                時間表 | Programme Timetable
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="https://www.4eb.org.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex btn btn-primary btn-sm gap-2 rounded-field"
              >
                <Play className="h-4 w-4" /> Listen Live on 4EB
              </Link>
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
                    key={post.slug}
                    href={`/${post.slug}`}
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
              <Link href="/news" className="link link-hover">
                最新動態 | News
              </Link>
              <Link href={`/programme-timetable`} className="link link-hover">
                時間表 | Programme Timetable
              </Link>
            </nav>
          </footer>
        </div>

        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        {/* Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link href={`/news`}>最新動態 | News</Link>
            </li>
            <li>
              <p className="menu-title"> 節目組 | Groups</p>

              <ul>
                {allGroups.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/${post.slug}`} className="link link-hover">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link href={`/programme-timetable`}>
                時間表 | Programme Timetable
              </Link>
            </li>
            <li className="mt-4">
              <Link
                href="https://www.4eb.org.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex btn btn-primary btn-sm gap-2 rounded-field"
              >
                <Play className="h-4 w-4" /> Listen Live on 4EB
              </Link>
            </li>
          </ul>
        </div>
      </body>
    </html>
  );
}
