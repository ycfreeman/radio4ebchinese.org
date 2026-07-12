import type { ComponentProps, ElementType } from "react";
import { SafeMdxRenderer } from "safe-mdx";
import { mdxParse } from "safe-mdx/parse";

type ContentRendererProps = {
  content: string;
  components?: Record<string, ElementType>;
};

function ContentLink({ children, href, ...props }: ComponentProps<"a">) {
  const isExternal = typeof href === "string" && /^(?:https?:)?\/\//.test(href);

  return (
    <a
      href={href}
      {...props}
      target={isExternal ? "_blank" : props.target}
      rel={isExternal ? "noopener noreferrer" : props.rel}
    >
      {children}
    </a>
  );
}

export default function ContentRenderer({ content, components }: ContentRendererProps) {
  const mdast = mdxParse(content);

  return (
    <SafeMdxRenderer
      markdown={content}
      mdast={mdast}
      components={{
        a: ContentLink,
        ...components,
      }}
      onError={(error) => {
        throw new Error(`Unable to render content: ${error.message}`);
      }}
    />
  );
}
