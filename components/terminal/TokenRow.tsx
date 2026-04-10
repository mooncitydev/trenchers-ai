"use client";
import { memo } from "react";
import { useRouter } from "next/navigation";
import TokenAvatar from "@/components/TokenAvatar";
import { Token, fmtPrice, fmtPct, fmtVolume, fmtAge } from "./useTokenSimulator";

interface Props {
  token: Token;
  onFavorite: (id: string) => void;
  rank: number;
}

function TokenRowInner({ token, onFavorite, rank }: Props) {
  const router = useRouter();
  const isUp24   = token.change24h >= 0;
  const isUp1h   = token.change1h  >= 0;

  const flashBg =
    token.flash === "up" ? "rgba(52, 211, 153, 0.06)" :
    token.flash === "down" ? "rgba(248, 113, 113, 0.06)" :
    "transparent";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/app/token/${encodeURIComponent(token.id)}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/app/token/${encodeURIComponent(token.id)}`);
        }
      }}
      className="grid items-center px-4 h-[52px] border-b border-trench-line-subtle transition-colors duration-100 hover:bg-trench-raised-hover group cursor-pointer select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-500/40"
      style={{
        gridTemplateColumns: "28px 1fr 110px 80px 80px 90px 90px 72px 80px 56px",
        backgroundColor: flashBg,
        transition: "background-color 0.25s ease",
      }}
    >
      {/* Rank */}
      <span className="text-[10px] text-trench-dim tabular-nums" style={{ fontFamily: "var(--font-jetbrains)" }}>
        {rank}
      </span>

      {/* Token identity */}
      <div className="flex items-center gap-2 min-w-0">
        <TokenAvatar
          imageIndex={token.imageIndex}
          fallbackLetter={token.symbol}
          size="md"
          up={isUp24}
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[#E8EDF5] text-[12px] font-medium truncate" style={{ fontFamily: "var(--font-jetbrains)" }}>
              {token.name}
            </span>
            {token.safe && (
              <span
                className="text-[8px] px-1.5 py-0.5 rounded border border-emerald-500/25 text-emerald-400 flex-shrink-0 font-semibold"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                SAFE
              </span>
            )}
            {token.trending && (
              <span
                className="text-[8px] px-1.5 py-0.5 rounded border border-amber-500/25 text-amber-400 flex-shrink-0 font-semibold"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                HOT
              </span>
            )}
          </div>
          <span className="text-[9px] text-trench-dim" style={{ fontFamily: "var(--font-jetbrains)" }}>
            {fmtAge(token.ageMinutes)} · {token.txns.toLocaleString()} txns
          </span>
        </div>
      </div>

      {/* Price — flashes on change */}
      <span
        className="text-right text-[11px] tabular-nums transition-colors duration-300"
        style={{
          fontFamily: "var(--font-jetbrains)",
          color: token.flash === "up" ? "#34D399" : token.flash === "down" ? "#F87171" : "#9CA3AF",
        }}
      >
        {fmtPrice(token.price)}
      </span>

      {/* 1h % */}
      <span
        className="text-right text-[11px] font-semibold tabular-nums"
        style={{
          fontFamily: "var(--font-jetbrains)",
          color: isUp1h ? "#34D399" : "#F87171",
        }}
      >
        {fmtPct(token.change1h)}
      </span>

      {/* 24h % */}
      <span
        className="text-right text-[11px] font-semibold tabular-nums"
        style={{
          fontFamily: "var(--font-jetbrains)",
          color: isUp24 ? "#34D399" : "#F87171",
        }}
      >
        {fmtPct(token.change24h)}
      </span>

      {/* Volume */}
      <span className="text-right text-[10px] text-trench-label tabular-nums" style={{ fontFamily: "var(--font-jetbrains)" }}>
        {fmtVolume(token.volume24h)}
      </span>

      {/* MCap */}
      <span className="text-right text-[10px] text-trench-label tabular-nums" style={{ fontFamily: "var(--font-jetbrains)" }}>
        {fmtVolume(token.mcap)}
      </span>

      {/* Holders */}
      <span className="text-right text-[10px] text-trench-label tabular-nums" style={{ fontFamily: "var(--font-jetbrains)" }}>
        {token.holders.toLocaleString()}
      </span>

      {/* Favorite */}
      <div className="flex justify-center">
        <button
          onClick={(e) => { e.stopPropagation(); onFavorite(token.id); }}
          className="w-6 h-6 flex items-center justify-center transition-all duration-150 hover:scale-110"
          aria-label="Favorite"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={token.favorited ? "#FBBF24" : "none"}
            stroke={token.favorited ? "#FBBF24" : "#5C6678"} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>

      {/* Snipe button — reveal on hover */}
      <div className="flex justify-end pr-1">
        <button
          type="button"
          className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-150 rounded-md bg-trench-accent-soft text-trench-accent border border-trench-accent/25 hover:bg-emerald-500/15 active:scale-[0.98]"
          style={{ fontFamily: "var(--font-jetbrains)" }}
          onClick={(e) => e.stopPropagation()}
        >
          Snipe
        </button>
      </div>
    </div>
  );
}

// Custom comparison — only re-render if data we display actually changed
function areEqual(prev: Props, next: Props) {
  const p = prev.token;
  const n = next.token;
  return (
    p.price       === n.price       &&
    p.change1h    === n.change1h    &&
    p.change24h   === n.change24h   &&
    p.volume24h   === n.volume24h   &&
    p.txns        === n.txns        &&
    p.flash       === n.flash       &&
    p.favorited   === n.favorited   &&
    p.imageIndex  === n.imageIndex  &&
    prev.rank     === next.rank
  );
}

export const TokenRow = memo(TokenRowInner, areEqual);
