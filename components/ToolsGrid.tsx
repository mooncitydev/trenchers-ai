import type { SVGProps } from "react";

/** One visual language: 24×24, 1.5px stroke, round caps */
function IconBase({
  children,
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={22}
      height={22}
      aria-hidden
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

function IconShield() {
  return (
    <IconBase>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </IconBase>
  );
}

function IconBars() {
  return (
    <IconBase>
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </IconBase>
  );
}

function IconBell() {
  return (
    <IconBase>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </IconBase>
  );
}

function IconWallet() {
  return (
    <IconBase>
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
      <path d="M16 12h.01" />
      <path d="M3 10h18" />
    </IconBase>
  );
}

function IconCrosshair() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </IconBase>
  );
}

function IconLock() {
  return (
    <IconBase>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </IconBase>
  );
}

const TOOLS = [
  {
    Icon: IconShield,
    title: "Rug Detection",
    description:
      "Security scores before you ape in. We check mint authority, LP lock, holder spread, and run honeypot checks so you’re not guessing.",
    accent: "#00FF85",
    metrics: ["99% accuracy", "10M+ signals"],
  },
  {
    Icon: IconBars,
    title: "Advanced Orders",
    description:
      "Limits, stops, trailing exits, and DCA — set once and let them run while you’re away from the chart.",
    accent: "#00D4FF",
    metrics: ["3× faster fills", "24/7 active"],
  },
  {
    Icon: IconBell,
    title: "Real-Time Alerts",
    description:
      "Price, wallet, and new-listing pings the moment conditions hit. No more refreshing tabs like it’s 2019.",
    accent: "#FFB800",
    metrics: ["500+ assets", "Sub-second push"],
  },
  {
    Icon: IconWallet,
    title: "Multi-Wallet",
    description:
      "Embedded or imported wallets, AES-256 encrypted. Switch profiles in one click; export keys whenever you want.",
    accent: "#00FF85",
    metrics: ["AES-256", "Instant switch"],
  },
  {
    Icon: IconCrosshair,
    title: "AI Sniper",
    description:
      "Define liquidity, dev hold, LP burn, and mint rules — the bot filters the feed and executes buys when your setup appears.",
    accent: "#00D4FF",
    metrics: ["One-click setup", "100+ strategies"],
  },
  {
    Icon: IconLock,
    title: "Self-Custody",
    description:
      "Keys stay in your browser. We store encrypted blobs only — we don’t hold keys, so we can’t move your funds. Period.",
    accent: "#00FF85",
    metrics: ["2FA ready", "Non-custodial"],
  },
] as const;

export default function ToolsGrid() {
  return (
    <section
      id="features"
      className="py-24 sm:py-32 bg-[#0C1018] border-y border-[#1C2535]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-14 reveal">
          <p
            className="text-[#00FF85] text-[11px] font-medium uppercase tracking-[0.18em] mb-3"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            Tools for the trenches
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-[#E8EDF5] leading-[1.05] max-w-3xl"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(36px, 5vw, 56px)",
                letterSpacing: "0.02em",
              }}
            >
              Everything you need.{" "}
              <span className="text-[#4A5568]">Nothing you don&apos;t.</span>
            </h2>
            <p
              className="text-[#6B7689] text-[15px] leading-relaxed max-w-[280px] shrink-0 border-l border-[#1C2535] pl-5"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Speed, safety, and edge in one terminal — without the toy features.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map((tool, i) => {
            const Icon = tool.Icon;
            return (
              <article
                key={tool.title}
                className="feature-card reveal group flex flex-col h-full"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded border transition-colors"
                  style={{
                    borderColor: `${tool.accent}33`,
                    backgroundColor: `${tool.accent}0d`,
                    color: tool.accent,
                  }}
                >
                  <Icon />
                </div>

                <h3
                  className="text-[#E8EDF5] font-semibold text-[17px] mb-2 tracking-tight"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {tool.title}
                </h3>

                <p
                  className="text-[#6B7689] text-[14px] leading-relaxed mb-6 flex-1"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {tool.description}
                </p>

                <div className="flex gap-2 flex-wrap mt-auto">
                  {tool.metrics.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] font-medium uppercase tracking-wide px-2.5 py-1 rounded-sm border"
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        color: tool.accent,
                        borderColor: `${tool.accent}30`,
                        backgroundColor: `${tool.accent}0a`,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
