"use client";
import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import TokenAvatar from "@/components/TokenAvatar";
import { stableImageIndex } from "@/lib/tokenMemeImages";

const BASE_TOKENS_RAW = [
  {
    name: "PEPE2",
    sym: "P",
    price: "$0.0000043",
    change: "+184%",
    vol: "$891K",
    mc: "$4.2M",
    holders: "1,240",
    up: true,
    age: "2m",
    safe: true,
  },
  {
    name: "WOJAK",
    sym: "W",
    price: "$0.0000012",
    change: "+67%",
    vol: "$412K",
    mc: "$1.8M",
    holders: "654",
    up: true,
    age: "8m",
    safe: true,
  },
  {
    name: "BONK2",
    sym: "B",
    price: "$0.000091",
    change: "-12%",
    vol: "$2.1M",
    mc: "$12.4M",
    holders: "8,912",
    up: false,
    age: "14m",
    safe: true,
  },
  {
    name: "MOODENG",
    sym: "M",
    price: "$0.0000089",
    change: "+341%",
    vol: "$204K",
    mc: "$890K",
    holders: "421",
    up: true,
    age: "1m",
    safe: false,
  },
  {
    name: "GOAT",
    sym: "G",
    price: "$0.000067",
    change: "+28%",
    vol: "$1.4M",
    mc: "$6.7M",
    holders: "3,102",
    up: true,
    age: "22m",
    safe: true,
  },
  {
    name: "FWOG",
    sym: "F",
    price: "$0.0000031",
    change: "-8%",
    vol: "$340K",
    mc: "$3.1M",
    holders: "2,087",
    up: false,
    age: "31m",
    safe: true,
  },
  {
    name: "PONKE",
    sym: "P",
    price: "$0.000014",
    change: "+92%",
    vol: "$720K",
    mc: "$5.1M",
    holders: "1,876",
    up: true,
    age: "45m",
    safe: true,
  },
  {
    name: "SLERF",
    sym: "S",
    price: "$0.000003",
    change: "-22%",
    vol: "$180K",
    mc: "$980K",
    holders: "502",
    up: false,
    age: "1h",
    safe: false,
  },
] as const;

type FeedToken = (typeof BASE_TOKENS_RAW)[number] & { imageIndex: number };

const BASE_TOKENS: FeedToken[] = BASE_TOKENS_RAW.map((t) => ({
  ...t,
  imageIndex: stableImageIndex(t.name),
}));

const TABS = ["All", "New (<30m)", "Trending", "Safe Only"];
const desktopFeedCols: CSSProperties = {
  gridTemplateColumns:
    "minmax(0, 1.6fr) minmax(0, 92px) minmax(0, 72px) minmax(0, 88px) minmax(0, 88px) minmax(0, 76px) minmax(0, 76px)",
  columnGap: "0.75rem",
};

const mono = { fontFamily: "var(--font-jetbrains)" as const };

