import { MDXContent } from "@content-collections/mdx/react";
import { cn } from "@/lib/utils";
import { Bleed } from "./mdx/bleed";
import { Callout } from "./mdx/callout";
import { Codepen } from "./mdx/codepen";
import { Li } from "./mdx/li";
import { LineChart } from "./mdx/line-chart";
import { Sandpack } from "./mdx/sandpack";
import { SVGRender } from "./mdx/svg-render";

export async function MDX({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const components = {
    li: Li,
    Codepen,
    Sandpack,
    LineChart,
    Callout,
    SVGRender,
    Bleed,
  };
  return (
    <article
      className={cn(
        className,
        "prose dark:prose-invert [&_ul]:list-none [&_ul]:pl-0 grid blog-wrapper [&_p]:mb-0"
      )}
    >
      <MDXContent code={code} components={components} />
    </article>
  );
}
