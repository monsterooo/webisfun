"use client";

import { useState } from "react";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";

const formSchema = z.object({
  color1: z.string(),
  color2: z.string(),
  color3: z.string(),
  color1Position: z.array(z.number()),
  color2Position: z.array(z.number()),
  color3Position: z.array(z.number()),
});

export function GradientHardEdge() {
  const [codeHtml, setCodeHtml] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color1: "#e63946",
      color2: "#2a9d8f",
      color3: "#f4a261",
      color1Position: [20],
      color2Position: [50],
      color3Position: [80],
    },
  });
  const color1 = useWatch({ control: form.control, name: "color1" });
  const color2 = useWatch({ control: form.control, name: "color2" });
  const color3 = useWatch({ control: form.control, name: "color3" });
  const color1Position = useWatch({
    control: form.control,
    name: "color1Position",
  });
  const color2Position = useWatch({
    control: form.control,
    name: "color2Position",
  });
  const color3Position = useWatch({
    control: form.control,
    name: "color3Position",
  });
  const codeValue = `.element {
  background: linear-gradient(90deg, ${color1} ${color1Position}%, ${color2} ${color2Position}%, ${color3} ${color3Position}%);
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
    <div className="border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-700 rounded-sm w-full pb-5">
      <div
        className="h-[260px] rounded-t-sm"
        style={{
          background: `linear-gradient(90deg, ${color1} ${color1Position}%, ${color2} ${color2Position}%, ${color3} ${color3Position}%)`,
        }}
      ></div>
      <div>
        <Form {...form}>
          <form className="flex flex-col items-center gap-4 px-7 py-6">
            <div className="flex items-center gap-4 w-full">
              <FormField
                control={form.control}
                name="color1"
                render={({ field }) => (
                  <FormItem className="w-12">
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
                name="color1Position"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
              <div className="text-primary" style={{ color: color1 }}>
                {color1Position[0]}%
              </div>
            </div>
            <div className="flex items-center gap-4 w-full">
              <FormField
                control={form.control}
                name="color2"
                render={({ field }) => (
                  <FormItem className="w-12">
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
                name="color2Position"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
              <div className="text-primary" style={{ color: color2 }}>
                {color2Position[0]}%
              </div>
            </div>
            <div className="flex items-center gap-4 w-full">
              <FormField
                control={form.control}
                name="color3"
                render={({ field }) => (
                  <FormItem className="w-12">
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
                name="color3Position"
                render={({ field }) => (
                  <FormItem className="flex-1">
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
              <div className="text-primary" style={{ color: color3 }}>
                {color3Position[0]}%
              </div>
            </div>
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
