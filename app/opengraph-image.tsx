import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// See app/icon.tsx — hex conversion of the oklch(0.62 0.19 35) --accent token.
const ACCENT_HEX = "#e14d28";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          background: "#111111",
          padding: "0 96px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: ACCENT_HEX,
          }}
        >
          {site.role}
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 600,
            color: "#faf9f6",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {site.hero.headline}
        </div>
      </div>
    ),
    { ...size }
  );
}
