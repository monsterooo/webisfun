import { cva } from "class-variance-authority";
import { CircleX, Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  type?: "info" | "warn" | "error" | "idea";
}

const calloutVariants = cva("p-4 my-5 [&>p]:my-1 [&>pre]:my-2 rounded-sm", {
  variants: {
    type: {
      info: "bg-callout-info-background border-l-4 border-primary",
      warn: "bg-callout-warn-background border-l-4 border-yellow-500",
      error: "bg-callout-error-background border-l-4 border-red-500",
      idea: "bg-callout-idea-background border-l-4 border-orange-500",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

const calloutIconVariants = cva("size-6", {
  variants: {
    type: {
      info: "fill-primary text-callout-info-background",
      warn: "fill-yellow-500 text-callout-warn-background",
      error: "fill-red-500 text-callout-error-background",
      idea: "fill-orange-500 text-orange-500",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

export function Callout(props: CalloutProps) {
  const { children, className, type = "info", title, ...rest } = props;

  const getIconComponent = () => {
    switch (type) {
      case "info":
        return <Info className={cn(calloutIconVariants({ type }))} />;
      case "warn":
        return <TriangleAlert className={cn(calloutIconVariants({ type }))} />;
      case "error":
        return <CircleX className={cn(calloutIconVariants({ type }))} />;
      case "idea":
        return <Lightbulb className={cn(calloutIconVariants({ type }))} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(calloutVariants({ type }), className)} {...rest}>
      <div className="flex items-center gap-2 mb-2">
        {getIconComponent()}
        <p className="!my-0 font-medium">{title}</p>
      </div>
      {children}
    </div>
  );
}
