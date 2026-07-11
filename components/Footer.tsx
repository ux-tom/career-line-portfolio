import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/15 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 font-mono text-[11px] text-paper/50 sm:flex-row sm:items-center">
        <span>
          © {year} {site.name} · {site.city}
        </span>
        <nav className="flex gap-4">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              {social.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
            {site.email}
          </a>
        </nav>
      </div>
    </footer>
  );
}
