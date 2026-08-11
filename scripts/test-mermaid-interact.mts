/**
 * Drives shipped mermaid viewport interaction units (lib/mermaid-viewport.ts)
 * and confirms the viewer UI wires zoom / pan / fullscreen controls.
 *
 * Run: npx tsx scripts/test-mermaid-interact.mts
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createMermaidViewport,
  DEFAULT_MERMAID_VIEWPORT,
  distanceBetween,
  enterFullscreen,
  exitFullscreen,
  MERMAID_MAX_SCALE,
  MERMAID_MIN_SCALE,
  MERMAID_ZOOM_STEP,
  midpointBetween,
  panBy,
  resetViewport,
  scaleFromPinch,
  scaleFromWheelDelta,
  setScale,
  toCssTransform,
  toggleFullscreen,
  zoomAt,
  zoomIn,
  zoomInAtCenter,
  zoomOut,
  zoomOutAtCenter,
} from "../lib/mermaid-viewport";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`ASSERT: ${message}`);
}

console.log("=== zoom scale ===");
const base = createMermaidViewport();
const zin = zoomIn(base);
assert(zin.scale > base.scale, "zoomIn increases scale");
const zout = zoomOut(zin);
assert(zout.scale < zin.scale, "zoomOut decreases scale");
assert(
  Math.abs(zout.scale - base.scale) < 1e-9,
  "zoomIn then zoomOut returns to base scale"
);

// Bounds
const huge = setScale(base, 999);
assert(huge.scale === MERMAID_MAX_SCALE, "scale clamps to max");
const tiny = setScale(base, 0.001);
assert(tiny.scale === MERMAID_MIN_SCALE, "scale clamps to min");
const overIn = zoomIn(createMermaidViewport({ scale: MERMAID_MAX_SCALE }));
assert(overIn.scale === MERMAID_MAX_SCALE, "zoomIn at max stays max");
const overOut = zoomOut(createMermaidViewport({ scale: MERMAID_MIN_SCALE }));
assert(overOut.scale === MERMAID_MIN_SCALE, "zoomOut at min stays min");
console.log(
  `OK: zoomIn ${base.scale} → ${zin.scale}; zoomOut → ${zout.scale}; bounds [${MERMAID_MIN_SCALE}, ${MERMAID_MAX_SCALE}]`
);

console.log("=== pan offset ===");
const panned = panBy(base, 40, -20);
assert(panned.x === 40 && panned.y === -20, "panBy sets offset");
const panned2 = panBy(panned, 10, 5);
assert(panned2.x === 50 && panned2.y === -15, "panBy accumulates");
assert(panned.scale === base.scale, "pan does not change scale");
console.log(`OK: pan (0,0) → (${panned.x},${panned.y}) → (${panned2.x},${panned2.y})`);

console.log("=== zoomAt pivot stability ===");
const pivoted = zoomAt({ ...base, x: 0, y: 0, scale: 1 }, 2, 100, 50);
// world under (100,50) was (100,50); after scale 2 should stay at pivot
const worldX = (100 - pivoted.x) / pivoted.scale;
const worldY = (50 - pivoted.y) / pivoted.scale;
assert(Math.abs(worldX - 100) < 1e-9, "zoomAt keeps world X under pivot");
assert(Math.abs(worldY - 50) < 1e-9, "zoomAt keeps world Y under pivot");
assert(pivoted.scale === 2, "zoomAt applies scale");
console.log(`OK: zoomAt scale=2 pivot(100,50) → offset (${pivoted.x},${pivoted.y})`);

console.log("=== center-pivot button zoom ===");
// Canvas 400x200, center (200, 100). Zooming around center must keep that
// screen point mapping to the same world point (not grow from top-left).
const canvasW = 400;
const canvasH = 200;
const cx = canvasW / 2;
const cy = canvasH / 2;
const centered = zoomInAtCenter(base, canvasW, canvasH, MERMAID_ZOOM_STEP);
assert(centered.scale === MERMAID_ZOOM_STEP, "zoomInAtCenter scale");
// Screen = world * scale + offset; at start world under center = center
const worldAtCenterBefore = (cx - base.x) / base.scale;
const worldAtCenterAfter = (cx - centered.x) / centered.scale;
assert(
  Math.abs(worldAtCenterAfter - worldAtCenterBefore) < 1e-9,
  "zoomInAtCenter keeps canvas center world point fixed"
);
// Pure setScale (no pivot) would leave x=0,y=0 — center zoom must NOT do that
assert(
  centered.x !== 0 || centered.y !== 0 || MERMAID_ZOOM_STEP === 1,
  "center zoom adjusts pan (not top-left only)"
);
assert(
  Math.abs(centered.x - (cx - worldAtCenterBefore * centered.scale)) < 1e-9,
  "center zoom x offset formula"
);
const centeredOut = zoomOutAtCenter(centered, canvasW, canvasH, MERMAID_ZOOM_STEP);
assert(Math.abs(centeredOut.scale - base.scale) < 1e-9, "zoomOutAtCenter restores scale");
assert(Math.abs(centeredOut.x - base.x) < 1e-9, "zoomOutAtCenter restores x");
assert(Math.abs(centeredOut.y - base.y) < 1e-9, "zoomOutAtCenter restores y");
console.log(
  `OK: center zoom scale=${centered.scale} offset=(${centered.x.toFixed(2)},${centered.y.toFixed(2)})`
);

console.log("=== fullscreen enter/exit ===");
const fsOn = enterFullscreen(base);
assert(fsOn.fullscreen === true, "enterFullscreen");
const fsOff = exitFullscreen(fsOn);
assert(fsOff.fullscreen === false, "exitFullscreen");
const toggled = toggleFullscreen(DEFAULT_MERMAID_VIEWPORT);
assert(toggled.fullscreen === true, "toggleFullscreen off→on");
const toggled2 = toggleFullscreen(toggled);
assert(toggled2.fullscreen === false, "toggleFullscreen on→off");
// fullscreen should not wipe pan/scale
const withView = enterFullscreen(createMermaidViewport({ scale: 1.5, x: 12, y: 8 }));
assert(
  withView.scale === 1.5 && withView.x === 12 && withView.y === 8,
  "fullscreen preserves pan/zoom"
);
console.log("OK: fullscreen enter → exit → toggle");

console.log("=== reset + transform CSS ===");
const dirty = createMermaidViewport({ scale: 2, x: 30, y: -10, fullscreen: true });
const reset = resetViewport(dirty);
assert(reset.scale === 1 && reset.x === 0 && reset.y === 0, "reset clears pan/zoom");
assert(reset.fullscreen === true, "reset keeps fullscreen flag");
const css = toCssTransform(createMermaidViewport({ scale: 1.5, x: 10, y: -4 }));
assert(css === "translate(10px, -4px) scale(1.5)", `css transform: ${css}`);
const wheelIn = scaleFromWheelDelta(1, -100);
assert(wheelIn > 1, "wheel up zooms in");
const wheelOut = scaleFromWheelDelta(1, 100);
assert(wheelOut < 1, "wheel down zooms out");
console.log(`OK: transform "${css}"; wheel ${wheelOut.toFixed(3)}–${wheelIn.toFixed(3)}`);

console.log("=== pinch scale helpers ===");
assert(distanceBetween({ x: 0, y: 0 }, { x: 3, y: 4 }) === 5, "distance 3-4-5");
const mid = midpointBetween({ x: 0, y: 0 }, { x: 10, y: 20 });
assert(mid.x === 5 && mid.y === 10, "midpoint");
assert(scaleFromPinch(1, 100, 200) === 2, "pinch out doubles scale");
assert(scaleFromPinch(2, 200, 100) === 1, "pinch in halves scale");
assert(scaleFromPinch(1, 100, 1000) === MERMAID_MAX_SCALE, "pinch clamps max");
console.log("OK: pinch distance/midpoint/scale helpers");

console.log("=== viewer wiring (shipped component source) ===");
const viewerSrc = readFileSync(join(root, "components/mdx/mermaid.tsx"), "utf8");
assert(
  viewerSrc.includes("from \"@/lib/mermaid-viewport\"") ||
    viewerSrc.includes("from '@/lib/mermaid-viewport'"),
  "mermaid viewer imports viewport helpers"
);
for (const token of [
  "zoomInAtCenter",
  "zoomOutAtCenter",
  "panBy",
  "toggleFullscreen",
  "enterFullscreen",
  "exitFullscreen",
  "toCssTransform",
  "zoomAt",
]) {
  assert(viewerSrc.includes(token), `viewer references ${token}`);
}
assert(
  viewerSrc.includes("getCanvasSize") || viewerSrc.includes("width / 2"),
  "viewer measures canvas for center pivot"
);
assert(
  /data-action=["']zoom-in["']/.test(viewerSrc) ||
    /aria-label=["']Zoom in["']/i.test(viewerSrc),
  "zoom-in control present"
);
assert(
  /data-action=["']zoom-out["']/.test(viewerSrc) ||
    /aria-label=["']Zoom out["']/i.test(viewerSrc),
  "zoom-out control present"
);
assert(
  /data-action=["']fullscreen["']|data-action=["']toggle-fullscreen["']|Fullscreen|fullscreen/.test(
    viewerSrc
  ),
  "fullscreen control present"
);
assert(/onPointerDown|onPointerMove|pointer/.test(viewerSrc), "pan pointer handlers present");
assert(/dangerouslySetInnerHTML/.test(viewerSrc), "SVG still injected");
assert(/renderMermaidSvg/.test(viewerSrc), "still uses shipped render path");
// Page-zoom suppression: non-passive listeners + preventDefault
assert(
  /passive:\s*false/.test(viewerSrc),
  "native wheel/touch listeners use passive: false"
);
assert(
  viewerSrc.includes('addEventListener("wheel"') ||
    viewerSrc.includes("addEventListener('wheel'"),
  "native wheel listener registered"
);
assert(
  viewerSrc.includes("gesturestart") || viewerSrc.includes("touchmove"),
  "gesture or touch handlers block page pinch"
);
assert(/preventDefault\(\)/.test(viewerSrc), "preventDefault used to block browser zoom");
assert(/touchAction:\s*["']none["']/.test(viewerSrc), "touch-action none on canvas");
console.log("OK: mermaid.tsx wires zoom/pan/fullscreen + blocks page zoom");

console.log("\nALL INTERACT CHECKS PASSED");
