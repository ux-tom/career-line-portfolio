import { site } from "@/data/site";

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex scroll-mt-20 flex-col items-start gap-6 border-t border-paper/15 px-6 pb-16 pt-32 sm:px-10"
    >
      <span className="inline-flex items-center gap-2.5 rounded-full border border-paper/25 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-paper/70">
        <span
          className="h-2 w-2 rounded-full bg-accent"
          style={{ animation: "blinkDot 2s infinite" }}
        />
        {site.contact.eyebrow}
      </span>

      <h2 className="text-[clamp(44px,6vw,84px)] font-bold leading-none tracking-tight">
        {site.contact.heading.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>

      <div className="flex flex-wrap gap-3.5">
        <a
          href={`mailto:${site.email}`}
          className="rounded-full bg-paper px-[22px] py-3 font-mono text-[12px] uppercase tracking-wide text-ink transition-opacity hover:opacity-90"
        >
          {site.email} →
        </a>
        <a
          href={site.introCallUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-paper px-[22px] py-3 font-mono text-[12px] uppercase tracking-wide transition-colors hover:bg-paper hover:text-ink"
        >
          Book an intro call
        </a>
        <a
          href={site.cvUrl}
          download
          className="rounded-full border border-paper/30 px-[22px] py-3 font-mono text-[12px] uppercase tracking-wide text-paper/70 transition-colors hover:border-paper hover:text-paper"
        >
          CV ↓
        </a>
      </div>
    </section>
  );
}
