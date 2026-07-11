import { site } from "@/data/site";

export default function Testimonials() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-24">
      <p className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
        Testimonials
      </p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {site.testimonials.map((testimonial, i) => (
          <blockquote
            // Static, non-reorderable placeholder list with no unique id yet —
            // index is safe here; switch to a real id once quotes are real.
            key={i}
            className="flex flex-col justify-between gap-6 border-t border-paper/20 pt-6"
          >
            <p className="text-sm leading-relaxed text-paper/80">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="font-mono text-[11px] text-paper/50">
              {testimonial.name} · {testimonial.role}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
