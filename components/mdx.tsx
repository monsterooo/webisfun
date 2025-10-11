import { MDXContent } from "@content-collections/mdx/react";

export async function MDX({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  return (
    <article className={className}>
      <MDXContent code={code} components={{}} />
    </article>
  );
}
