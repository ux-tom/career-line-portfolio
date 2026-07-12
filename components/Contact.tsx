import { site } from "@/data/site";
import { Button, StatusPill } from "@/components/ui";

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex scroll-mt-20 flex-col items-start gap-6 border-t border-paper/15 px-6 pb-16 pt-32 sm:px-10"
    >
      <StatusPill>{site.contact.eyebrow}</StatusPill>

      <h2 className="text-[clamp(44px,6vw,84px)] font-bold leading-none tracking-tight">
        {site.contact.heading.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>

      <div className="flex flex-wrap gap-3.5">
        <Button href={`mailto:${site.email}`} variant="solid" tone="onInk">
          {site.email} →
        </Button>
        <Button
          href={site.introCallUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          tone="onInk"
        >
          Book an intro call
        </Button>
        <Button href={site.cvUrl} download variant="ghost" tone="onInk">
          CV ↓
        </Button>
      </div>
    </section>
  );
}
