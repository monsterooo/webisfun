import mermaid from "mermaid";

let initialized = false;

/**
 * Palette aligned with site code blocks (Shiki `github-dark` +
 * `html.dark .shiki` semi-transparent black surface).
 * Default Mermaid "dark" is teal-heavy and clashes with code fences.
 */
const MERMAID_THEME_VARIABLES = {
  darkMode: true,
  background: "transparent",
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
  fontSize: "14px",

  // Core surfaces — github-dark editor chrome
  primaryColor: "#21262d",
  primaryTextColor: "#e1e4e8",
  primaryBorderColor: "#484f58",
  secondaryColor: "#161b22",
  secondaryTextColor: "#e1e4e8",
  secondaryBorderColor: "#30363d",
  tertiaryColor: "#0d1117",
  tertiaryTextColor: "#c9d1d9",
  tertiaryBorderColor: "#30363d",

  lineColor: "#8b949e",
  textColor: "#e1e4e8",
  mainBkg: "#21262d",
  nodeBorder: "#484f58",
  clusterBkg: "rgba(0, 0, 0, 0.35)",
  clusterBorder: "#30363d",
  titleColor: "#e1e4e8",
  edgeLabelBackground: "#0d1117",
  nodeTextColor: "#e1e4e8",

  // Accents from github-dark token colors
  // constant/support blue, string blue, keyword rose, entity purple, tag green
  cScale0: "#21262d",
  cScale1: "#1f2937",
  cScale2: "#0d2137",

  // Sequence / notes
  actorBkg: "#21262d",
  actorBorder: "#484f58",
  actorTextColor: "#e1e4e8",
  actorLineColor: "#8b949e",
  signalColor: "#e1e4e8",
  signalTextColor: "#e1e4e8",
  labelBoxBkgColor: "#21262d",
  labelBoxBorderColor: "#484f58",
  labelTextColor: "#e1e4e8",
  loopTextColor: "#e1e4e8",
  noteBkgColor: "#2d2100",
  noteTextColor: "#e1e4e8",
  noteBorderColor: "#d29922",
  activationBkgColor: "#1f6feb33",
  activationBorderColor: "#79b8ff",
  sequenceNumberColor: "#0d1117",

  // State / class extras
  labelColor: "#e1e4e8",
  altBackground: "#161b22",
  errorBkgColor: "#3d1214",
  errorTextColor: "#fdaeb7",
} as const;

/**
 * Extra padding (px) beyond Mermaid's default ~8px viewBox inset.
 * Keeps subgraph titles / nodes off the viewer chrome.
 */
const MERMAID_VIEWBOX_EXTRA_PADDING = 20;

/**
 * Expand SVG viewBox so diagram content sits further from the edges.
 * Mermaid's flowchart default is only ~8px; config diagramPadding is not
 * always applied depending on layout path, so we pad post-render.
 */
export function expandMermaidViewBox(
  svg: string,
  extraPadding: number = MERMAID_VIEWBOX_EXTRA_PADDING
): string {
  if (!(extraPadding > 0)) return svg;
  return svg.replace(/\bviewBox="([^"]+)"/, (match, raw: string) => {
    const parts = raw
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) {
      return match;
    }
    const [x, y, w, h] = parts;
    return `viewBox="${x - extraPadding} ${y - extraPadding} ${w + extraPadding * 2} ${h + extraPadding * 2}"`;
  });
}

/**
 * Render mermaid source to an SVG string.
 * Requires a browser-like DOM (client runtime or a test harness with polyfills).
 */
export async function renderMermaidSvg(
  source: string,
  id?: string
): Promise<string> {
  if (!initialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: { ...MERMAID_THEME_VARIABLES },
      securityLevel: "loose",
      fontFamily: MERMAID_THEME_VARIABLES.fontFamily,
      flowchart: {
        subGraphTitleMargin: {
          top: 8,
          bottom: 8,
        },
      },
    });
    initialized = true;
  }

  const renderId = id ?? `mermaid-${Math.random().toString(36).slice(2, 11)}`;
  const { svg } = await mermaid.render(renderId, source.trim());
  return svg;
}
