const PLATFORMS = [
  "Pump.fun",
  "Raydium",
  "Jupiter",
  "PumpSwap",
  "Jito",
  "Solana",
  "Pump.fun",
  "Raydium",
  "Jupiter",
  "PumpSwap",
  "Jito",
  "Solana",
];

const STATS_TICKER = [
  { label: "Avg Execution", value: "143ms" },
  { label: "Tokens Monitored", value: "10M+" },
  { label: "Wallets Tracked", value: "500K+" },
  { label: "Safety Filters", value: "15+" },
  { label: "Uptime", value: "99.97%" },
  { label: "Avg Execution", value: "143ms" },
  { label: "Tokens Monitored", value: "10M+" },
  { label: "Wallets Tracked", value: "500K+" },
  { label: "Safety Filters", value: "15+" },
  { label: "Uptime", value: "99.97%" },
];

export default function Marquee() {
  return (
    <div className="border-y border-[#1C2535] bg-[#0C1018] py-0 overflow-hidden">
      {/* Top row — platforms */}
      <div className="flex border-b border-[#1C2535] py-3 overflow-hidden">
        <div className="flex animate-ticker-left whitespace-nowrap gap-0">
          {[...PLATFORMS, ...PLATFORMS].map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-6 text-[#5A6478] text-xs uppercase tracking-[0.15em]"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              <span className="w-1 h-1 rounded-full bg-[#00FF85]/50" />
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom row — live stats */}
      <div className="flex py-3 overflow-hidden">
        <div className="flex animate-ticker-right whitespace-nowrap gap-0">
          {[...STATS_TICKER, ...STATS_TICKER].map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-6 text-xs"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              <span className="text-[#5A6478] uppercase tracking-wider">
                {s.label}
              </span>
              <span className="text-[#00FF85] font-semibold">{s.value}</span>
              <span className="text-[#1C2535] ml-2">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
