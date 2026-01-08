import { MDXContent } from "@content-collections/mdx/react";
import { cn } from "@/lib/utils";
import { Callout } from "./mdx/callout";
import { Codepen } from "./mdx/codepen";
import { Li } from "./mdx/li";
import { LineChart } from "./mdx/line-chart";
import { Sandpack } from "./mdx/sandpack";

export async function MDX({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const components = {
    Codepen,
    Sandpack,
    LineChart,
    Callout,
    li: Li,
  };
  return (
    <article
      className={cn(className, "max-w-full prose [&>ul]:list-none [&_ul]:pl-0")}
    >
      <MDXContent code={code} components={components} />
    </article>
  );
}
