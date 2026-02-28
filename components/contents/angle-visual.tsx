"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
import { Slider } from "../ui/slider";

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

interface AngleDirectionProps {
  angle: number;
  style: CSSProperties;
  color1: string;
  color2: string;
}

export function AngleDirection({
  angle,
  color1,
  color2,
  style,
}: AngleDirectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawAngleCanvas = (angle: number, c1: string, c2: string) => {
    if (!canvasRef.current) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvasRef.current.offsetWidth;
    const H = canvasRef.current.offsetHeight;

    canvasRef.current.width = W * dpr;
    canvasRef.current.height = H * dpr;

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2;
    const cy = H / 2;
    const r = Math.min(W, H) * 0.35;
    const mathAngle = toRadians(angle - 90); // css角度到数学角度
    const endX = cx + Math.cos(mathAngle) * r;
    const endY = cy + Math.sin(mathAngle) * r;
    const startX = cx - Math.cos(mathAngle) * r;
    const startY = cy - Math.sin(mathAngle) * r;
    // const perpAngle = mathAngle + Math.PI / 2; // 垂直角度
    // const perpLen = 50;

    // 圆边框
    ctx.strokeStyle = "#d4cfc4";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 色杆
    const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
    gradient.addColorStop(0, c1);
    gradient.addColorStop(1, c2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // 色杆箭头
    const arrowSize = 10;
    ctx.fillStyle = c2;
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - arrowSize * Math.cos(mathAngle - 0.5),
      endY - arrowSize * Math.sin(mathAngle - 0.5)
    );
    ctx.lineTo(
      endX - arrowSize * Math.cos(mathAngle + 0.5),
      endY - arrowSize * Math.sin(mathAngle + 0.5)
    );
    ctx.fill();

    // ctx.strokeStyle = "#d4cfc4";
    // ctx.lineWidth = 1;
    // ctx.setLineDash([3, 3]);
    // const pts = [
    //   [startX, startY],
    //   [cx, cy],
    //   [endX, endY],
    // ];
    // pts.forEach(([px, py]) => {
    //   ctx.beginPath();
    //   ctx.moveTo(
    //     px + Math.cos(perpAngle) * perpLen,
    //     py + Math.sin(perpAngle) * perpLen
    //   );
    //   ctx.lineTo(
    //     px - Math.cos(perpAngle) * perpLen,
    //     py - Math.sin(perpAngle) * perpLen
    //   );
    //   ctx.stroke();
    // });
    // ctx.setLineDash([]);

    ctx.strokeStyle = "#e63946";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, -Math.PI / 2, mathAngle, angle < 0);
    ctx.stroke();

    const labelR = 42;
    const midAng = (-Math.PI / 2 + mathAngle) / 2;
    ctx.fillStyle = "#e63946";
    ctx.font = `bold 11px 'Space Mono', monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      angle + "°",
      cx + Math.cos(midAng) * labelR,
      cy + Math.sin(midAng) * labelR
    );
  };

  useEffect(() => {
    drawAngleCanvas(angle, color1, color2);
  }, [angle, color1, color2]);

  return <canvas ref={canvasRef} style={style} />;
}

const formSchema = z.object({
  angle: z.array(z.number()),
  color1: z.string(),
  color2: z.string(),
});

export function AngleVisual() {
  const [codeHtml, setCodeHtml] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      angle: [180],
      color1: "#e63946",
      color2: "#2a9d8f",
    },
  });

  // TODO 在针对Color类型的input时会有轻微卡顿
  const angle = useWatch({ control: form.control, name: "angle" });
  const color1 = useWatch({ control: form.control, name: "color1" });
  const color2 = useWatch({ control: form.control, name: "color2" });
  const codeValue = `.element {
  background: linear-gradient(${angle[0]}deg, ${color1}, ${color2});
}`;

  useDebounce(
    async () => {
      const code = await codeToHtml(codeValue, {
        lang: "css",
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });
      setCodeHtml(code);
    },
    500,
    [codeValue]
  );

  return (
    <div className="border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-700 rounded-sm w-full md:w-[580px] mx-auto">
      <div className="flex overflow-hidden w-full">
        <AngleDirection
          angle={angle[0]}
          color1={color1}
          color2={color2}
          style={{ width: 200, height: 260 }}
        />
        <div
          className="flex-1"
          style={{
            background: `linear-gradient(${angle[0]}deg, ${color1}, ${color2})`,
          }}
        ></div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-500 px-7 py-6">
        <Form {...form}>
          <form className="flex items-center gap-8">
            <FormField
              control={form.control}
              name="angle"
              render={({ field }) => (
                <FormItem className="w-28">
                  <FormLabel>角度</FormLabel>
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
            <FormField
              control={form.control}
              name="color1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>起始色</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>结束色</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div
        className="mx-7 [&_pre]:mt-0"
        dangerouslySetInnerHTML={{ __html: codeHtml }}
      />
    </div>
  );
}
