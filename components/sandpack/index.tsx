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
