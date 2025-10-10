import Link from "next/link";

export function Project() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <hr className="opacity-60 w-8 border-0 border-b-2 mb-5" />
        <h3 className="font-plantin leading-[1.2] text-4xl mb-6 text-foreground">
          Project
        </h3>
      </div>
      <div className="col-span-[2]">
        <div>
          <p className="font-medium mb-2 tracking-[0.5px] sm:text-lg text-foreground/80">
            Website
          </p>
          <h2>
            <Link
              href="#"
              className="text-primary font-plantin text-4xl leading-[1.2] hover:decoration-primary underline decoration-transparent transition underline-offset-2"
            >
              SVGX
            </Link>
          </h2>
          <p>SVGX 生成</p>
        </div>
      </div>
    </div>
  );
}
