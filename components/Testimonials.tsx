import { site } from "@/data/site";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 border-t border-paper/15 px-6 py-24 sm:px-10"
    >
      <div className="mb-12 flex items-baseline justify-between gap-4">
        <h2 className="text-[28px] font-bold tracking-tight sm:text-[40px]">
          Fellow travellers
        </h2>
        <span className="hidden font-mono text-[11px] uppercase tracking-wide text-paper/50 sm:block">
          Testimonials
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {site.testimonials.map((testimonial, i) => (
          <blockquote
            // Static, non-reorderable placeholder list with no unique id yet —
            // index is safe here; switch to a real id once quotes are real.
            key={i}
            className="flex flex-col gap-4 rounded-[10px] border border-paper/20 p-[26px]"
          >
            <p className="text-[15px] leading-relaxed text-paper/70">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="font-mono text-[11px] uppercase tracking-wide text-paper/50">
              {testimonial.attribution}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
