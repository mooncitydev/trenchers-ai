import Link from "next/link";

const FEATURES = [
  {
    tag: "Auto-Buy · New Token Detection",
    headline: "Snipe new tokens before the chart even loads.",
    body: "Automatically detect and buy new Pump.fun launches and Raydium pools the instant they go live. 15+ safety filters, auto take-profit, and stop-loss — all in milliseconds.",
    stat: { value: "143ms", label: "Avg snipe time" },
    bullets: [
      "Mint revoked & LP burn checks",
      "Top holder concentration analysis",
      "Honeypot simulation before buy",
      "Auto TP + SL in the same tx",
    ],
    terminal: [
      { color: "#5A6478", text: "$ trenchers snipe --filter safe" },
      { color: "#00FF85", text: "✓ Watching Pump.fun + Raydium..." },
      { color: "#00D4FF", text: "→ $PEPE2 detected — LP: $48K" },
      { color: "#00FF85", text: "✓ 15 filters passed in 12ms" },
      { color: "#E8EDF5", text: "⚡ Bought 0.5 SOL @ $0.0000043" },
    ],
    flip: false,
  },
  {
    tag: "MEV Protection · Fast Execution",
    headline: "Every trade is private. Every fill is instant.",
    body: "Your swaps race through three paths at once — Jito bundles, staked RPC, and direct submit. Sandwich bots can't see you. First confirmation wins.",
    stat: { value: "3x", label: "Routing paths" },
    bullets: [
      "Jito bundle submission",
      "Staked RPC for priority access",
      "Sandwich bot invisibility",
      "Sub-200ms confirmation guarantee",
    ],
    terminal: [
      { color: "#5A6478", text: "$ trenchers swap --mev-protect" },
      { color: "#00D4FF", text: "→ Routing: Jito + staked RPC" },
      { color: "#00FF85", text: "✓ Bundle submitted, hidden from mempool" },
      { color: "#E8EDF5", text: "⚡ Confirmed: slot 287,441,302" },
      { color: "#00FF85", text: "✓ 0 sandwich attempts blocked" },
    ],
    flip: true,
  },
  {
    tag: "Wallet Tracking · Mirror Trades",
    headline: "Copy the best wallets. Mirror every move.",
    body: "Track any wallet in real-time. When they buy, you buy. When they sell, you sell. Your amount, their timing. Works across Jupiter, Raydium, Pump.fun, and PumpSwap.",
    stat: { value: "500K+", label: "Wallets tracked" },
    bullets: [
      "Real-time on-chain wallet monitoring",
      "Configurable copy amount per wallet",
      "Works across all major Solana DEXes",
      "Instant alerts on whale movement",
    ],
    terminal: [
      { color: "#5A6478", text: "$ trenchers copy --wallet 7xKp...3mNq" },
      { color: "#00FF85", text: "✓ Tracking whale: 7xKp...3mNq" },
      { color: "#00D4FF", text: "→ Whale bought $WIF — 12 SOL" },
      { color: "#E8EDF5", text: "⚡ Mirroring: 0.5 SOL of $WIF" },
      { color: "#00FF85", text: "✓ Copied in 97ms" },
    ],
    flip: false,
  },
];

function TerminalBlock({
  lines,
}: {
  lines: { color: string; text: string }[];
}) {
  return (
    <div
      className="bg-[#060810] border border-[#1C2535] p-5 rounded-sm"
      style={{ fontFamily: "var(--font-jetbrains)" }}
    >
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF6535]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FFB800]/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#00FF85]/50" />
      </div>
      {lines.map((l, i) => (
        <p
          key={i}
          className="text-xs leading-6"
          style={{ color: l.color }}
        >
          {l.text}
        </p>
      ))}
    </div>
  );
}

export default function OverviewSection() {
  return (
    <section id="overview" className="py-24 sm:py-32">
      {/* Section label */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <p
          className="text-[#00FF85] text-xs uppercase tracking-[0.2em] mb-3"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          // Core Features
        </p>
        <h2
          className="text-[#E8EDF5] leading-tight"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(36px, 5vw, 60px)",
          }}
        >
          Redefining how{" "}
          <span className="text-[#00FF85]">Solana</span> is traded.
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-20 sm:gap-32">
        {FEATURES.map((f, idx) => (
          <div
            key={idx}
            className={`reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
              f.flip ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Text side */}
            <div>
              <span className="tag mb-4 inline-block">{f.tag}</span>
              <h3
                className="text-[#E8EDF5] leading-tight mb-4"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(28px, 4vw, 48px)",
                }}
              >
                {f.headline}
              </h3>
              <p
                className="text-[#5A6478] leading-relaxed mb-6 text-sm sm:text-base"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {f.body}
              </p>

              <ul className="flex flex-col gap-2 mb-8">
                {f.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 text-sm text-[#8892A4]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    <span className="text-[#00FF85] text-xs">▸</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-6">
                <div className="stat-chip">
                  <span
                    className="text-[#00FF85] font-bold text-lg leading-none mb-0.5"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {f.stat.value}
                  </span>
                  <span
                    className="text-[#5A6478] text-xs uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {f.stat.label}
                  </span>
                </div>
                <Link
                  href="#waitlist"
                  className="text-[#00FF85] text-sm font-medium hover:underline underline-offset-4 transition-all"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Try it free →
                </Link>
              </div>
            </div>

            {/* Terminal side */}
            <div className="relative">
              <div className="absolute -inset-4 bg-[#00FF85]/3 blur-2xl rounded-full pointer-events-none" />
              <TerminalBlock lines={f.terminal} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
