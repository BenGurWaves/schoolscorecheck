import type { Metadata } from "next";
import { Space_Grotesk, Outfit, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SchoolScoreCheck — See the real data behind any school district",
  description: "Instant school performance lookup by address. Official NCES education data, not crowdsourced ratings. Test scores, graduation rates, student-teacher ratios, and state comparisons.",
  keywords: "school district ratings, school performance data, NCES data, school test scores, graduation rates, student-teacher ratio",
  openGraph: {
    title: "SchoolScoreCheck — See the real data behind any school district",
    description: "Instant school performance lookup by address. Official NCES education data.",
    type: "website",
    url: "https://schoolscorecheck.calyvent.com",
    siteName: "SchoolScoreCheck",
  },
  twitter: {
    card: "summary_large_image",
    title: "SchoolScoreCheck — See the real data behind any school district",
    description: "Instant school performance lookup by address. Official NCES education data.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} ${sourceCodePro.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
