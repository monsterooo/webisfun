import { Children, ReactElement, useMemo } from "react";
import {
  Sandpack as SandpackAlias,
  SandpackInternal,
} from "@codesandbox/sandpack-react";
import { cn } from "@/lib/utils";
import { createSandpackFile } from "./create-sandpack-file";
import { darkTheme } from "./theme";

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
      {/* TODO: 这里的theme暂时使用固定dark，后续可以根据用户主题自动切换 */}
      <SandpackAlias theme={darkTheme} {...props} {...overrides} />
    </div>
  );
}
