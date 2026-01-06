import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  type?: "info" | "warn" | "error" | "success" | "idea";
}

const calloutVariants = cva("p-4 [&>p]:my-0", {
  variants: {
    type: {
      info: "bg-callout-background border-l-4 border-primary",
      warn: "bg-yellow-50 text-yellow-800 border-yellow-200",
      error: "bg-red-50 text-red-800 border-red-200",
      success: "bg-green-50 text-green-800 border-green-200",
      idea: "bg-gray-50 text-gray-800 border-gray-200",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

const calloutIconVariants = cva("", {
  variants: {
    type: {
      info: "fill-primary text-callout-background",
      warn: "text-yellow-800",
      error: "text-red-800",
      success: "text-green-800",
      idea: "text-gray-800",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

export function Callout(props: CalloutProps) {
  const { children, className, type, title, ...rest } = props;

  return (
    <div className={cn(calloutVariants({ type }), className)} {...rest}>
      <div className="flex items-center gap-2">
        <Info className={cn(calloutIconVariants({ type }))} />
        <p className="!my-0 font-medium">{title}</p>
      </div>
      {children}
    </div>
  );
}
