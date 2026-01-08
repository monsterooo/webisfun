import type { ComponentPropsWithoutRef } from "react";
import { ArrowRight } from "lucide-react";

type Props = ComponentPropsWithoutRef<"li">;

export function Li(props: Props) {
  return (
    <li className="ps-0 [&_p]:mt-0">
      <div className="flex items-center gap-2">
        <ArrowRight className="size-5 text-primary self-start translate-y-1 flex-shrink-0" />
        {props.children}
      </div>
    </li>
  );
}
