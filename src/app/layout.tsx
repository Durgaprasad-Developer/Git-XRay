import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GitHub Xray — AI-powered Developer Profile Analysis",
  description:
    "Get an honest, recruiter-grade review of your GitHub profile in 30 seconds. Score, archetype, top fixes, and a shareable card — no login required.",
  keywords: ["GitHub", "developer", "profile", "analysis", "AI", "recruiter", "score"],
  openGraph: {
    title: "GitHub Xray — Know your developer signal",
    description:
      "AI-powered GitHub profile analysis. Score, archetype, recruiter review — no login required.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Xray — AI Developer Profile Review",
    description: "Get your GitHub profile analyzed by AI in 30 seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Syne for display headings — loaded via CDN since next/font doesn't support variable weights easily with Syne */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
