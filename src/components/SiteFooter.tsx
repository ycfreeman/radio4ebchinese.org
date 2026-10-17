import type { CollectionEntry } from "astro:content";
import siteMetadata from "@/lib/site-metadata";

interface Props {
  groups: CollectionEntry<"groups">[];
}

export default function SiteFooter({ groups }: Props) {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <aside>
        <p>{`© ${new Date().getFullYear()} - ${siteMetadata.title}`}</p>
      </aside>

      <nav>
        <h6 className="footer-title">節目組 | Groups</h6>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-2">
          {groups.map((post) => (
            <a key={post.id} href={`/${post.data.slug}`} className="link link-hover">
              {post.data.title}
            </a>
          ))}
        </div>
      </nav>
      <nav>
        <a href="/" className="link link-hover">
          首頁 | Home
        </a>
        <a href="/news" className="link link-hover">
          最新動態 | News
        </a>
        <a href="/programme-timetable" className="link link-hover">
          時間表 | Programme Timetable
        </a>
      </nav>
    </footer>
  );
}
