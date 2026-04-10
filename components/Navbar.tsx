"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Overview", href: "#overview" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Ranks", href: "#ranks" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-neutral-800/90 bg-black/85 backdrop-blur-md shadow-sm" : "bg-black"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="#hero"
          className="flex items-center gap-3 shrink-0"
          aria-label="Trenchers.ai home"
        >
          <Image
            src="/logo.avif"
            alt=""
            width={200}
            height={40}
            className="h-8 sm:h-9 w-auto object-contain object-left"
            priority
          />
          <span
            className="text-white font-semibold text-base sm:text-lg tracking-tight whitespace-nowrap"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Trenchers.ai
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[#5A6478] hover:text-[#E8EDF5] text-sm font-medium transition-colors duration-200"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <Link
            href="/app"
            className="text-sm font-semibold text-[#00FF85] border border-[#00FF85]/35 px-3 py-2 lg:px-4 rounded-sm hover:bg-[#00FF85]/10 transition-colors whitespace-nowrap"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Open app
          </Link>
          <Link
            href="#waitlist"
            className="btn-primary text-sm px-5 py-2.5"
            style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
          >
            Get Early Access
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-[#E8EDF5] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#E8EDF5] transition-all duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#E8EDF5] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[22rem] border-b border-[#1C2535]" : "max-h-0"
        } bg-black/95 backdrop-blur-md`}
      >
        <ul className="px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block text-[#5A6478] hover:text-[#E8EDF5] text-sm font-medium transition-colors py-1"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/app"
              className="block text-[#00FF85] font-semibold text-sm py-1"
              onClick={() => setOpen(false)}
            >
              Open app →
            </Link>
          </li>
          <li className="pt-2">
            <Link
              href="#waitlist"
              className="btn-primary w-full text-center text-sm"
              onClick={() => setOpen(false)}
            >
              Get Early Access
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
