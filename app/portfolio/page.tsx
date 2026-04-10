"use client";
import { useState, useEffect } from "react";
import ToolNav from "@/components/tool-shell/ToolNav";

// ── Types ──────────────────────────────────────────────────────────────────
interface Position {
  token: string;
  qty: string;
  avgBuy: number;
  current: number;
  value: number;
  pnl: number;
  pnlPct: number;
  ageMinutes: number;
  wallet: string;
}

interface ClosedTrade {
  token: string;
  type: "snipe" | "copy" | "manual";
  entry: number;
  exit: number;
  pnl: number;
  pnlPct: number;
  holdTime: string;
  closedAgo: string;
}

// ── Seed data ─────────────────────────────────────────────────────────────
const SEED_POSITIONS: Position[] = [
  { token: "PEPE2",    qty: "12.4M", avgBuy: 0.000242, current: 0.000278, value: 3240, pnl: 412,  pnlPct: 14.5, ageMinutes: 34,  wallet: "Wallet 1" },
  { token: "WIF",      qty: "890",   avgBuy: 0.00234,  current: 0.00218,  value: 1890, pnl: -120, pnlPct: -6.0, ageMinutes: 142, wallet: "Wallet 1" },
  { token: "BOME",     qty: "450K",  avgBuy: 0.00179,  current: 0.00198,  value: 890,  pnl: 89,   pnlPct: 11.1, ageMinutes: 78,  wallet: "Wallet 2" },
];

const SEED_CLOSED: ClosedTrade[] = [
  { token: "MOODENG",  type: "snipe",  entry: 0.0000041, exit: 0.0000089, pnl: 2840,  pnlPct: 117.1, holdTime: "7m",  closedAgo: "12m" },
  { token: "PONKE",    type: "copy",   entry: 0.0000098, exit: 0.0000142, pnl: 980,   pnlPct: 44.9,  holdTime: "23m", closedAgo: "1h"  },
  { token: "BONK2",    type: "manual", entry: 0.000094,  exit: 0.000081,  pnl: -390,  pnlPct: -13.8, holdTime: "2h",  closedAgo: "3h"  },
  { token: "GOAT",     type: "copy",   entry: 0.000052,  exit: 0.000071,  pnl: 1240,  pnlPct: 36.5,  holdTime: "45m", closedAgo: "5h"  },
  { token: "POPCAT",   type: "snipe",  entry: 0.000381,  exit: 0.000428,  pnl: 680,   pnlPct: 12.3,  holdTime: "1h",  closedAgo: "8h"  },
  { token: "SLERF",    type: "manual", entry: 0.0000042, exit: 0.0000031, pnl: -210,  pnlPct: -26.2, holdTime: "3h",  closedAgo: "1d"  },
];

// ── Helpers ───────────────────────────────────────────────────────────────
function fmtUsd(n: number, sign = false): string {
  const abs = Math.abs(n);
  const prefix = sign ? (n >= 0 ? "+" : "-") : n < 0 ? "-" : "";
  if (abs >= 1000) return prefix + "$" + (abs / 1000).toFixed(1) + "K";
  return prefix + "$" + abs.toFixed(0);
}
function fmtPrice(n: number): string {
  if (n < 0.0001) return "$" + n.toFixed(8).replace(/0+$/, "");
  if (n < 0.01)   return "$" + n.toFixed(6).replace(/0+$/, "");
  return "$" + n.toFixed(4);
}
function fmtAge(m: number): string {
  if (m < 60)   return m + "m";
  if (m < 1440) return Math.floor(m / 60) + "h";
  return Math.floor(m / 1440) + "d";
}

const TYPE_COLOR: Record<string, string> = {
  snipe: "#00FF85", copy: "#00D4FF", manual: "#FFB800",
};

// ── Sub-components ────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color = "#E8EDF5", accent = false }:
  { label: string; value: string; sub?: string; color?: string; accent?: boolean }) {
  return (
    <div
      className="flex flex-col p-4 border border-[#111822] transition-colors hover:border-[#1C2535]"
      style={{ background: accent ? "rgba(0,255,133,0.03)" : "#080C14" }}
    >
      <span className="text-[9px] uppercase tracking-[0.15em] text-[#2A3545] mb-2"
        style={{ fontFamily: "var(--font-jetbrains)" }}>
        {label}
      </span>
      <span className="text-2xl font-bold tabular-nums leading-none mb-1"
        style={{ fontFamily: "var(--font-jetbrains)", color }}>
        {value}
      </span>
      {sub && (
        <span className="text-[10px] text-[#5A6478]" style={{ fontFamily: "var(--font-jetbrains)" }}>
          {sub}
        </span>
      )}
    </div>
  );
}

