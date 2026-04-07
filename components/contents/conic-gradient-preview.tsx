"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useDebounce } from "react-use";
import { codeToHtml } from "shiki";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

type Colors = [string, string, string, string];

interface ConicAngleProps {
  mode: "smooth" | "hard";
  from: number;
  cx: number;
  cy: number;
  colors: Colors;
  width?: number;
  height?: number;
  onPointerDown?: ({ x, y }: { x: number; y: number }) => void;
  onPointerMove?: ({ x, y }: { x: number; y: number }) => void;
}

function cpPrefix({ from, cx, cy }: { from: number; cx: number; cy: number }) {
  const fr = from !== 0 ? `from ${from}deg ` : "";
  const at = cx !== 50 || cy !== 50 ? `at ${cx}% ${cy}% ` : "";
  return fr || at ? `${fr}${at}, ` : "";
}

const MODES = {
  smooth: {
    spokes: [0, 33, 66, 100],
  },
  hard: {
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
  cssValue,
  onPointerDown,
  onPointerMove,
}: ConicAngleProps & { cssValue: string }) {
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
    onPointerDown?.({ x: point?.x || 0, y: point?.y || 0 });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const point = getXY(e);
    onPointerMove?.({ x: point?.x || 0, y: point?.y || 0 });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    drawAngleCanvas();
  }, [from, cx, cy, colors]);

  return (
    <div
      className="relative cursor-crosshair"
      style={{ width, height }}
      ref={wrapRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className="absolute inset-0 rounded-full shrink-0"
        style={{
          background: cssValue,
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

const formSchema = z.object({
  mode: z.string(),
  from: z.array(z.number()),
  cx: z.array(z.number()),
  cy: z.array(z.number()),
  color1: z.string(),
  color2: z.string(),
  color3: z.string(),
  color4: z.string(),
});

export function ConicGradientPreview() {
  const [codeHtml, setCodeHtml] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: [30],
      cx: [50],
      cy: [50],
      color1: "#e63946",
      color2: "#f4a261",
      color3: "#2a9d8f",
      color4: "#1a1a2e",
    },
  });

  const from = useWatch({ control: form.control, name: "from" });
  const color1 = useWatch({ control: form.control, name: "color1" });
  const color2 = useWatch({ control: form.control, name: "color2" });
  const color3 = useWatch({ control: form.control, name: "color3" });
  const color4 = useWatch({ control: form.control, name: "color4" });
  const cx = useWatch({ control: form.control, name: "cx" });
  const cy = useWatch({ control: form.control, name: "cy" });

  const pre = cpPrefix({ from: from[0], cx: cx[0], cy: cy[0] });
  const cssBackground = `conic-gradient(${pre}${color1}, ${color2} 33%, ${color3} 66%, ${color4})`;

  const codeValue = `.element {
  background: ${cssBackground};
}`;

  useDebounce(
    async () => {
      const code = await codeToHtml(codeValue, {
        lang: "css",
        theme: "github-dark",
      });
      setCodeHtml(code);
    },
    500,
    [codeValue]
  );

  return (
    <div className="border border-gray-700 bg-write-card-background rounded-sm w-full mx-auto pb-5">
      <div className="grid grid-cols-[260px_1fr] grid-rows-[1fr_auto]">
        <div className="row-[1] col-[1] flex flex-col gap-3.5 p-5 border-r border-gray-700">
          <ConicAngle
            cssValue={cssBackground}
            width={200}
            height={200}
            mode="smooth"
            from={from[0]}
            cx={cx[0]}
            cy={cy[0]}
            colors={[color1, color2, color3, color4]}
            onPointerDown={({ x, y }) => {
              form.setValue("cx", [x]);
              form.setValue("cy", [y]);
            }}
            onPointerMove={({ x, y }) => {
              form.setValue("cx", [x]);
              form.setValue("cy", [y]);
            }}
          />
        </div>
        <div className="p-5">
          <Form {...form}>
            <form className="w-full flex flex-col gap-8">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>起始角度 (from)</FormLabel>
                    <FormControl>
                      <Slider
                        value={field.value}
                        onValueChange={field.onChange}
                        max={360}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="cx"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>旋转中心 x 坐标</FormLabel>
                      <FormControl>
                        <Slider
                          value={field.value}
                          onValueChange={field.onChange}
                          max={100}
                          step={1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cy"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>旋转中心 y 坐标</FormLabel>
                      <FormControl>
                        <Slider
                          value={field.value}
                          onValueChange={field.onChange}
                          max={100}
                          step={1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="gird gird-cols-1">
                <Label className="">颜色 (color-stops )</Label>

                <div className="flex gap-5 mt-1">
                  <FormField
                    control={form.control}
                    name="color1"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <div>
                            <Input
                              type="color"
                              className="p-0 leading-0 border-0 w-9 h-7"
                              {...field}
                            />
                            <p className="text-xs text-center text-gray-500">
                              0°
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color2"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <div>
                            <Input
                              type="color"
                              className="p-0 leading-0 border-0 w-9 h-7"
                              {...field}
                            />
                            <p className="text-xs text-center text-gray-500">
                              120°
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color3"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <div>
                            <Input
                              type="color"
                              className="p-0 leading-0 border-0 w-9 h-7"
                              {...field}
                            />
                            <p className="text-xs text-center text-gray-500">
                              120°
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color4"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <div>
                            <Input
                              type="color"
                              className="p-0 leading-0 border-0 w-9 h-7"
                              {...field}
                            />
                            <p className="text-xs text-center text-gray-500">
                              360°
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="border-t border-gray-700 px-5 pt-5">
        <div
          className="[&_pre]:mb-0!"
          dangerouslySetInnerHTML={{ __html: codeHtml }}
        />
      </div>
    </div>
  );
}
