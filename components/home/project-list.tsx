import { PROJECTS } from "@/lib/constants";
import { BlogItem } from "../blog/blog-item";
import { BlogTitle } from "../blog/blog-title";

export function ProjectList() {
  return (
    <section className="my-16">
      <BlogTitle title="项目" />
      <div className="flex flex-col gap-4">
        {PROJECTS.map((project) => (
          <BlogItem
            key={project.title}
            url={project.url}
            title={project.title}
            content={project.description}
          />
        ))}
      </div>
    </section>
  );
}
