import { PROFILE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="wrap mt-20 mb-3">
      <div className="flex gap-3 text-sm text-foreground">
        <a href={PROFILE.EMAIL_URL} className="hover:underline transition">
          Email
        </a>
        /
        <a href={PROFILE.GITHUB_URL} className="hover:underline transition">
          Github
        </a>
        /
        <a href={PROFILE.TWITTER_URL} className="hover:underline transition">
          X
        </a>
      </div>
    </footer>
  );
}
