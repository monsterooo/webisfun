import { use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allBlogs } from "@/.content-collections/generated";
import { formatDate } from "@/lib/date";
import { HR } from "@/components/hr";
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

export default function Writing(props: { params: Params }) {
  const { slug } = use(props.params);
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    return notFound();
  }
  return (
    <main className="mt-20">
      {/* <div className="writing-metadata max-w-4xl mx-auto md:px-9 px-4 mb-10">
        <h1 className="font-plantin text-5xl sm:text-[52px] leading-[1.2] text-foreground">
          {blog.title}
        </h1>
        <p className="text-xl mt-2 leading-[1.6]">{blog.summary}</p>
        <p className="mt-4 text-sm text-foreground/70">
          {formatDate({ date: new Date(blog.publishedAt) })}
        </p>
        <HR className="my-8" />
      </div> */}

      <TableOfContents data={blog.content} title={blog.title} />

      <div>
        {blog.detailShowCover && (
          <Image
            src={blog.image ?? ""}
            alt={blog.title}
            width={1024}
            height={630}
            className="max-w-full mx-auto mb-12"
          />
        )}
        <MDX code={blog.body} />
      </div>
    </main>
  );
}
