// import Link from "next/link";

export function Introduce() {
  return (
    <div className="text-foreground font-plantin">
      <h1 className="text-5xl sm:text-6xl leading-tight">
        Hi, I&apos;m Jiang Zhu(蒋著). A passionate programmer and proud father.
        Love coding, family time, and exploring new tech.
      </h1>
      <hr className="opacity-60 my-14 border-dashed border-0 border-b border-divider" />
      <p className="text-xl sm:text-2xl leading-normal">
        I fell in love with programming early on. In middle school, I started
        with Visual Basic, crafting fun UI projects like an elevator program.
        Later, I explored C++ and used GDI to build software interfaces on
        Windows. Eventually, I picked up JavaScript, which I’ve been using ever
        since.
        <br />
        <br />I specialize in building full-stack web applications using
        React.js, Next.js, Tailwind CSS, and shadcn, delivering modern,
        responsive, and scalable solutions. Additionally, I create
        cross-platform mobile apps with React Native and Expo, focusing on
        seamless user experiences and efficient development workflows. Explore
        my projects, insights, and tutorials on cutting-edge web and mobile
        development!
        {/* <Link
          href="#"
          className="hover:decoration-primary underline decoration-transparent transition text-primary underline-offset-2"
        >
          company
        </Link>{" "} */}
      </p>
      <hr className="opacity-60 my-14 border-dashed border-0 border-b border-divider" />
    </div>
  );
}
