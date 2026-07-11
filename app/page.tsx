import CareerLine from "@/components/CareerLine";
import { site } from "@/data/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
          {site.role}
        </p>
        <h1 className="max-w-2xl text-4xl font-medium leading-tight sm:text-6xl">
          {site.hero.headline}
        </h1>
        <p className="max-w-md text-sm text-paper/70">{site.hero.positioning}</p>
      </section>

      <CareerLine />

      {/* Placeholder anchor — real Contact section ships in Phase 4 */}
      <section id="contact" className="px-6 py-24">
        <p className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
          Contact — coming in Phase 4
        </p>
      </section>
    </main>
  );
}
