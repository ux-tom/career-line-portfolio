import { site } from "@/data/site";
import { Card, Label, SectionHeader } from "@/components/ui";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 border-t border-paper/15 px-6 py-24 sm:px-10"
    >
      <SectionHeader title="Fellow travellers" label="Testimonials" className="mb-12" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {site.testimonials.map((testimonial, i) => (
          <Card
            key={i}
            as="blockquote"
            className="flex flex-col gap-4"
            // Static, non-reorderable placeholder list with no unique id yet —
            // index is safe here; switch to a real id once quotes are real.
          >
            <p className="text-[15px] leading-relaxed text-paper/70">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <Label as="footer">{testimonial.attribution}</Label>
          </Card>
        ))}
      </div>
    </section>
  );
}
