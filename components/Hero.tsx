import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
        {site.role}
      </p>
      <h1 className="max-w-2xl text-4xl font-medium leading-tight sm:text-6xl">
        {site.hero.headline}
      </h1>
      <p className="max-w-md text-sm text-paper/70">{site.hero.positioning}</p>

      <a
        href="#work"
        className="absolute bottom-10 font-mono text-[11px] uppercase tracking-widest text-paper/50 transition-colors hover:text-accent"
      >
        Scroll to start the line ↓
      </a>
    </section>
  );
}
