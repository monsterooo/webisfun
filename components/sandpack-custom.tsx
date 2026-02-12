"use client";

import { useMemo } from "react";
import * as codeFiles from "@/content/codes";
import {
  // SandpackCodeEditor,
  // SandpackFileExplorer,
  SandpackFiles,
  SandpackInternalOptions,
  SandpackLayout,
  SandpackPredefinedTemplate,
  SandpackPreview,
  SandpackProvider,
  SandpackSetup,
  TemplateFiles,
} from "@codesandbox/sandpack-react";

interface SandpackCustomProps {
  template: SandpackPredefinedTemplate;
  codeId?: string;
  customSetup?: SandpackSetup;
  options?: SandpackInternalOptions<SandpackFiles, SandpackPredefinedTemplate>;
}

export function SandpackCustom({
  template,
  codeId,
  customSetup,
  options,
}: SandpackCustomProps) {
  const codeFile = useMemo(() => {
    if (!codeId) return null;
    return codeFiles?.[codeId as keyof typeof codeFiles];
  }, [codeId]);

  return (
    <SandpackProvider
      template={template}
      files={codeFile as TemplateFiles<SandpackPredefinedTemplate>}
      customSetup={customSetup}
      options={options}
    >
      <SandpackLayout>
        {/* <SandpackFileExplorer />
        <SandpackCodeEditor /> */}
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
}
