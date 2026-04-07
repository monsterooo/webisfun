import { use } from "react";
import { notFound } from "next/navigation";
import { allBlogs } from "@/.content-collections/generated";
import { formatDate } from "@/lib/date";
import { MDX } from "@/components/mdx";
import { TableOfContents } from "@/components/toc";

type Params = Promise<{ slug: string }>;

export const generateMetadata = async (props: { params: Params }) => {
  const { slug } = await props.params;
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    return notFound();
  }

  return {
    title: blog.title,
    description: blog.summary,
  };
};

export default function Blog(props: { params: Params }) {
  const { slug } = use(props.params);
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    return notFound();
  }
  return (
    <main className="mt-20">
      <div className="writing-metadata wrap mb-10">
        <h1 className="font-plantin text-2xl leading-[1.2]">{blog.title}</h1>
        <p className="mt-2 text-sm text-muted">
          {formatDate({ date: new Date(blog.publishedAt) })}
        </p>
      </div>

      <TableOfContents data={blog.content} title={blog.title} />

      <MDX code={blog.body} />
    </main>
  );
}
