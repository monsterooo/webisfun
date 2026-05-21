import type { Blog } from "@/.content-collections/generated";

export function BlogPostJsonLd({ blog }: { blog: Blog }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.summary,
    datePublished: blog.publishedAt,
    author: { "@type": "Person", name: blog.author },
    ...(blog.image && { image: `https://webisfun.dev${blog.image}` }),
    url: `https://webisfun.dev/blog/${blog.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WebIsFun",
    url: "https://webisfun.dev",
    author: {
      "@type": "Person",
      name: "BuildWithZhu",
      sameAs: ["https://github.com/monsterooo", "https://x.com/BuildWithZhu"],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
