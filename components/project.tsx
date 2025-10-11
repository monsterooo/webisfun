import Link from "next/link";
import { PROJECTS } from "@/lib/constants";

export function Project() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <hr className="opacity-60 w-8 border-0 border-b-2 mb-5" />
        <h3 className="font-plantin leading-[1.2] text-4xl mb-6 text-foreground">
          Projects
        </h3>
      </div>
      <div className="col-span-[2] space-y-14">
        {PROJECTS.map((project, index) => (
          <div key={index}>
            <p className="font-medium mb-2 tracking-[0.5px] sm:text-lg text-foreground/80">
              {project.category}
            </p>
            <h2>
              <Link
                href={project.url}
                target="_blank"
                className="text-primary font-plantin text-4xl leading-[1.2] hover:decoration-primary underline decoration-transparent transition underline-offset-2"
              >
                {project.title}
              </Link>
            </h2>
            <p className="tracking-[0.3px] leading-[1.6]">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
