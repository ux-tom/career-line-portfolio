import { site } from "@/data/site";
import { Label } from "@/components/ui";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/15 px-6 py-6 sm:px-10">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Label>
          © {year} {site.name} · {site.contact.footerTagline}
        </Label>
        <nav className="flex gap-[18px]">
          {site.socials.map((social) => (
            <Label
              key={social.label}
              as="a"
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              {social.label}
            </Label>
          ))}
          <Label as="a" href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
            Email
          </Label>
        </nav>
      </div>
    </footer>
  );
}
