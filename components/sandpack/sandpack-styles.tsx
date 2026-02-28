"use client";

import { useServerInsertedHTML } from "next/navigation";
import { getSandpackCssText } from "@codesandbox/sandpack-react";

export const SandPackCSS = () => {
  useServerInsertedHTML(() => {
    return (
      <style
        dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
        id="sandpack"
      />
    );
  });
  return null;
};
