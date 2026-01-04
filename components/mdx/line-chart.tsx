interface LineChartProps extends React.SVGProps<SVGSVGElement> {
  content: string;
  xTitle?: string;
  yTitle?: string;
}

export function LineChart(props: LineChartProps) {
  const { content, xTitle, yTitle, ...rest } = props;
  return (
    <svg viewBox="0 0 300 300" fill="none" {...rest}>
      <line
        x1="46.5"
        y1="260.5"
        x2="273.5"
        y2="260.5"
        stroke="#4387A2"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="46.5"
        y1="33.5"
        x2="46.5"
        y2="260.5"
        stroke="#4387A2"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g dangerouslySetInnerHTML={{ __html: content }} />
    </svg>
  );
}
