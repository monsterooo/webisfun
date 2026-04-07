import Link from "next/link";

export function Header() {
  return (
    <header className="wrap">
      <nav>
        <ul className="py-8 flex gap-6 text-sm">
          <li>
            <Link href="/" className="hover:underline">
              首页
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:underline">
              博客
            </Link>
          </li>
          <li>
            <Link href="/labs" className="hover:underline">
              Labs
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
