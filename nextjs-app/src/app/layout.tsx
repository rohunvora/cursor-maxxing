/**
 * Root Layout - cursorhabits
 * 
 * Warm aesthetic with personality fonts.
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "cursorhabits — Your chat history writes your rules",
  description: "Turn your Cursor chat history into personalized rules. Stop repeating yourself. 100% local, privacy-first.",
  keywords: ["Cursor", "AI", "rules", "habits", "prompt engineering", "CLI", "developer tools"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts - Fraunces (display) + General Sans (body) + JetBrains Mono (code) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
        {/* General Sans from Fontshare */}
        <link 
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
