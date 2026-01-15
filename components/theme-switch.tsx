"use client";

import { useTheme } from "next-themes";
import { MoonStarIcon } from "./animation-icons/moon-star-icon";
import { SumDimIcon } from "./animation-icons/sun-dim-icon";

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

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
