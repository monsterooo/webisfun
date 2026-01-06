import { MDXContent } from "@content-collections/mdx/react";
import { Callout } from "./mdx/callout";
import { Codepen } from "./mdx/codepen";
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
  };
  return (
    <article className={className}>
      <MDXContent code={code} components={components} />
    </article>
  );
}
