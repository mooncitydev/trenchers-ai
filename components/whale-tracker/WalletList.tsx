"use client";
import { WalletProfile } from "./useWalletSimulator";
import WalletCard from "./WalletCard";

interface Props {
  wallets: WalletProfile[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onToggleTrack: (id: string) => void;
  filterTracked: boolean;
  onToggleFilter: () => void;
}

export default function WalletList({ wallets, selectedId, onSelect, onToggleTrack, filterTracked, onToggleFilter }: Props) {
  const visible = filterTracked ? wallets.filter((w) => w.tracked) : wallets;

  return (
    <div className="flex flex-col border-r border-trench-line-subtle overflow-hidden bg-trench-bg w-[320px] min-w-[280px]">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 h-11 border-b border-trench-line-subtle flex-shrink-0 bg-trench-panel/90">
        <span className="text-[10px] uppercase tracking-[0.12em] text-trench-label font-medium" style={{ fontFamily: "var(--font-jetbrains)" }}>
          Wallets ({visible.length})
        </span>
        <button
          onClick={onToggleFilter}
          className="text-[9px] px-2 py-1 uppercase tracking-wider transition-all"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: filterTracked ? "#00FF85" : "#5C6678",
            border: `1px solid ${filterTracked ? "rgba(0,255,133,0.35)" : "#1A2434"}`,
            background: filterTracked ? "rgba(0,255,133,0.08)" : "transparent",
          }}
        >
          Tracked Only
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-stable">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-44 gap-2 px-4 text-center">
            <span className="text-trench-dim text-xl" aria-hidden>
              ∅
            </span>
            <p className="text-trench-dim text-xs" style={{ fontFamily: "var(--font-jetbrains)" }}>
              No wallets match this filter
            </p>
          </div>
        ) : (
          visible.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              selected={selectedId === wallet.id}
              onSelect={onSelect}
              onToggleTrack={onToggleTrack}
            />
          ))
        )}
      </div>

      {/* Add wallet input */}
      <div className="px-3 py-3 border-t border-trench-line-subtle flex-shrink-0 bg-trench-panel/90">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste wallet address…"
            className="flex-1 px-3 py-2 rounded-md bg-trench-raised border border-trench-line text-trench-label text-[11px] outline-none focus:border-trench-accent/35 focus:ring-1 focus:ring-trench-accent/15 transition-all placeholder:text-trench-dim"
            style={{ fontFamily: "var(--font-jetbrains)" }}
            readOnly
          />
          <button
            type="button"
            className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider flex-shrink-0 rounded-md bg-trench-accent-soft text-trench-accent border border-trench-accent/25 hover:bg-emerald-500/15 transition-colors"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
