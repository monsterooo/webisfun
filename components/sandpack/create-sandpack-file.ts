import { HTMLAttributes, PropsWithChildren, ReactElement } from "react";
import type { SandpackFile } from "@codesandbox/sandpack-react/unstyled";

export const AppJSPath = `/App.js`;
export const StylesCSSPath = `/styles.css`;
export const SUPPORTED_FILES = [AppJSPath, StylesCSSPath];

function splitMeta(meta: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let depth = 0;
  const trimmed = meta.trim();

  for (let ii = 0; ii < trimmed.length; ii++) {
    const char = trimmed[ii];

    if (char === "{") {
      if (depth === 0 && current) {
        tokens.push(current);
        current = "";
      }
      depth += 1;
      continue;
    }

    if (char === "}") {
      if (depth > 0) {
        depth -= 1;
      }
      if (depth === 0) {
        current = "";
      }
      if (depth < 0) {
        throw new Error(`Unexpected closing brace in meta: ${meta}`);
      }
      continue;
    }

    if (depth > 0) {
      continue;
    }

    if (/\s/.test(char)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }

    current += char;
  }

  if (current) {
    tokens.push(current);
  }

  if (depth !== 0) {
    throw new Error(`Unclosed brace in meta: ${meta}`);
  }

  return tokens;
}

export function createSandpackFile(
  elements: ReactElement[]
): Record<string, SandpackFile> {
  return elements.reduce(
    (result: Record<string, SandpackFile>, element: any) => {
      if (element.type.mdxName !== "pre" && element.type !== "pre") {
        return result;
      }
      const { props } = (
        element.props as PropsWithChildren<{
          children: ReactElement<
            HTMLAttributes<HTMLDivElement> & { meta?: string }
          >;
        }>
      ).children;
      let filePath;
      let fileHidden = false;
      let fileActive = false;

      if (props.meta) {
        const tokens = splitMeta(props.meta);
        const name = tokens.find(
          (token) => token.includes("/") || token.includes(".")
        );
        if (name) {
          filePath = name.startsWith("/") ? name : `/${name}`;
        }
        if (tokens.includes("hidden")) {
          fileHidden = true;
        }
        if (tokens.includes("active")) {
          fileActive = true;
        }
      } else {
        if (props.className === "language-js") {
          filePath = AppJSPath;
        } else if (props.className === "language-css") {
          filePath = StylesCSSPath;
        } else {
          throw new Error(
            `Code block is missing a filename: ${props.children}`
          );
        }
      }

      if (!filePath) {
        if (props.className === "language-js") {
          filePath = AppJSPath;
        } else if (props.className === "language-css") {
          filePath = StylesCSSPath;
        } else {
          throw new Error(
            `Code block is missing a filename: ${props.children}`
          );
        }
      }

      if (result[filePath]) {
        throw new Error(
          `File ${filePath} was defined multiple times. Each file snippet should have a unique path name`
        );
      }
      result[filePath] = {
        code: (props.children || "") as string,
        hidden: fileHidden,
        active: fileActive,
      };

      return result;
    },
    {}
  );
}
