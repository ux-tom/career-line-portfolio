import Image from "next/image";
import { site } from "@/data/site";

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
        <Image
          src="/halftone-avatar.png"
          alt="Portrait"
          width={200}
          height={200}
          priority
          className="h-[200px] w-[200px] rounded-full border-2 border-ink bg-white object-cover"
        />
        <div className="font-mono text-[11px] uppercase leading-[1.8] tracking-wide text-ink/70">
          BASED: {site.city}
          <br />
          {site.about.meta.map((line, i) => (
            <span key={i}>
              {line}
              {i < site.about.meta.length - 1 && <br />}
            </span>
          ))}
        </div>
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
        <a
          href={site.cvUrl}
          download
          className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-[18px] py-2.5 font-mono text-[12px] uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
        >
          Download CV ↓
        </a>
      </div>
    </section>
  );
}
