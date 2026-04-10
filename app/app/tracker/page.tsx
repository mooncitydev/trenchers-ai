"use client";
import { useState } from "react";
import { useWalletSimulator } from "@/components/whale-tracker/useWalletSimulator";
import WalletList from "@/components/whale-tracker/WalletList";
import TradeFeed from "@/components/whale-tracker/TradeFeed";

export default function AppTrackerPage() {
  const { wallets, trades, toggleTrack, copyTrade } = useWalletSimulator();
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [filterTracked, setFilterTracked] = useState(false);

  const handleSelectWallet = (id: string) => {
    setSelectedWalletId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-trench-line-subtle flex-shrink-0 bg-trench-panel/90">
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.16em] text-trench-accent font-medium mb-1"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            Wallet intelligence
          </p>
          <p
            className="text-xs text-trench-label"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Track addresses, assess risk, mirror trades — simulated feed
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-5">
          {[
            { label: "Wallets", value: String(wallets.length) },
            {
              label: "Tracked",
              value: String(wallets.filter((w) => w.tracked).length),
            },
            { label: "Trades", value: String(trades.length) },
          ].map((s) => (
            <div key={s.label} className="text-right min-w-[4rem]">
              <p
                className="text-[9px] text-trench-dim uppercase tracking-wider mb-0.5"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {s.label}
              </p>
              <p
                className="text-sm text-trench-accent font-semibold tabular-nums"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div
          className="hidden sm:flex flex-col flex-shrink-0"
          style={{ width: "320px" }}
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

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <TradeFeed
            trades={trades}
            selectedWalletId={selectedWalletId}
            onCopy={copyTrade}
          />
        </div>
      </div>

      <div className="sm:hidden flex border-t border-trench-line-subtle overflow-x-auto flex-shrink-0 bg-trench-bg">
        <button
          type="button"
          onClick={() => setSelectedWalletId(null)}
          className="flex-shrink-0 px-4 py-2 text-[9px] uppercase tracking-widest border-b-2 transition-colors"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: !selectedWalletId ? "#00FF85" : "#5C6678",
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
              type="button"
              onClick={() => handleSelectWallet(w.id)}
              className="flex-shrink-0 px-4 py-2 text-[9px] uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: selectedWalletId === w.id ? "#00FF85" : "#5C6678",
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
