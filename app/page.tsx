import { BlogList } from "@/components/home/blog-list";
import { ProjectList } from "@/components/home/project-list";
import { Introduce } from "@/components/introduce";

export default function Home() {
  return (
    <main className="wrap">
      <Introduce />
      <BlogList />
      <ProjectList />
    </main>
  );
}
