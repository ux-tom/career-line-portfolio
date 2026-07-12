import { site } from "@/data/site";
import { Card, Label, SectionHeader } from "@/components/ui";

export default function SkillsProcess() {
  const lastIndex = site.skills.loop.length - 1;

  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-paper/15 px-6 py-24 sm:px-10"
    >
      <SectionHeader
        title={site.skills.heading}
        label="Skills & Process"
        className="mb-12"
      />

      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {site.skills.cards.map((card) => (
          <Card key={card.index} className="flex flex-col gap-3">
            <Label tone="accent">{card.index}</Label>
            <div className="text-[19px] font-bold">{card.title}</div>
            <p className="text-[13.5px] leading-relaxed text-paper/60">
              {card.description}
            </p>
          </Card>
        ))}
      </div>

      <ol className="grid grid-cols-1 overflow-hidden rounded-[10px] border border-paper/20 lg:grid-cols-4">
        {site.skills.loop.map((item, i) => (
          <li
            key={item.step}
            className={`flex flex-col gap-1.5 border-paper/20 p-6 [&:not(:last-child)]:border-b lg:[&:not(:last-child)]:border-b-0 lg:[&:not(:last-child)]:border-r ${
              i === lastIndex ? "bg-surface" : ""
            }`}
          >
            <Label size="xs" tone={i === lastIndex ? "accent" : "muted"}>
              {i === 0 ? "EVERY PROJECT · 01" : `0${i + 1}`}
            </Label>
            <span className="text-[15px] font-bold">{item.step}</span>
            <span className="text-[12px] leading-relaxed text-paper/60">
              {item.description}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
