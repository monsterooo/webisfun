"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const [supportScroll, setSupportScroll] = useState(false);

  useEffect(() => {
    setSupportScroll(CSS.supports("animation-timeline", "scroll()"));
  }, []);
  return (
    <>
      <style>
        {`
          @keyframes rootScrollToCircle {
            from {
              stroke-dashoffset: 100px;
            }
            to {
              stroke-dashoffset: 0px;
            }
          }
          html {
            scroll-timeline: --page-scroll block;
          }
          .scroll-progress-draw {
            stroke-dasharray: 100, 1000;
            stroke-dashoffset: 100px;
            animation: rootScrollToCircle linear both;
            animation-timeline: --page-scroll;
          }
        `}
      </style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className, {
          hidden: !supportScroll,
        })}
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="white"
          opacity="0.2"
          strokeWidth="4"
        ></circle>
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          fill="transparent"
          strokeWidth="4"
          className="scroll-progress-draw"
          pathLength="100"
          strokeLinecap="round"
        ></circle>
      </svg>
    </>
  );
}
