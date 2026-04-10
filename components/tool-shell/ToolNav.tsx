"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Terminal",  href: "/terminal"      },
  { label: "Tracker",   href: "/tracker"        },
  { label: "Portfolio", href: "/portfolio"      },
  { label: "Sniper",    href: "/sniper"         },
];

interface Props {
  rightSlot?: React.ReactNode;
}

export default function ToolNav({ rightSlot }: Props) {
  const pathname = usePathname();

  return (
    <div
      className="flex items-center justify-between px-4 h-11 border-b border-[#111822] flex-shrink-0"
      style={{ background: "#07090F" }}
    >
      {/* Left: home + tabs */}
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center gap-1.5 pr-4 mr-1 border-r border-[#1C2535] text-[#2A3545] hover:text-[#00FF85] transition-colors"
          style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px" }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </Link>
        <div className="flex items-center">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="px-4 h-11 flex items-center text-[11px] border-b-2 transition-all duration-150"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: active ? "#00FF85" : "#2A3545",
                  borderBottomColor: active ? "#00FF85" : "transparent",
                  background: active ? "rgba(0,255,133,0.03)" : "transparent",
                }}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right: slot + logo */}
      <div className="flex items-center gap-4">
        {rightSlot}
        <span
          className="text-[#2A3545] text-[11px] font-semibold hidden sm:block"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          TrenchersAI
        </span>
      </div>
    </div>
  );
}