export default function LiveFeed() {
  const [activeTab, setActiveTab] = useState(0);
  const [flash, setFlash] = useState<number | null>(null);
  const [tokens, setTokens] = useState(BASE_TOKENS);

  useEffect(() => {
    const iv = setInterval(() => {
      const idx = Math.floor(Math.random() * tokens.length);
      setFlash(idx);
      setTimeout(() => setFlash(null), 400);
    }, 1500);
    return () => clearInterval(iv);
  }, [tokens]);

  const filtered = tokens.filter((t) => {
    if (activeTab === 1)
      return ["1m", "2m", "8m", "14m", "22m"].includes(t.age);
    if (activeTab === 2) return t.up;
    if (activeTab === 3) return t.safe;
    return true;
  });

  return (
    <section
      className="py-24 sm:py-32 border-y border-[#1C2535]"
      style={{ background: "#07090F" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 reveal">
          <div>
            <p
              className="text-[#00FF85] text-xs uppercase tracking-[0.2em] mb-2"
              style={mono}
            ></p>
            <h2
              className="text-[#E8EDF5] leading-tight"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(32px, 4vw, 52px)",
              }}
            >
              See what&apos;s moving{" "}
              <span className="text-[#00FF85]">before CT catches on.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85] animate-pulse-dot shrink-0" />
            <span className="text-[#00FF85] text-xs" style={mono}>
              Live prices · updated every 143ms
            </span>
          </div>
        </div>

        <div
          className="border border-[#1C2535] overflow-hidden reveal"
          style={{ background: "#080C14" }}
        >
          <div
            className="flex items-center justify-between border-b border-[#1C2535] px-3"
            style={{ background: "#0A0E18" }}
          >
            <div className="flex flex-wrap">
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className="px-4 py-3 text-[10px] uppercase tracking-widest border-b-2 transition-all"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: activeTab === i ? "#00FF85" : "#6B7A8F",
                    borderBottomColor:
                      activeTab === i ? "#00FF85" : "transparent",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span
              className="text-[9px] text-[#6B7A8F] pr-2 hidden sm:block"
              style={mono}
            >
              {filtered.length} tokens
            </span>
          </div>

          <div
            className="hidden sm:grid px-4 py-2.5 border-b border-[#1C2535] bg-[#0A0E18]/80 items-center"
            style={{
              ...desktopFeedCols,
              ...mono,
              fontSize: "10px",
              color: "#8B95A8",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span className="min-w-0">Token</span>
            <span className="text-right tabular-nums">Price</span>
            <span className="text-right tabular-nums">24h %</span>
            <span className="text-right tabular-nums">Volume</span>
            <span className="text-right tabular-nums">Mkt Cap</span>
            <span className="text-right tabular-nums">Holders</span>
            <span className="text-right">Action</span>
          </div>

          {filtered.map((t, i) => {
            const globalIdx = tokens.indexOf(t);
            const isFlash = flash === globalIdx;

            return (
              <div
                key={t.name}
                className="border-b border-[#1C2535]/50 last:border-b-0 transition-colors duration-300 hover:bg-[#0E1420]/80"
                style={{
                  background: isFlash
                    ? t.up
                      ? "rgba(0,255,133,0.06)"
                      : "rgba(255,59,59,0.06)"
                    : undefined,
                }}
              >
                <div className="sm:hidden px-4 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <TokenAvatar
                      imageIndex={t.imageIndex}
                      fallbackLetter={t.sym}
                      size="lg"
                      up={t.up}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[#C8D0DC] text-sm font-semibold"
                          style={mono}
                        >
                          {t.name}
                        </span>
                        {t.safe && (
                          <span
                            className="text-[8px] px-1.5 py-0.5 border border-[#00FF85]/25 text-[#00FF85]"
                            style={mono}
                          >
                            ✓ SAFE
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <span
                          className="text-[10px] text-[#9CA8B8]"
                          style={mono}
                        >
                          {t.price}
                        </span>
                        <span
                          className="text-[10px] font-bold"
                          style={{
                            color: t.up ? "#00FF85" : "#FF3B3B",
                            ...mono,
                          }}
                        >
                          {t.change}
                        </span>
                        <span
                          className="text-[9px] text-[#6B7A8F]"
                          style={mono}
                        >
                          {t.age} ago
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 px-3 py-1.5 text-[10px] font-bold uppercase"
                    style={{
                      ...mono,
                      background: "rgba(0,255,133,0.12)",
                      color: "#00FF85",
                      border: "1px solid rgba(0,255,133,0.25)",
                    }}
                  >
                    Snipe
                  </button>
                </div>

                <div
                  className="hidden sm:grid px-4 py-2.5 items-center"
                  style={desktopFeedCols}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <TokenAvatar
                      imageIndex={t.imageIndex}
                      fallbackLetter={t.sym}
                      size="md"
                      up={t.up}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[#C8D0DC] text-sm truncate"
                          style={mono}
                        >
                          {t.name}
                        </span>
                        {t.safe && (
                          <span
                            className="text-[8px] px-1 py-0.5 border border-[#00FF85]/25 text-[#00FF85] shrink-0"
                            style={mono}
                          >
                            ✓ SAFE
                          </span>
                        )}
                      </div>
                      <span
                        className="text-[9px] text-[#6B7A8F] block truncate"
                        style={mono}
                      >
                        {t.age} ago
                      </span>
                    </div>
                  </div>

                  <span
                    className="text-right text-[11px] text-[#C8D0DC] tabular-nums"
                    style={mono}
                  >
                    {t.price}
                  </span>
                  <span
                    className="text-right text-[11px] font-semibold tabular-nums"
                    style={{ color: t.up ? "#00FF85" : "#FF3B3B", ...mono }}
                  >
                    {t.change}
                  </span>
                  <span
                    className="text-right text-[11px] text-[#9CA8B8] tabular-nums"
                    style={mono}
                  >
                    {t.vol}
                  </span>
                  <span
                    className="text-right text-[11px] text-[#9CA8B8] tabular-nums"
                    style={mono}
                  >
                    {t.mc}
                  </span>
                  <span
                    className="text-right text-[11px] text-[#9CA8B8] tabular-nums"
                    style={mono}
                  >
                    {t.holders}
                  </span>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider w-full max-w-[76px]"
                      style={{
                        ...mono,
                        background: "rgba(0,255,133,0.12)",
                        color: "#00FF85",
                        border: "1px solid rgba(0,255,133,0.25)",
                      }}
                    >
                      Snipe
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div
            className="flex items-center justify-between px-4 py-2.5"
            style={{ background: "#0A0E18" }}
          >
            <span className="text-[9px] text-[#5A6478]" style={mono}>
              Showing {filtered.length} of {tokens.length} tokens
            </span>
            <Link
              href="#waitlist"
              className="text-[9px] text-[#00FF85] uppercase tracking-wider hover:underline"
              style={mono}
            >
              Join to unlock full feed →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
