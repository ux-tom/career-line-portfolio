import { site } from "@/data/site";

export default function SkillsProcess() {
  const lastIndex = site.skills.loop.length - 1;

  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-paper/15 px-6 py-24 sm:px-10"
    >
      <div className="mb-12 flex items-baseline justify-between gap-4">
        <h2 className="text-[28px] font-bold tracking-tight sm:text-[40px]">
          {site.skills.heading}
        </h2>
        <span className="hidden font-mono text-[11px] uppercase tracking-wide text-paper/50 sm:block">
          Skills &amp; Process
        </span>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {site.skills.cards.map((card) => (
          <div
            key={card.index}
            className="flex flex-col gap-3 rounded-[10px] border border-paper/20 p-[26px]"
          >
            <div className="font-mono text-[11px] uppercase tracking-wide text-accent">
              {card.index}
            </div>
            <div className="text-[19px] font-bold">{card.title}</div>
            <p className="text-[13.5px] leading-relaxed text-paper/60">
              {card.description}
            </p>
          </div>
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
            <span
              className={`font-mono text-[10.5px] uppercase tracking-wide ${
                i === lastIndex ? "text-accent" : "text-paper/50"
              }`}
            >
              {i === 0 ? "EVERY PROJECT · 01" : `0${i + 1}`}
            </span>
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
