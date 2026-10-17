import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "pagefind-searchbox": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        placeholder?: string;
      };
    }
  }
}
