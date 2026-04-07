import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { rehypeToc, remarkGfm, remarkHeading } from "fumadocs-core/mdx-plugins";
import { visit } from "unist-util-visit";

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
      remarkPlugins: [remarkGfm, remarkHeading],
      rehypePlugins: [
        rehypeToc,
        function rehypeMetaAsAttributes() {
          return (tree) => {
            visit(tree, "element", (node) => {
              if (node.tagName === "code" && node.data && node.data.meta) {
                node.properties.meta = node.data.meta;
              }
            });
          };
        },
      ],
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
