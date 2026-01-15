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

const variants = (() => {
  const animation: Record<string, Variants> = {
    circle: {},
  };

  for (let i = 1; i <= 8; i++) {
    animation[`path${i}`] = {
      initial: { opacity: 1, scale: 1 },
      animate: {
        opacity: [0, 1],
        scale: [0, 1],
        transition: {
          duration: 0.3,
          ease: "easeInOut",
          delay: (i - 1) * 0.08,
        },
      },
    };
  }

  return animation;
})() satisfies Record<string, Variants>;

const SumDimIcon = forwardRef<IconHandle, IconProps>(
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
          <motion.circle
            cx="12"
            cy="12"
            r="4"
            variants={variants.circle}
            initial="initial"
            animate={controls}
          />
          <motion.path
            d="M12 4h.01"
            variants={variants.path1}
            initial="initial"
            animate={controls}
          />
          <motion.path
            d="M17.657 6.343h.01"
            variants={variants.path2}
            initial="initial"
            animate={controls}
          />
          <motion.path
            d="M20 12h.01"
            variants={variants.path3}
            initial="initial"
            animate={controls}
          />
          <motion.path
            d="M17.657 17.657h.01"
            variants={variants.path4}
            initial="initial"
            animate={controls}
          />
          <motion.path
            d="M12 20h.01"
            variants={variants.path5}
            initial="initial"
            animate={controls}
          />
          <motion.path
            d="M6.343 17.657h.01"
            variants={variants.path6}
            initial="initial"
            animate={controls}
          />
          <motion.path
            d="M4 12h.01"
            variants={variants.path7}
            initial="initial"
            animate={controls}
          />
          <motion.path
            d="M6.343 6.343h.01"
            variants={variants.path8}
            initial="initial"
            animate={controls}
          />
        </motion.svg>
      </div>
    );
  }
);

SumDimIcon.displayName = "SumDimIcon";

export { SumDimIcon };
