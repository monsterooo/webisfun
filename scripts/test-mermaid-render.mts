/**
 * Drives the shipped mermaid render path (lib/render-mermaid.ts) with the
 * flowchart from content/blog/sandpack.mdx, plus language-branch regression.
 *
 * Run: npx tsx scripts/test-mermaid-render.mts
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { codeToHtml } from "shiki";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// --- DOM polyfills required for mermaid in Node ---
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  pretendToBeVisual: true,
  url: "http://localhost",
});
const { window } = dom;

function assign(key: string, value: unknown) {
  try {
    Object.defineProperty(globalThis, key, {
      value,
      configurable: true,
      writable: true,
    });
  } catch {
    // ignore non-configurable host properties
  }
}

assign("window", window);
assign("document", window.document);
assign("DOMParser", window.DOMParser);
assign("XMLSerializer", window.XMLSerializer);
assign("HTMLElement", window.HTMLElement);
assign("SVGElement", window.SVGElement);
assign("Element", window.Element);
assign("Node", window.Node);
assign("DocumentFragment", window.DocumentFragment);
assign("Document", window.Document);
assign("Text", window.Text);
assign("Comment", window.Comment);
assign("getComputedStyle", window.getComputedStyle.bind(window));
assign("MutationObserver", window.MutationObserver);
assign("requestAnimationFrame", (cb: FrameRequestCallback) =>
  setTimeout(() => cb(Date.now()), 0)
);
assign("cancelAnimationFrame", clearTimeout);

class CSSStyleSheetPolyfill {
  cssRules: { cssText: string }[] = [];
  private _text = "";
  replaceSync(text: string) {
    this._text = String(text ?? "");
    this.cssRules = [{ cssText: this._text }];
    return Promise.resolve(this);
  }
  replace(text: string) {
    return this.replaceSync(text);
  }
  insertRule(rule: string, index = 0) {
    this.cssRules.splice(index, 0, { cssText: rule });
    return index;
  }
}

assign("CSSStyleSheet", CSSStyleSheetPolyfill);
(window as unknown as { CSSStyleSheet: typeof CSSStyleSheetPolyfill }).CSSStyleSheet =
  CSSStyleSheetPolyfill;

const svgProto = window.SVGElement.prototype as SVGElement & {
  getBBox: () => DOMRect;
  getComputedTextLength: () => number;
};
svgProto.getBBox = function getBBox() {
  const text = this.textContent || "";
  const w = Math.max(10, text.length * 8);
  return {
    x: 0,
    y: 0,
    width: w,
    height: 16,
    top: 0,
    left: 0,
    bottom: 16,
    right: w,
    toJSON() {
      return this;
    },
  } as DOMRect;
};
svgProto.getComputedTextLength = function getComputedTextLength() {
  return (this.textContent || "").length * 8;
};

// Import shipped code after DOM is ready
const { renderMermaidSvg } = await import("../lib/render-mermaid");
const {
  resolveCodeBlockLanguage,
  shouldRenderAsMermaid,
} = await import("../lib/code-block-language");

function extractMermaidFromSandpack(): string {
  const mdx = readFileSync(join(root, "content/blog/sandpack.mdx"), "utf8");
  const match = mdx.match(/```mermaid\n([\s\S]*?)```/);
  if (!match) {
    throw new Error("No ```mermaid fence found in content/blog/sandpack.mdx");
  }
  return match[1].trim();
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`ASSERT: ${message}`);
}

// --- 1) Language branching (same helpers CodeBlock uses) ---
console.log("=== language branching ===");
assert(
  resolveCodeBlockLanguage("language-mermaid") === "mermaid",
  "resolveCodeBlockLanguage(language-mermaid)"
);
assert(
  shouldRenderAsMermaid("mermaid") === true,
  "shouldRenderAsMermaid(mermaid)"
);
assert(
  shouldRenderAsMermaid("tsx") === false,
  "shouldRenderAsMermaid(tsx) is false"
);
assert(
  shouldRenderAsMermaid("css") === false,
  "shouldRenderAsMermaid(css) is false"
);
assert(
  shouldRenderAsMermaid(resolveCodeBlockLanguage("language-js")) === false,
  "js fence not mermaid"
);
console.log("OK: mermaid language is intercepted; others are not");

// --- 2) Shipped render path with sandpack flowchart ---
console.log("=== mermaid render (sandpack flowchart) ===");
const chart = extractMermaidFromSandpack();
assert(chart.includes("flowchart LR"), "chart is flowchart LR");
assert(chart.includes("P_OAI"), "chart includes provider node");
assert(chart.includes("A_OC"), "chart includes api node");

const svg = await renderMermaidSvg(chart, "sandpack-flowchart");
assert(typeof svg === "string" && svg.length > 100, "svg non-empty");
assert(/<svg[\s>]/i.test(svg), "result contains <svg");
assert(
  /flowchart|edgePath|nodeLabel|cluster|P_OAI|openai|provider/i.test(svg),
  "svg contains recognizable graph structure"
);
// Must not be raw mermaid source as the sole output
assert(!svg.trimStart().startsWith("flowchart"), "output is not raw mermaid text");
console.log(`OK: rendered SVG length=${svg.length}`);
console.log(`OK: snippet=${svg.slice(0, 180).replace(/\s+/g, " ")}...`);

// --- 3) Non-mermaid code highlight path still works (Shiki) ---
console.log("=== non-mermaid codeblock path (shiki) ===");
const sample = 'const x = 1;\nconsole.log(x);';
const html = await codeToHtml(sample, { lang: "js", theme: "github-dark" });
assert(/<pre[\s>]/i.test(html), "shiki returns pre");
assert(html.includes("const") || html.includes("console"), "shiki keeps source tokens");
assert(
  shouldRenderAsMermaid(resolveCodeBlockLanguage("language-js")) === false,
  "js still uses highlight branch"
);
console.log(`OK: shiki html length=${html.length}`);

// Structural wiring check: CodeBlock imports Mermaid + helpers
const codeBlockSrc = readFileSync(
  join(root, "components/mdx/code-block.tsx"),
  "utf8"
);
assert(codeBlockSrc.includes("shouldRenderAsMermaid"), "code-block branches mermaid");
assert(codeBlockSrc.includes('from "./mermaid"'), "code-block imports Mermaid");
assert(codeBlockSrc.includes("codeToHtml"), "code-block still uses shiki");

const mdxSrc = readFileSync(join(root, "components/mdx.tsx"), "utf8");
assert(mdxSrc.includes("pre: CodeBlock"), "mdx.tsx maps pre → CodeBlock");

console.log("\nALL CHECKS PASSED");
