import { allBlogs } from "@/.content-collections/generated";
import { BlogItem } from "@/components/blog/blog-item";

export const metadata = {
  title: "博客",
  description:
    "记录 Web 开发路上的探索与发现，分享前端技术中那些有趣的想法与实践心得。",
  alternates: { canonical: "/blog" },
  openGraph: { type: "website" as const },
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
          记录 Web
          开发路上的探索与发现，分享前端技术中那些有趣的想法与实践心得。
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {blogs.map((blog) => (
          <BlogItem
            key={blog.slug}
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
