"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TOKENS = [
  { name: "PEPE2",   price: "$0.0000043", change: "+184%", vol: "$891K",  mc: "$4.2M",  up: true,  age: "2m" },
  { name: "WOJAK",   price: "$0.0000012", change: "+67%",  vol: "$412K",  mc: "$1.8M",  up: true,  age: "8m" },
  { name: "BONK2",   price: "$0.000091",  change: "-12%",  vol: "$2.1M",  mc: "$12.4M", up: false, age: "14m" },
  { name: "MOODENG", price: "$0.0000089", change: "+341%", vol: "$204K",  mc: "$890K",  up: true,  age: "1m" },
  { name: "GOAT",    price: "$0.000067",  change: "+28%",  vol: "$1.4M",  mc: "$6.7M",  up: true,  age: "22m" },
  { name: "FWOG",    price: "$0.0000031", change: "-8%",   vol: "$340K",  mc: "$3.1M",  up: false, age: "31m" },
];

const STATS = [
  { value: "<200ms", label: "Execution" },
  { value: "15+",    label: "Filters" },
  { value: "24/7",   label: "Uptime" },
  { value: "0",      label: "Custody Risk" },
];

function DashboardMockup() {
  const [flash, setFlash] = useState<number | null>(null);

  useEffect(() => {
    const iv = setInterval(() => {
      const idx = Math.floor(Math.random() * TOKENS.length);
      setFlash(idx);
      setTimeout(() => setFlash(null), 450);
    }, 1200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="relative w-full overflow-hidden border border-[#1C2535]" style={{ background: "#07090F" }}>
      {/* Window bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1C2535]" style={{ background: "#0A0E18" }}>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B3B]/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800]/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#00FF85]/50" />
        </div>
        <span className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", color: "#2A3545" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85] inline-block animate-pulse-dot" />
          LIVE · Pump.fun + Raydium
        </span>
        <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", color: "#1C2535" }}>v1.0</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1C2535]" style={{ background: "#07090F" }}>
        {["New Tokens", "Trending", "Copy Trades", "Alerts"].map((tab, i) => (
          <button key={tab} className="px-3 py-2 text-[9px] uppercase tracking-widest border-b-2 transition-colors"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: i === 0 ? "#00FF85" : "#2A3545",
              borderBottomColor: i === 0 ? "#00FF85" : "transparent",
            }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Column headers */}
      <div className="grid px-3 py-1.5 border-b border-[#1C2535]"
        style={{
          gridTemplateColumns: "1fr 80px 68px 68px 60px 54px",
          fontFamily: "var(--font-jetbrains)",
          fontSize: "8px",
          color: "#1C2535",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
        <span>Token</span>
        <span className="text-right">Price</span>
        <span className="text-right">24h %</span>
        <span className="text-right">Volume</span>
        <span className="text-right">MCap</span>
        <span className="text-right">Buy</span>
      </div>

      {/* Rows */}
      {TOKENS.map((t, i) => (
        <div key={t.name}
          className="grid items-center px-3 py-2 border-b border-[#1C2535]/40 transition-colors duration-300"
          style={{
            gridTemplateColumns: "1fr 80px 68px 68px 60px 54px",
            background: flash === i
              ? t.up ? "rgba(0,255,133,0.05)" : "rgba(255,59,59,0.05)"
              : "transparent",
          }}>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-[9px] font-bold"
              style={{
                background: t.up ? "rgba(0,255,133,0.1)" : "rgba(255,59,59,0.1)",
                color: t.up ? "#00FF85" : "#FF3B3B",
                fontFamily: "var(--font-jetbrains)",
              }}>
              {t.name[0]}
            </div>
            <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "#C8D0DC" }}>{t.name}</span>
            <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "8px", color: "#1C2535" }}>{t.age}</span>
          </div>
          <span className="text-right" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", color: "#5A6478" }}>{t.price}</span>
          <span className="text-right font-semibold" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px", color: t.up ? "#00FF85" : "#FF3B3B" }}>{t.change}</span>
          <span className="text-right" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", color: "#3A4558" }}>{t.vol}</span>
          <span className="text-right" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "9px", color: "#3A4558" }}>{t.mc}</span>
          <div className="flex justify-end">
            <button className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider transition-all hover:brightness-125"
              style={{
                fontFamily: "var(--font-jetbrains)",
                background: "rgba(0,255,133,0.1)",
                color: "#00FF85",
                border: "1px solid rgba(0,255,133,0.18)",
              }}>
              Snipe
            </button>
          </div>
        </div>
      ))}

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-2" style={{ background: "#0A0E18", fontFamily: "var(--font-jetbrains)", fontSize: "8px" }}>
        <span style={{ color: "#1C2535" }}>6 tokens · synced 143ms ago</span>
        <span style={{ color: "#00FF85" }}>● MEV Shield · Jito Active</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const fn = () => { hero.style.backgroundPositionY = `${window.scrollY * 0.3}px`; };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section id="hero" ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden grid-bg noise"
      style={{ paddingTop: "64px" }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(0,255,133,0.06) 0%, transparent 70%)" }} />
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF85]/12 to-transparent"
          style={{ animation: "scanline 8s linear infinite", top: 0 }} />
      </div>

      {/* Corner brackets */}
      {["top-20 left-4 sm:left-8 border-l border-t", "top-20 right-4 sm:right-8 border-r border-t",
        "bottom-8 left-4 sm:left-8 border-l border-b", "bottom-8 right-4 sm:right-8 border-r border-b"].map((cls, i) => (
        <div key={i} className={`absolute ${cls} w-6 h-6 border-[#00FF85]/25 pointer-events-none`} />
      ))}

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT — copy */}
          <div>
            <div className="inline-flex items-center gap-2 mb-5 animate-float-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
              <span className="tag">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85] animate-pulse-dot" />
                Early Access · Solana Mainnet
              </span>
            </div>

            <h1 className="leading-none tracking-wide mb-4 animate-float-up delay-100"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(48px, 9vw, 108px)",
                color: "#E8EDF5",
                opacity: 0,
                animationFillMode: "forwards",
              }}>
              Trade Like
              <br />
              <span className="text-[#00FF85]" style={{ textShadow: "0 0 40px rgba(0,255,133,0.35)" }}>
                The Whales
              </span>{" "}Do.
            </h1>

            <p className="text-[#5A6478] mb-8 animate-float-up delay-200"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: 1.6,
                maxWidth: "400px",
                opacity: 0,
                animationFillMode: "forwards",
              }}>
              AI-powered Solana terminal. Snipe new tokens, copy whale wallets,
              execute in{" "}
              <span className="text-[#E8EDF5] font-semibold">under 200ms</span>{" "}
              before anyone else sees the chart.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-float-up delay-300"
              style={{ opacity: 0, animationFillMode: "forwards" }}>
              <Link href="#waitlist" className="btn-primary"
                style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}>
                Get Early Access
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="#overview" className="btn-ghost text-sm">See How It Works</Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 animate-float-up delay-400"
              style={{ opacity: 0, animationFillMode: "forwards" }}>
              {STATS.map((s) => (
                <div key={s.label} className="stat-chip">
                  <span className="text-[#00FF85] font-bold text-lg leading-none mb-0.5"
                    style={{ fontFamily: "var(--font-jetbrains)" }}>{s.value}</span>
                  <span className="text-[10px] uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-jetbrains)", color: "#2A3545" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — live dashboard */}
          <div className="animate-float-up delay-300" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <div className="relative">
              <div className="absolute -inset-6 rounded-full blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(0,255,133,0.06) 0%, transparent 70%)" }} />
              <DashboardMockup />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-25">
        <span className="text-[9px] text-[#5A6478] uppercase tracking-widest" style={{ fontFamily: "var(--font-jetbrains)" }}>scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-[#5A6478] to-transparent" />
      </div>
    </section>
  );
}
