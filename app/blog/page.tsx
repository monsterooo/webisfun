import { allBlogs } from "@/.content-collections/generated";
import { BlogItem } from "@/components/blog/blog-item";

export const metadata = {
  title: "博客",
  description: "探索、记录并分享编程世界中最有趣、最有创意的奇妙想法。",
};

export default function Blog() {
  const blogs = allBlogs
    .filter((blog) => blog.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return (
    <main className="wrap">
      <div className="py-16">
        <h1 className="font-plantin text-2xl leading-[1.2]">博客</h1>
        <p className="leading-[1.6] text-base mt-3 opacity-70">
          发现、记录并分享充满活力的编程世界中最有趣、最有趣的想法。
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {blogs.map((blog, index) => (
          <BlogItem
            key={index}
            title={blog.title}
            url={`/blog/${blog.slug}`}
            date={new Date(blog.publishedAt)}
            content={blog.summary}
            titleCls="text-white hover:text-primary"
          />
        ))}
      </div>
    </main>
  );
}
