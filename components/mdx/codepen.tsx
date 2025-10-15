type CodepenProps = HTMLIFrameElement & {
  id: string;
  tab: string[];
};

export function Codepen({
  id,
  width = "100%",
  height = "400",
  tab = ["html", "result"],
}: CodepenProps) {
  return (
    <iframe
      width={width}
      height={height}
      src={`https://codepen.io/tudou/embed/${id}?default-tab=${tab.join(",")}`}
      loading="lazy"
      allowFullScreen
    ></iframe>
  );
}
