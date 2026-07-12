import type { MetadataRoute } from "next";

// Temporary: case studies/testimonials are still Phase-7 placeholders. Remove once
// real content ships (PLAN.md Phase 10).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
