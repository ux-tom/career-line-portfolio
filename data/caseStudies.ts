/**
 * Case studies for the Career Line.
 *
 * ALL CONTENT BELOW IS PLACEHOLDER — real case studies land here later.
 *
 * The Career Line component (`components/CareerLine.tsx`) maps over this array
 * and lays itself out for however many stops exist here. To add a new project:
 * append one `CaseStudy` object to the end of `caseStudies`. No layout code
 * needs to change.
 */

export type Kpi = {
  /** Short mono label, e.g. "CSAT" or "Conversion". Keep to 1-2 words. */
  label: string;
  /** The metric itself, e.g. "3.9 → 4.6" or "+18%". */
  value: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type CaseStudy = {
  /** URL-safe, stable identifier — used as the React key and for deep-linking later. */
  id: string;
  year: number;
  title: string;
  role: string;
  /** The single always-visible KPI chip shown on the collapsed stop. */
  teaser: Kpi;
  /** Full KPI set revealed when the stop is expanded (includes the teaser). */
  kpis: Kpi[];
  summary: string;
  /** Always exactly 3 steps, per the design brief. */
  process: [ProcessStep, ProcessStep, ProcessStep];
  /** Alt text for the (placeholder) project shot shown inside the expanded stop. */
  projectShotAlt: string;
  meta: {
    company: string;
    duration: string;
    tools: string[];
  };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "support-triage-ai",
    year: 2022,
    title: "Support Triage AI",
    role: "Lead Product Designer",
    teaser: { label: "CSAT", value: "3.9 → 4.6" },
    kpis: [
      { label: "CSAT", value: "3.9 → 4.6" },
      { label: "Handle time", value: "−22%" },
      { label: "Auto-triaged", value: "61%" },
    ],
    summary:
      "Redesigned the support team's triage queue around an AI classifier that routes and prioritizes incoming tickets, cutting manual sorting to near zero for common cases.",
    process: [
      {
        title: "Discover",
        description:
          "Shadowed the support team to map where triage time actually went — 60% of it was spent re-reading tickets already answered elsewhere.",
      },
      {
        title: "Design",
        description:
          "Prototyped an AI-assisted queue with confidence-scored routing, tested against real ticket backlogs with the team.",
      },
      {
        title: "Deliver & measure",
        description:
          "Shipped in stages behind a flag, tracked CSAT and handle time weekly, and tuned the classifier's confidence threshold against results.",
      },
    ],
    projectShotAlt: "Support Triage AI — queue interface placeholder",
    meta: {
      company: "Placeholder Co.",
      duration: "4 months",
      tools: ["Figma", "LLM classifier prototype", "Amplitude"],
    },
  },
  {
    id: "onboarding-rebuild",
    year: 2023,
    title: "Onboarding Rebuild",
    role: "Senior Product Designer",
    teaser: { label: "Drop-off", value: "−32%" },
    kpis: [
      { label: "Drop-off", value: "−32%" },
      { label: "Prototype speed", value: "5 days" },
      { label: "Time to value", value: "−40%" },
    ],
    summary:
      "Rebuilt a five-step onboarding flow that was losing a third of new users before activation, using AI-assisted prototyping to compress the usual multi-week design cycle.",
    process: [
      {
        title: "Discover",
        description:
          "Traced the funnel step-by-step and found the single highest-leverage drop point: a permissions screen with no explanation of why it mattered.",
      },
      {
        title: "Design",
        description:
          "Vibe-coded three working prototypes in 5 days instead of the usual sprint, tested each against the same cohort.",
      },
      {
        title: "Deliver & measure",
        description:
          "Rolled out the winning flow gradually, watching drop-off and time-to-first-value dashboards for regressions.",
      },
    ],
    projectShotAlt: "Onboarding Rebuild — activation flow placeholder",
    meta: {
      company: "Placeholder Co.",
      duration: "3 weeks",
      tools: ["Figma", "Vibe-coded prototypes", "Mixpanel"],
    },
  },
  {
    id: "checkout-copilot",
    year: 2024,
    title: "Checkout Copilot",
    role: "Product Designer",
    teaser: { label: "Conversion", value: "+18%" },
    kpis: [
      { label: "Conversion", value: "+18%" },
      { label: "Cart abandonment", value: "−12%" },
      { label: "AOV", value: "+6%" },
    ],
    summary:
      "Added a lightweight AI copilot to checkout that answers shipping and returns questions inline, removing the single biggest reason for cart abandonment.",
    process: [
      {
        title: "Discover",
        description:
          "Mined support tickets and session replays to find that shipping-cost uncertainty, not price, was the top abandonment trigger.",
      },
      {
        title: "Design",
        description:
          "Designed a copilot UI that surfaces answers inline at the moment of hesitation rather than routing users away to a help center.",
      },
      {
        title: "Deliver & measure",
        description:
          "A/B tested against the existing checkout, tracked conversion, abandonment, and AOV through two pricing seasons.",
      },
    ],
    projectShotAlt: "Checkout Copilot — inline assistant placeholder",
    meta: {
      company: "Placeholder Co.",
      duration: "6 weeks",
      tools: ["Figma", "AI SDK prototype", "A/B testing platform"],
    },
  },
  {
    id: "designops-agent",
    year: 2025,
    title: "DesignOps Agent",
    role: "Design Systems Lead",
    teaser: { label: "Ship speed", value: "6×" },
    kpis: [
      { label: "Ship speed", value: "6×" },
      { label: "QA time", value: "−70%" },
      { label: "Brand consistency", value: "98%" },
    ],
    summary:
      "Built an AI agent, trained on the design system and brand guidelines, that keeps generating on-brand components and copy after handoff — without a designer in every loop.",
    process: [
      {
        title: "Discover",
        description:
          "Audited a year of shipped features to find where the design system quietly drifted off-brand once designers moved on to the next project.",
      },
      {
        title: "Design",
        description:
          "Designed the agent's guardrails: what it's allowed to generate, what always routes back to a human review.",
      },
      {
        title: "Deliver & measure",
        description:
          "Rolled the agent out to two product teams, tracking ship speed, QA time, and an automated brand-consistency score.",
      },
    ],
    projectShotAlt: "DesignOps Agent — component generation placeholder",
    meta: {
      company: "Placeholder Co.",
      duration: "Ongoing since Q1 2025",
      tools: ["Design tokens", "Claude-based agent", "Storybook"],
    },
  },
];
