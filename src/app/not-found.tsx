import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>OH NO!</h1>
      <p>You just hit a page that doesn&#39;t exist... sad face.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
