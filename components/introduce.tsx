export function Introduce() {
  return (
    <section className="py-16">
      <h1 className="text-2xl font-normal">蒋著</h1>
      <p className="mt-3 mb-4 opacity-70">充满激情的程序员 & 自豪的父亲</p>
      <p className="py-6 opacity-90 leading-[1.6] -tracking-[0.03em]">
        我擅长使用 Next.js、TansStack Start、Tailwind CSS、shadcn、motion
        构建全栈 Web
        应用程序，提供现代化、响应式且可扩展的解决方案。专注于无缝的用户体验和有趣的动画效果。
      </p>
      <div className="flex gap-4 opacity-70">
        <a
          href="https://github.com/monsterooo"
          className="text-sm hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 主页（在新标签页打开）"
        >
          Github
        </a>
        <a
          href="https://x.com/BuildWithZhu"
          className="text-sm hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter / X 主页（在新标签页打开）"
        >
          Twitter
        </a>
      </div>
    </section>
  );
}
