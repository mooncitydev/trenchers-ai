"use client";
import { useState, useEffect, useRef } from "react";
import ToolNav from "@/components/tool-shell/ToolNav";

// ── Types ──────────────────────────────────────────────────────────────────
type Pool = "all" | "pump.fun" | "raydium";

interface NewToken {
  id: string;
  name: string;
  symbol: string;
  pool: "pump.fun" | "raydium";
  ageSeconds: number;
  mcap: number;
  liq: number;
  safety: number;      // 0–10
  holders: number;
  devHoldPct: number;
  lpBurned: boolean;
  mintRevoked: boolean;
  sniped: boolean;
  isNew: boolean;      // flash on entry
}

// ── Helpers ───────────────────────────────────────────────────────────────
const TOKEN_NAMES = [
  "MOONCAT","RUGPROOF","SOLANA","DEGEN","PEPE3","BONKGOD","MEMEKING",
  "WAGMI","GIGA","SIGMA","CHAD2","GIGABRAIN","REKT","NGMI","HONK",
  "SAFEPEPE","DOGESOLANA","CATANA","BULLRUN","ALPHACAT",
];

let idCounter = 1;
function genToken(): NewToken {
  const name      = TOKEN_NAMES[Math.floor(Math.random() * TOKEN_NAMES.length)];
  const pool      = Math.random() > 0.45 ? "pump.fun" : "raydium";
  const liq       = Math.floor(8000  + Math.random() * 120000);
  const mcap      = Math.floor(liq   * (1.5 + Math.random() * 8));
  const safety    = Math.floor(2 + Math.random() * 9);
  const holders   = Math.floor(20 + Math.random() * 400);
  const devHold   = parseFloat((1 + Math.random() * 20).toFixed(1));
  const lpBurned  = Math.random() > 0.4;
  const mintRev   = Math.random() > 0.3;

  return {
    id: String(idCounter++),
    name,
    symbol: name[0],
    pool,
    ageSeconds: Math.floor(Math.random() * 30),
    mcap,
    liq,
    safety,
    holders,
    devHoldPct: devHold,
    lpBurned,
    mintRevoked: mintRev,
    sniped: false,
    isNew: true,
  };
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000)     return "$" + (n / 1_000).toFixed(0) + "K";
  return "$" + n.toFixed(0);
}

function fmtAge(s: number): string {
  if (s < 60)   return s + "s";
  if (s < 3600) return Math.floor(s / 60) + "m";
  return Math.floor(s / 3600) + "h";
}

// ── Safety score visual ────────────────────────────────────────────────────
function SafetyBar({ score }: { score: number }) {
  const pct   = (score / 10) * 100;
  const color = score >= 7 ? "#00FF85" : score >= 4 ? "#FFB800" : "#FF3B3B";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "#111822" }}>
        <div className="h-full rounded-full transition-all duration-300"
          style={{ width: pct + "%", background: color }} />
      </div>
      <span className="text-[10px] font-semibold tabular-nums w-8"
        style={{ fontFamily: "var(--font-jetbrains)", color }}>
        {score}/10
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
const SEED = Array.from({ length: 8 }, genToken).map((t) => ({ ...t, ageSeconds: Math.floor(10 + Math.random() * 480), isNew: false }));

