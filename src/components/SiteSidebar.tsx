import type { CollectionEntry } from "astro:content";

interface Props {
  groups: CollectionEntry<"groups">[];
}

export default function SiteSidebar({ groups }: Props) {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

      <ul className="menu bg-base-200 min-h-full w-80 p-4">
        {/* Sidebar content here */}
        <li>
          <a href="/news">最新動態 | News</a>
        </li>
        <li>
          <p className="menu-title"> 節目組 | Groups</p>

          <ul>
            {groups.map((post) => (
              <li key={post.id}>
                <a href={`/${post.data.slug}`} className="link link-hover">
                  {post.data.title}
                </a>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <a href="/programme-timetable">時間表 | Programme Timetable</a>
        </li>
        <li className="mt-4">
          <a
            href="https://www.4eb.org.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex btn btn-primary btn-sm gap-2 rounded-field"
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
        </li>
      </ul>
    </div>
  );
}
