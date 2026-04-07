import type { MetadataRoute } from "next";
import { allBlogs } from "@/.content-collections/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = allBlogs.filter((blog) => blog.published);
  return [
    {
      url: "https://webisfun.dev/",
      lastModified: new Date(),
    },
    {
      url: "https://webisfun.dev/blog",
      lastModified: new Date(),
    },
    ...blogs.map((blog) => ({
      url: `https://webisfun.dev/blog/${blog.slug}`,
      lastModified: new Date(blog.publishedAt),
    })),
  ];
}