function PnLBar({ pnlPct }: { pnlPct: number }) {
  const pct = Math.min(Math.abs(pnlPct), 100);
  const up  = pnlPct >= 0;
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1 bg-[#111822] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: pct + "%", background: up ? "#00FF85" : "#FF3B3B" }}
        />
      </div>
      <span
        className="text-[11px] font-semibold tabular-nums w-16 text-right"
        style={{ fontFamily: "var(--font-jetbrains)", color: up ? "#00FF85" : "#FF3B3B" }}
      >
        {up ? "+" : ""}{pnlPct.toFixed(1)}%
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [positions, setPositions] = useState<Position[]>(SEED_POSITIONS);
  const totalValue    = positions.reduce((s, p) => s + p.value, 0);
  const totalPnl      = positions.reduce((s, p) => s + p.pnl, 0);
  const totalPnlPct   = ((totalPnl / (totalValue - totalPnl)) * 100);
  const openCount     = positions.length;
  const closedPnl     = SEED_CLOSED.reduce((s, t) => s + t.pnl, 0);
  const wins          = SEED_CLOSED.filter((t) => t.pnl > 0).length;
  const winRate       = Math.round((wins / SEED_CLOSED.length) * 100);

  // Nudge PnL periodically for live feel
  useEffect(() => {
    const iv = setInterval(() => {
      setPositions((prev) =>
        prev.map((p) => {
          const drift  = p.current * (0.003 * (Math.random() * 2 - 1));
          const newCur = Math.max(0, p.current + drift);
          const newVal = p.value + (drift / p.current) * p.value;
          const newPnl = p.pnl  + (drift / p.current) * p.value;
          const newPct = (newPnl / (newVal - newPnl)) * 100;
          return { ...p, current: newCur, value: newVal, pnl: newPnl, pnlPct: newPct };
        })
      );
    }, 1800);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: "#07090F" }}>
      <ToolNav
        rightSlot={
          <div className="hidden sm:flex items-center gap-3">
            {[
              { label: "Value", value: fmtUsd(totalValue) },
              { label: "24h PnL", value: fmtUsd(totalPnl, true) },
            ].map((s) => (
              <div key={s.label} className="text-right">
                <p className="text-[8px] uppercase tracking-wider text-[#2A3545]"
                  style={{ fontFamily: "var(--font-jetbrains)" }}>{s.label}</p>
                <p className="text-[11px] font-semibold tabular-nums"
                  style={{ fontFamily: "var(--font-jetbrains)", color: s.label === "24h PnL" ? (totalPnl >= 0 ? "#00FF85" : "#FF3B3B") : "#E8EDF5" }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        }
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-6"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#1C2535 transparent" }}>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total Value"    value={fmtUsd(totalValue)}
            sub={`≈ ${(totalValue / 148).toFixed(1)} SOL`} color="#E8EDF5" />
          <StatCard label="24h PnL"        value={fmtUsd(totalPnl, true)}
            sub={`${totalPnl >= 0 ? "+" : ""}${totalPnlPct.toFixed(1)}%`}
            color={totalPnl >= 0 ? "#00FF85" : "#FF3B3B"} accent={totalPnl > 0} />
          <StatCard label="Open Positions" value={String(openCount)}
            sub={`${new Set(positions.map(p => p.wallet)).size} wallets`} color="#00D4FF" />
          <StatCard label="Win Rate (7d)"  value={winRate + "%"}
            sub={`${wins}/${SEED_CLOSED.length} trades`}
            color={winRate >= 60 ? "#00FF85" : winRate >= 45 ? "#FFB800" : "#FF3B3B"} />
        </div>

        {/* Active Positions */}
        <div className="border border-[#111822]" style={{ background: "#080C14" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#111822]">
            <div className="flex items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#5A6478]"
                style={{ fontFamily: "var(--font-jetbrains)" }}>
                Active Positions
              </span>
              <span className="text-[9px] px-2 py-0.5 border border-[#00FF85]/20 text-[#00FF85]"
                style={{ fontFamily: "var(--font-jetbrains)", background: "rgba(0,255,133,0.06)" }}>
                {openCount} open
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-[9px] text-[#00FF85]"
              style={{ fontFamily: "var(--font-jetbrains)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85] animate-pulse inline-block" />
              Live
            </span>
          </div>

          {/* Headers */}
          <div className="hidden sm:grid px-4 py-2 border-b border-[#111822]"
            style={{
              gridTemplateColumns: "1fr 80px 110px 110px 90px 160px 70px 80px",
              fontFamily: "var(--font-jetbrains)", fontSize: "8px",
              color: "#2A3545", letterSpacing: "0.12em", textTransform: "uppercase"
            }}>
            {["Token","Qty","Avg Buy","Current","Value","PnL","Age",""].map((h, i) => (
              <span key={i} className={i > 1 ? "text-right" : ""}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {positions.map((p) => (
            <div key={p.token}
              className="grid items-center px-4 py-3 border-b border-[#111822]/60 hover:bg-[#0C1018] transition-colors group"
              style={{ gridTemplateColumns: "1fr 80px 110px 110px 90px 160px 70px 80px" }}>
              {/* Token */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                  style={{ background: "rgba(0,255,133,0.1)", color: "#00FF85", fontFamily: "var(--font-jetbrains)" }}>
                  {p.token[0]}
                </div>
                <div>
                  <p className="text-[11px] text-[#D0D8E8] font-medium" style={{ fontFamily: "var(--font-jetbrains)" }}>
                    ${p.token}
                  </p>
                  <p className="text-[9px] text-[#2A3545] sm:hidden" style={{ fontFamily: "var(--font-jetbrains)" }}>
                    {p.wallet}
                  </p>
                </div>
              </div>
              {/* Qty */}
              <span className="text-[10px] text-[#5A6478] text-right hidden sm:block"
                style={{ fontFamily: "var(--font-jetbrains)" }}>{p.qty}</span>
              {/* Avg Buy */}
              <span className="text-[10px] text-[#5A6478] text-right hidden sm:block"
                style={{ fontFamily: "var(--font-jetbrains)" }}>{fmtPrice(p.avgBuy)}</span>
              {/* Current */}
              <span className="text-[10px] text-[#8892A4] text-right hidden sm:block tabular-nums"
                style={{ fontFamily: "var(--font-jetbrains)" }}>{fmtPrice(p.current)}</span>
              {/* Value */}
              <span className="text-[11px] text-[#D0D8E8] text-right tabular-nums"
                style={{ fontFamily: "var(--font-jetbrains)" }}>{fmtUsd(p.value)}</span>
              {/* PnL bar */}
              <div className="hidden sm:flex justify-end">
                <PnLBar pnlPct={p.pnlPct} />
              </div>
              {/* Age */}
              <span className="text-[9px] text-[#2A3545] text-right hidden sm:block"
                style={{ fontFamily: "var(--font-jetbrains)" }}>{fmtAge(p.ageMinutes)}</span>
              {/* Close */}
              <div className="flex justify-end">
                <button className="px-2 py-1 text-[8px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    fontFamily: "var(--font-jetbrains)", color: "#FF3B3B",
                    border: "1px solid rgba(255,59,59,0.25)", background: "rgba(255,59,59,0.06)"
                  }}>
                  Close
                </button>
              </div>
            </div>
          ))}

          {/* Totals row */}
          <div className="grid items-center px-4 py-3"
            style={{ gridTemplateColumns: "1fr 80px 110px 110px 90px 160px 70px 80px", background: "#07090F" }}>
            <span className="text-[9px] uppercase tracking-wider text-[#2A3545]"
              style={{ fontFamily: "var(--font-jetbrains)" }}>Total</span>
            <span /><span /><span />
            <span className="text-[12px] font-bold text-[#E8EDF5] text-right tabular-nums"
              style={{ fontFamily: "var(--font-jetbrains)" }}>{fmtUsd(totalValue)}</span>
            <div className="hidden sm:flex justify-end">
              <span className="text-[12px] font-bold tabular-nums"
                style={{ fontFamily: "var(--font-jetbrains)", color: totalPnl >= 0 ? "#00FF85" : "#FF3B3B" }}>
                {fmtUsd(totalPnl, true)} ({totalPnl >= 0 ? "+" : ""}{totalPnlPct.toFixed(1)}%)
              </span>
            </div>
            <span /><span />
          </div>
        </div>

        {/* Closed Trades */}
        <div className="border border-[#111822]" style={{ background: "#080C14" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#111822]">
            <div className="flex items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#5A6478]"
                style={{ fontFamily: "var(--font-jetbrains)" }}>
                Closed Trades (7d)
              </span>
              <span className="text-[9px] px-2 py-0.5 text-[#00FF85]"
                style={{ fontFamily: "var(--font-jetbrains)", background: "rgba(0,255,133,0.06)", border: "1px solid rgba(0,255,133,0.15)" }}>
                {fmtUsd(closedPnl, true)} realized
              </span>
            </div>
            <span className="text-[9px] text-[#2A3545]"
              style={{ fontFamily: "var(--font-jetbrains)" }}>
              {wins}W / {SEED_CLOSED.length - wins}L
            </span>
          </div>

          {/* Headers */}
          <div className="hidden sm:grid px-4 py-2 border-b border-[#111822]"
            style={{
              gridTemplateColumns: "1fr 80px 110px 110px 120px 70px 80px",
              fontFamily: "var(--font-jetbrains)", fontSize: "8px",
              color: "#2A3545", letterSpacing: "0.12em", textTransform: "uppercase"
            }}>
            {["Token","Type","Entry","Exit","PnL","Hold","Closed"].map((h, i) => (
              <span key={i} className={i > 1 ? "text-right" : ""}>{h}</span>
            ))}
          </div>

          {SEED_CLOSED.map((t, i) => (
            <div key={i}
              className="grid items-center px-4 py-2.5 border-b border-[#111822]/50 hover:bg-[#0C1018] transition-colors"
              style={{ gridTemplateColumns: "1fr 80px 110px 110px 120px 70px 80px" }}>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center text-[8px] font-bold flex-shrink-0"
                  style={{ background: t.pnl >= 0 ? "rgba(0,255,133,0.1)" : "rgba(255,59,59,0.1)",
                    color: t.pnl >= 0 ? "#00FF85" : "#FF3B3B", fontFamily: "var(--font-jetbrains)" }}>
                  {t.token[0]}
                </div>
                <span className="text-[11px] text-[#8892A4]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  ${t.token}
                </span>
              </div>
              <span className="text-[9px] hidden sm:block"
                style={{ fontFamily: "var(--font-jetbrains)", color: TYPE_COLOR[t.type] }}>
                {t.type.toUpperCase()}
              </span>
              <span className="text-[10px] text-[#3A4558] text-right hidden sm:block tabular-nums"
                style={{ fontFamily: "var(--font-jetbrains)" }}>{fmtPrice(t.entry)}</span>
              <span className="text-[10px] text-[#3A4558] text-right hidden sm:block tabular-nums"
                style={{ fontFamily: "var(--font-jetbrains)" }}>{fmtPrice(t.exit)}</span>
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-semibold tabular-nums"
                  style={{ fontFamily: "var(--font-jetbrains)", color: t.pnl >= 0 ? "#00FF85" : "#FF3B3B" }}>
                  {fmtUsd(t.pnl, true)}
                </p>
                <p className="text-[9px] tabular-nums"
                  style={{ fontFamily: "var(--font-jetbrains)", color: t.pnl >= 0 ? "#00FF8580" : "#FF3B3B80" }}>
                  {t.pnl >= 0 ? "+" : ""}{t.pnlPct.toFixed(1)}%
                </p>
              </div>
              <span className="text-[9px] text-[#2A3545] text-right hidden sm:block"
                style={{ fontFamily: "var(--font-jetbrains)" }}>{t.holdTime}</span>
              <span className="text-[9px] text-[#2A3545] text-right"
                style={{ fontFamily: "var(--font-jetbrains)" }}>{t.closedAgo}</span>
            </div>
          ))}
        </div>

        {/* Bottom padding */}
        <div className="h-4" />
      </div>
    </div>
  );
}
