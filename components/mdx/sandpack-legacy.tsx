import { useMemo } from "react";
import * as codeFiles from "@/content/codes";
import {
  Sandpack as SandpackAlias,
  SandpackInternal,
} from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";
import { cn } from "@/lib/utils";

interface SandpackProps extends SandpackInternal {
  wrapClassName?: string;
  codeId?: string;
}

export function SandpackLegacy({
  codeId,
  wrapClassName,
  ...props
}: SandpackProps) {
  const codeFile = useMemo(() => {
    if (!codeId) return null;
    return codeFiles?.[codeId as keyof typeof codeFiles];
  }, [codeId]);

  const overrides = useMemo(() => {
    if (!codeFile) return {};
    return {
      files: codeFile,
    };
  }, [codeFile]);

  return (
    <div className={cn("my-5", wrapClassName)}>
      <SandpackAlias theme={nightOwl} {...props} {...overrides} />
    </div>
  );
}
