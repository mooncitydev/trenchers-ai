"use client";
import { memo } from "react";
import { Trade, PERSONA_CONFIG, fmtUsd } from "./useWalletSimulator";

interface Props {
  trade: Trade;
  onCopy: (id: string) => void;
  timeAgo: string;
  isNew: boolean;
}

const PLATFORM_COLOR: Record<string, string> = {
  "Pump.fun": "#FF6535",
  Raydium: "#00D4FF",
  Jupiter: "#A78BFA",
  PumpSwap: "#FFB800",
};

function TradeRowInner({ trade, onCopy, timeAgo, isNew }: Props) {
  const isBuy = trade.type === "buy";
  const persona = PERSONA_CONFIG[trade.persona];
  const hasPnl = trade.pnlUsd !== undefined;
  const pnlUp = (trade.pnlUsd ?? 0) >= 0;

  return (
    <div
      className="grid items-center px-4 min-h-[56px] py-2 border-b border-trench-line-subtle transition-all duration-300 group hover:bg-trench-raised-hover cursor-default"
      style={{
        gridTemplateColumns: "120px 80px 90px 100px 100px 80px 70px",
        background: isNew
          ? isBuy
            ? "rgba(52,211,153,0.05)"
            : "rgba(248,113,113,0.05)"
          : "transparent",
      }}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className="text-[9px] px-1.5 py-px font-semibold"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: persona.color,
              background: persona.bg,
            }}
          >
            {trade.persona.split(" ")[0]}
          </span>
        </div>
        <span
          className="text-[10px] text-trench-label font-mono truncate block"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {trade.walletAddress}
        </span>
      </div>

      <div className="flex items-center">
        <span
          className="text-[10px] px-2 py-0.5 font-bold uppercase"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: isBuy ? "#00FF85" : "#FF3B3B",
            background: isBuy ? "rgba(0,255,133,0.1)" : "rgba(255,59,59,0.1)",
            border: `1px solid ${isBuy ? "rgba(0,255,133,0.2)" : "rgba(255,59,59,0.2)"}`,
          }}
        >
          {isBuy ? "▲ BUY" : "▼ SELL"}
        </span>
      </div>

      <span
        className="text-[12px] font-semibold text-[#D0D8E8]"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        ${trade.token}
      </span>

      <div>
        <p
          className="text-[11px] text-[#8892A4] tabular-nums"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {trade.amountSol.toFixed(2)} SOL
        </p>
        <p
          className="text-[9px] text-trench-dim tabular-nums"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          ≈ {fmtUsd(trade.valueUsd)}
        </p>
      </div>

      <div>
        {hasPnl ? (
          <>
            <p
              className="text-[11px] font-semibold tabular-nums"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: pnlUp ? "#00FF85" : "#FF3B3B",
              }}
            >
              {pnlUp ? "+" : ""}
              {fmtUsd(trade.pnlUsd!)}
            </p>
            <p
              className="text-[9px] tabular-nums"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: pnlUp ? "#00FF85" : "#FF3B3B",
                opacity: 0.7,
              }}
            >
              {pnlUp ? "+" : ""}
              {trade.pnlPct?.toFixed(1)}%
            </p>
          </>
        ) : (
          <span
            className="text-[10px] text-trench-dim"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            —
          </span>
        )}
      </div>

      <div>
        <p
          className="text-[9px] font-semibold mb-0.5"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: PLATFORM_COLOR[trade.platform] ?? "#5A6478",
          }}
        >
          {trade.platform}
        </p>
        <p
          className="text-[9px] text-trench-dim"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {timeAgo}
        </p>
      </div>

      <div className="flex justify-end">
        {isBuy && (
          <button
            onClick={() => onCopy(trade.id)}
            disabled={trade.copied}
            className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider transition-all duration-150 hover:brightness-110 active:scale-95 disabled:opacity-60"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: trade.copied ? "#5C6678" : "#00FF85",
              background: trade.copied
                ? "rgba(92,102,120,0.15)"
                : "rgba(0,255,133,0.1)",
              border: `1px solid ${trade.copied ? "rgba(92,102,120,0.35)" : "rgba(0,255,133,0.28)"}`,
              cursor: trade.copied ? "default" : "pointer",
            }}
          >
            {trade.copied ? "✓ Copied" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
}

function areTradeRowsEqual(prev: Props, next: Props) {
  return (
    prev.trade.id === next.trade.id &&
    prev.trade.copied === next.trade.copied &&
    prev.timeAgo === next.timeAgo &&
    prev.isNew === next.isNew
  );
}

export const TradeRow = memo(TradeRowInner, areTradeRowsEqual);
