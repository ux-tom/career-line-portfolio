/**
 * Site-wide content and config.
 *
 * Fields marked PLACEHOLDER are personal facts (name, contact details, CV,
 * testimonial quotes) that must be swapped for real content before launch.
 * Everything else (hero/about/skills copy) is written from the design brief
 * and can ship as-is, or be refined later.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const site = {
  // --- Identity (PLACEHOLDER) ---------------------------------------------
  name: "Your Name",
  role: "AI UX Designer",
  city: "City, Country",
  email: "hello@yourname.com",
  socials: [
    { label: "LinkedIn", url: "https://linkedin.com/in/yourname" },
    { label: "GitHub", url: "https://github.com/yourname" },
  ],
  cvUrl: "/cv.pdf",
  introCallUrl: "https://cal.com/yourname/intro",

  // --- Hero -----------------------------------------------------------------
  hero: {
    headline: "One line, measured at every stop.",
    positioning:
      "I design products end to end, then use AI to compress the distance between idea and working software — and to keep the system designing on-brand long after I hand it off.",
  },

  // --- About ------------------------------------------------------------
  about: {
    heading: "Holistic by default.",
    body: "Every project on this line was scoped, designed, shipped, and measured by the same person — not handed off between specialists who never see the KPI at the end. That's what \"systematic\" means here: one throughline from research to a number that moved.",
    aiMeanings: [
      {
        title: "Vibe-codes working prototypes",
        description:
          "Real interactions, not mockups — the thing you click is the thing that ships.",
      },
      {
        title: "Compresses design cycles",
        description:
          "AI turns multi-week prototyping loops into days, without cutting the research.",
      },
      {
        title: "Builds AI systems that keep designing",
        description:
          "On-brand components and copy generate correctly after handoff, not just at launch.",
      },
    ],
  },

  // --- Skills & Process ---------------------------------------------------
  skills: {
    cards: [
      {
        title: "Vibe code",
        description:
          "Prototypes are working software from day one — real state, real interactions, testable with real users.",
      },
      {
        title: "AI-speed delivery",
        description:
          "Design cycles that used to take weeks compress to days, without skipping discovery or validation.",
      },
      {
        title: "AI design systems",
        description:
          "Agents trained on the design system keep shipping on-brand work long after the designer moves on.",
      },
    ],
    loop: [
      { step: "Discover", description: "Find the highest-leverage problem, not the loudest one." },
      { step: "Design", description: "Prototype in working code, not static frames." },
      { step: "Deliver", description: "Ship in stages, scoped to what dev can absorb." },
      { step: "Measure", description: "Track the KPI that defines success before calling it done." },
    ],
  },

  // --- Testimonials (PLACEHOLDER quotes) ----------------------------------
  testimonials: [
    {
      quote:
        "Placeholder quote — the fastest design partner I've worked with, and the only one who came back with the KPI dashboard unprompted.",
      name: "Placeholder Name",
      role: "VP Product, Placeholder Co.",
    },
    {
      quote:
        "Placeholder quote — prototypes that felt finished on day two. Engineering barely had to reinterpret anything.",
      name: "Placeholder Name",
      role: "Engineering Lead, Placeholder Co.",
    },
    {
      quote:
        "Placeholder quote — the design system agent they built still ships on-brand work a year later.",
      name: "Placeholder Name",
      role: "Head of Design, Placeholder Co.",
    },
  ] satisfies Testimonial[],

  // --- Contact -------------------------------------------------------------
  contact: {
    heading: "Next stop: your project.",
    body: "Have a problem worth putting on the line? Let's talk.",
  },

  // --- Journey config --------------------------------------------------
  // Consumed by components/CareerLine.tsx to compute scroll-driven
  // horizontal travel. Mirrors the --line-length CSS token; keep both in
  // sync if you change how far the line should travel per stop.
  journey: {
    /** Horizontal distance (in vw) allocated to each case-study stop. */
    stopSpacingVw: 60,
  },
} as const;
