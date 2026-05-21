"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";

export function GithubCalendar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <GitHubCalendar
      username="monsterooo"
      colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
      fontSize={12}
      blockSize={10}
      blockMargin={2}
      weekStart={1}
      labels={{
        totalCount: "最近一年有 {{count}} 次提交",
        months: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
        legend: {
          less: "少",
          more: "多",
        },
      }}
    />
  );
}
