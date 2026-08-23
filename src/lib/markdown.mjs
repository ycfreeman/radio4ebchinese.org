const externalUrl = /^(?:https?:)?\/\//;

export default function rehypeExternalLinks() {
  return (tree) => {
    const visit = (node) => {
      const href = node.tagName === "a" && node.properties?.href;
      if (typeof href === "string" && externalUrl.test(href)) {
        node.properties.target = "_blank";
        node.properties.rel = ["noopener", "noreferrer"];
      }
      node.children?.forEach(visit);
    };

    visit(tree);
  };
}
