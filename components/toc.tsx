"use client";

import { useEffect, useRef, useState } from "react";
import { getTableOfContents } from "fumadocs-core/server";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollProgress } from "./scroll-progess";

type TableOfContentsProperties = {
  data: string;
  title: string;
};
export const TableOfContents = ({ data, title }: TableOfContentsProperties) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const toc = getTableOfContents(data);
  const [accordionOpen, setAccordionOpen] = useState("");
  const scroll = useScroll();
  const [openToc, setOpenToc] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const tocHiddenY = -50; // content + top
  const transition = shouldReduceMotion
    ? {
        duration: 0,
      }
    : {
        type: "spring" as const,
        bounce: 0.4,
      };

  useMotionValueEvent(scroll.scrollY, "change", (latest) => {
    if (latest >= 100) {
      setOpenToc(true);
    } else {
      setAccordionOpen("");
      setTimeout(() => {
        setOpenToc(false);
      }, 50);
    }
  });
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accordionRef.current &&
        !accordionRef.current.contains(event.target as Node) &&
        accordionOpen
      ) {
        setAccordionOpen("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accordionOpen]);

  return (
    <AnimatePresence>
      {openToc && (
        <motion.aside
          className="flex fixed z-10 left-0 right-0 top-0 mt-3 text-white justify-center items-center select-none"
          variants={{
            open: {
              y: 0,
              transition,
            },
            hidden: {
              y: tocHiddenY,
              transition,
            },
          }}
          initial="hidden"
          exit="hidden"
          animate="open"
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
            position: relative;
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 4px;
          }
          .toc li a:target-current {
            color: white;
          }
          .toc li a::before {
            content: '';
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
            ref={accordionRef}
            className={cn(
              "bg-primary rounded-2xl transition-all ease-in-out duration-300"
            )}
            type="single"
            collapsible
            value={accordionOpen}
            onValueChange={(value) => setAccordionOpen(value)}
          >
            <AccordionItem value="toc-accordion">
              <AccordionTrigger className="[&>svg]:text-white px-4 hover:no-underline py-2">
                <div className="flex items-center gap-2">
                  <ScrollProgress className="size-4 text-white" /> {title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <ul className="flex list-none flex-col gap-2 text-sm toc max-h-[70vh] overflow-y-auto">
                  {toc.map((item) => (
                    <li
                      key={item.url}
                      style={{
                        paddingLeft: `${item.depth - 2}rem`,
                      }}
                    >
                      <a
                        href={item.url}
                        className="line-clamp-3 flex rounded-sm text-gray-800 hover:text-white text-sm decoration-foreground/0 transition-colors hover:decoration-foreground/50"
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
      )}
    </AnimatePresence>
  );
};
