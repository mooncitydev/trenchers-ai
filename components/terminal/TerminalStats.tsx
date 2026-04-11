"use client";
import { useMemo } from "react";
import { Token, fmtVolume } from "./useTokenSimulator";

interface Props {
  tokens: Token[];
}

export default function TerminalStats({ tokens }: Props) {
  const stats = useMemo(() => {
    const totalVol = tokens.reduce((s, t) => s + t.volume24h, 0);
    const gainers = tokens.filter((t) => t.change24h > 0).length;
    const losers = tokens.filter((t) => t.change24h < 0).length;
    const newTokens = tokens.filter((t) => t.ageMinutes < 30).length;
    const topGainer = [...tokens].sort((a, b) => b.change24h - a.change24h)[0];
    const totalTxns = tokens.reduce((s, t) => s + t.txns, 0);
    return { totalVol, gainers, losers, newTokens, topGainer, totalTxns };
  }, [tokens]);

  const items = [
    { label: "24h Volume", value: fmtVolume(stats.totalVol), color: "#E8EDF5" },
    { label: "Gainers", value: String(stats.gainers), color: "#34D399" },
    { label: "Losers", value: String(stats.losers), color: "#F87171" },
    { label: "New (<30m)", value: String(stats.newTokens), color: "#FBBF24" },
    {
      label: "Top Gainer",
      value: stats.topGainer?.name ?? "—",
      color: "#34D399",
    },
    {
      label: "Total Txns",
      value: stats.totalTxns.toLocaleString(),
      color: "#22D3EE",
    },
  ];

  return (
    <div className="border-b border-trench-line-subtle bg-trench-panel/90">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-nowrap lg:items-stretch lg:overflow-x-auto lg:scrollbar-none gap-px bg-trench-line-subtle p-px lg:p-0 lg:gap-0">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col px-3 py-2.5 sm:px-4 sm:py-3 bg-trench-panel/90 lg:min-w-[100px] lg:flex-shrink-0 lg:border-r lg:border-trench-line-subtle lg:last:border-r-0 lg:px-5"
          >
            <span
              className="text-[9px] uppercase tracking-[0.14em] text-trench-dim mb-1"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {item.label}
            </span>
            <span
              className="text-[12px] sm:text-[13px] font-semibold tabular-nums tracking-tight break-words line-clamp-2"
              style={{ fontFamily: "var(--font-jetbrains)", color: item.color }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
