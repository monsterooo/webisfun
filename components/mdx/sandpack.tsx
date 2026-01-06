import { useMemo } from "react";
import * as codeFiles from "@/content/codes";
import {
  Sandpack as SandpackAlias,
  SandpackInternal,
} from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";

interface SandpackProps extends SandpackInternal {
  codeId?: string;
}

export function Sandpack({ codeId, ...props }: SandpackProps) {
  const codeFile = useMemo(() => {
    if (!codeId) return null;
    return codeFiles?.[codeId as keyof typeof codeFiles];
  }, [codeId]);

  const overrides = useMemo(() => {
    if (!codeFile) return {};
    return {
      files: {
        ...codeFile,
      },
    };
  }, [codeFile]);

  return <SandpackAlias theme={nightOwl} {...props} {...overrides} />;
}
