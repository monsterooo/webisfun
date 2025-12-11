import {
  Sandpack as SandpackAlias,
  SandpackInternal,
} from "@codesandbox/sandpack-react";

export function Sandpack(props: SandpackInternal) {
  return <SandpackAlias {...props} />;
}
