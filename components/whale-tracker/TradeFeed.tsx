"use client";
import { useMemo, useRef, useEffect, useState } from "react";
import { Trade } from "./useWalletSimulator";
import { TradeRow } from "./TradeRow";

interface Props {
  trades: Trade[];
  selectedWalletId: string | null;
  onCopy: (id: string) => void;
}

const GRID = "120px 80px 90px 100px 100px 80px 70px";

const COL_HEADERS = [
  { label: "Wallet",   align: "left"  },
  { label: "Type",     align: "left"  },
  { label: "Token",    align: "left"  },
  { label: "Amount",   align: "left"  },
  { label: "PnL",      align: "left"  },
  { label: "Via",      align: "left"  },
  { label: "",         align: "right" },
];

function fmtTimeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 5)   return "just now";
  if (s < 60)  return s + "s ago";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  return Math.floor(s / 3600) + "h ago";
}

export default function TradeFeed({ trades, selectedWalletId, onCopy }: Props) {
  const [, forceUpdate] = useState(0);
  const newestIdRef = useRef<string | null>(null);
  const [newId, setNewId] = useState<string | null>(null);

  // Refresh timestamps every 5s
  useEffect(() => {
    const iv = setInterval(() => forceUpdate((n) => n + 1), 5000);
    return () => clearInterval(iv);
  }, []);

  // Flash new trade for 1.5s
  useEffect(() => {
    if (trades[0] && trades[0].id !== newestIdRef.current) {
      newestIdRef.current = trades[0].id;
      setNewId(trades[0].id);
      const t = setTimeout(() => setNewId(null), 1500);
      return () => clearTimeout(t);
    }
  }, [trades]);

  const visible = useMemo(() => {
    if (!selectedWalletId) return trades;
    return trades.filter((t) => t.walletId === selectedWalletId);
  }, [trades, selectedWalletId]);

  const buys  = visible.filter((t) => t.type === "buy").length;
  const sells = visible.filter((t) => t.type === "sell").length;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Feed header */}
      <div className="flex items-center justify-between px-4 h-11 border-b border-trench-line-subtle flex-shrink-0 bg-trench-panel/90">
        <div className="flex items-center gap-4 min-w-0">
          <span className="text-[10px] uppercase tracking-[0.12em] text-trench-label font-medium truncate" style={{ fontFamily: "var(--font-jetbrains)" }}>
            {selectedWalletId ? "Filtered feed" : "All trades"} ({visible.length})
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[9px] text-[#00FF85]" style={{ fontFamily: "var(--font-jetbrains)" }}>
              <span>▲</span>{buys} buys
            </span>
            <span className="flex items-center gap-1 text-[9px] text-[#FF3B3B]" style={{ fontFamily: "var(--font-jetbrains)" }}>
              <span>▼</span>{sells} sells
            </span>
          </div>
        </div>
        {selectedWalletId && (
          <span className="text-[9px] text-trench-dim hidden sm:inline" style={{ fontFamily: "var(--font-jetbrains)" }}>
            Tap wallet again to clear
          </span>
        )}
      </div>

      {/* Column headers */}
      <div className="hidden sm:grid items-center px-4 h-9 border-b border-trench-line-subtle flex-shrink-0 bg-trench-bg" style={{ gridTemplateColumns: GRID }}>
        {COL_HEADERS.map((c, i) => (
          <span
            key={i}
            className={`text-[9px] uppercase tracking-[0.1em] text-trench-dim ${c.align === "right" ? "text-right" : ""}`}
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            {c.label}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto scrollbar-stable bg-trench-bg">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-52 gap-2 px-4 text-center">
            <span className="text-trench-dim text-xl" aria-hidden>
              ∅
            </span>
            <p className="text-trench-dim text-xs" style={{ fontFamily: "var(--font-jetbrains)" }}>
              No trades in this view
            </p>
          </div>
        ) : (
          visible.map((trade) => (
            <TradeRow
              key={trade.id}
              trade={trade}
              onCopy={onCopy}
              timeAgo={fmtTimeAgo(trade.timestamp)}
              isNew={trade.id === newId}
            />
          ))
        )}
      </div>
    </div>
  );
}
