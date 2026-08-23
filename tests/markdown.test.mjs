import assert from "node:assert/strict";
import test from "node:test";
import rehypeExternalLinks from "../src/lib/markdown.mjs";

test("external Markdown links open safely in a new tab", () => {
  const external = { tagName: "a", properties: { href: "https://example.com" } };
  const internal = { tagName: "a", properties: { href: "/news" } };

  rehypeExternalLinks()({ children: [external, internal] });

  assert.deepEqual(external.properties, {
    href: "https://example.com",
    target: "_blank",
    rel: ["noopener", "noreferrer"],
  });
  assert.deepEqual(internal.properties, { href: "/news" });
});
