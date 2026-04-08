import { PROFILE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="wrap mt-20 mb-3">
      <div className="flex gap-3 text-sm text-foreground">
        <a
          href={PROFILE.EMAIL_URL}
          className="underline-offset-2 decoration-primary/0 underline transition-[color,text-decoration-color,transform] duration-200 ease-out hover:decoration-white"
        >
          Email
        </a>
        /
        <a
          href={PROFILE.GITHUB_URL}
          className="underline-offset-2 decoration-primary/0 underline transition-[color,text-decoration-color,transform] duration-200 ease-out hover:decoration-white"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 主页（在新标签页打开）"
        >
          Github
        </a>
        /
        <a
          href={PROFILE.TWITTER_URL}
          className="underline-offset-2 decoration-primary/0 underline transition-[color,text-decoration-color,transform] duration-200 ease-out hover:decoration-white"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter / X 主页（在新标签页打开）"
        >
          X
        </a>
      </div>
    </footer>
  );
}
