"use client";
import Link from "next/link";

export type FilterTab = "all" | "new" | "trending" | "safe" | "watchlist";
export type SortKey =
  | "price"
  | "change1h"
  | "change24h"
  | "volume24h"
  | "mcap"
  | "holders"
  | "ageMinutes";
export type SortDir = "asc" | "desc";

interface Props {
  activeTab: FilterTab;
  onTabChange: (t: FilterTab) => void;
  search: string;
  onSearch: (v: string) => void;
  tickCount: number;
}

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New  <30m" },
  { key: "trending", label: "Trending 🔥" },
  { key: "safe", label: "✓ Safe" },
  { key: "watchlist", label: "★ Watchlist" },
];

export default function TerminalHeader({
  activeTab,
  onTabChange,
  search,
  onSearch,
  tickCount,
}: Props) {
  return (
    <div
      className="border-b border-[#111822]"
      style={{ background: "#07090F" }}
    >
      <div className="flex items-center justify-between px-4 h-12 border-b border-[#111822]">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#2A3545] hover:text-[#00FF85] transition-colors"
            style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px" }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Home
          </Link>
          <div className="w-px h-4 bg-[#1C2535]" />
          <Link
            href="/app/tracker"
            className="flex items-center shrink-0 gap-1 text-[#00D4FF] hover:text-[#5cefff] transition-colors text-[10px] sm:text-[11px] whitespace-nowrap"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            <span className="sm:hidden">Tracker →</span>
            <span className="hidden sm:inline">Tracker →</span>
          </Link>
          <div className="w-px h-4 bg-[#1C2535]" />
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 border border-[#00FF85]/40 flex items-center justify-center"
              style={{ background: "rgba(0,255,133,0.06)" }}
            >
              <span
                className="text-[#00FF85] text-[9px] font-bold"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                T
              </span>
            </div>
            <span
              className="text-[#8892A4] text-xs font-medium"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              TrenchersAI <span className="text-[#2A3545]">/ Terminal</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="hidden sm:flex items-center gap-2"
            style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px" }}
          >
            <span className="text-[#2A3545]">updates</span>
            <span
              className="text-[#00FF85] tabular-nums transition-all duration-150"
              key={tickCount}
            >
              {tickCount.toLocaleString()}
            </span>
          </div>

          <div className="w-px h-4 bg-[#1C2535] hidden sm:block" />

          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF85] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF85]" />
            </span>
            <span
              className="text-[#00FF85] text-[10px] uppercase tracking-wider"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Live
            </span>
          </div>

          <div className="w-px h-4 bg-[#1C2535]" />

          <div className="relative">
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#2A3545]"
              width="11"
              height="11"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle
                cx="7"
                cy="7"
                r="5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M11 11l3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search token..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-[#0C1018] border border-[#1C2535] text-[#D0D8E8] text-[11px] w-36 outline-none focus:border-[#00FF85]/30 transition-colors placeholder-[#2A3545]"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center px-4 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className="flex-shrink-0 px-4 py-2.5 text-[10px] uppercase tracking-widest border-b-2 transition-all duration-150 whitespace-nowrap"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: activeTab === tab.key ? "#00FF85" : "#2A3545",
              borderBottomColor:
                activeTab === tab.key ? "#00FF85" : "transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
