import { site } from "@/data/site";

export default function SkillsProcess() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-24">
      <p className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
        Skills &amp; Process
      </p>

      <div className="grid grid-cols-1 gap-px border border-paper/15 bg-paper/15 sm:grid-cols-3">
        {site.skills.cards.map((card) => (
          <div key={card.title} className="flex flex-col gap-3 bg-ink p-6">
            <p className="text-lg font-medium">{card.title}</p>
            <p className="text-sm text-paper/70">{card.description}</p>
          </div>
        ))}
      </div>

      <ol className="grid grid-cols-2 gap-px border border-paper/15 bg-paper/15 sm:grid-cols-4">
        {site.skills.loop.map((item, i) => (
          <li key={item.step} className="flex flex-col gap-2 bg-ink p-6">
            <span className="font-mono text-[11px] text-accent">
              0{i + 1}
            </span>
            <span className="font-medium">{item.step}</span>
            <span className="text-sm text-paper/60">{item.description}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
