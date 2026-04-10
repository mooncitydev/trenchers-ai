import { Fragment } from "react";
import Link from "next/link";

const STEPS = [
  {
    num: "01",
    title: "Connect Your Wallet",
    body: "Create a new embedded wallet or import your existing Solana wallet. AES-256 encrypted. Your keys never leave your device.",
  },
  {
    num: "02",
    title: "Set Your Strategy",
    body: "Configure the AI Sniper with your filters, pick whale wallets to copy, set advanced orders — all in one dashboard.",
  },
  {
    num: "03",
    title: "Let It Run 24/7",
    body: "The terminal watches the chain while you sleep. Every snipe, copy trade, and alert fires automatically — you just collect.",
  },
];

function StepNumber({ num }: { num: string }) {
  return (
    <div
      className="flex-shrink-0 w-10 h-10 border border-[#00FF85]/30 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,255,133,0.05)" }}
    >
      <span
        className="text-[#00FF85] text-sm font-bold"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        {num}
      </span>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16 reveal">
          <p
            className="text-[#00FF85] text-xs uppercase tracking-[0.2em] mb-3"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            How It Works
          </p>
          <h2
            className="text-[#E8EDF5] leading-tight"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(36px, 5vw, 60px)",
            }}
          >
            Up and trading in{" "}
            <span className="text-[#00FF85]">three steps.</span>
          </h2>
        </div>

        <div className="hidden lg:block">
          <div className="flex items-center w-full gap-4 mb-6">
            {STEPS.map((step, i) => (
              <Fragment key={step.num}>
                <StepNumber num={step.num} />
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 h-px min-w-8 bg-gradient-to-r from-[#00FF85]/25 via-[#00FF85]/45 to-[#00FF85]/25"
                    aria-hidden
                  />
                )}
              </Fragment>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="reveal flex flex-col gap-4"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <h3
                  className="text-[#E8EDF5] font-semibold text-lg"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[#5A6478] text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden space-y-10">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="reveal relative flex flex-col gap-4"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <StepNumber num={step.num} />
                <div className="flex-1 h-px bg-[#1C2535]" aria-hidden />
              </div>

              <h3
                className="text-[#E8EDF5] font-semibold text-lg"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {step.title}
              </h3>

              <p
                className="text-[#5A6478] text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 reveal">
          <Link href="#waitlist" className="btn-primary inline-flex">
            Start Trading Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
