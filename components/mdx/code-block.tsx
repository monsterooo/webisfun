import { codeToHtml } from "shiki";
import {
  resolveCodeBlockLanguage,
  shouldRenderAsMermaid,
} from "@/lib/code-block-language";
import { Mermaid } from "./mermaid";

interface CodeBlockProps {
  children: React.ReactNode & {
    props: {
      className: string;
      children: string;
      meta?: string;
    };
  };
}

export async function CodeBlock({
  children: {
    props: { className = "", children },
  },
}: CodeBlockProps) {
  const lang = resolveCodeBlockLanguage(className);

  if (shouldRenderAsMermaid(lang)) {
    return <Mermaid chart={children} />;
  }

  const code = await codeToHtml(children, {
    lang: lang,
    theme: "github-dark",
  });

  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}
