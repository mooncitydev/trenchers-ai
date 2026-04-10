"use client";
import { useState } from "react";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="relative py-24 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,255,133,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex justify-center mb-5 reveal">
          <span className="tag">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85] animate-pulse-dot" />
            The Trenches Are Calling
          </span>
        </div>

        <h2
          className="text-[#E8EDF5] leading-tight mb-4 reveal"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(40px, 8vw, 80px)",
          }}
        >
          Stop watching whales eat.
          <br />
          <span className="text-[#00FF85]">Start trading with an edge.</span>
        </h2>

        <p
          className="text-[#5A6478] text-base mb-10 max-w-md mx-auto reveal"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Thousands of traders are already sniping faster and copying smarter
          with Trenchers. Join the waitlist for early access.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto reveal"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#0C1018] border border-[#1C2535] text-[#E8EDF5] text-sm placeholder-[#2A3545] outline-none focus:border-[#00FF85]/40 transition-colors"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary whitespace-nowrap"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="31.4"
                      strokeDashoffset="10"
                    />
                  </svg>
                  Joining...
                </span>
              ) : (
                "Get Early Access"
              )}
            </button>
          </form>
        ) : (
          <div
            className="reveal flex flex-col items-center gap-3 py-8 px-6 border border-[#00FF85]/20 bg-[#00FF85]/05 max-w-md mx-auto"
            style={{ backgroundColor: "rgba(0,255,133,0.04)" }}
          >
            <span className="text-[#00FF85] text-2xl">✓</span>
            <p
              className="text-[#E8EDF5] font-semibold"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              You're on the list.
            </p>
            <p
              className="text-[#5A6478] text-sm text-center"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              We'll hit you when early access opens. Keep your eyes on your
              inbox.
            </p>
          </div>
        )}

        <p
          className="mt-4 text-[#2A3545] text-xs reveal"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          No spam. No BS. Just early access.
        </p>
      </div>
    </section>
  );
}
