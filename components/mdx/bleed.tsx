import { cn } from "@/lib/utils";

interface BleedProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function Bleed({ className, children, ...props }: BleedProps) {
  return (
    <div className={cn("bleed", className)} {...props}>
      {children}
    </div>
  );
}
