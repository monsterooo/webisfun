import { useMDXComponent } from "@content-collections/mdx/react";

export function MDX({ code, className }: { code: string; className?: string }) {
  const Component = useMDXComponent(code);

  return (
    <article className={className}>
      <Component components={{}} />
    </article>
  );
}
