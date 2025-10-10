import { use } from "react";
import { notFound } from "next/navigation";
import { allBlogs } from "@/.content-collections/generated";

type Params = Promise<{ slug: string }>;

export default function Writing(props: { params: Params }) {
  const { slug } = use(props.params);
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    return notFound();
  }
  console.log("blog", blog);
  return <div>Writing</div>;
}
