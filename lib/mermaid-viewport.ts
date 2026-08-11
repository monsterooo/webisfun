/**
 * Pure viewport state for mermaid diagram interaction (zoom / pan / fullscreen).
 * Used by the client viewer and unit-tested without a browser.
 */

export type MermaidViewport = {
  /** Diagram scale (1 = 100%). */
  scale: number;
  /** Horizontal pan offset in CSS pixels. */
  x: number;
  /** Vertical pan offset in CSS pixels. */
  y: number;
  /** Whether the immersive fullscreen overlay is open. */
  fullscreen: boolean;
};

export const MERMAID_MIN_SCALE = 0.25;
export const MERMAID_MAX_SCALE = 4;
/** Multiplicative zoom step for button zoom in/out. */
export const MERMAID_ZOOM_STEP = 1.25;

export const DEFAULT_MERMAID_VIEWPORT: MermaidViewport = {
  scale: 1,
  x: 0,
  y: 0,
  fullscreen: false,
};

export function clampScale(scale: number): number {
  if (!Number.isFinite(scale)) return 1;
  return Math.min(MERMAID_MAX_SCALE, Math.max(MERMAID_MIN_SCALE, scale));
}

export function createMermaidViewport(
  partial?: Partial<MermaidViewport>
): MermaidViewport {
  return {
    ...DEFAULT_MERMAID_VIEWPORT,
    ...partial,
    scale: clampScale(partial?.scale ?? DEFAULT_MERMAID_VIEWPORT.scale),
  };
}

export type ZoomPivot = {
  /** Pivot X in viewport / canvas coordinates (CSS px). */
  x: number;
  /** Pivot Y in viewport / canvas coordinates (CSS px). */
  y: number;
};

/**
 * Zoom while keeping a pivot point (viewport coords) stable.
 * Used for wheel zoom (cursor) and button zoom (canvas center).
 */
export function zoomAt(
  state: MermaidViewport,
  nextScale: number,
  pivotX: number,
  pivotY: number
): MermaidViewport {
  const scale = clampScale(nextScale);
  if (scale === state.scale) return { ...state, scale };
  const worldX = (pivotX - state.x) / state.scale;
  const worldY = (pivotY - state.y) / state.scale;
  return {
    ...state,
    scale,
    x: pivotX - worldX * scale,
    y: pivotY - worldY * scale,
  };
}

/**
 * Zoom in by multiplying scale (bounded).
 * When `pivot` is provided, pan is adjusted so that point stays fixed
 * (pass canvas center for toolbar zoom).
 */
export function zoomIn(
  state: MermaidViewport,
  step: number = MERMAID_ZOOM_STEP,
  pivot?: ZoomPivot
): MermaidViewport {
  const nextScale = state.scale * step;
  if (pivot) return zoomAt(state, nextScale, pivot.x, pivot.y);
  return setScale(state, nextScale);
}

/**
 * Zoom out by dividing scale (bounded).
 * When `pivot` is provided, pan is adjusted so that point stays fixed.
 */
export function zoomOut(
  state: MermaidViewport,
  step: number = MERMAID_ZOOM_STEP,
  pivot?: ZoomPivot
): MermaidViewport {
  const nextScale = state.scale / step;
  if (pivot) return zoomAt(state, nextScale, pivot.x, pivot.y);
  return setScale(state, nextScale);
}

/**
 * Set absolute scale within bounds.
 * When `pivot` is provided, pan is adjusted so that point stays fixed.
 */
export function setScale(
  state: MermaidViewport,
  scale: number,
  pivot?: ZoomPivot
): MermaidViewport {
  if (pivot) return zoomAt(state, scale, pivot.x, pivot.y);
  return { ...state, scale: clampScale(scale) };
}

/** Zoom in around the center of a canvas of the given size. */
export function zoomInAtCenter(
  state: MermaidViewport,
  width: number,
  height: number,
  step: number = MERMAID_ZOOM_STEP
): MermaidViewport {
  return zoomIn(state, step, { x: width / 2, y: height / 2 });
}

/** Zoom out around the center of a canvas of the given size. */
export function zoomOutAtCenter(
  state: MermaidViewport,
  width: number,
  height: number,
  step: number = MERMAID_ZOOM_STEP
): MermaidViewport {
  return zoomOut(state, step, { x: width / 2, y: height / 2 });
}

/** Translate the diagram by dx/dy in CSS pixels. */
export function panBy(
  state: MermaidViewport,
  dx: number,
  dy: number
): MermaidViewport {
  return {
    ...state,
    x: state.x + dx,
    y: state.y + dy,
  };
}

/** Reset pan + scale (keeps fullscreen flag unless overridden). */
export function resetViewport(
  state: MermaidViewport = DEFAULT_MERMAID_VIEWPORT
): MermaidViewport {
  return {
    ...state,
    scale: DEFAULT_MERMAID_VIEWPORT.scale,
    x: DEFAULT_MERMAID_VIEWPORT.x,
    y: DEFAULT_MERMAID_VIEWPORT.y,
  };
}

export function enterFullscreen(state: MermaidViewport): MermaidViewport {
  return { ...state, fullscreen: true };
}

export function exitFullscreen(state: MermaidViewport): MermaidViewport {
  return { ...state, fullscreen: false };
}

export function toggleFullscreen(state: MermaidViewport): MermaidViewport {
  return { ...state, fullscreen: !state.fullscreen };
}

/** CSS transform for the pan/zoom surface. */
export function toCssTransform(state: MermaidViewport): string {
  return `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
}

/**
 * Map a wheel deltaY to a scale multiplier.
 * Negative deltaY (scroll up) zooms in.
 */
export function scaleFromWheelDelta(
  currentScale: number,
  deltaY: number,
  sensitivity = 0.0015
): number {
  const factor = Math.exp(-deltaY * sensitivity);
  return clampScale(currentScale * factor);
}

/** Euclidean distance between two points (for pinch gestures). */
export function distanceBetween(
  a: { x: number; y: number },
  b: { x: number; y: number }
): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/**
 * Scale from a pinch gesture: ratio of current finger distance to start distance.
 */
export function scaleFromPinch(
  startScale: number,
  startDistance: number,
  currentDistance: number
): number {
  if (!(startDistance > 0) || !Number.isFinite(startDistance)) {
    return clampScale(startScale);
  }
  if (!Number.isFinite(currentDistance) || currentDistance < 0) {
    return clampScale(startScale);
  }
  return clampScale(startScale * (currentDistance / startDistance));
}

/** Midpoint between two points (pinch pivot in viewport coords). */
export function midpointBetween(
  a: { x: number; y: number },
  b: { x: number; y: number }
): { x: number; y: number } {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}
