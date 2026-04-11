"use client";
import { memo } from "react";
import { useRouter } from "next/navigation";
import TokenAvatar from "@/components/TokenAvatar";
import {
  Token,
  fmtPrice,
  fmtPct,
  fmtVolume,
  fmtAge,
} from "./useTokenSimulator";
import { TERMINAL_TABLE_GRID } from "./terminalTableGrid";

interface Props {
  token: Token;
  onFavorite: (id: string) => void;
  rank: number;
}

function TokenRowInner({ token, onFavorite, rank }: Props) {
  const router = useRouter();
  const isUp24 = token.change24h >= 0;
  const isUp1h = token.change1h >= 0;

  const flashBg =
    token.flash === "up"
      ? "rgba(52, 211, 153, 0.06)"
      : token.flash === "down"
        ? "rgba(248, 113, 113, 0.06)"
        : "transparent";

  const priceColor =
    token.flash === "up"
      ? "#34D399"
      : token.flash === "down"
        ? "#F87171"
        : "#9CA3AF";

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
      className="border-b border-trench-line-subtle transition-colors duration-100 hover:bg-trench-raised-hover group cursor-pointer select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-500/40"
      style={{
        backgroundColor: flashBg,
        transition: "background-color 0.25s ease",
      }}
    >
      <div className="md:hidden px-3 sm:px-4 py-3 flex flex-col gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <span
            className="text-[10px] text-trench-dim tabular-nums w-5 shrink-0 pt-0.5"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            {rank}
          </span>
          <TokenAvatar
            imageIndex={token.imageIndex}
            fallbackLetter={token.symbol}
            size="md"
            up={isUp24}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <span
                className="text-[#E8EDF5] text-[12px] font-medium truncate min-w-0 basis-[min(100%,12rem)]"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {token.name}
              </span>
              {token.safe && (
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded border border-emerald-500/25 text-emerald-400 shrink-0 font-semibold"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  SAFE
                </span>
              )}
              {token.trending && (
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded border border-amber-500/25 text-amber-400 shrink-0 font-semibold"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  HOT
                </span>
              )}
            </div>
            <p
              className="text-[9px] text-trench-dim mt-0.5"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {fmtAge(token.ageMinutes)} · {token.txns.toLocaleString()} txns
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavorite(token.id);
              }}
              className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-trench-raised transition-colors -mr-1"
              aria-label="Favorite"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={token.favorited ? "#FBBF24" : "none"}
                stroke={token.favorited ? "#FBBF24" : "#5C6678"}
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
            <button
              type="button"
              className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-trench-accent-soft text-trench-accent border border-trench-accent/25 hover:bg-emerald-500/15 active:scale-[0.98]"
              style={{ fontFamily: "var(--font-jetbrains)" }}
              onClick={(e) => e.stopPropagation()}
            >
              Snipe
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pl-0 sm:pl-1">
          <div>
            <p
              className="text-[9px] uppercase tracking-wider text-trench-dim mb-0.5"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Price
            </p>
            <p
              className="text-[12px] tabular-nums font-medium transition-colors duration-300"
              style={{ fontFamily: "var(--font-jetbrains)", color: priceColor }}
            >
              {fmtPrice(token.price)}
            </p>
          </div>
          <div>
            <p
              className="text-[9px] uppercase tracking-wider text-trench-dim mb-0.5"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              24h
            </p>
            <p
              className="text-[12px] font-semibold tabular-nums"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: isUp24 ? "#34D399" : "#F87171",
              }}
            >
              {fmtPct(token.change24h)}
            </p>
          </div>
          <div>
            <p
              className="text-[9px] uppercase tracking-wider text-trench-dim mb-0.5"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              1h
            </p>
            <p
              className="text-[12px] font-semibold tabular-nums"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: isUp1h ? "#34D399" : "#F87171",
              }}
            >
              {fmtPct(token.change1h)}
            </p>
          </div>
          <div>
            <p
              className="text-[9px] uppercase tracking-wider text-trench-dim mb-0.5"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Volume
            </p>
            <p
              className="text-[12px] text-trench-label tabular-nums"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {fmtVolume(token.volume24h)}
            </p>
          </div>
        </div>

        <div
          className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-trench-dim border-t border-trench-line-subtle/80 pt-2.5"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          <span>
            MCap <span className="text-trench-label">{fmtVolume(token.mcap)}</span>
          </span>
          <span>
            Holders{" "}
            <span className="text-trench-label tabular-nums">
              {token.holders.toLocaleString()}
            </span>
          </span>
        </div>
      </div>

      <div
        className="hidden md:grid items-center px-4 h-[52px]"
        style={{ gridTemplateColumns: TERMINAL_TABLE_GRID }}
      >
        <span
          className="text-[10px] text-trench-dim tabular-nums"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {rank}
        </span>

        <div className="flex items-center gap-2 min-w-0 pr-1">
          <TokenAvatar
            imageIndex={token.imageIndex}
            fallbackLetter={token.symbol}
            size="md"
            up={isUp24}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="text-[#E8EDF5] text-[12px] font-medium truncate max-w-[min(100%,8rem)] lg:max-w-[min(100%,12rem)]"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
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
            <span
              className="text-[9px] text-trench-dim"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {fmtAge(token.ageMinutes)} · {token.txns.toLocaleString()} txns
            </span>
          </div>
        </div>

        <span
          className="text-right text-[11px] tabular-nums transition-colors duration-300"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: priceColor,
          }}
        >
          {fmtPrice(token.price)}
        </span>

        <span
          className="text-right text-[11px] font-semibold tabular-nums"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: isUp1h ? "#34D399" : "#F87171",
          }}
        >
          {fmtPct(token.change1h)}
        </span>

        <span
          className="text-right text-[11px] font-semibold tabular-nums"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: isUp24 ? "#34D399" : "#F87171",
          }}
        >
          {fmtPct(token.change24h)}
        </span>

        <span
          className="text-right text-[10px] text-trench-label tabular-nums"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {fmtVolume(token.volume24h)}
        </span>

        <span
          className="text-right text-[10px] text-trench-label tabular-nums"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {fmtVolume(token.mcap)}
        </span>

        <span
          className="text-right text-[10px] text-trench-label tabular-nums"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {token.holders.toLocaleString()}
        </span>

        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(token.id);
            }}
            className="w-6 h-6 flex items-center justify-center transition-all duration-150 hover:scale-110"
            aria-label="Favorite"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={token.favorited ? "#FBBF24" : "none"}
              stroke={token.favorited ? "#FBBF24" : "#5C6678"}
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        </div>

        <div className="flex justify-end pr-0.5">
          <button
            type="button"
            className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-150 rounded-md bg-trench-accent-soft text-trench-accent border border-trench-accent/25 hover:bg-emerald-500/15 active:scale-[0.98]"
            style={{ fontFamily: "var(--font-jetbrains)" }}
            onClick={(e) => e.stopPropagation()}
          >
            Snipe
          </button>
        </div>
      </div>
    </div>
  );
}
function areEqual(prev: Props, next: Props) {
  const p = prev.token;
  const n = next.token;
  return (
    p.price === n.price &&
    p.change1h === n.change1h &&
    p.change24h === n.change24h &&
    p.volume24h === n.volume24h &&
    p.txns === n.txns &&
    p.flash === n.flash &&
    p.favorited === n.favorited &&
    p.imageIndex === n.imageIndex &&
    prev.rank === next.rank
  );
}

export const TokenRow = memo(TokenRowInner, areEqual);
