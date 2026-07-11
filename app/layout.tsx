import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = "https://your-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Career Line — AI UX Designer",
  description:
    "One line, measured at every stop. A career told as a journey map — case studies, KPIs, and process from an AI UX designer.",
  openGraph: {
    title: "The Career Line — AI UX Designer",
    description:
      "One line, measured at every stop. A career told as a journey map.",
    url: siteUrl,
    siteName: "The Career Line",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Career Line — AI UX Designer",
    description:
      "One line, measured at every stop. A career told as a journey map.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        {children}
      </body>
    </html>
  );
}
