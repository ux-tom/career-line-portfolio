import Image from "next/image";
import { site } from "@/data/site";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-paper/15 bg-ink/85 px-6 py-3.5 backdrop-blur-md sm:px-10">
      <a href="#top" className="flex items-center gap-3 no-underline">
        <Image
          src="/halftone-avatar.png"
          alt=""
          width={30}
          height={30}
          className="h-[30px] w-[30px] rounded-full bg-white object-cover"
        />
        <span className="text-[15px] font-bold">{site.name}</span>
        <span className="hidden font-mono text-[10.5px] uppercase tracking-wide text-paper/50 sm:inline">
          {site.role}
        </span>
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
        <a
          href={site.cvUrl}
          download
          className="rounded-full border border-paper px-3 py-1.5 text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          CV ↓
        </a>
      </nav>
    </header>
  );
}
