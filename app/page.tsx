export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
        Phase 1 · Scaffold
      </p>
      <h1 className="max-w-2xl text-4xl font-medium leading-tight sm:text-6xl">
        One line, measured
        <br />
        at every stop.
      </h1>
      <p className="max-w-md font-mono text-xs text-paper/60">
        Design tokens, fonts, and metadata are wired. The Career Line itself
        ships in Phase 3.
      </p>
    </main>
  );
}
