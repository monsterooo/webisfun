import { createHighlighter } from "shiki";

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
    props: { className, children },
  },
}: CodeBlockProps) {
  const lang = className.replace("language-", "");
  const highlighter = await createHighlighter({
    langs: [lang],
    themes: ["github-dark"],
  });

  const code = highlighter.codeToHtml(children, {
    lang: lang,
    theme: "github-dark",
  });

  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}
