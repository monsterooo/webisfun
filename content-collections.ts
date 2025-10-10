import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import {
  rehypeCode,
  RehypeCodeOptions,
  remarkGfm,
} from "fumadocs-core/mdx-plugins";

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: "catppuccin-mocha",
    dark: "catppuccin-mocha",
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
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
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
