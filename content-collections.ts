import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import {
  rehypeCode,
  RehypeCodeOptions,
  rehypeToc,
  remarkGfm,
  remarkHeading,
} from "fumadocs-core/mdx-plugins";

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: "github-dark",
    dark: "github-dark",
  },
};

const Blog = defineCollection({
  name: "Blog",
  directory: "content/blog",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    published: z.boolean().default(true),
    publishedAt: z.string(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    detailShowCover: z.boolean().default(true),
  }),
  transform: async (document, context) => {
    // console.log("content:", document.content);
    // const toc = getTableOfContents(document.content);
    // console.log("toc:", toc);
    const body = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm, remarkHeading],
      rehypePlugins: [rehypeToc, [rehypeCode, rehypeCodeOptions]],
    });

    return {
      ...document,
      slug: document._meta.path,
      body,
    };
  },
});

export default defineConfig({
  collections: [Blog],
});
