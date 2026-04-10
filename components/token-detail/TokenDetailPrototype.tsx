"use client";
import { useMemo } from "react";
import TokenAvatar from "@/components/TokenAvatar";
import { stableImageIndex } from "@/lib/tokenMemeImages";
import TokenTradePanel from "@/components/token-detail/TokenTradePanel";
export default function TokenDetailPrototype({ mint }: { mint: string }) {
  const label = useMemo(
    () => (mint.length > 12 ? `${mint.slice(0, 6)}…${mint.slice(-4)}` : mint),
    [mint],
  );
  const sym = useMemo(() => `TK${stableImageIndex(mint) % 10}`, [mint]);
  const imgIdx = stableImageIndex(mint);

  return (
    <div
      className="flex flex-col flex-1 min-h-0 overflow-hidden bg-trench-bg"
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0 border-b lg:border-b-0 lg:border-r border-trench-line-subtle">
          <div className="flex items-center gap-3 px-4 py-4 border-b border-trench-line-subtle bg-trench-panel/90">
            <TokenAvatar
              imageIndex={imgIdx}
              fallbackLetter={sym}
              size="lg"
              up
            />
            <div>
              <p
                className="text-[#E8EDF5] font-semibold text-lg"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                ${sym} / SOL
              </p>
              <p
                className="text-xs text-trench-label"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Mcap $4.2M · Liq $890K · 1.2K holders
              </p>
            </div>
            <div className="ml-auto text-right">
              <p
                className="text-[#00FF85] text-lg font-bold tabular-nums"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                $0.0000043
              </p>
              <p
                className="text-[10px] text-[#00FF85]"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                +12.4% · 24h
              </p>
            </div>
          </div>

          <div className="flex-1 min-h-[200px] lg:min-h-0 relative bg-trench-bg p-2">
            <div className="absolute inset-2 border border-trench-line rounded-lg overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div
                className="h-full w-full opacity-90"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,255,133,0.08) 0%, transparent 45%), repeating-linear-gradient(90deg, #111922 0 1px, transparent 1px 48px), repeating-linear-gradient(0deg, #111922 0 1px, transparent 1px 32px)",
                }}
              />
              <svg
                className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]"
                preserveAspectRatio="none"
                viewBox="0 0 400 120"
              >
                <polyline
                  fill="none"
                  stroke="#00FF85"
                  strokeWidth="1.5"
                  points="0,100 40,95 80,70 120,85 160,45 200,55 240,30 280,50 320,25 360,40 400,20"
                />
              </svg>
              <p
                className="absolute bottom-3 left-3 text-[9px] text-trench-dim"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Chart placeholder
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-px bg-trench-line-subtle border-t border-trench-line-subtle">
            {[
              { k: "Vol 24h", v: "$891K" },
              { k: "5m TXs", v: "142" },
              { k: "Top 10", v: "23%" },
            ].map((x) => (
              <div
                key={x.k}
                className="bg-trench-panel px-3 py-2.5 text-center"
              >
                <p
                  className="text-[9px] text-trench-dim uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {x.k}
                </p>
                <p
                  className="text-[#C8D0DC] text-sm"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {x.v}
                </p>
              </div>
            ))}
          </div>
        </div>

        <TokenTradePanel tokenSymbol={`$${sym}`} />
      </div>
    </div>
  );
}
