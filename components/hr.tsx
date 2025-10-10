import { cn } from "@/lib/utils";

export function HR({ className }: { className?: string }) {
  return (
    <hr
      className={cn(
        "opacity-60 border-dashed border-0 border-b border-divider",
        className
      )}
    />
  );
}
