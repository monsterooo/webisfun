"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** 是否从下方滑入（默认 true），false 则纯淡入 */
  slideUp?: boolean;
}

/**
 * 淡入 + 轻微上移的入场动画组件
 * 自动尊重 prefers-reduced-motion（通过 motion 内置支持）
 */
export function FadeIn({
  children,
  delay = 0,
  className,
  slideUp = true,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: slideUp ? 16 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo：自然减速，无弹性
      }}
    >
      {children}
    </motion.div>
  );
}
