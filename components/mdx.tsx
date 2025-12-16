import { MDXContent } from "@content-collections/mdx/react";
import { Codepen } from "./mdx/codepen";
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
  };
  return (
    <article className={className}>
      <MDXContent code={code} components={components} />
    </article>
  );
}
