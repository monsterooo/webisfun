import { PROFILE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="wrap mt-20 mb-3">
      <div className="flex gap-3 text-sm text-foreground">
        <a href={PROFILE.EMAIL_URL} className="hover:underline transition">
          Email
        </a>
        /
        <a
          href={PROFILE.GITHUB_URL}
          className="hover:underline transition"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 主页（在新标签页打开）"
        >
          Github
        </a>
        /
        <a
          href={PROFILE.TWITTER_URL}
          className="hover:underline transition"
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
