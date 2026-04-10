const RANKS = [
  {
    rank: "Bronze",
    desc: "Start here. Every trade earns Gold at base rate.",
    multiplier: "1x",
    color: "#CD7F32",
    active: false,
  },
  {
    rank: "Silver",
    desc: "Hit volume milestones. Earnings multiplier grows.",
    multiplier: "1.5x",
    color: "#C0C0C0",
    active: false,
  },
  {
    rank: "Gold",
    desc: "Consistent volume. Bigger rewards on every swap.",
    multiplier: "2x",
    color: "#FFB800",
    active: true,
  },
  {
    rank: "Platinum",
    desc: "Elite trader status. Double your Gold on every swap.",
    multiplier: "2.5x",
    color: "#00D4FF",
    active: false,
  },
  {
    rank: "Diamond",
    desc: "Triple your Gold. Priority features unlocked.",
    multiplier: "3x",
    color: "#B9F2FF",
    active: false,
  },
  {
    rank: "Titan",
    desc: "Maximum multiplier. Top referral revenue share. Priority support.",
    multiplier: "4x",
    color: "#00FF85",
    active: false,
  },
];

export default function RanksSection() {
  return (
    <section
      id="ranks"
      className="py-24 sm:py-32 bg-[#0C1018] border-y border-[#1C2535]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 reveal">
          <p
            className="text-[#00FF85] text-xs uppercase tracking-[0.2em] mb-3"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            // Rewards System
          </p>
          <h2
            className="text-[#E8EDF5] leading-tight mb-3"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(36px, 5vw, 60px)",
            }}
          >
            Climb the ranks.{" "}
            <span className="text-[#FFB800]">Earn more every trade.</span>
          </h2>
          <p
            className="text-[#5A6478] text-sm max-w-lg"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Every swap earns you Gold. Higher rank = bigger multiplier on
            everything you earn. Plus 5-tier referral commissions on every
            trade your network makes.
          </p>
        </div>

        {/* Ranks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {RANKS.map((r, i) => (
            <div
              key={i}
              className={`reveal relative p-5 border transition-all duration-200 ${
                r.active
                  ? "border-[#FFB800]/40 bg-[#FFB800]/05"
                  : "border-[#1C2535] bg-[#060810] hover:border-[#2A3545]"
              }`}
              style={r.active ? { backgroundColor: "rgba(255,184,0,0.04)" } : {}}
            >
              {r.active && (
                <span
                  className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-0.5"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: "#FFB800",
                    border: "1px solid rgba(255,184,0,0.3)",
                    backgroundColor: "rgba(255,184,0,0.08)",
                  }}
                >
                  Popular
                </span>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-2 h-8 rounded-sm"
                  style={{ backgroundColor: r.color, opacity: 0.8 }}
                />
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      color: r.color,
                    }}
                  >
                    {r.rank}
                  </p>
                  <p
                    className="text-[#00FF85] text-xs"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {r.multiplier} Gold
                  </p>
                </div>
              </div>

              <p
                className="text-[#5A6478] text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Referral note */}
        <div className="mt-8 p-5 border border-[#1C2535] bg-[#060810] reveal">
          <div className="flex items-start gap-3">
            <span className="text-[#00FF85] text-lg mt-0.5">↗</span>
            <div>
              <p
                className="text-[#E8EDF5] font-semibold text-sm mb-1"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                5-Tier Referral Program
              </p>
              <p
                className="text-[#5A6478] text-sm"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Earn commissions on every trade your network makes — across 5
                tiers. The bigger your network, the more passive income you
                stack.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
