import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center px-6 pb-16 pt-32 sm:px-10"
    >
      <div className="flex max-w-[1100px] flex-col gap-6">
        <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-paper/25 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-paper/70">
          <span
            className="h-2 w-2 rounded-full bg-accent"
            style={{ animation: "blinkDot 2s infinite" }}
          />
          {site.hero.eyebrow}
        </span>

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

      <div className="pointer-events-none absolute inset-x-6 bottom-9 hidden items-center justify-between font-mono text-[11px] uppercase tracking-wide text-paper/50 sm:flex sm:px-4">
        <span>{site.hero.scrollHint}</span>
        <span>{site.hero.journeyEstimate}</span>
      </div>
    </section>
  );
}
