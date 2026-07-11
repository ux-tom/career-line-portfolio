import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Satori (the renderer behind ImageResponse) doesn't support the oklch()
// function used for --accent in globals.css, so this is a hex conversion
// of the same oklch(0.62 0.19 35) value — keep them in sync if the accent
// token changes.
const ACCENT_HEX = "#e14d28";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          background: "#111111",
          padding: 12,
        }}
      >
        {/* A single dot on a line — the Career Line motif, abstracted to icon scale. */}
        <div
          style={{
            width: "100%",
            height: 2,
            background: "#faf9f6",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: ACCENT_HEX,
              position: "absolute",
              right: 0,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
