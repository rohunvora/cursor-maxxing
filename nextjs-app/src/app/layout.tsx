/**
 * Root Layout - prompt.gallery
 * 
 * Light mode design with clean typography.
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "prompt.gallery — Monetize Your AI Prompt Histories",
  description: "The first marketplace for prompt journeys. See what's possible with AI, pay to learn exactly how.",
  keywords: ["prompts", "AI", "ChatGPT", "Claude", "Cursor", "prompt engineering", "marketplace"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts - Instrument Sans (UI) + IBM Plex Mono (code) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Sans:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
