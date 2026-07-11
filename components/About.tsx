import { site } from "@/data/site";

/**
 * A deliberate light section — the one place the page inverts to warm
 * off-white on ink — breaking the dark rhythm to mark "here's the person
 * behind the line" before returning to the default palette after.
 */
export default function About() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-24">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink/50">
            About
          </p>
          <h2 className="max-w-xl text-3xl font-medium leading-snug sm:text-4xl">
            {site.about.heading}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-ink/70">
            {site.about.body}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-ink/15 pt-8 sm:grid-cols-3">
          {site.about.aiMeanings.map((meaning) => (
            <div key={meaning.title} className="flex flex-col gap-2">
              <p className="text-sm font-medium">{meaning.title}</p>
              <p className="text-sm text-ink/60">{meaning.description}</p>
            </div>
          ))}
        </div>

        <a
          href={site.cvUrl}
          download
          className="inline-flex w-fit items-center gap-2 border border-ink/25 px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          Download CV ↓
        </a>
      </div>
    </section>
  );
}
