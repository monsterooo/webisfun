"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  Maximize2,
  Minimize2,
  Move,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  createMermaidViewport,
  distanceBetween,
  enterFullscreen,
  exitFullscreen,
  midpointBetween,
  panBy,
  resetViewport,
  scaleFromPinch,
  scaleFromWheelDelta,
  toCssTransform,
  toggleFullscreen,
  zoomAt,
  zoomInAtCenter,
  zoomOutAtCenter,
  type MermaidViewport,
} from "@/lib/mermaid-viewport";
import { renderMermaidSvg } from "@/lib/render-mermaid";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface MermaidProps {
  chart: string;
  className?: string;
}

function MermaidToolbar({
  viewport,
  onChange,
  getCanvasSize,
  className,
}: {
  viewport: MermaidViewport;
  onChange: (next: MermaidViewport) => void;
  /** Canvas size so zoom buttons pivot around the visual center. */
  getCanvasSize: () => { width: number; height: number };
  className?: string;
}) {
  const percent = Math.round(viewport.scale * 100);

  const handleZoomIn = () => {
    const { width, height } = getCanvasSize();
    onChange(zoomInAtCenter(viewport, width, height));
  };

  const handleZoomOut = () => {
    const { width, height } = getCanvasSize();
    onChange(zoomOutAtCenter(viewport, width, height));
  };

  return (
    <div
      className={cn(
        "pointer-events-auto absolute top-2 right-2 z-10 flex items-center gap-1 rounded-md border border-white/10 bg-black/70 p-1 shadow-lg backdrop-blur-sm",
        className
      )}
      role="toolbar"
      aria-label="Diagram controls"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="size-8 text-white hover:bg-white/10 hover:text-white"
        data-action="zoom-out"
        aria-label="Zoom out"
        onClick={handleZoomOut}
      >
        <ZoomOut className="size-4" />
      </Button>
      <span
        className="min-w-12 select-none px-1 text-center text-xs tabular-nums text-white/80"
        data-mermaid-scale
        aria-live="polite"
      >
        {percent}%
      </span>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="size-8 text-white hover:bg-white/10 hover:text-white"
        data-action="zoom-in"
        aria-label="Zoom in"
        onClick={handleZoomIn}
      >
        <ZoomIn className="size-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="size-8 text-white hover:bg-white/10 hover:text-white"
        data-action="reset"
        aria-label="Reset view"
        onClick={() => onChange(resetViewport(viewport))}
      >
        <RotateCcw className="size-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="size-8 text-white hover:bg-white/10 hover:text-white"
        data-action="toggle-fullscreen"
        aria-label={
          viewport.fullscreen ? "Exit fullscreen" : "Enter fullscreen"
        }
        onClick={() => onChange(toggleFullscreen(viewport))}
      >
        {viewport.fullscreen ? (
          <Minimize2 className="size-4" />
        ) : (
          <Maximize2 className="size-4" />
        )}
      </Button>
    </div>
  );
}

