/** Extract language from an MDX/remark code fence className like `language-mermaid`. */
export function resolveCodeBlockLanguage(className = ""): string {
  return className.replace(/^language-/, "").trim();
}

/** Whether a fenced code language should be rendered as a Mermaid diagram. */
export function shouldRenderAsMermaid(lang: string): boolean {
  return lang === "mermaid";
}
