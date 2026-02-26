import { PROFILE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="max-w-4xl mx-auto md:px-9 px-4 mt-20 mb-3">
      <div className="flex gap-3 text-sm text-foreground">
        <a
          href={PROFILE.EMAIL_URL}
          className="hover:text-primary focus-within:text-primary transition"
        >
          Email
        </a>
        /
        <a
          href={PROFILE.GITHUB_URL}
          className="hover:text-primary focus-within:text-primary transition"
        >
          Github
        </a>
        /
        <a
          href={PROFILE.TWITTER_URL}
          className="hover:text-primary focus-within:text-primary transition"
        >
          X
        </a>
      </div>
    </footer>
  );
}
