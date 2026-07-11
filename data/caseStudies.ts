/**
 * Case studies for the Career Line.
 *
 * ALL CONTENT BELOW IS PLACEHOLDER — real case studies land here later (Phase 7).
 * The copy mirrors the Claude Design reference verbatim; only the structure is typed.
 *
 * The Career Line component (`components/CareerLine.tsx`) maps over this array
 * and lays itself out for however many stops exist here. To add a new project:
 * append one `CaseStudy` object to the end of `caseStudies`. No layout code
 * needs to change.
 */

export type CaseStudy = {
  /** URL-safe, stable identifier — used as the React key, the anchor, and for deep-linking. */
  id: string;
  /** Displayed year label, e.g. "2022". */
  year: string;
  /** Mono role label shown above the card, e.g. "PRODUCT DESIGNER". */
  role: string;
  title: string;
  /** One-sentence teaser shown on the collapsed card. */
  teaser: string;
  /** The single always-visible KPI chip on the collapsed stop, e.g. "CSAT 3.9 → 4.6". */
  kpiTeaser: string;
  summary: string;
  /** Always exactly 3 steps, per the design brief — each a full "Discover — …" line. */
  steps: [string, string, string];
  /** Full KPI set revealed when the stop is expanded, e.g. ["CSAT 3.9 → 4.6", "−41% MISROUTES"]. */
  kpis: string[];
  /** Alt text for the (placeholder) project shot shown inside the expanded stop. */
  projectShotAlt: string;
  /** Meta lines rendered mono, joined with " · " at render. */
  meta: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "triage",
    year: "2022",
    role: "PRODUCT DESIGNER",
    title: "Support Triage AI",
    teaser: "Routing assistant for a 40-agent support team.",
    kpiTeaser: "CSAT 3.9 → 4.6",
    summary:
      "Shadowed the support floor for a week, mapped the triage journey, then co-designed an AI routing assistant with the agents themselves. Phased rollout meant zero downtime and zero retraining shock.",
    steps: [
      "Discover — shadowed 40 agents, mapped every handoff and dead end.",
      "Design — co-designed routing UI with agents; AI-prototyped 2 directions.",
      "Deliver + measure — phased rollout; CSAT tracked weekly for a quarter.",
    ],
    kpis: ["CSAT 3.9 → 4.6", "−41% MISROUTES", "ROLLOUT: 0 DOWNTIME"],
    projectShotAlt: "Support Triage AI — routing assistant placeholder",
    meta: ["B2B SUPPORT PLATFORM", "2022 · 8 WEEKS", "ROLE: SOLE DESIGNER"],
  },
  {
    id: "onboarding",
    year: "2023",
    role: "SENIOR UX",
    title: "Onboarding Rebuild",
    teaser: "Prototyped with AI in 5 days, shipped in a sprint.",
    kpiTeaser: "−32% DROP-OFF",
    summary:
      "Drop-off analytics pointed at step 3 of onboarding; journey mapping showed why. I vibe-coded a working prototype in week one, tested it with 8 users, and handed engineering a build that matched 1:1.",
    steps: [
      "Discover — funnel analytics + journey map located the leak.",
      "Design — vibe-coded a working prototype in 5 days; 8 user tests.",
      "Deliver + measure — shipped in one sprint; drop-off tracked for 6 weeks.",
    ],
    kpis: ["−32% DROP-OFF", "PROTOTYPE: 5 DAYS", "HANDOFF MATCHED 1:1"],
    projectShotAlt: "Onboarding Rebuild — activation flow placeholder",
    meta: ["CONSUMER FINTECH APP", "2023 · 6 WEEKS", "ROLE: SENIOR UX"],
  },
  {
    id: "copilot",
    year: "2024",
    role: "AI UX LEAD",
    title: "Checkout Copilot",
    teaser: "AI shopping assistant embedded in checkout.",
    kpiTeaser: "+18% CONVERSION",
    summary:
      "An AI assistant living inside checkout, answering sizing and shipping questions at the exact moment of doubt. Scoped with engineering in week one, AI-prototyped in week two, then A/B tested against baseline for six weeks.",
    steps: [
      "Discover — funnel audit + 12 user interviews found the doubt moments.",
      "Design — 3 AI-prototyped directions in 4 days; tested, one won clearly.",
      "Deliver + measure — shipped in scope; 6-week A/B against baseline.",
    ],
    kpis: ["+18% CONVERSION", "−2.1s TO DECISION", "SHIPPED: 1 SPRINT"],
    projectShotAlt: "Checkout Copilot — inline assistant placeholder",
    meta: ["RETAIL PLATFORM · 12M MAU", "2024 · 10 WEEKS", "ROLE: AI UX LEAD"],
  },
  {
    id: "designops",
    year: "2025",
    role: "AI SYSTEMS",
    title: "DesignOps Agent",
    teaser: "An AI system that designs on-brand for the business.",
    kpiTeaser: "6× FASTER TO SHIP",
    summary:
      "After auditing 200+ marketing assets, I built an AI agent that generates on-brand layouts from a brief — with the brand system encoded as rules, not vibes. It runs in production daily; the team reviews instead of redraws.",
    steps: [
      "Discover — audited 200+ assets; extracted the real (undocumented) brand rules.",
      "Design — encoded the system; built + tuned the generation agent.",
      "Deliver + measure — production daily; ship-speed and brand-consistency tracked.",
    ],
    kpis: ["6× FASTER TO SHIP", "200+ ASSETS AUDITED", "RUNS DAILY IN PROD"],
    projectShotAlt: "DesignOps Agent — component generation placeholder",
    meta: ["D2C BRAND · IN-HOUSE", "2025 · ONGOING", "ROLE: AI SYSTEMS DESIGN"],
  },
];
