"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { motion, useAnimation, Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const variants = (() => ({
  path1: {
    initial: {
      rotate: 0,
      transition: { duration: 0 },
    },
    animate: {
      rotate: [0, -30, 400, 360],
      transition: {
        duration: 1,
        times: [0, 0.25, 0.75, 1],
        ease: ["easeInOut", "easeInOut", "easeInOut"],
      },
    },
  },
  group: {
    initial: {
      scale: 1,
      rotate: 0,
      y: 0,
      x: 0,
    },
    animate: {
      scale: [1, 0, 0, 1],
      rotate: [0, 90, 90, 0],
      y: [0, 6, 10, 0],
      x: [0, -10, -6, 0],
      transition: {
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.25, 0.65, 1],
      },
    },
  },
  path2: {},
  path3: {},
}))() satisfies Record<string, Variants>;

const MoonStarIcon = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("initial");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => {
          controls.start("animate");
        },
        stopAnimation: () => {
          controls.start("initial");
        },
      };
    });

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="initial"
          animate={controls}
        >
          <motion.path
            d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
            variants={variants.path1}
            initial="initial"
            animate={controls}
          />
          <motion.g
            variants={variants.group}
            initial="initial"
            animate={controls}
          >
            <motion.path
              d="M18 5h4"
              variants={variants.path2}
              initial="initial"
              animate={controls}
            />
            <motion.path
              d="M20 3v4"
              variants={variants.path3}
              initial="initial"
              animate={controls}
            />
          </motion.g>
        </motion.svg>
      </div>
    );
  }
);

MoonStarIcon.displayName = "MoonStarIcon";

export { MoonStarIcon };
