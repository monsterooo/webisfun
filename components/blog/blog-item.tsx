import type { ReactNode } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

interface BlogItemProps {
  url: string;
  title: string;
  date?: Date;
  content: string;
  tags?: ReactNode;
  titleCls?: string;
}

export function BlogItem({
  url,
  title,
  date,
  content,
  tags,
  titleCls,
}: BlogItemProps) {
  return (
    <article className="group">
      <div className="flex justify-between items-baseline gap-4">
        <Link
          href={url}
          className={cn(
            "text-primary underline-offset-2 decoration-primary/0 hover:decoration-primary/100",
            "underline transition-[color,text-decoration-color,transform] duration-200 ease-out",
            titleCls
          )}
        >
          {title}
        </Link>
        {date && (
          <time
            dateTime={date.toISOString()}
            className="text-sm opacity-50 shrink-0 tabular-nums"
          >
            {formatDate({ date })}
          </time>
        )}
      </div>
      <p className="text-sm text-muted mt-1 mb-4 -tracking-[0.03em] leading-[1.6] max-w-[60ch]">
        {content}
      </p>
      {tags}
    </article>
  );
}
