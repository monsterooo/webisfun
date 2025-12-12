"use client";

import { useMemo, useState } from "react";
import { useWindowScroll } from "@uidotdev/usehooks";
import { getTableOfContents } from "fumadocs-core/server";
import { cn } from "@/lib/utils";
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
  const [{ y }] = useWindowScroll();
  const toc = getTableOfContents(data);
  const [accordionOpen, setAccordionOpen] = useState("");

  const isShow = useMemo(() => {
    if (typeof window === "undefined") return false;
    const metadata = document.querySelector(".writing-metadata");
    const rect = metadata?.getBoundingClientRect();
    const metadataOffset = rect ? rect.top + rect.height + (y ?? 0) : 0;

    setAccordionOpen("");

    if (rect && y && y >= metadataOffset) {
      return true;
    }
    return false;
  }, [y]);

  return (
    <aside
      className={cn(
        "flex fixed left-0 right-0 top-4 text-white justify-center items-center animate-[slideDown_200ms_ease-out]",
        {
          hidden: !isShow,
        }
      )}
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
      <Accordion
        className="bg-primary rounded-lg"
        type="single"
        collapsible
        value={accordionOpen}
        onValueChange={(value) => setAccordionOpen(value)}
      >
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
    </aside>
  );
};
