"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonStarIcon } from "./animation-icons/moon-star-icon";
import { SumDimIcon } from "./animation-icons/sun-dim-icon";

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleChangeTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleChangeTheme}
      aria-label={
        resolvedTheme === "light" ? "切换到暗色主题" : "切换到亮色主题"
      }
      className="cursor-pointer appearance-none bg-transparent border-0 p-0 flex items-center justify-center"
    >
      {resolvedTheme === "light" ? <SumDimIcon /> : <MoonStarIcon />}
    </button>
  );
}
