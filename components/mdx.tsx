import { MDXContent } from "@content-collections/mdx/react";
import { cn } from "@/lib/utils";
import { AngleVisual } from "./contents/angle-visual";
import { GradientHardEdge } from "./contents/gradient-hard-edge";
import { RadialGradientPreview } from "./contents/radial-gradient-preview";
import { Bleed } from "./mdx/bleed";
import { Callout } from "./mdx/callout";
import { CodeBlock } from "./mdx/code-block";
import { Codepen } from "./mdx/codepen";
import { Li } from "./mdx/li";
import { LineChart } from "./mdx/line-chart";
import { SandpackLegacy } from "./mdx/sandpack-legacy";
import { SVGRender } from "./mdx/svg-render";
import { Sandpack } from "./sandpack";

const components = {
  li: Li,
  pre: CodeBlock,
  Codepen,
  Sandpack,
  SandpackLegacy,
  LineChart,
  Callout,
  SVGRender,
  Bleed,
  // 内容组件
  AngleVisual,
  GradientHardEdge,
  RadialGradientPreview,
};

for (const key in components) {
  if (components.hasOwnProperty(key)) {
    const MDXComponent: any = (components as any)[key];
    MDXComponent.mdxName = key;
  }
}

export function MDX({ code, className }: { code: string; className?: string }) {
  return (
    <article
      className={cn(
        className,
        "prose dark:prose-invert [&_ul]:list-none [&_ul]:pl-0 grid blog-wrapper [&_p]:mt-0 [&_pre]:my-0 [&_:not(:last-child)_pre]:mb-5"
      )}
    >
      <MDXContent code={code} components={components} />
    </article>
  );
}
