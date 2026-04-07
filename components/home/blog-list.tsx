import { allBlogs } from "content-collections";
import { BlogItem } from "../blog/blog-item";
import { BlogTitle } from "../blog/blog-title";

interface BlogListProps {
  number?: number;
}

export function BlogList({ number = 3 }: BlogListProps) {
  const blogs = allBlogs
    .filter((blog) => blog.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, number);

  return (
    <section className="my-16">
      <BlogTitle title="最新博客" moreText="查看更多" moreUrl="/blog" />

      <div className="flex flex-col gap-4">
        {blogs.map((blog) => (
          <BlogItem
            key={blog.slug}
            url={`/blog/${blog.slug}`}
            title={blog.title}
            date={new Date(blog.publishedAt)}
            content={blog.summary}
          />
        ))}
      </div>
    </section>
  );
}
