import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#060810",
        surface: "#0C1018",
        "surface-2": "#111924",
        border: "#1C2535",
        green: "#00FF85",
        orange: "#FF6535",
        cyan: "#00D4FF",
        text: "#E8EDF5",
        muted: "#5A6478",
        trench: {
          bg: "#080A0F",
          panel: "#0C1018",
          raised: "#101820",
          "raised-hover": "#141C28",
          line: "#1A2434",
          "line-subtle": "#141A24",
          label: "#8B95A8",
          dim: "#5C6678",
          accent: "#00FF85",
          "accent-soft": "rgba(0, 255, 133, 0.12)",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      animation: {
        "ticker-left": "ticker-left 30s linear infinite",
        "ticker-right": "ticker-right 30s linear infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "fade-up": "fade-up 0.6s ease forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
      },
      keyframes: {
        "ticker-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ticker-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,255,133,0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(0,255,133,0.35)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
