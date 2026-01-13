import { allBlogs } from "@/.content-collections/generated";
import { HR } from "@/components/hr";
import { WritingItem } from "@/components/writing-item";

export const metadata = {
  title: "Writing",
  description:
    "Uncover, record, and share the most intriguing and fun ideas from the vibrant world of programming.",
};

export default function Writing() {
  const blogs = allBlogs
    .filter((blog) => blog.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return (
    <main className="max-w-4xl mx-auto mt-10 sm:mt-20">
      <h1 className="font-plantin text-[56px] leading-[1.2]">Writing</h1>
      <p className="text-lg leading-[1.6]">
        Uncover, record, and share the most intriguing and fun ideas from the
        vibrant world of programming.
      </p>
      <HR className="my-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {blogs.map((blog, index) => (
          <WritingItem key={index} blog={blog} />
        ))}
      </div>
    </main>
  );
}
