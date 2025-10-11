import Link from "next/link";
import { allBlogs } from "@/.content-collections/generated";
import { groupedByYear } from "@/lib/blog";

export function Writing() {
  const blogs = groupedByYear(allBlogs.filter((blog) => blog.published));

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <hr className="opacity-60 w-8 border-0 border-b-2 mb-5" />
        <h3 className="font-plantin leading-[1.2] text-4xl mb-6 text-foreground">
          Writing
        </h3>
      </div>
      <div className="col-span-[2] space-y-14">
        {Object.keys(blogs).map((year) =>
          blogs[year].map((blog, index) => (
            <div key={year + index}>
              <p className="font-medium mb-2 tracking-[0.5px] sm:text-lg text-foreground/80">
                {year}
              </p>
              <h2>
                <Link
                  href={`/writing/${blog.slug}`}
                  className="text-primary font-plantin text-4xl leading-[1.2] hover:decoration-primary underline decoration-transparent transition underline-offset-2"
                >
                  {blog.title}
                </Link>
              </h2>
              <p className="tracking-[0.3px] leading-[1.6]">{blog.summary}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
