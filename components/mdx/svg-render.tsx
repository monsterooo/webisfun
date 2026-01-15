import { cn } from "@/lib/utils";

interface SVGRenderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
  className?: string;
}

export function SVGRender({ children, className }: SVGRenderProps) {
  return (
    <div
      className={cn("flex justify-center items-center", className)}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
