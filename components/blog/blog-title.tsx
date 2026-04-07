import Link from "next/link";

interface BlogTitleProps {
  title: string;
  moreText?: string;
  moreUrl?: string;
}

export function BlogTitle({ title, moreText, moreUrl }: BlogTitleProps) {
  return (
    <div className="flex justify-between items-center opacity-70 mb-8">
      <h2 className="text-xl -tracking-[0.04em] font-light">{title}</h2>
      {moreText && moreUrl && (
        <Link href={moreUrl} className="text-sm hover:underline">
          {moreText}
        </Link>
      )}
    </div>
  );
}
