import clsx from "clsx";
import { site } from "@/data/site";
import { Avatar, Button, Label } from "@/components/ui";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

/**
 * `preview`: renders `sticky` instead of `fixed` so the /design-system
 * catalog page can contain Nav inside a bordered frame instead of it
 * hijacking the whole page's chrome. The real site (app/page.tsx) never
 * passes this — behavior there is unchanged.
 */
export default function Nav({ preview = false }: { preview?: boolean }) {
  return (
    <header
      className={clsx(
        "inset-x-0 top-0 z-50 flex items-center justify-between border-b border-paper/15 bg-ink/85 px-6 py-3.5 backdrop-blur-md sm:px-10",
        preview ? "sticky" : "fixed"
      )}
    >
      <a href="#top" className="flex items-center gap-3 no-underline">
        <Avatar size={30} />
        <span className="text-[15px] font-bold">{site.name}</span>
        <Label size="xs" tone="muted" className="hidden sm:inline">
          {site.role}
        </Label>
      </a>

      <nav className="flex items-center gap-[22px] font-mono text-[11px] uppercase tracking-wide">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hidden text-paper/70 transition-colors hover:text-paper lg:inline"
          >
            {link.label}
          </a>
        ))}
        <Button href={site.cvUrl} download variant="outline" tone="onInk" size="sm">
          CV ↓
        </Button>
      </nav>
    </header>
  );
}
