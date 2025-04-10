import { allNews } from "content-collections";

export default function Posts() {
  return (
    <ul>
      {allNews.map((post) => (
        <li key={post._meta.path}>
          <a href={`/news/${post._meta.path}`}>
            <h3>{post.title}</h3>
          </a>
        </li>
      ))}
    </ul>
  );
}
