"use client";

import { motion } from "framer-motion";

/** Aligns with Design-First assessment: speed, density, trust — honest prototype labeling. */
const PILLARS = [
  { k: "speed", label: "Speed", hint: "Execution-first interactions" },
  { k: "density", label: "Density", hint: "Scannable tables, minimal chrome" },
  { k: "trust", label: "Trust", hint: "Clear labels · no fake custody claims" },
] as const;

export default function AppTrustStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 sm:px-5 py-2 border-b border-trench-line-subtle bg-trench-panel/60 text-[10px] sm:text-[11px]"
      role="status"
      aria-label="Product UX pillars and build status"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-trench-dim uppercase tracking-[0.14em] shrink-0" style={{ fontFamily: "var(--font-jetbrains)" }}>
          Trader UX
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {PILLARS.map((p, i) => (
            <span key={p.k} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-trench-line w-px h-3 hidden sm:inline" aria-hidden />}
              <abbr title={p.hint} className="cursor-help no-underline">
                <span className="text-trench-accent font-semibold" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  {p.label}
                </span>
              </abbr>
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 text-trench-label" style={{ fontFamily: "var(--font-jetbrains)" }}>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400/90" aria-hidden />
          Solana
        </span>
        <span className="text-trench-dim hidden sm:inline">·</span>
        <span className="text-trench-dim sm:text-trench-label leading-snug">
          <span className="sm:hidden">Simulated data · prod-shaped UI</span>
          <span className="hidden sm:inline">Prototype UI · data simulated · architecture production-shaped</span>
        </span>
      </div>
    </motion.div>
  );
}
