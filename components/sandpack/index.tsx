import { Children, ReactElement, useMemo } from "react";
import {
  Sandpack as SandpackAlias,
  SandpackInternal,
} from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";
import { cn } from "@/lib/utils";
import { createSandpackFile } from "./create-sandpack-file";

interface SandpackProps extends SandpackInternal {
  children: ReactElement;
  wrapClassName?: string;
}

export function Sandpack({ wrapClassName, ...props }: SandpackProps) {
  console.log("sandpack props: ", props);
  const files = createSandpackFile(
    Children.toArray(props.children) as ReactElement[]
  );

  const overrides = useMemo(() => {
    if (!files) return {};
    return {
      files,
    };
  }, [files]);

  return (
    <div className={cn("my-5", wrapClassName)}>
      <SandpackAlias theme={nightOwl} {...props} {...overrides} />
    </div>
  );
}

/*
"use client";

import { Children, memo, ReactElement } from "react";
import { SandpackProvider } from "@codesandbox/sandpack-react/unstyled";
import { Binder } from "./binder";
import { createSandpackFile } from "./create-sandpack-file";

interface SandpackProps {
  children: React.ReactElement;
}

const sandboxStyle = `
* {
  box-sizing: border-box;
}
`.trim();

export const Sandpack = memo(function SandpackWrapper(props: SandpackProps) {
  console.log("props.children:", props.children);
  const files = createSandpackFile(
    Children.toArray(props.children) as ReactElement[]
  );

  if ("/index.html" in files) {
    throw new Error(
      "You cannot use `index.html` file in sandboxes. " +
        "Only `public/index.html` is respected by Sandpack and CodeSandbox (where forks are created)."
    );
  }

  files["/src/styles.css"] = {
    code: [sandboxStyle, files["/src/styles.css"]?.code ?? ""].join("\n\n"),
    hidden: files["/src/styles.css"]?.hidden,
  };

  return (
    <div>
      <SandpackProvider files={files}>
        <Binder providedFiles={Object.keys(files)} />
      </SandpackProvider>
    </div>
  );
});
*/
