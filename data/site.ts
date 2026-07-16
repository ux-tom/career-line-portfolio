/**
 * Site-wide content and config.
 *
 * Identity (name/email/socials) is real. Fields marked PLACEHOLDER are personal
 * facts (CV file, testimonial quotes) still owned by the user (Phase 7).
 * All narrative copy mirrors the Claude Design reference verbatim.
 */

export type Testimonial = {
  quote: string;
  attribution: string;
};

export const site = {
  // --- Identity ---------------------------------------------------------
  name: "Tom Ottjes",
  role: "AI UX Designer",
  city: "Netherlands",
  email: "tomottjes@gmail.com",
  socials: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/tom-ottjes/" }],
  cvUrl: "/cv.pdf", // PLACEHOLDER — file doesn't exist yet, add it to public/

  // --- Hero -----------------------------------------------------------------
  hero: {
    eyebrow: "OPEN FOR PRODUCT TEAMS · 2026",
    headline: ["One line,", "measured at", "every stop."],
    positioning:
      "I'm an AI UX designer. I ship fast, fit the development scope, and prove every design with the KPI it moved. This page is the line — scroll to travel it.",
    scrollHint: "SCROLL ↓ = TRAVEL →",
    journeyEstimate: "EST. JOURNEY: THE FULL LINE + YOURS",
  },

  // --- About ------------------------------------------------------------
  about: {
    heading: ["Holistic by habit,", "systematic by choice."],
    body: [
      "I design user-centric products end to end — from the first journey map to the shipped, measured feature. I work inside development scope, not around it: quick, solid delivery that engineering can actually build, validated against KPIs we agree on before a single pixel moves.",
      "The “AI” in my title is practical, not decorative: I vibe-code working prototypes, compress design cycles with AI tooling, and build AI systems that keep designing for the business after I hand off.",
    ],
    // Rendered mono in the sidebar; BASED uses `city` above.
    meta: ["EXPERIENCE: 5+ YEARS", "FOCUS: AI × PRODUCT UX"],
  },

  // --- Skills & Process ---------------------------------------------------
  skills: {
    heading: 'What "AI UX" means here',
    cards: [
      {
        index: "01 · VIBE CODE",
        title: "Working prototypes, not pictures",
        description:
          "I build clickable, coded prototypes with AI — real interactions, real data shapes — so stakeholders test the thing, not a promise of the thing.",
      },
      {
        index: "02 · AI-SPEED DELIVERY",
        title: "Days where others take weeks",
        description:
          "AI tooling compresses exploration and iteration. What stays human: scoping with engineering, judgment calls, and hitting the agreed KPI.",
      },
      {
        index: "03 · AI DESIGN SYSTEMS",
        title: "Systems that design for you",
        description:
          "I set up AI systems that generate on-brand design for the business — so quality scales past the hours in my calendar.",
      },
    ],
    loop: [
      { step: "Discover", description: "Journey maps, analytics, interviews. KPI agreed up front." },
      { step: "Design", description: "AI-prototyped directions in days, tested with users." },
      { step: "Deliver", description: "Scoped with engineering; handoff matches the build." },
      { step: "Measure", description: "The KPI decides if it worked. Numbers go on the line." },
    ],
  },

  // --- Testimonials (PLACEHOLDER quotes) ----------------------------------
  testimonials: [
    {
      quote:
        "Placeholder quote — two or three sentences from a PM or engineering lead about speed, scope-fit and measurable results.",
      attribution: "NAME · PRODUCT LEAD, COMPANY",
    },
    {
      quote:
        "Placeholder quote — a founder or stakeholder on the AI design system that kept producing after handoff.",
      attribution: "NAME · FOUNDER, COMPANY",
    },
    {
      quote:
        "Placeholder quote — an engineer on handoff quality: what was designed is what got built, in one sprint.",
      attribution: "NAME · STAFF ENGINEER, COMPANY",
    },
  ] satisfies Testimonial[],

  // --- Contact -------------------------------------------------------------
  contact: {
    eyebrow: "FINAL STOP · REACH OUT",
    heading: ["Next stop:", "your project."],
    footerTagline: "THE LINE KEEPS GROWING",
  },

  // --- Journey config --------------------------------------------------
  // Consumed by components/CareerLine.tsx / TimelineStop.tsx to size each stop
  // on the horizontal line. Fixed px so the value actually controls layout at
  // desktop widths — tweak these numbers to change how long the journey feels
  // and how roomy an expanded stop is (project widths matched the reference;
  // compact widths are for the newer award/education stop types).
  journey: {
    /** Width of a collapsed project stop on the Career Line, in px. */
    stopWidthPx: 300,
    /** Width of a project stop once expanded, in px. */
    expandedWidthPx: 640,
    /** Width of a compact stop (awards, education) collapsed, in px. */
    compactWidthPx: 240,
    /** Width of a compact stop once expanded (awards with context), in px. */
    compactExpandedWidthPx: 380,
  },
} as const;
