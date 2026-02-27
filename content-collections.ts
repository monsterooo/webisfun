import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import {
  rehypeCode,
  RehypeCodeOptions,
  rehypeToc,
  remarkGfm,
  remarkHeading,
} from "fumadocs-core/mdx-plugins";
import { visit } from "unist-util-visit";

// https://github.com/fuma-nama/fumadocs/blob/3fd5bd504e359cbb44aa048b03e56fa207cd8640/packages/core/src/mdx-plugins/rehype-code.core.ts
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
      rehypePlugins: [
        rehypeToc,
        function rehypeMetaAsAttributes() {
          return (tree) => {
            // console.log("tree:", tree);
            visit(tree, "element", (node) => {
              if (node.tagName === "code" && node.data && node.data.meta) {
                node.properties.meta = node.data.meta;
              }
            });

            visit(tree, "mdxJsxFlowElement", (node) => {
              if (node.name === "Sandpack") {
                console.log("自定义Sandpack", node);

                node.children.forEach((child) => {
                  const code = child.children?.[0]?.children?.[0].value;
                  // child.children => code tag
                  child.properties.code = code;
                  console.log("child:", child);
                });
                console.log("自定义的children:", node.children?.[0]);
              }
            });
          };
        },
        [rehypeCode, rehypeCodeOptions],
      ], // [rehypeCode, rehypeCodeOptions]
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
