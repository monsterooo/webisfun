import { Blog } from "@/.content-collections/generated";

export const groupedByYear = (blogs: Blog[]) => {
  return blogs.reduce(
    (acc, blog) => {
      const year = new Date(blog.publishedAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(blog);
      return acc;
    },
    {} as Record<string, Blog[]>
  );
};
