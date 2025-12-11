"use client";

import { useRef } from "react";
import { getTableOfContents } from "fumadocs-core/server";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TableOfContentsProperties = {
  data: string;
  title: string;
};
export const TableOfContents = ({ data, title }: TableOfContentsProperties) => {
  const toc = getTableOfContents(data);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // 当页面滚动时，计算元素应该的 Y 位移（实现“吸顶”效果）
  const y = useTransform(scrollY, [0, 300], [-100, 0]);
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);

  return (
    <motion.aside
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        paddingTop: "1rem",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 999,
        // 使用 transform 控制动画
        y,
        opacity,
      }}
      initial={{ y: -100, opacity: 0 }} // 初始在顶部外面
      animate={{ y: 0, opacity: 1 }} // 滚动到顶部时进入
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className="block"
    >
      <style>
        {`
          .toc {
            scroll-target-group: auto;
          }
          .toc {
            padding: 0 1rem;
          }
          .toc li a {
            overflow: visible;
            color: white;
            position: relative;
          }
          .toc li a:target-current {
            // color: var(--primary);
          }
          .toc li a::before {
            content: '';
            position: absolute;
            left: -0.6rem;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            background-color: white;
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.3s;
          }
          .toc li a:target-current::before {
            opacity: 1;
          }
        `}
      </style>
      <Accordion className="bg-primary rounded-lg" type="single" collapsible>
        <AccordionItem value="toc-accordion">
          <AccordionTrigger className="[&>svg]:text-white px-4">
            {title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <ul className="flex list-none flex-col gap-2 text-sm toc">
              {toc.map((item) => (
                <li
                  key={item.url}
                  style={{
                    paddingLeft: `${item.depth - 2}rem`,
                  }}
                >
                  <a
                    href={item.url}
                    className="line-clamp-3 flex rounded-sm text-foreground text-sm underline decoration-foreground/0 transition-colors hover:decoration-foreground/50"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.aside>
  );
};
