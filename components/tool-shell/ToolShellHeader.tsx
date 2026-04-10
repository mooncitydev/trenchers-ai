"use client";
import Link from "next/link";

export type ToolId = "terminal" | "whale" | "portfolio" | "sniper" | "token";

const TOOLS: { href: string; id: ToolId; label: string; short: string }[] = [
  { href: "/app", id: "terminal", label: "Terminal", short: "Term" },
  { href: "/app/tracker", id: "whale", label: "Tracker", short: "Track" },
  {
    href: "/app/portfolio",
    id: "portfolio",
    label: "Portfolio",
    short: "Port",
  },
  { href: "/app/sniper", id: "sniper", label: "Sniper", short: "Snipe" },
];

interface Props {
  active: ToolId | null;
  title?: string;
  subtitle?: string;
}

export default function ToolShellHeader({ active, title, subtitle }: Props) {
  return (
    <header className="flex flex-col border-b border-trench-line-subtle flex-shrink-0 bg-trench-bg/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-3 sm:px-5 h-12 sm:h-[52px] gap-3">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-trench-dim hover:text-trench-label transition-colors shrink-0 rounded-md py-1 -ml-1 px-1"
            style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
              className="opacity-70"
            >
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">Marketing</span>
          </Link>

          <div className="hidden sm:block w-px h-5 bg-trench-line shrink-0" />

          <div className="flex items-center gap-2 min-w-0">
            <div
              className="hidden sm:flex h-8 w-8 rounded-lg items-center justify-center shrink-0 border border-trench-line bg-trench-panel shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              aria-hidden
            >
              <span
                className="text-[11px] font-bold text-trench-accent"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                T
              </span>
            </div>
            <nav
              className="flex items-center gap-1 min-w-0 overflow-x-auto scrollbar-none py-0.5"
              aria-label="App sections"
            >
              {TOOLS.map((t) => {
                const isOn = active != null && active === t.id;
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] font-medium whitespace-nowrap transition-all border ${
                      isOn
                        ? "bg-trench-accent-soft text-trench-accent border-trench-accent/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        : "text-trench-label border-transparent hover:text-[#E8EDF5] hover:bg-trench-raised"
                    }`}
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    <span className="sm:hidden">{t.short}</span>
                    <span className="hidden sm:inline">{t.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="text-right min-w-0 pl-2 border-l border-trench-line-subtle sm:border-0 sm:pl-0">
          <p
            className="text-[#E8EDF5] text-xs sm:text-sm font-medium truncate tracking-tight"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {title ?? "TrenchersAI"}
          </p>
          {subtitle && (
            <p
              className="text-[10px] text-trench-dim truncate mt-0.5"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
