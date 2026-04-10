"use client";
import { useState } from "react";
import TokenAvatar from "@/components/TokenAvatar";
import { stableImageIndex } from "@/lib/tokenMemeImages";

const LAUNCHES = [
  { name: "MOONCAT", mint: "a1", age: "12s", mcap: "$48K", liq: "$12K", vol: "$89K", risk: "7/10" },
  { name: "RUGPROOF", mint: "b2", age: "45s", mcap: "$120K", liq: "$34K", vol: "$210K", risk: "4/10" },
  { name: "SOLANA", mint: "c3", age: "2m", mcap: "$890K", liq: "$210K", vol: "$1.2M", risk: "3/10" },
  { name: "DEGEN", mint: "d4", age: "8m", mcap: "$2.1M", liq: "$400K", vol: "$3.4M", risk: "5/10" },
];

type Pool = "all" | "pump" | "raydium";

/** Aligned with caesarx /sniper — new-pair stream + snipe CTA; mock ticks. */
export default function SniperPrototype() {
  const [pool, setPool] = useState<Pool>("all");

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-trench-bg" style={{ fontFamily: "var(--font-dm-sans)" }}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 border-b border-trench-line-subtle bg-trench-panel/90 overflow-x-auto flex-shrink-0">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.14em] text-trench-accent font-medium" style={{ fontFamily: "var(--font-jetbrains)" }}>
            New pairs
          </p>
          <p className="text-xs text-trench-label mt-0.5" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Launch stream — execution wiring comes later
          </p>
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          {(
            [
              { id: "all" as const, label: "All pools" },
              { id: "pump" as const, label: "Pump.fun" },
              { id: "raydium" as const, label: "Raydium" },
            ]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setPool(t.id)}
              className={`px-3 py-2 text-[10px] font-medium uppercase tracking-wider rounded-md whitespace-nowrap border transition-all ${
                pool === t.id
                  ? "bg-trench-accent-soft text-trench-accent border-trench-accent/30"
                  : "text-trench-label border-trench-line bg-trench-raised/60 hover:border-trench-line hover:text-[#E8EDF5]"
              }`}
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-stable">
        <div
          className="hidden sm:grid grid-cols-[1fr_80px_80px_80px_70px_90px] gap-2 px-4 py-2.5 border-b border-trench-line-subtle text-[9px] uppercase tracking-[0.1em] text-trench-dim bg-trench-bg"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          <span>Token</span>
          <span className="text-right">Age</span>
          <span className="text-right">Mcap</span>
          <span className="text-right">Liq</span>
          <span className="text-right">Risk</span>
          <span className="text-right">Action</span>
        </div>
        {LAUNCHES.map((row) => {
          const idx = stableImageIndex(row.name);
          return (
            <div
              key={row.mint}
              className="grid sm:grid-cols-[1fr_80px_80px_80px_70px_90px] gap-2 px-4 py-3.5 border-b border-trench-line-subtle items-center hover:bg-trench-raised-hover transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <TokenAvatar imageIndex={idx} fallbackLetter={row.name} size="md" up />
                <div className="min-w-0">
                  <p className="text-[#E8EDF5] font-semibold truncate" style={{ fontFamily: "var(--font-jetbrains)" }}>
                    ${row.name}
                  </p>
                  <p className="text-[9px] text-trench-dim sm:hidden" style={{ fontFamily: "var(--font-jetbrains)" }}>
                    {row.age} · {row.mcap}
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-trench-label text-right hidden sm:block" style={{ fontFamily: "var(--font-jetbrains)" }}>
                {row.age}
              </span>
              <span className="text-[10px] text-[#E8EDF5] text-right hidden sm:block tabular-nums" style={{ fontFamily: "var(--font-jetbrains)" }}>
                {row.mcap}
              </span>
              <span className="text-[10px] text-trench-dim text-right hidden sm:block" style={{ fontFamily: "var(--font-jetbrains)" }}>
                {row.liq}
              </span>
              <span className="text-[10px] text-amber-400 text-right hidden sm:block" style={{ fontFamily: "var(--font-jetbrains)" }}>
                {row.risk}
              </span>
              <div className="flex justify-end mt-2 sm:mt-0">
                <button
                  type="button"
                  className="px-3 py-2 text-[9px] font-bold uppercase tracking-wider rounded-md bg-trench-accent-soft text-trench-accent border border-trench-accent/25 hover:bg-emerald-500/15 transition-colors"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  Snipe
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="px-4 py-2.5 text-[10px] text-trench-dim border-t border-trench-line-subtle bg-trench-panel/80" style={{ fontFamily: "var(--font-jetbrains)" }}>
        Prototype: connect launch detectors + execution in production.
      </p>
    </div>
  );
}
