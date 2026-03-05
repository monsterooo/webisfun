"use client";

import { useEffect, useRef } from "react";

type Colors = [string, string, string, string];

interface ConicAngleProps {
  mode: "smooth" | "hard";
  from: number;
  cx: number;
  cy: number;
  colors: Colors;
  width?: number;
  height?: number;
}

function cpPrefix(cp: ConicAngleProps) {
  const fr = cp.from !== 0 ? `from ${cp.from}deg ` : "";
  const at = cp.cx !== 50 || cp.cy !== 50 ? `at ${cp.cx}% ${cp.cy}% ` : "";
  return fr || at ? `${fr}${at}, ` : "";
}

const MODES = {
  smooth: {
    label: "平滑插值 · 颜色之间自然过渡",
    swatches: (colors: Colors) => [
      { id: "cp-c0", val: colors[0], lbl: "0°" },
      { id: "cp-c1", val: colors[1], lbl: "120°" },
      { id: "cp-c2", val: colors[2], lbl: "240°" },
      { id: "cp-c3", val: colors[3], lbl: "360°" },
    ],
    css(cp: ConicAngleProps) {
      const pre = cpPrefix(cp);
      return `background: conic-gradient(${pre}${cp.colors[0]}, ${cp.colors[1]} 33%, ${cp.colors[2]} 66%, ${cp.colors[3]});`;
    },
    applyBg(cp: ConicAngleProps) {
      const pre = cpPrefix(cp);
      return `conic-gradient(${pre}${cp.colors[0]}, ${cp.colors[1]} 33%, ${cp.colors[2]} 66%, ${cp.colors[3]})`;
    },
    spokes: [0, 33, 66, 100],
  },
  hard: {
    label: "硬边色标 · 同位置两次写法，无过渡",
    swatches: (colors: Colors) => [
      { id: "cp-c0", val: colors[0], lbl: "0–25%" },
      { id: "cp-c1", val: colors[1], lbl: "25–50%" },
      { id: "cp-c2", val: colors[2], lbl: "50–75%" },
      { id: "cp-c3", val: colors[3], lbl: "75–100%" },
    ],
    css(cp: ConicAngleProps) {
      const pre = cpPrefix(cp);
      return `background: conic-gradient(${pre}${cp.colors[0]} 0% 25%, ${cp.colors[1]} 25% 50%, ${cp.colors[2]} 50% 75%, ${cp.colors[3]} 75% 100%);`;
    },
    applyBg(cp: ConicAngleProps) {
      const pre = cpPrefix(cp);
      return `conic-gradient(${pre}${cp.colors[0]} 0% 25%, ${cp.colors[1]} 25% 50%, ${cp.colors[2]} 50% 75%, ${cp.colors[3]} 75% 100%)`;
    },
    spokes: [0, 25, 50, 75, 100],
  },
};

export function ConicAngle({
  width = 200,
  height = 200,
  mode,
  from,
  cx,
  cy,
  colors,
}: ConicAngleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const drawAngleCanvas = () => {
    if (!canvasRef.current) return;
    const S = width;
    const dpr = window.devicePixelRatio || 1;
    canvasRef.current.width = S * dpr;
    canvasRef.current.height = S * dpr;
    canvasRef.current.style.width = S + "px";
    canvasRef.current.style.height = S + "px";

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, S, S);

    const cxPx = (cx / 100) * S;
    const cyPx = (cy / 100) * S;
    const fromRad = ((from - 90) * Math.PI) / 180;

    // 颜色边界参考线
    const spokes = MODES[mode].spokes;
    spokes.forEach((pct) => {
      const rad = fromRad + (pct / 100) * Math.PI * 2;
      const x2 = cxPx + Math.cos(rad) * S * 0.48;
      const y2 = cyPx + Math.sin(rad) * S * 0.48;
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(cxPx, cyPx);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    });

    // 起点参考线
    ctx.save();
    ctx.strokeStyle = "rgba(230,57,70,0.85)";
    ctx.lineWidth = 1.8;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(cxPx, cyPx);
    ctx.lineTo(
      cxPx + Math.cos(fromRad) * S * 0.48,
      cyPx + Math.sin(fromRad) * S * 0.48
    );
    ctx.stroke();

    // 角度弧线
    if (from > 0) {
      ctx.strokeStyle = "rgba(230,57,70,0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(cxPx, cyPx, 20, -Math.PI / 2, fromRad);
      ctx.stroke();
    }
    ctx.restore();

    // 中心点
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(cxPx - 9, cyPx);
    ctx.lineTo(cxPx + 9, cyPx);
    ctx.moveTo(cxPx, cyPx - 9);
    ctx.lineTo(cxPx, cyPx + 9);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cxPx, cyPx, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e63946";
    ctx.beginPath();
    ctx.arc(cxPx, cyPx, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const getXY = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!wrapRef.current) return;
    const bounds = wrapRef.current.getBoundingClientRect();
    const x = Math.round(
      Math.max(
        0,
        Math.min(100, ((e.clientX - bounds.left) / bounds.width) * 100)
      )
    );
    const y = Math.round(
      Math.max(
        0,
        Math.min(100, ((e.clientY - bounds.top) / bounds.height) * 100)
      )
    );
    return {
      x,
      y,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    const point = getXY(e);
    console.log("point:", point);
  };

  useEffect(() => {
    drawAngleCanvas();
  }, []);

  return (
    <div
      className="relative cursor-crosshair"
      style={{ width, height }}
      ref={wrapRef}
      onPointerDown={handlePointerDown}
    >
      <div
        className="absolute inset-0 rounded-full shrink-0"
        style={{
          background:
            "conic-gradient(rgb(230, 57, 70), rgb(244, 162, 97) 33%, rgb(42, 157, 143) 66%, rgb(26, 26, 46))",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full rounded-full"
        style={{ width, height }}
      />
    </div>
  );
}

export function ConicGradientPreview() {
  return (
    <div className="">
      <div className="grid gird-cols-[260px_1fr] grid-rows-[1fr_auto]">
        <div className="row-span-[1] col-span-[1] flex flex-col gap-3.5">
          <ConicAngle
            width={200}
            height={200}
            mode="smooth"
            from={120}
            cx={50}
            cy={50}
            colors={["#e63946", "#f4a261", "#2a9d8f", "#1a1a2e"]}
          />
        </div>
        <div className="flex-1">控制器</div>
      </div>
      <div>代码</div>
    </div>
  );
}
