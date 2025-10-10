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
              <Link href="#">
                <div className="relative h-[200px]">
                  <Image
                    src={blog.image ?? ""}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <data>{formatDate({ date: new Date(blog.publishedAt) })}</data>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
