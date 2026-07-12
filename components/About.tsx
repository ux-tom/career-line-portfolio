import { site } from "@/data/site";
import { Avatar, Button, Label } from "@/components/ui";

/**
 * A deliberate light section — the one place the page inverts to warm
 * off-white on ink — breaking the dark rhythm to mark "here's the person
 * behind the line" before returning to the default palette after.
 */
export default function About() {
  return (
    <section
      id="about"
      className="grid scroll-mt-20 grid-cols-1 items-start gap-12 border-t border-paper/15 bg-paper px-6 py-24 text-ink sm:px-10 md:grid-cols-[340px_1fr] md:gap-16"
    >
      <div className="flex flex-col gap-[18px]">
        <Avatar size={200} ring priority alt="Portrait" />
        <Label as="div" surface="paper" size="sm" className="leading-[1.8]">
          BASED: {site.city} · OPEN TO: {site.targetCity}
          <br />
          {site.about.meta.map((line, i) => (
            <span key={i}>
              {line}
              {i < site.about.meta.length - 1 && <br />}
            </span>
          ))}
        </Label>
      </div>

      <div className="flex max-w-[640px] flex-col gap-[22px]">
        <h2 className="text-[32px] font-bold leading-[1.05] tracking-tight sm:text-[40px]">
          {site.about.heading.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
        {site.about.body.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-ink/70">
            {paragraph}
          </p>
        ))}
        <Button href={site.cvUrl} download variant="solid" tone="onPaper" className="w-fit">
          Download CV ↓
        </Button>
      </div>
    </section>
  );
}
