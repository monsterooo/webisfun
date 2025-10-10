import { Introduce } from "@/components/introduce";
import { Project } from "@/components/project";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto pt-20">
      <Introduce />
      <Project />
    </main>
  );
}
