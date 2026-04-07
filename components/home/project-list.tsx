import { BlogItem } from "../blog/blog-item";
import { BlogTitle } from "../blog/blog-title";

export function ProjectList() {
  return (
    <section className="my-16">
      <BlogTitle title="项目" />
      <div className="flex flex-col gap-4">
        <BlogItem
          url="/"
          title="SVGX"
          content="人工智能工具可快速创建自定义、高质量的 SVG 图标和图形——无需设计技能。"
        />
        <BlogItem
          url="/"
          title="FileX"
          content="在线免费转换所有常用格式的图像。PNG 转 JPG、JPG 转 PNG、JPG 转 SVG 等等。快速、安全、易用的图像转换工具。"
        />
        <BlogItem
          url="/"
          title="ZoneOverlap"
          content="可视化时区重叠，找到共享的工作时间，并安排全球会议。"
        />
      </div>
    </section>
  );
}
