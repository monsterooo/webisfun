"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { cn } from "@/lib/utils";

export interface ArrowRightIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowRightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 16,
};

const ArrowRightIcon = forwardRef<ArrowRightIconHandle, ArrowRightIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const shaftControls = useAnimation();
    const tipControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => {
          shaftControls.start({ d: "M5 12h17", transition: spring });
          tipControls.start({ d: "m15 7 7 5-7 5", transition: spring });

          setTimeout(() => {
            shaftControls.start({ d: "M5 12h14", transition: spring });
            tipControls.start({ d: "m12 5 7 7-7 7", transition: spring });
          }, 150);
        },
        stopAnimation: () => {
          shaftControls.start({ d: "M5 12h14", transition: spring });
          tipControls.start({ d: "m12 5 7 7-7 7", transition: spring });
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          shaftControls.start({ d: "M5 12h17", transition: spring });
          tipControls.start({ d: "m15 7 7 5-7 5", transition: spring });

          setTimeout(() => {
            shaftControls.start({ d: "M5 12h14", transition: spring });
            tipControls.start({ d: "m12 5 7 7-7 7", transition: spring });
          }, 150);
        } else {
          onMouseEnter?.(e);
        }
      },
      [shaftControls, tipControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          shaftControls.start({ d: "M5 12h14", transition: spring });
          tipControls.start({ d: "m12 5 7 7-7 7", transition: spring });
        } else {
          onMouseLeave?.(e);
        }
      },
      [shaftControls, tipControls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 12h14"
            animate={shaftControls}
            transition={spring}
          />
          <motion.path
            d="m12 5 7 7-7 7"
            animate={tipControls}
            transition={spring}
          />
        </svg>
      </div>
    );
  }
);

ArrowRightIcon.displayName = "ArrowRightIcon";

export { ArrowRightIcon };
