import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "TrenchersAI — The Terminal That Never Sleeps",
  description:
    "AI-powered Solana trading terminal. Snipe new tokens, copy whale wallets, and beat the market with sub-200ms execution and MEV protection.",
  keywords: [
    "Solana trading bot",
    "AI sniper bot",
    "memecoin trading",
    "copy trading",
    "MEV protection",
    "Pump.fun sniper",
    "Raydium bot",
    "TrenchersAI",
  ],
  openGraph: {
    title: "TrenchersAI — Trade Like the Whales Do",
    description:
      "The AI trading terminal for Solana. Sub-200ms execution. MEV-proof. 15+ safety filters.",
    url: "https://trenchers.ai",
    siteName: "TrenchersAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrenchersAI — Trade Like the Whales Do",
    description:
      "The AI trading terminal for Solana. Sub-200ms execution. MEV-proof. 15+ safety filters.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
