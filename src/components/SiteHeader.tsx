import type { CollectionEntry } from "astro:content";
import siteMetadata from "@/lib/site-metadata";

interface Props {
  groups: CollectionEntry<"groups">[];
}

export default function SiteHeader({ groups }: Props) {
  return (
    <header className="navbar w-full shadow-sm">
      <div className="flex items-center gap-2 flex-1 md:flex-none">
        <a href="/" className="text-md font-medium hover:text-primary">
          <img
            className="p-2"
            src="/assets/logo.png"
            alt={siteMetadata.title}
            width="203"
            height="80"
          />
        </a>
      </div>
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer" className="btn btn-ghost md:hidden drawer-button rounded-field">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12h16"></path>
            <path d="M4 18h16"></path>
            <path d="M4 6h16"></path>
          </svg>
        </label>
      </div>

      <nav className="hidden md:flex gap-6 flex-1 justify-center">
        <a href="/news" className="text-md font-medium hover:text-primary btn-ghost">
          最新動態 | News
        </a>

        <span className="dropdown dropdown-hover">
          <span tabIndex={0} role="button" className="btn-ghost text-md font-medium m-1">
            節目組 | Groups
          </span>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {groups.map((post) => (
              <li key={post.id}>
                <a href={`/${post.data.slug}`} className="link link-hover">
                  {post.data.title}
                </a>
              </li>
            ))}
          </ul>
        </span>

        <a href="/programme-timetable" className="text-md font-medium hover:text-primary btn-ghost">
          時間表 | Programme Timetable
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <a
          href="https://www.4eb.org.au/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex btn btn-primary btn-sm gap-2 rounded-field"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="m6 3 14 9-14 9z"></path>
          </svg>
          Listen Live on 4EB
        </a>
      </div>
    </header>
  );
}
