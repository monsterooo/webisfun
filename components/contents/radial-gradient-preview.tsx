"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  shape: z.string(),
  size: z.string(),
  color1: z.string(),
  color2: z.string(),
});

export function RadialGradientPreview() {
  const previewRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [codeHtml, setCodeHtml] = useState("");
  const [clientPosition, setClientPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 50, y: 50 });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shape: "ellipse",
      size: "closest-side",
      color1: "#e63946",
      color2: "#2a9d8f",
    },
  });

  const shape = useWatch({ control: form.control, name: "shape" });
  const size = useWatch({ control: form.control, name: "size" });
  const color1 = useWatch({ control: form.control, name: "color1" });
  const color2 = useWatch({ control: form.control, name: "color2" });

  const g = `radial-gradient(${shape} ${size} at ${clientPosition.x}% ${clientPosition.y}%, ${color1}, ${color2})`;
  const codeValue = `.element {
  ${g}
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

  const handleDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    updatePosition(e);
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updatePosition(e);
  };

  const handleUp = () => {
    isDraggingRef.current = false;
  };

  const updatePosition = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!previewRef.current) return;
    const bounds = previewRef.current.getBoundingClientRect();
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
    setClientPosition({
      x,
      y,
    });
  };

  useEffect(() => {
    document.addEventListener("pointerup", handleUp);
    return () => {
      document.removeEventListener("pointerup", handleUp);
      //
    };
  }, []);

  return (
    <div className="border border-gray-700 bg-card-foreground rounded-sm w-full mx-auto">
      <div
        className="h-[260px] rounded-t-sm relative"
        style={{ background: g }}
        ref={previewRef}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
      >
        <div
          style={{ left: clientPosition.x + "%", top: clientPosition.y + "%" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 bg-card-foreground rounded-full border-2 border-primary pointer-events-none"
        ></div>
      </div>
      <div className="border-t border-gray-700 px-7 py-6">
        <Form {...form}>
          <form className="flex items-center gap-8 flex-wrap">
            <FormField
              control={form.control}
              name="shape"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>形状</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="ellipse">椭圆</SelectItem>
                          <SelectItem value="circle">圆形</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    范围
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleAlert size={18} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>结束时渐变形状的范围</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="closest-corner">
                            closest-corner
                          </SelectItem>
                          <SelectItem value="closest-side">
                            closest-side
                          </SelectItem>
                          <SelectItem value="farthest-corner">
                            farthest-corner
                          </SelectItem>
                          <SelectItem value="farthest-side">
                            farthest-side
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                  <FormLabel>内色</FormLabel>
                  <FormControl>
                    <Input
                      className="p-0 leading-0 border-0 w-9 h-7"
                      type="color"
                      {...field}
                    />
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
                  <FormLabel>外色</FormLabel>
                  <FormControl>
                    <Input
                      className="p-0 leading-0 border-0 w-9 h-7"
                      type="color"
                      {...field}
                    />
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
