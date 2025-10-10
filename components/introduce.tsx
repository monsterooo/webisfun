import Link from "next/link";

export function Introduce() {
  return (
    <div className="text-foreground font-plantin">
      <h1 className="text-5xl sm:text-6xl leading-tight">自我介绍文案</h1>
      <hr className="opacity-60 my-14 border-dashed border-0 border-b border-divider" />
      <p className="text-xl sm:text-2xl leading-normal">
        个人详细信息
        <Link
          href="#"
          className="hover:decoration-primary underline decoration-transparent transition text-primary underline-offset-2"
        >
          company
        </Link>{" "}
        工作地点与职位等
      </p>
      <hr className="opacity-60 my-14 border-dashed border-0 border-b border-divider" />
    </div>
  );
}
