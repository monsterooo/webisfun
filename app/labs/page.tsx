import { SandpackCustom } from "@/components/sandpack-custom";

export default function Snippet() {
  return (
    <main className="wrap">
      <div className="py-16">
        <h1 className="font-plantin text-2xl leading-[1.2]">Labs</h1>
        <p className="leading-[1.6] text-base mt-3 opacity-70">
          实验性的代码片段和一些动画效果。
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <SandpackCustom
            codeId="betterNumber"
            template="react"
            options={{
              externalResources: ["https://cdn.tailwindcss.com"],
            }}
            customSetup={{
              dependencies: {
                motion: "^12.34.0",
                "react-use-measure": "^2.1.7",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
