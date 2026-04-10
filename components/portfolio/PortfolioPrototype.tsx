"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PortfolioNavigation, { type PortfolioMainTab } from "@/components/portfolio/PortfolioNavigation";
import PortfolioWalletTab from "@/components/portfolio/wallet/PortfolioWalletTab";
import TokenAvatar from "@/components/TokenAvatar";
import { stableImageIndex } from "@/lib/tokenMemeImages";

type SpotSubTab = "active-position" | "trade-history" | "top-100";
type SortKey = "pnl" | "bought" | "sold" | "remaining" | "symbol";
type DisplayCurrency = "USD" | "SOL";

const SOL_PRICE = 140;

const MOCK_WALLETS = [
  { publicKey: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", label: "Main", balance: 12.4 },
  { publicKey: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", label: "Vault", balance: 4.1 },
];

const PORTFOLIO_SUMMARY = {
  totalValue: 6020,
  unrealizedPnL: 381,
  realizedPnL: 1240,
  availableBalance: 890,
};

type PositionRow = {
  id: string;
  symbol: string;
  name: string;
  mint: string;
  bought: number;
  sold: number;
  remaining: number;
  pnlUsd: number;
};

const MOCK_POSITIONS: PositionRow[] = [
  { id: "1", symbol: "PEPE2", name: "Pepe 2.0", mint: "pepe2mint111", bought: 4200, sold: 800, remaining: 3400, pnlUsd: 412 },
  { id: "2", symbol: "WIF", name: "dogwifhat", mint: "wifmint222", bought: 2100, sold: 210, remaining: 1890, pnlUsd: -120 },
  { id: "3", symbol: "BOME", name: "Book of Meme", mint: "bomemint333", bought: 1200, sold: 310, remaining: 890, pnlUsd: 89 },
  { id: "4", symbol: "MOODENG", name: "Moo Deng", mint: "moodmint444", bought: 890, sold: 0, remaining: 890, pnlUsd: 240 },
  { id: "5", symbol: "GOAT", name: "Goat", mint: "goatmint555", bought: 5600, sold: 2000, remaining: 3600, pnlUsd: -45 },
  { id: "6", symbol: "FWOG", name: "Fwog", mint: "fwogmint666", bought: 300, sold: 300, remaining: 0, pnlUsd: 12 },
];

type TradeRow = {
  id: string;
  time: string;
  side: "buy" | "sell";
  symbol: string;
  mint: string;
  amount: string;
  valueUsd: number;
  pnlUsd: number | null;
};

const MOCK_TRADES: TradeRow[] = [
  { id: "t1", time: "2026-04-10T14:22:00", side: "buy", symbol: "PEPE2", mint: "pepe2mint111", amount: "1.2M", valueUsd: 240, pnlUsd: null },
  { id: "t2", time: "2026-04-10T12:01:00", side: "sell", symbol: "WIF", mint: "wifmint222", amount: "120", valueUsd: 890, pnlUsd: -12 },
  { id: "t3", time: "2026-04-09T09:30:00", side: "buy", symbol: "BOME", mint: "bomemint333", amount: "450K", valueUsd: 120, pnlUsd: null },
  { id: "t4", time: "2026-04-08T18:45:00", side: "sell", symbol: "GOAT", mint: "goatmint555", amount: "2.1K", valueUsd: 3400, pnlUsd: 210 },
];

function formatUsd(n: number) {
  if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

function formatSolFromUsd(usd: number) {
  const sol = usd / SOL_PRICE;
  if (sol >= 1e3) return `${(sol / 1e3).toFixed(2)}K`;
  return sol.toFixed(4);
}

/** PnL sparkline — mock cumulative curve */
function PnLSparkline() {
  const points = "0,80 40,72 80,55 120,60 160,35 200,40 240,22 280,18 320,25 360,10";
  return (
    <div className="border border-trench-line rounded-lg bg-trench-bg p-3 h-[140px] flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] text-trench-label" style={{ fontFamily: "var(--font-jetbrains)" }}>
          All realized PnL
        </span>
        <div className="flex gap-1">
          {["24h", "7d", "30d", "All"].map((tf) => (
            <button
              key={tf}
              type="button"
              className="px-2 py-0.5 text-[9px] rounded-md border border-trench-line text-trench-dim hover:border-trench-accent/30 hover:text-trench-label"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 relative min-h-[72px]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FF85" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00FF85" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon fill="url(#pnlFill)" points={`0,100 ${points} 360,100`} />
          <polyline fill="none" stroke="#00FF85" strokeWidth="2" points={points} />
        </svg>
      </div>
      <p className="text-[9px] text-trench-dim mt-1" style={{ fontFamily: "var(--font-jetbrains)" }}>
        {formatUsd(PORTFOLIO_SUMMARY.realizedPnL)} · simulated series
      </p>
    </div>
  );
}

export default function PortfolioPrototype() {
  const [mainTab, setMainTab] = useState<PortfolioMainTab>("spot");
  const [spotSub, setSpotSub] = useState<SpotSubTab>("active-position");
  const [walletFilter, setWalletFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState<DisplayCurrency>("USD");
  const [sortKey, setSortKey] = useState<SortKey>("pnl");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const setSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "symbol" ? "asc" : "desc");
    }
  };

  const filteredPositions = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = MOCK_POSITIONS.filter((p) => {
      if (!q) return true;
      return (
        p.symbol.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.mint.toLowerCase().includes(q)
      );
    });
    const dir = sortDir === "asc" ? 1 : -1;
    list = [...list].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "pnl":
          cmp = a.pnlUsd - b.pnlUsd;
          break;
        case "bought":
          cmp = a.bought - b.bought;
          break;
        case "sold":
          cmp = a.sold - b.sold;
          break;
        case "remaining":
          cmp = a.remaining - b.remaining;
          break;
        case "symbol":
          cmp = a.symbol.localeCompare(b.symbol);
          break;
        default:
          break;
      }
      return cmp * dir;
    });
    return list;
  }, [search, sortKey, sortDir]);

  const top100 = useMemo(() => {
    return [...MOCK_POSITIONS].sort((a, b) => b.pnlUsd - a.pnlUsd);
  }, []);

  const val = (usd: number) =>
    currency === "USD" ? formatUsd(usd) : `${formatSolFromUsd(usd)} SOL`;

  const SortBtn = ({ k, children }: { k: SortKey; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={() => setSort(k)}
      className={`inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider transition-colors ${
        sortKey === k ? "text-amber-400" : "text-trench-dim hover:text-trench-label"
      }`}
      style={{ fontFamily: "var(--font-jetbrains)" }}
    >
      {children}
      {sortKey === k && <span className="text-[8px]">{sortDir === "desc" ? "▼" : "▲"}</span>}
    </button>
  );

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-trench-bg" style={{ fontFamily: "var(--font-dm-sans)" }}>
      <PortfolioNavigation active={mainTab} onChange={setMainTab} />

      {mainTab === "wallet" ? (
        <PortfolioWalletTab />
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-stable">
          <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-5">
            {/* Header — SpotTab */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[#E8EDF5]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Spot portfolio summary
                </h2>
                <p className="text-[11px] text-trench-label" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  View performance and positions (mock data)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="sr-only" htmlFor="pf-wallet">
                  Wallet
                </label>
                <select
                  id="pf-wallet"
                  value={walletFilter}
                  onChange={(e) => setWalletFilter(e.target.value)}
                  className="h-9 px-3 text-[11px] bg-trench-panel border border-trench-line text-[#E8EDF5] rounded-md outline-none focus:border-trench-accent/40 focus:ring-1 focus:ring-trench-accent/15"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  <option value="all">All wallets ({MOCK_WALLETS.length})</option>
                  {MOCK_WALLETS.map((w) => (
                    <option key={w.publicKey} value={w.publicKey}>
                      {w.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Balance + chart grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border border-trench-line rounded-lg bg-trench-panel p-4 space-y-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <p className="text-sm text-[#E8EDF5] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Balance
                </p>
                {[
                  { label: "Total value", v: PORTFOLIO_SUMMARY.totalValue, color: "#E8EDF5" },
                  { label: "Unrealized PnL", v: PORTFOLIO_SUMMARY.unrealizedPnL, signed: true },
                  { label: "Realized PnL", v: PORTFOLIO_SUMMARY.realizedPnL, signed: true },
                  { label: "Available balance", v: PORTFOLIO_SUMMARY.availableBalance, color: "#E8EDF5" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="text-[10px] text-trench-dim mb-0.5" style={{ fontFamily: "var(--font-jetbrains)" }}>
                      {row.label}
                    </div>
                    <div
                      className="text-base font-bold tabular-nums"
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        color:
                          "signed" in row && row.signed
                            ? row.v >= 0
                              ? "#00FF85"
                              : "#FF3B3B"
                            : row.color ?? "#E8EDF5",
                      }}
                    >
                      {"signed" in row && row.signed ? `${row.v >= 0 ? "+" : ""}${formatUsd(row.v)}` : formatUsd(row.v as number)}
                    </div>
                  </div>
                ))}
              </div>
              <PnLSparkline />
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-6 border-b border-trench-line-subtle">
              {(
                [
                  ["active-position", "Active position"],
                  ["trade-history", "Trade history"],
                  ["top-100", "Top 100"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSpotSub(id)}
                  className={`pb-2 text-[11px] border-b-2 transition-all ${
                    spotSub === id
                      ? "border-trench-accent text-trench-accent"
                      : "border-transparent text-trench-label hover:text-[#E8EDF5]"
                  }`}
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="relative max-w-xs">
                <input
                  type="search"
                  placeholder="Search by name or address"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-trench-bg border border-trench-line rounded-lg text-[11px] text-[#E8EDF5] placeholder:text-trench-dim outline-none focus:border-trench-accent/35 focus:ring-1 focus:ring-trench-accent/15"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-trench-dim text-[10px]" aria-hidden>
                  ⌕
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-trench-dim" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  Show hidden
                </span>
                <button
                  type="button"
                  onClick={() => setCurrency((c) => (c === "USD" ? "SOL" : "USD"))}
                  className="px-3 py-1.5 rounded-lg border border-trench-line text-[10px] text-trench-label hover:border-trench-accent/30 hover:text-[#E8EDF5]"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {currency === "USD" ? "USD" : "SOL"} ↓
                </button>
              </div>
            </div>

            {/* Tables */}
            <div className="border border-trench-line rounded-lg overflow-hidden bg-trench-panel shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              {spotSub === "trade-history" ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-trench-raised border-b border-trench-line-subtle text-[9px] uppercase text-trench-dim" style={{ fontFamily: "var(--font-jetbrains)" }}>
                      <th className="px-3 py-2 font-medium">Time</th>
                      <th className="px-3 py-2 font-medium">Type</th>
                      <th className="px-3 py-2 font-medium">Token</th>
                      <th className="px-3 py-2 font-medium">Amount</th>
                      <th className="px-3 py-2 font-medium">Value ({currency})</th>
                      <th className="px-3 py-2 font-medium">PnL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_TRADES.map((t) => {
                      const d = new Date(t.time);
                      return (
                        <tr key={t.id} className="border-b border-trench-line-subtle hover:bg-trench-raised-hover/90">
                          <td className="px-3 py-2.5 text-[11px] text-[#C8D0DC]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                            {d.toLocaleDateString()}{" "}
                            <span className="text-trench-dim">{d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                          </td>
                          <td className="px-3 py-2.5">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                t.side === "buy" ? "bg-[#00FF85]/12 text-[#00FF85]" : "bg-[#FF3B3B]/12 text-[#FF3B3B]"
                              }`}
                              style={{ fontFamily: "var(--font-jetbrains)" }}
                            >
                              {t.side.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <TokenAvatar imageIndex={stableImageIndex(t.symbol)} fallbackLetter={t.symbol} size="sm" up={t.pnlUsd == null || (t.pnlUsd ?? 0) >= 0} />
                              <div>
                                <div className="text-[11px] text-[#E8EDF5]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                                  {t.symbol}
                                </div>
                                <div className="text-[9px] text-trench-dim truncate max-w-[88px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                                  {t.mint.slice(0, 4)}…{t.mint.slice(-4)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-[11px] text-trench-label tabular-nums" style={{ fontFamily: "var(--font-jetbrains)" }}>
                            {t.amount}
                          </td>
                          <td className="px-3 py-2.5 text-[11px] tabular-nums text-[#C8D0DC]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                            {val(t.valueUsd)}
                          </td>
                          <td className="px-3 py-2.5 text-[11px] tabular-nums" style={{ fontFamily: "var(--font-jetbrains)" }}>
                            {t.pnlUsd == null ? (
                              <span className="text-trench-dim">—</span>
                            ) : (
                              <span className={t.pnlUsd >= 0 ? "text-[#00FF85]" : "text-[#FF3B3B]"}>
                                {t.pnlUsd >= 0 ? "+" : ""}
                                {formatUsd(t.pnlUsd)}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-trench-raised border-b border-trench-line-subtle">
                      <th className="px-3 py-2.5 text-left">
                        <SortBtn k="symbol">Token</SortBtn>
                      </th>
                      <th className="px-3 py-2.5 text-right">
                        <SortBtn k="bought">Bought</SortBtn>
                      </th>
                      <th className="px-3 py-2.5 text-right">
                        <SortBtn k="sold">Sold</SortBtn>
                      </th>
                      <th className="px-3 py-2.5 text-right">
                        <SortBtn k="remaining">Remaining</SortBtn>
                      </th>
                      <th className="px-3 py-2.5 text-right">
                        <SortBtn k="pnl">PnL ({currency})</SortBtn>
                      </th>
                      <th className="px-3 py-2.5 text-right text-[9px] uppercase text-trench-dim font-semibold" style={{ fontFamily: "var(--font-jetbrains)" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(spotSub === "top-100" ? top100 : filteredPositions).map((p, i) => (
                      <tr key={p.id} className="border-b border-trench-line-subtle hover:bg-trench-raised-hover/90">
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            {spotSub === "top-100" && (
                              <span className="text-[10px] text-trench-dim w-5 tabular-nums" style={{ fontFamily: "var(--font-jetbrains)" }}>
                                #{i + 1}
                              </span>
                            )}
                            <TokenAvatar imageIndex={stableImageIndex(p.symbol)} fallbackLetter={p.symbol} size="sm" up={p.pnlUsd >= 0} />
                            <div>
                              <div className="text-[11px] text-[#E8EDF5] font-medium" style={{ fontFamily: "var(--font-jetbrains)" }}>
                                {p.symbol}
                              </div>
                              <div className="text-[9px] text-trench-dim truncate max-w-[120px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                                {p.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-right text-[11px] tabular-nums text-trench-label" style={{ fontFamily: "var(--font-jetbrains)" }}>
                          {val(p.bought)}
                        </td>
                        <td className="px-3 py-2.5 text-right text-[11px] tabular-nums text-trench-label" style={{ fontFamily: "var(--font-jetbrains)" }}>
                          {val(p.sold)}
                        </td>
                        <td className="px-3 py-2.5 text-right text-[11px] tabular-nums text-[#C8D0DC]" style={{ fontFamily: "var(--font-jetbrains)" }}>
                          {val(p.remaining)}
                        </td>
                        <td
                          className={`px-3 py-2.5 text-right text-[11px] font-semibold tabular-nums ${
                            p.pnlUsd >= 0 ? "text-[#00FF85]" : "text-[#FF3B3B]"
                          }`}
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {p.pnlUsd >= 0 ? "+" : ""}
                          {val(Math.abs(p.pnlUsd))}
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <Link
                            href={`/app/token/${encodeURIComponent(p.mint)}`}
                            className="text-[10px] text-[#00D4FF] hover:underline"
                            style={{ fontFamily: "var(--font-jetbrains)" }}
                          >
                            Trade
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
