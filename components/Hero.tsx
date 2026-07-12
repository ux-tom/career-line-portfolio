import { site } from "@/data/site";
import { Label, StatusPill } from "@/components/ui";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center px-6 pb-16 pt-32 sm:px-10"
    >
      <div className="flex max-w-[1100px] flex-col gap-6">
        <StatusPill className="self-start">{site.hero.eyebrow}</StatusPill>

        <h1 className="text-[clamp(48px,7.5vw,104px)] font-bold leading-[0.98] tracking-tight">
          {site.hero.headline.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="max-w-[520px] text-lg leading-relaxed text-paper/60">
          {site.hero.positioning}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-6 bottom-9 hidden items-center justify-between sm:flex sm:px-4">
        <Label>{site.hero.scrollHint}</Label>
        <Label>{site.hero.journeyEstimate}</Label>
      </div>
    </section>
  );
}
