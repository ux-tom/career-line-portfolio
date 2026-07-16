import type { Metadata } from "next";
import About from "@/components/About";
import CareerLine from "@/components/CareerLine";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import SkillsProcess from "@/components/SkillsProcess";
import Testimonials from "@/components/Testimonials";
import { Avatar, Button, Card, Chip, Label, SectionHeader, StatusPill } from "@/components/ui";
import { getTimelineItems } from "@/lib/timeline";
import ColorSwatches from "./ColorSwatches";
import { ComponentBlock, PrimitiveBlock } from "./DocBlock";

// Internal reference only — not linked from Nav/Footer, and kept out of
// search results since it isn't part of the recruiter-facing narrative.
export const metadata: Metadata = {
  title: "Design System — The Career Line",
  robots: { index: false, follow: false },
};

const BUTTON_VARIANTS = ["solid", "outline", "ghost"] as const;
const BUTTON_SIZES = ["sm", "md"] as const;

export default function DesignSystemPage() {
  const timelineItems = getTimelineItems();

  return (
    <div className="flex flex-col gap-24 pb-24 pt-16">
      <header className="flex flex-col gap-3 px-6 sm:px-10">
        <Label tone="accent">Internal reference — not linked from the live site</Label>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Design System</h1>
        <p className="max-w-xl text-paper/60">
          Every token and component the site is built from, rendered from the exact same
          source files as <code className="font-mono text-paper/80">/</code>. Editing a
          component in <code className="font-mono text-paper/80">components/ui/</code> or{" "}
          <code className="font-mono text-paper/80">components/</code> updates it here and
          on the live page at once — nothing on this page is a copy.
        </p>
      </header>

      {/* ------------------------------------------------------------ */}
      {/* Foundations                                                   */}
      {/* ------------------------------------------------------------ */}
      <section className="flex flex-col gap-12 px-6 sm:px-10">
        <SectionHeader title="Foundations" className="border-b border-paper/15 pb-4" />

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Color tokens</h3>
          <ColorSwatches />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Type scale</h3>
          <div className="flex flex-col gap-4 rounded-lg border border-paper/20 p-6">
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-[64px] font-bold leading-none tracking-tight">Aa</span>
              <Label>Space Grotesk 700 — hero: clamp(48px, 7.5vw, 104px)</Label>
            </div>
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-[40px] font-bold leading-none tracking-tight">Aa</span>
              <Label>Space Grotesk 700 — section heading: 40px (28px on mobile)</Label>
            </div>
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-base leading-none">Aa body copy</span>
              <Label>Space Grotesk 400 — body: 16px</Label>
            </div>
            <div className="flex flex-wrap items-baseline gap-4">
              <Label size="sm">MONO LABEL</Label>
              <Label>Space Mono — eyebrows, meta, KPI chips: 10–11px, uppercase</Label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Spacing &amp; radius conventions</h3>
          <ul className="flex flex-col gap-2 rounded-lg border border-paper/20 p-6 text-sm text-paper/70">
            <li>
              <span className="font-mono text-paper">rounded-[10px]</span> — cards, career-line
              stops, process strip
            </li>
            <li>
              <span className="font-mono text-paper">rounded-full</span> — pills, chips, buttons
            </li>
            <li>
              <span className="font-mono text-paper">border-paper/15</span> — section dividers
            </li>
            <li>
              <span className="font-mono text-paper">px-6 sm:px-10</span> — section gutter
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Motion</h3>
          <div className="flex flex-wrap items-center gap-6 rounded-lg border border-paper/20 p-6">
            <StatusPill>blinkDot pulse</StatusPill>
            <Button>Press Tab to see the focus ring</Button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Primitives                                                    */}
      {/* ------------------------------------------------------------ */}
      <section className="flex flex-col gap-12 px-6 sm:px-10">
        <SectionHeader title="Primitives" className="border-b border-paper/15 pb-4" />

        <PrimitiveBlock title="Button" file="components/ui/Button.tsx">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3 rounded-lg bg-ink p-6">
              {BUTTON_VARIANTS.map((variant) =>
                BUTTON_SIZES.map((size) => (
                  <Button key={`onInk-${variant}-${size}`} variant={variant} tone="onInk" size={size}>
                    {variant} / {size}
                  </Button>
                ))
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-lg bg-paper p-6">
              {BUTTON_VARIANTS.map((variant) =>
                BUTTON_SIZES.map((size) => (
                  <Button key={`onPaper-${variant}-${size}`} variant={variant} tone="onPaper" size={size}>
                    {variant} / {size}
                  </Button>
                ))
              )}
            </div>
          </div>
        </PrimitiveBlock>

        <PrimitiveBlock title="Chip" file="components/ui/Chip.tsx">
          <div className="flex flex-wrap gap-2">
            <Chip variant="outline">OUTLINE KPI</Chip>
            <Chip variant="solid">SOLID KPI TEASER</Chip>
          </div>
        </PrimitiveBlock>

        <PrimitiveBlock title="StatusPill" file="components/ui/StatusPill.tsx">
          <StatusPill>Open for product teams · 2026</StatusPill>
        </PrimitiveBlock>

        <PrimitiveBlock title="Card" file="components/ui/Card.tsx">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="flex flex-col gap-2">
              <Label tone="accent">state=&quot;default&quot;</Label>
              <p className="text-sm text-paper/60">
                Used by Skills cards and Testimonials cards.
              </p>
            </Card>
            <Card state="active" className="flex flex-col gap-2">
              <Label tone="accent">state=&quot;active&quot;</Label>
              <p className="text-sm text-paper/60">
                Used by the expanded Career Line stop.
              </p>
            </Card>
          </div>
        </PrimitiveBlock>

        <PrimitiveBlock title="SectionHeader" file="components/ui/SectionHeader.tsx">
          <div className="flex flex-col gap-6">
            <SectionHeader title="Default size" label="Skills & Testimonials use this" />
            <SectionHeader title="Compact size" label="Career Line uses this" size="compact" />
          </div>
        </PrimitiveBlock>

        <PrimitiveBlock title="Label" file="components/ui/Label.tsx">
          <div className="flex flex-wrap items-center gap-6">
            <Label tone="muted">muted (default)</Label>
            <Label tone="strong">strong</Label>
            <Label tone="accent">accent</Label>
            <div className="rounded bg-paper px-3 py-2">
              <Label surface="paper" tone="muted">
                on paper / muted
              </Label>
            </div>
          </div>
        </PrimitiveBlock>

        <PrimitiveBlock title="Avatar" file="components/ui/Avatar.tsx">
          <div className="flex flex-wrap items-end gap-6">
            <Avatar size={30} alt="" />
            <Avatar size={60} ring alt="" />
            <Avatar size={120} ring alt="" />
          </div>
        </PrimitiveBlock>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Components — the real, live-mounted section components       */}
      {/* ------------------------------------------------------------ */}
      <section className="flex flex-col gap-16">
        <div className="px-6 sm:px-10">
          <SectionHeader title="Components" className="border-b border-paper/15 pb-4" />
        </div>

        <ComponentBlock
          title="Nav"
          file="components/Nav.tsx"
          note='Mounted with the `preview` prop (sticky, not fixed) and contained in a bordered frame — the real site never passes `preview`, so it stays fixed there.'
        >
          <div className="relative h-16 overflow-hidden rounded-lg border border-paper/20">
            <Nav preview />
          </div>
        </ComponentBlock>

        <ComponentBlock title="Hero" file="components/Hero.tsx">
          <Hero />
        </ComponentBlock>

        <ComponentBlock
          title="CareerLine + TimelineStop"
          file="components/CareerLine.tsx, components/TimelineStop.tsx"
          note="Mounted at full size, unframed — its scroll-driven transform is relative to real document scroll and viewport, so containing it in a preview box would misrepresent how it actually behaves. Scroll through it like the live page."
        >
          <CareerLine items={timelineItems} />
        </ComponentBlock>

        <ComponentBlock title="About" file="components/About.tsx">
          <About />
        </ComponentBlock>

        <ComponentBlock title="SkillsProcess" file="components/SkillsProcess.tsx">
          <SkillsProcess />
        </ComponentBlock>

        <ComponentBlock title="Testimonials" file="components/Testimonials.tsx">
          <Testimonials />
        </ComponentBlock>

        <ComponentBlock title="Contact" file="components/Contact.tsx">
          <Contact />
        </ComponentBlock>

        <ComponentBlock title="Footer" file="components/Footer.tsx">
          <Footer />
        </ComponentBlock>
      </section>
    </div>
  );
}
