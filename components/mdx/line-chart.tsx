import { cn } from "@/lib/utils";

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  xTitle?: string;
  yTitle?: string;
}

export function LineChart(props: LineChartProps) {
  const { content, xTitle, yTitle, className, ...rest } = props;
  return (
    <div className={cn("relative mb-14", className)} {...rest}>
      <svg viewBox="0 0 300 300" fill="none">
        <path
          d="M1.5 33.5L1.5 167.482L1.5 298.5H273.5"
          stroke="#4387A2"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g dangerouslySetInnerHTML={{ __html: content }} />
      </svg>
      <p className="absolute left-1/2 -bottom-7 -translate-x-1/2 !m-0 text-sm">
        {xTitle}
      </p>
      <p className="absolute [writing-mode:vertical-rl] -left-7 top-1/2 -translate-y-1/2 text-sm">
        {yTitle}
      </p>
    </div>
  );
}
