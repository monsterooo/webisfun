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
      blockSize={11}
      blockMargin={2}
    />
  );
}