export default function SniperPage() {
  const [tokens, setTokens]       = useState<NewToken[]>(SEED);
  const [pool, setPool]           = useState<Pool>("all");
  const [autoSnipe, setAutoSnipe] = useState(false);
  const [minSafety, setMinSafety] = useState(5);
  const [minLiq, setMinLiq]       = useState(10000);
  const [showFilters, setShowFilters] = useState(false);
  const [sniped, setSniped]       = useState(0);
  const tickRef                   = useRef(0);

  // Age tokens + spawn new ones
  useEffect(() => {
    const iv = setInterval(() => {
      tickRef.current++;
      setTokens((prev) => {
        // Age all tokens
        let updated = prev.map((t) => ({
          ...t,
          ageSeconds: t.ageSeconds + 1,
          isNew: false,
        }));
        // Spawn new token every ~4 ticks
        if (tickRef.current % 4 === 0) {
          const newTok = genToken();
          updated = [newTok, ...updated].slice(0, 20);
        }
        return updated;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  // Auto-snipe
  useEffect(() => {
    if (!autoSnipe) return;
    const iv = setInterval(() => {
      setTokens((prev) =>
        prev.map((t) => {
          if (!t.sniped && t.safety >= minSafety && t.liq >= minLiq && t.ageSeconds < 60) {
            setSniped((n) => n + 1);
            return { ...t, sniped: true };
          }
          return t;
        })
      );
    }, 2000);
    return () => clearInterval(iv);
  }, [autoSnipe, minSafety, minLiq]);

  const visible = tokens.filter((t) => {
    if (pool === "pump.fun" && t.pool !== "pump.fun") return false;
    if (pool === "raydium"  && t.pool !== "raydium")  return false;
    return true;
  });

  const handleSnipe = (id: string) => {
    setTokens((prev) => prev.map((t) => t.id === id ? { ...t, sniped: true } : t));
    setSniped((n) => n + 1);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: "#07090F" }}>
      <ToolNav
        rightSlot={
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-[9px] text-[#2A3545]" style={{ fontFamily: "var(--font-jetbrains)" }}>
              SNIPED
            </span>
            <span className="text-[#00FF85] text-[13px] font-bold tabular-nums"
              style={{ fontFamily: "var(--font-jetbrains)" }}>{sniped}</span>
          </div>
        }
      />

      {/* Controls bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#111822] flex-shrink-0"
        style={{ background: "#080C14" }}>
        <div className="flex items-center gap-3">
          {/* Pool tabs */}
          {(["all","pump.fun","raydium"] as Pool[]).map((p) => (
            <button key={p} onClick={() => setPool(p)}
              className="px-3 py-1.5 text-[9px] uppercase tracking-widest border transition-all"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: pool === p ? "#00FF85" : "#2A3545",
                borderColor: pool === p ? "rgba(0,255,133,0.3)" : "#1C2535",
                background: pool === p ? "rgba(0,255,133,0.06)" : "transparent",
              }}>
              {p === "all" ? "All Pools" : p}
            </button>
          ))}

          <div className="w-px h-4 bg-[#1C2535]" />

          {/* Filter toggle */}
          <button onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] uppercase tracking-widest border transition-all"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: showFilters ? "#FFB800" : "#2A3545",
              borderColor: showFilters ? "rgba(255,184,0,0.3)" : "#1C2535",
              background: showFilters ? "rgba(255,184,0,0.06)" : "transparent",
            }}>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Filters
          </button>
        </div>

        {/* Auto-snipe toggle */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] uppercase tracking-widest text-[#2A3545]"
            style={{ fontFamily: "var(--font-jetbrains)" }}>Auto-Snipe</span>
          <button
            onClick={() => setAutoSnipe((v) => !v)}
            className="relative w-10 h-5 rounded-full transition-all duration-300 flex-shrink-0"
            style={{ background: autoSnipe ? "#00FF85" : "#111822", border: "1px solid " + (autoSnipe ? "#00FF85" : "#1C2535") }}
          >
            <span className="absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300"
              style={{
                background: autoSnipe ? "#060810" : "#2A3545",
                left: autoSnipe ? "calc(100% - 18px)" : "2px",
              }} />
          </button>
          {autoSnipe && (
            <span className="text-[9px] text-[#00FF85] uppercase tracking-wider animate-pulse"
              style={{ fontFamily: "var(--font-jetbrains)" }}>
              ● Active
            </span>
          )}
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="flex items-center gap-6 px-4 py-3 border-b border-[#111822] flex-shrink-0"
          style={{ background: "#07090F" }}>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider text-[#2A3545]"
              style={{ fontFamily: "var(--font-jetbrains)" }}>Min Safety</span>
            <div className="flex items-center gap-1">
              {[3,5,7,9].map((v) => (
                <button key={v} onClick={() => setMinSafety(v)}
                  className="px-2 py-0.5 text-[9px] border transition-all"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: minSafety === v ? "#00FF85" : "#2A3545",
                    borderColor: minSafety === v ? "rgba(0,255,133,0.3)" : "#1C2535",
                    background: minSafety === v ? "rgba(0,255,133,0.06)" : "transparent",
                  }}>{v}+</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider text-[#2A3545]"
              style={{ fontFamily: "var(--font-jetbrains)" }}>Min Liq</span>
            <div className="flex items-center gap-1">
              {[5000,10000,25000,50000].map((v) => (
                <button key={v} onClick={() => setMinLiq(v)}
                  className="px-2 py-0.5 text-[9px] border transition-all"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: minLiq === v ? "#00FF85" : "#2A3545",
                    borderColor: minLiq === v ? "rgba(0,255,133,0.3)" : "#1C2535",
                    background: minLiq === v ? "rgba(0,255,133,0.06)" : "transparent",
                  }}>{fmtNum(v)}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-[#2A3545]" style={{ fontFamily: "var(--font-jetbrains)" }}>
              LP Burned only
            </span>
            <div className="w-3 h-3 border border-[#1C2535] flex items-center justify-center cursor-pointer hover:border-[#00FF85]">
              <span className="text-[#00FF85] text-[8px]">✓</span>
            </div>
          </div>
        </div>
      )}

      {/* Column headers */}
      <div className="hidden sm:grid px-4 py-2 border-b border-[#111822] flex-shrink-0"
        style={{
          gridTemplateColumns: "1fr 60px 90px 90px 130px 80px 80px 70px",
          background: "#07090F", fontFamily: "var(--font-jetbrains)",
          fontSize: "8px", color: "#2A3545", letterSpacing: "0.12em", textTransform: "uppercase"
        }}>
        {["Token","Age","MCap","Liq","Safety Score","Holders","Dev Hold",""].map((h, i) => (
          <span key={i} className={i > 1 ? "text-right" : ""}>{h}</span>
        ))}
      </div>

      {/* Token rows */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1C2535 transparent" }}>
        {visible.map((t) => (
          <div
            key={t.id}
            className="grid items-center px-4 h-14 border-b border-[#111822]/60 hover:bg-[#0C1018] transition-all duration-200 group"
            style={{
              gridTemplateColumns: "1fr 60px 90px 90px 130px 80px 80px 70px",
              background: t.isNew ? "rgba(0,255,133,0.04)" : t.sniped ? "rgba(0,212,255,0.03)" : "transparent",
            }}
          >
            {/* Token */}
            <div className="flex items-center gap-2.5">
              {/* Animated icon */}
              <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center text-[10px] font-bold relative overflow-hidden"
                style={{
                  background: t.safety >= 7 ? "rgba(0,255,133,0.12)" : t.safety >= 4 ? "rgba(255,184,0,0.12)" : "rgba(255,59,59,0.12)",
                  color: t.safety >= 7 ? "#00FF85" : t.safety >= 4 ? "#FFB800" : "#FF3B3B",
                  fontFamily: "var(--font-jetbrains)",
                }}>
                {t.symbol}
                {t.isNew && (
                  <div className="absolute inset-0 animate-ping rounded-none"
                    style={{ background: "rgba(0,255,133,0.2)" }} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] text-[#D0D8E8] font-medium" style={{ fontFamily: "var(--font-jetbrains)" }}>
                    ${t.name}
                  </span>
                  {t.isNew && (
                    <span className="text-[8px] px-1 py-px text-[#00FF85] uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-jetbrains)", background: "rgba(0,255,133,0.12)", border: "1px solid rgba(0,255,133,0.2)" }}>
                      NEW
                    </span>
                  )}
                  {t.sniped && (
                    <span className="text-[8px] px-1 py-px text-[#00D4FF] uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-jetbrains)", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                      ✓ Sniped
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px]"
                    style={{ fontFamily: "var(--font-jetbrains)", color: t.pool === "pump.fun" ? "#FF6535" : "#00D4FF" }}>
                    {t.pool}
                  </span>
                  <span className="text-[8px] text-[#1C2535]">·</span>
                  {t.lpBurned && (
                    <span className="text-[8px] text-[#00FF85]" style={{ fontFamily: "var(--font-jetbrains)" }}>LP✓</span>
                  )}
                  {t.mintRevoked && (
                    <span className="text-[8px] text-[#00FF85]" style={{ fontFamily: "var(--font-jetbrains)" }}>Mint✓</span>
                  )}
                </div>
              </div>
            </div>

            {/* Age */}
            <span className="text-[10px] text-right tabular-nums"
              style={{ fontFamily: "var(--font-jetbrains)", color: t.ageSeconds < 60 ? "#FFB800" : "#5A6478" }}>
              {fmtAge(t.ageSeconds)}
            </span>

            {/* MCap */}
            <span className="text-[10px] text-[#5A6478] text-right tabular-nums hidden sm:block"
              style={{ fontFamily: "var(--font-jetbrains)" }}>{fmtNum(t.mcap)}</span>

            {/* Liq */}
            <span className="text-[10px] text-[#8892A4] text-right tabular-nums hidden sm:block"
              style={{ fontFamily: "var(--font-jetbrains)" }}>{fmtNum(t.liq)}</span>

            {/* Safety score */}
            <div className="hidden sm:flex justify-end">
              <SafetyBar score={t.safety} />
            </div>

            {/* Holders */}
            <span className="text-[10px] text-[#3A4558] text-right tabular-nums hidden sm:block"
              style={{ fontFamily: "var(--font-jetbrains)" }}>{t.holders}</span>

            {/* Dev hold */}
            <span className="text-[10px] text-right tabular-nums hidden sm:block"
              style={{ fontFamily: "var(--font-jetbrains)", color: t.devHoldPct > 10 ? "#FF3B3B" : "#3A4558" }}>
              {t.devHoldPct}%
            </span>

            {/* Snipe button */}
            <div className="flex justify-end">
              <button
                onClick={() => handleSnipe(t.id)}
                disabled={t.sniped}
                className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-all duration-150 hover:brightness-110 active:scale-95 disabled:opacity-40"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: t.sniped ? "#2A3545" : "#00FF85",
                  background: t.sniped ? "rgba(42,53,69,0.2)" : "rgba(0,255,133,0.12)",
                  border: `1px solid ${t.sniped ? "rgba(42,53,69,0.3)" : "rgba(0,255,133,0.3)"}`,
                }}>
                {t.sniped ? "✓" : "Snipe"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-[#111822] flex-shrink-0"
        style={{ background: "#07090F", fontFamily: "var(--font-jetbrains)", fontSize: "9px" }}>
        <span className="text-[#2A3545]">{visible.length} tokens detected · Solana Mainnet</span>
        <span className="text-[#00FF85]">
          {autoSnipe ? `● Auto-Snipe ON · min safety ${minSafety}/10 · min liq ${fmtNum(minLiq)}` : "● Monitoring"}
        </span>
      </div>
    </div>
  );
}
