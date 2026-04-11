"use client";
import { useState, useMemo } from "react";
import { Token } from "./useTokenSimulator";
import { TokenRow } from "./TokenRow";
import { TERMINAL_TABLE_GRID } from "./terminalTableGrid";

type SortKey =
  | "price"
  | "change1h"
  | "change24h"
  | "volume24h"
  | "mcap"
  | "holders"
  | "ageMinutes";
type SortDir = "asc" | "desc";
export type FilterTab = "all" | "new" | "trending" | "safe" | "watchlist";

interface Props {
  tokens: Token[];
  activeTab: FilterTab;
  search: string;
  onFavorite: (id: string) => void;
  loading: boolean;
}

interface ColDef {
  key: SortKey | null;
  label: string;
  align: "left" | "right" | "center";
}

const COLUMNS: ColDef[] = [
  { key: null, label: "#", align: "left" },
  { key: null, label: "Token", align: "left" },
  { key: "price", label: "Price", align: "right" },
  { key: "change1h", label: "1h %", align: "right" },
  { key: "change24h", label: "24h %", align: "right" },
  { key: "volume24h", label: "Vol", align: "right" },
  { key: "mcap", label: "MCap", align: "right" },
  { key: "holders", label: "Hold", align: "right" },
  { key: null, label: "★", align: "center" },
  { key: null, label: "", align: "right" },
];

function SkeletonRowMobile({ i }: { i: number }) {
  return (
    <div
      className="md:hidden px-3 py-3 border-b border-trench-line-subtle animate-pulse"
      style={{ animationDelay: `${i * 40}ms` }}
    >
      <div className="flex gap-3 mb-3">
        <div className="h-3 w-5 rounded bg-[#141C28]" />
        <div className="h-9 w-9 rounded-full bg-[#141C28] shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-[min(100%,140px)] rounded bg-[#141C28]" />
          <div className="h-2 w-24 rounded bg-[#141C28]/80" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-8 rounded bg-[#141C28]/90" />
        <div className="h-8 rounded bg-[#141C28]/90" />
        <div className="h-8 rounded bg-[#141C28]/90" />
        <div className="h-8 rounded bg-[#141C28]/90" />
      </div>
    </div>
  );
}

function SkeletonRowDesktop({ i }: { i: number }) {
  return (
    <div
      className="hidden md:grid items-center px-4 h-12 border-b border-trench-line-subtle"
      style={{ gridTemplateColumns: TERMINAL_TABLE_GRID }}
    >
      {COLUMNS.map((_, j) => (
        <div
          key={j}
          className={`h-3 rounded animate-pulse ${j === 0 ? "w-4" : j === 1 ? "w-24 max-w-full" : "w-12 ml-auto"}`}
          style={{ background: "#141C28", animationDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
}

export default function TokenTable({
  tokens,
  activeTab,
  search,
  onFavorite,
  loading,
}: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("change24h");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey | null) => {
    if (!key) return;
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const visible = useMemo(() => {
    let list = [...tokens];
    if (activeTab === "new") list = list.filter((t) => t.ageMinutes < 30);
    if (activeTab === "trending") list = list.filter((t) => t.trending);
    if (activeTab === "safe") list = list.filter((t) => t.safe);
    if (activeTab === "watchlist") list = list.filter((t) => t.favorited);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === "desc" ? bv - av : av - bv;
    });

    return list;
  }, [tokens, activeTab, search, sortKey, sortDir]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div
        className="md:hidden px-3 sm:px-4 py-2.5 border-b border-trench-line-subtle flex-shrink-0 bg-trench-panel/80 flex items-center justify-between gap-2"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        <span className="text-[9px] uppercase tracking-[0.14em] text-trench-dim">
          Tokens
        </span>
        <span className="text-[9px] text-trench-dim/90">Tap row for detail</span>
      </div>

      <div
        className="hidden md:grid items-center px-4 h-10 border-b border-trench-line-subtle flex-shrink-0 bg-trench-panel/80"
        style={{ gridTemplateColumns: TERMINAL_TABLE_GRID }}
      >
        {COLUMNS.map((col, i) => (
          <button
            key={i}
            onClick={() => handleSort(col.key)}
            disabled={!col.key}
            className={`flex items-center gap-1 text-[9px] uppercase tracking-[0.12em] transition-colors duration-150 ${
              col.key ? "hover:text-[#E8EDF5] cursor-pointer" : "cursor-default"
            } ${col.align === "right" ? "justify-end" : col.align === "center" ? "justify-center" : ""}`}
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: sortKey === col.key ? "#00FF85" : "#5C6678",
            }}
          >
            {col.label}
            {col.key && sortKey === col.key && (
              <span className="text-trench-accent opacity-90">
                {sortDir === "desc" ? "▼" : "▲"}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-stable bg-trench-bg">
        {loading ? (
          Array.from({ length: 15 }).map((_, i) => (
            <div key={i}>
              <SkeletonRowMobile i={i} />
              <SkeletonRowDesktop i={i} />
            </div>
          ))
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-52 gap-3 px-4">
            <div
              className="h-12 w-12 rounded-full border border-trench-line bg-trench-panel flex items-center justify-center text-trench-dim text-lg"
              aria-hidden
            >
              ∅
            </div>
            <p
              className="text-trench-label text-sm font-medium"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              No tokens match filters
            </p>
            <p
              className="text-trench-dim text-xs text-center max-w-xs"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Try another tab or clear the search field.
            </p>
          </div>
        ) : (
          visible.map((token, i) => (
            <TokenRow
              key={token.id}
              token={token}
              rank={i + 1}
              onFavorite={onFavorite}
            />
          ))
        )}
      </div>

      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 px-4 py-2.5 border-t border-trench-line-subtle flex-shrink-0 bg-trench-panel/80"
        style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px" }}
      >
        <span className="text-trench-dim">
          Showing{" "}
          <span className="text-trench-label tabular-nums">
            {visible.length}
          </span>{" "}
          rows · Solana (mock)
        </span>
        <span className="text-trench-accent/90">
          MEV shield · Jito routing (simulated)
        </span>
      </div>
    </div>
  );
}
