import { HR } from "@/components/hr";
import { SandpackCustom } from "@/components/sandpack-custom";

export default function Snippet() {
  return (
    <main className="max-w-4xl mx-auto md:px-9 px-4 mt-10 sm:mt-20">
      <h1 className="font-plantin text-[56px] leading-[1.2]">Snippet</h1>
      <p className="text-lg leading-[1.6]">
        Here&apos;s a code snippet — hope it&apos;s helpful!
      </p>
      <HR className="my-8" />
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
