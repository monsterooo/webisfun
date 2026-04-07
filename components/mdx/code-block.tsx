import { codeToHtml } from "shiki";

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
  const lang = className.replace("language-", "");
  const code = await codeToHtml(children, {
    lang: lang,
    theme: "github-dark",
    // themes: {
    //   light: "github-light",
    //   dark: "github-dark",
    // },
  });

  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}
