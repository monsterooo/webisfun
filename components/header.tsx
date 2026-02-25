import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";

export function Header() {
  return (
    <header className="max-w-5xl w-full mx-auto flex justify-between h-12 md:px-9 px-4">
      <Link href="/" className="flex justify-center items-center gap-2">
        {/* <div className="size-6 bg-primary text-white rounded-full text-sm flex justify-center items-center">
          W
        </div> */}
        {/* <Icons.logo className="size-8 text-whtie" /> */}
        <span className="text-2xl leading-none font-plantin mt-1.5">
          WebIsFun
        </span>
      </Link>
      <div className="flex justify-center items-center gap-8">
        <Link href="/writing">Writing</Link>
        <Link href="/snippet">Snippet</Link>
        <hr className="border-r h-5" />
        <ThemeSwitch />
      </div>
    </header>
  );
}
