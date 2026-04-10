"use client";
import { useState } from "react";
import ToolNav from "@/components/tool-shell/ToolNav";
import { useWalletSimulator } from "@/components/whale-tracker/useWalletSimulator";
import WalletList from "@/components/whale-tracker/WalletList";
import TradeFeed from "@/components/whale-tracker/TradeFeed";

export default function TrackerPage() {
  const { wallets, trades, toggleTrack, copyTrade } = useWalletSimulator();
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [filterTracked, setFilterTracked] = useState(false);

  const handleSelectWallet = (id: string) =>
    setSelectedWalletId((prev) => (prev === id ? null : id));

  const buys = trades.filter((t) => t.type === "buy").length;
  const sells = trades.filter((t) => t.type === "sell").length;

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: "#07090F" }}
    >
      <ToolNav
        rightSlot={
          <div className="hidden sm:flex items-center gap-4">
            {[
              { label: "Wallets", value: String(wallets.length) },
              { label: "Buys", value: String(buys), color: "#00FF85" },
              { label: "Sells", value: String(sells), color: "#FF3B3B" },
              { label: "Live Trades", value: String(trades.length) },
            ].map((s) => (
              <div key={s.label} className="text-right">
                <p
                  className="text-[8px] uppercase tracking-wider text-[#2A3545]"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {s.label}
                </p>
                <p
                  className="text-[11px] font-semibold tabular-nums"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: s.color ?? "#E8EDF5",
                  }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        }
      />

      <div
        className="flex items-center gap-3 px-4 py-2 border-b border-[#111822] flex-shrink-0"
        style={{ background: "#080C14" }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.2em] text-[#00FF85]"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        ></span>
        <span className="text-[#1C2535]">·</span>
        <span
          className="text-[10px] text-[#2A3545]"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          Track whale wallets · Copy their trades · Read their behavior
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF85] opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF85]" />
          </span>
          <span
            className="text-[9px] text-[#00FF85] uppercase tracking-wider"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            Live
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          className="hidden sm:flex flex-col flex-shrink-0"
          style={{ width: "300px" }}
        >
          <WalletList
            wallets={wallets}
            selectedId={selectedWalletId}
            onSelect={handleSelectWallet}
            onToggleTrack={toggleTrack}
            filterTracked={filterTracked}
            onToggleFilter={() => setFilterTracked((v) => !v)}
          />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <TradeFeed
            trades={trades}
            selectedWalletId={selectedWalletId}
            onCopy={copyTrade}
          />
        </div>
      </div>

      <div
        className="sm:hidden flex border-t border-[#111822] overflow-x-auto"
        style={{ background: "#07090F" }}
      >
        <button
          onClick={() => setSelectedWalletId(null)}
          className="flex-shrink-0 px-4 py-2.5 text-[9px] uppercase tracking-widest border-b-2 transition-colors"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: !selectedWalletId ? "#00FF85" : "#2A3545",
            borderBottomColor: !selectedWalletId ? "#00FF85" : "transparent",
          }}
        >
          All
        </button>
        {wallets
          .filter((w) => w.tracked)
          .map((w) => (
            <button
              key={w.id}
              onClick={() => handleSelectWallet(w.id)}
              className="flex-shrink-0 px-4 py-2.5 text-[9px] uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: selectedWalletId === w.id ? "#00FF85" : "#2A3545",
                borderBottomColor:
                  selectedWalletId === w.id ? "#00FF85" : "transparent",
              }}
            >
              {w.label}
            </button>
          ))}
      </div>
    </div>
  );
}
