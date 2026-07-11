import { site } from "@/data/site";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto flex max-w-3xl scroll-mt-6 flex-col items-start gap-6 px-6 py-32"
    >
      <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
        Next stop
      </p>
      <h2 className="text-3xl font-medium leading-snug sm:text-5xl">
        {site.contact.heading}
      </h2>
      <p className="max-w-md text-sm text-paper/70">{site.contact.body}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 border border-accent bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-ink transition-opacity hover:opacity-90"
        >
          Email me
        </a>
        <a
          href={site.introCallUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-paper/25 px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors hover:border-paper"
        >
          Book an intro call
        </a>
        <a
          href={site.cvUrl}
          download
          className="inline-flex items-center gap-2 border border-paper/25 px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors hover:border-paper"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
