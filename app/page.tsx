import { BlogList } from "@/components/home/blog-list";
import { ProjectList } from "@/components/home/project-list";
import { Introduce } from "@/components/introduce";
import { FadeIn } from "@/components/motion/fade-in";

export default function Home() {
  return (
    <main className="wrap">
      <FadeIn delay={0}>
        <Introduce />
      </FadeIn>
      <FadeIn delay={0.12}>
        <BlogList />
      </FadeIn>
      <FadeIn delay={0.22}>
        <ProjectList />
      </FadeIn>
    </main>
  );
}
