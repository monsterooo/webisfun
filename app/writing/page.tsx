import Image from "next/image";
import Link from "next/link";
import { allBlogs } from "@/.content-collections/generated";
import { formatDate } from "@/lib/date";
import { HR } from "@/components/hr";

export default function Writing() {
  const blogs = allBlogs.filter((blog) => blog.published);

  return (
    <main className="max-w-4xl mx-auto sm:mt-20">
      <h1 className="font-plantin text-[56px] leading-[1.2]">Writing</h1>
      <p className="text-lg leading-[1.6]">
        Uncover, record, and share the most intriguing and fun ideas from the
        vibrant world of programming.
      </p>
      <HR className="my-8" />
      <div className="grid grid-cols-2 gap-8">
        {blogs.map((blog, index) => {
          return (
            <div
              key={index}
              className="p-8 bg-write-card-background rounded-lg"
            >
              <Link href={"/writing/" + blog.slug}>
                <div className="relative h-[200px]">
                  <Image
                    src={blog.image ?? ""}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <data className="block text-primary text-sm mt-5 mb-3 font-medium">
                  {formatDate({ date: new Date(blog.publishedAt) })}
                </data>
                <h2 className="font-plantin leading-[1.2] text-3xl mb-2 text-foreground">
                  {blog.title}
                </h2>
                <p className="text-lg mb-4">{blog.summary}</p>
                <span className="text-primary text-sm">Read more</span>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