function MermaidCanvas({
  svg,
  viewport,
  onChange,
  className,
  tall,
}: {
  svg: string;
  viewport: MermaidViewport;
  onChange: (next: MermaidViewport) => void;
  className?: string;
  tall?: boolean;
}) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const viewportRef = useRef(viewport);
  viewportRef.current = viewport;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  /** Active two-finger pinch (touch) — blocks browser page zoom. */
  const pinchRef = useRef<{
    lastDistance: number;
  } | null>(null);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      // Only primary button / single pointer; ignore toolbar (stopPropagation)
      if (event.button !== 0) return;
      // Multi-touch pinch is handled by native touch listeners
      if (event.pointerType === "touch" && event.isPrimary === false) return;
      draggingRef.current = true;
      setIsDragging(true);
      lastPoint.current = { x: event.clientX, y: event.clientY };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current || !lastPoint.current) return;
      // Don't pan while a pinch is active
      if (pinchRef.current) return;
      const dx = event.clientX - lastPoint.current.x;
      const dy = event.clientY - lastPoint.current.y;
      lastPoint.current = { x: event.clientX, y: event.clientY };
      onChange(panBy(viewportRef.current, dx, dy));
    },
    [onChange]
  );

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    lastPoint.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // already released
    }
  }, []);

  const getCanvasSize = useCallback(() => {
    const rect = surfaceRef.current?.getBoundingClientRect();
    return {
      width: rect?.width ?? 0,
      height: rect?.height ?? 0,
    };
  }, []);

  // Native non-passive listeners so preventDefault actually blocks browser zoom
  // (React's onWheel is often passive; ctrl+wheel / trackpad pinch zooms the page).
  useEffect(() => {
    const el = surfaceRef.current;
    if (!el) return;

    const pointInCanvas = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
        rect,
      };
    };

    const onWheel = (event: WheelEvent) => {
      // Always prevent browser/page zoom & scroll while over the diagram
      event.preventDefault();
      event.stopPropagation();

      const { x: pivotX, y: pivotY } = pointInCanvas(
        event.clientX,
        event.clientY
      );
      // Trackpad pinch is often delivered as wheel + ctrlKey; still use deltaY
      const nextScale = scaleFromWheelDelta(
        viewportRef.current.scale,
        event.deltaY
      );
      onChangeRef.current(
        zoomAt(viewportRef.current, nextScale, pivotX, pivotY)
      );
    };

    // Safari: page pinch uses gesture* events
    const onGesture = (event: Event) => {
      event.preventDefault();
    };

    const touchPoints = (touches: TouchList) => {
      const a = touches.item(0);
      const b = touches.item(1);
      if (!a || !b) return null;
      const pa = pointInCanvas(a.clientX, a.clientY);
      const pb = pointInCanvas(b.clientX, b.clientY);
      return {
        a: { x: pa.x, y: pa.y },
        b: { x: pb.x, y: pb.y },
      };
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        // Stop browser pinch-zoom of the page
        event.preventDefault();
        draggingRef.current = false;
        setIsDragging(false);
        lastPoint.current = null;
        const pts = touchPoints(event.touches);
        if (!pts) return;
        pinchRef.current = {
          lastDistance: distanceBetween(pts.a, pts.b),
        };
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        // Critical: non-passive + preventDefault blocks page zoom
        event.preventDefault();
        const pts = touchPoints(event.touches);
        const pinch = pinchRef.current;
        if (!pts || !pinch || pinch.lastDistance <= 0) return;
        const dist = distanceBetween(pts.a, pts.b);
        const mid = midpointBetween(pts.a, pts.b);
        // Incremental scale from last frame so midpoint tracking stays stable
        const nextScale = scaleFromPinch(
          viewportRef.current.scale,
          pinch.lastDistance,
          dist
        );
        onChangeRef.current(
          zoomAt(viewportRef.current, nextScale, mid.x, mid.y)
        );
        pinch.lastDistance = dist;
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        // Still pinching with remaining fingers — re-baseline distance
        const pts = touchPoints(event.touches);
        if (pts) {
          pinchRef.current = {
            lastDistance: distanceBetween(pts.a, pts.b),
          };
        }
      } else {
        pinchRef.current = null;
      }
    };

    const wheelOpts: AddEventListenerOptions = { passive: false };
    const touchOpts: AddEventListenerOptions = { passive: false };

    el.addEventListener("wheel", onWheel, wheelOpts);
    el.addEventListener("touchstart", onTouchStart, touchOpts);
    el.addEventListener("touchmove", onTouchMove, touchOpts);
    el.addEventListener("touchend", onTouchEnd, touchOpts);
    el.addEventListener("touchcancel", onTouchEnd, touchOpts);
    // Safari non-standard gesture events
    el.addEventListener("gesturestart", onGesture, wheelOpts);
    el.addEventListener("gesturechange", onGesture, wheelOpts);
    el.addEventListener("gestureend", onGesture, wheelOpts);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("gesturestart", onGesture);
      el.removeEventListener("gesturechange", onGesture);
      el.removeEventListener("gestureend", onGesture);
    };
  }, []);

  return (
    <div
      ref={surfaceRef}
      data-mermaid-canvas
      className={cn(
        // Height comes from parent: default on data-mermaid-viewer, or
        // 100% when wrapped in [data-mermaid-frame]. Fullscreen uses tall + flex-1.
        // Surface matches Shiki code blocks: black/50 + soft border (see globals .shiki).
        "relative h-full w-full overflow-hidden rounded-sm border border-white/10 bg-black/50",
        tall && "min-h-0 flex-1",
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{
        // Disable browser pan/zoom gestures on this surface
        touchAction: "none",
        cursor: isDragging ? "grabbing" : "grab",
        // Safari: reduce callout / magnifier interference
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    >
      <MermaidToolbar
        viewport={viewport}
        onChange={onChange}
        getCanvasSize={getCanvasSize}
        className="pointer-events-auto"
      />
      <div className="pointer-events-none absolute bottom-2 left-2 z-10 flex items-center gap-1.5 rounded bg-black/50 px-2 py-1 text-[11px] text-white/60">
        <Move className="size-3" />
        Drag to pan · Scroll to zoom
      </div>
      <div
        data-mermaid-surface
        className="flex h-full w-full items-center justify-center will-change-transform [&_svg]:max-w-none"
        style={{
          // Origin top-left; pan (x,y) is adjusted so zoom pivots stay fixed
          transform: toCssTransform(viewport),
          transformOrigin: "0 0",
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}

/** Default viewport size; overridden to 100% inside [data-mermaid-frame]. */
const mermaidViewerSizeClassName =
  "my-5 h-[min(420px,60vh)] w-full [[data-mermaid-frame]>&]:my-0 [[data-mermaid-frame]>&]:h-full";

export function Mermaid({ chart, className }: MermaidProps) {
  const reactId = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [viewport, setViewport] = useState<MermaidViewport>(() =>
    createMermaidViewport()
  );

  useEffect(() => {
    let cancelled = false;

    renderMermaidSvg(chart, `mmd-${reactId}`)
      .then((result) => {
        if (!cancelled) {
          setSvg(result);
          setError(null);
          setViewport(createMermaidViewport());
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  const handleViewportChange = useCallback((next: MermaidViewport) => {
    setViewport(next);
  }, []);

  const handleFullscreenOpenChange = useCallback((open: boolean) => {
    setViewport((prev) =>
      open ? enterFullscreen(prev) : exitFullscreen(prev)
    );
  }, []);

  if (error) {
    return (
      <pre
        data-mermaid-viewer
        className={cn(
          mermaidViewerSizeClassName,
          "overflow-x-auto rounded-sm border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-300",
          className
        )}
      >
        Failed to render Mermaid diagram: {error}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div
        data-mermaid-viewer
        className={cn(
          mermaidViewerSizeClassName,
          "animate-pulse rounded-sm bg-white/5",
          className
        )}
        aria-busy="true"
        aria-label="Rendering diagram"
      />
    );
  }

  return (
    <div
      className={cn(mermaidViewerSizeClassName, className)}
      data-mermaid-viewer
    >
      <MermaidCanvas
        svg={svg}
        viewport={viewport}
        onChange={handleViewportChange}
      />

      <Dialog
        open={viewport.fullscreen}
        onOpenChange={handleFullscreenOpenChange}
      >
        <DialogContent
          className="flex h-[100dvh] max-h-[100dvh] w-screen max-w-none translate-x-[-50%] translate-y-[-50%] flex-col gap-0 overflow-hidden rounded-none border-0 bg-[#0d1117] p-3 sm:max-w-none"
          data-mermaid-fullscreen
          aria-describedby={undefined}
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Diagram fullscreen</DialogTitle>
          <DialogDescription className="sr-only">
            Interactive mermaid diagram with pan and zoom
          </DialogDescription>
          <MermaidCanvas
            svg={svg}
            viewport={viewport}
            onChange={handleViewportChange}
            tall
            className="min-h-0 flex-1 border-white/5"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
