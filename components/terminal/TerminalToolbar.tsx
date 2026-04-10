"use client";
import type { FilterTab } from "@/components/terminal/TokenTable";

interface Props {
  activeTab: FilterTab;
  onTabChange: (t: FilterTab) => void;
  search: string;
  onSearch: (v: string) => void;
  tickCount: number;
}

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New <30m" },
  { key: "trending", label: "Trending" },
  { key: "safe", label: "Safe" },
  { key: "watchlist", label: "Watchlist" },
];

/** Filter tabs + search bar for Terminal (used under `/app` shell — no duplicate home/whale links). */
export default function TerminalToolbar({ activeTab, onTabChange, search, onSearch, tickCount }: Props) {
  return (
    <div className="border-b border-trench-line-subtle flex-shrink-0 bg-trench-bg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 sm:py-0 sm:h-14 border-b border-trench-line-subtle">
        <div>
          <span className="text-trench-label text-xs font-medium block" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Market scanner
          </span>
          <span className="text-[10px] text-trench-dim" style={{ fontFamily: "var(--font-jetbrains)" }}>
            Solana · simulated feed
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-end">
          <div className="hidden sm:flex items-center gap-2" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px" }}>
            <span className="text-trench-dim">Row updates</span>
            <span className="text-trench-accent tabular-nums transition-all duration-150" key={tickCount}>
              {tickCount.toLocaleString()}
            </span>
          </div>
          <div className="w-px h-4 bg-trench-line hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trench-accent opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-trench-accent" />
            </span>
            <span className="text-trench-accent text-[10px] font-medium uppercase tracking-wider" style={{ fontFamily: "var(--font-jetbrains)" }}>
              Live
            </span>
          </div>
          <div className="w-px h-4 bg-trench-line" />
          <div className="relative flex-1 sm:flex-initial min-w-0 max-w-[220px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-trench-dim pointer-events-none"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Filter by name…"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-md bg-trench-panel border border-trench-line text-[#E8EDF5] text-[11px] outline-none focus:border-trench-accent/35 focus:ring-1 focus:ring-trench-accent/20 transition-all placeholder:text-trench-dim"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center px-2 sm:px-4 overflow-x-auto scrollbar-none gap-0.5 bg-trench-panel/40">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`flex-shrink-0 px-3 sm:px-4 py-2.5 text-[10px] uppercase tracking-[0.12em] border-b-2 transition-all duration-150 whitespace-nowrap rounded-t-md mt-0.5 ${
              activeTab === tab.key
                ? "text-trench-accent border-trench-accent bg-trench-bg/80"
                : "text-trench-dim border-transparent hover:text-trench-label hover:bg-trench-raised/60"
            }`}
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
