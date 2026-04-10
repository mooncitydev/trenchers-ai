import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1C2535] bg-[#060810] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="#hero"
              className="inline-flex items-center gap-3 mb-3"
              aria-label="Trenchers.ai home"
            >
              <Image
                src="/logo.avif"
                alt=""
                width={200}
                height={40}
                className="h-7 w-auto object-contain object-left"
              />
              <span
                className="text-white font-semibold text-sm tracking-tight whitespace-nowrap"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Trenchers.ai
              </span>
            </Link>
            <p
              className="text-[#5A6478] text-xs leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              The terminal that never sleeps.
              <br />
              Built for Solana degens.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-[#2A3545] text-xs uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "App", href: "/app" },
                { label: "Overview", href: "#overview" },
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Ranks", href: "#ranks" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[#5A6478] hover:text-[#E8EDF5] text-sm transition-colors"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <p
              className="text-[#2A3545] text-xs uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Integrations
            </p>
            <ul className="flex flex-col gap-3">
              {["Pump.fun", "Raydium", "Jupiter", "PumpSwap", "Jito"].map(
                (p) => (
                  <li key={p}>
                    <span
                      className="text-[#5A6478] text-sm"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {p}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p
              className="text-[#2A3545] text-xs uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Legal
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Contact", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[#5A6478] hover:text-[#E8EDF5] text-sm transition-colors"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#1C2535] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-[#2A3545] text-xs"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            © 2025 TrenchersAI — All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#00FF85] animate-pulse-dot"
            />
            <span
              className="text-[#5A6478] text-xs"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
