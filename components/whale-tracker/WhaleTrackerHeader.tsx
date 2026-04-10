import Link from "next/link";

interface Props { tradeCount: number }

export default function WhaleTrackerHeader({ tradeCount }: Props) {
  return (
    <div
      className="flex items-center justify-between px-4 h-12 border-b border-[#111822] flex-shrink-0"
      style={{ background: "#07090F" }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[#2A3545] hover:text-[#00FF85] transition-colors"
          style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px" }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </Link>
        <div className="w-px h-4 bg-[#1C2535]" />
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 border border-[#00FF85]/40 flex items-center justify-center"
            style={{ background: "rgba(0,255,133,0.06)" }}
          >
            <span className="text-[#00FF85] text-[9px] font-bold" style={{ fontFamily: "var(--font-jetbrains)" }}>T</span>
          </div>
          <span className="text-[#8892A4] text-xs" style={{ fontFamily: "var(--font-dm-sans)" }}>
            TrenchersAI <span className="text-[#2A3545]">/</span>{" "}
            <span className="text-[#D0D8E8]">Whale Tracker</span>
          </span>
        </div>
        <div className="w-px h-4 bg-[#1C2535] hidden sm:block" />
        <Link
          href="/app"
          className="hidden sm:flex items-center gap-1.5 text-[#2A3545] hover:text-[#E8EDF5] transition-colors text-[11px]"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          Terminal →
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "10px" }}>
          <span className="text-[#2A3545]">trades observed</span>
          <span className="text-[#00FF85] tabular-nums">{tradeCount}</span>
        </div>
        <div className="w-px h-4 bg-[#1C2535] hidden sm:block" />
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF85] opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF85]" />
          </span>
          <span className="text-[#00FF85] text-[10px] uppercase tracking-wider" style={{ fontFamily: "var(--font-jetbrains)" }}>
            Live
          </span>
        </div>
      </div>
    </div>
  );
}
