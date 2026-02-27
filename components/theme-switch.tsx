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
    <div onClick={handleChangeTheme}>
      {resolvedTheme === "light" ? (
        <SumDimIcon className="cursor-pointer" />
      ) : (
        <MoonStarIcon className="cursor-pointer" />
      )}
    </div>
  );
}
