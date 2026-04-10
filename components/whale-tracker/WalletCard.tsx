"use client";
import { WalletProfile, PERSONA_CONFIG, RISK_COLOR, fmtUsd } from "./useWalletSimulator";

interface Props {
  wallet: WalletProfile;
  selected: boolean;
  onSelect: (id: string) => void;
  onToggleTrack: (id: string) => void;
}

export default function WalletCard({ wallet, selected, onSelect, onToggleTrack }: Props) {
  const persona = PERSONA_CONFIG[wallet.persona];
  const isUp    = wallet.pnl7d >= 0;

  return (
    <div
      onClick={() => onSelect(wallet.id)}
      className="px-4 py-4 border-b border-trench-line-subtle cursor-pointer transition-colors duration-150 group"
      style={{ background: selected ? "rgba(0,255,133,0.06)" : "transparent" }}
      onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.background = "rgba(16,24,32,0.85)"; }}
      onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left */}
        <div className="min-w-0 flex-1">
          {/* Name + verified */}
          <div className="flex items-center gap-1.5 mb-1">
            {selected && <div className="w-1 h-3 bg-[#00FF85] flex-shrink-0" />}
            <span
              className="text-[#D0D8E8] text-[12px] font-medium truncate"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {wallet.label}
            </span>
            {wallet.verified && (
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <circle cx="8" cy="8" r="7" fill="#00FF85" fillOpacity="0.15" stroke="#00FF85" strokeWidth="1" />
                <path d="M5 8l2 2 4-4" stroke="#00FF85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          {/* Address */}
          <p
            className="text-[10px] text-trench-dim mb-2 font-mono tracking-tight"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            {wallet.address}
          </p>

          {/* Persona badge */}
          <div className="flex items-center gap-2 mb-2.5">
            <span
              className="text-[9px] px-2 py-0.5 font-semibold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: persona.color,
                background: persona.bg,
                border: `1px solid ${persona.color}30`,
              }}
            >
              {wallet.persona}
            </span>
            <span
              className="text-[9px] px-1.5 py-0.5 uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: RISK_COLOR[wallet.riskLevel],
                border: `1px solid ${RISK_COLOR[wallet.riskLevel]}30`,
              }}
            >
              {wallet.riskLevel}
            </span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p
                className="text-[9px] text-trench-dim uppercase tracking-wider"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                7d PnL
              </p>
              <p
                className="text-[11px] font-semibold tabular-nums"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: isUp ? "#00FF85" : "#FF3B3B",
                }}
              >
                {isUp ? "+" : ""}{fmtUsd(wallet.pnl7d)}
              </p>
            </div>
            <div>
              <p
                className="text-[9px] text-trench-dim uppercase tracking-wider"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Win Rate
              </p>
              <p
                className="text-[11px] font-semibold tabular-nums"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: wallet.winRate >= 70 ? "#00FF85" : wallet.winRate >= 55 ? "#FFB800" : "#FF3B3B",
                }}
              >
                {wallet.winRate}%
              </p>
            </div>
            <div>
              <p
                className="text-[9px] text-trench-dim uppercase tracking-wider"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Avg Hold
              </p>
              <p
                className="text-[11px] text-[#8892A4] tabular-nums"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {wallet.avgHoldTime}
              </p>
            </div>
          </div>

          {/* Holding */}
          {wallet.holding.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
              <span className="text-[9px] text-trench-dim" style={{ fontFamily: "var(--font-jetbrains)" }}>
                holding:
              </span>
              {wallet.holding.map((t) => (
                <span
                  key={t}
                  className="text-[9px] px-1.5 py-px"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: "#00D4FF",
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.15)",
                  }}
                >
                  ${t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: track + meta */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleTrack(wallet.id); }}
            className="text-[9px] px-2.5 py-1 font-bold uppercase tracking-wider transition-all duration-150 hover:brightness-110 active:scale-95"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: wallet.tracked ? "#060810" : "#00FF85",
              background: wallet.tracked ? "#00FF85" : "rgba(0,255,133,0.1)",
              border: "1px solid rgba(0,255,133,0.3)",
            }}
          >
            {wallet.tracked ? "✓ Tracking" : "+ Track"}
          </button>
          <p className="text-[9px] text-trench-dim" style={{ fontFamily: "var(--font-jetbrains)" }}>
            {wallet.copiers.toLocaleString()} copiers
          </p>
          <p
            className="text-[9px]"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: wallet.lastActive === "0s" ? "#00FF85" : "#5C6678",
            }}
          >
            {wallet.lastActive === "0s" ? "⚡ just now" : wallet.lastActive + " ago"}
          </p>
        </div>
      </div>
    </div>
  );
}
