import { Introduce } from "@/components/introduce";
import { Project } from "@/components/project";
import { Writing } from "@/components/writing";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto pt-20">
      <Introduce />
      <Project />
      <hr className="opacity-60 my-14 border-dashed border-0 border-b border-divider" />
      <Writing />
    </main>
  );
}
