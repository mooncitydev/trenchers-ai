"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  INITIAL_MOCK_WALLETS,
  SOL_PRICE_USD_MOCK,
  truncatePk,
  type PortfolioWalletRow,
} from "./walletTypes";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconChevronDown,
  IconCopy,
  IconExternal,
  IconKey,
  IconPlus,
  IconSearch,
  IconStar,
  IconTrash,
  IconUpload,
  IconWallet,
} from "./WalletIcons";

function randomMockPubkey(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let s = "";
  for (let i = 0; i < 44; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}
export default function PortfolioWalletTab() {
  const [wallets, setWallets] =
    useState<PortfolioWalletRow[]>(INITIAL_MOCK_WALLETS);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(INITIAL_MOCK_WALLETS.map((w) => w.publicKey)),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focusWallet, setFocusWallet] = useState<string>(
    INITIAL_MOCK_WALLETS[0].publicKey,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [toast, setToast] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    return wallets.filter((w) => {
      if (!showArchived && hidden.has(w.publicKey)) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        w.label.toLowerCase().includes(q) ||
        w.publicKey.toLowerCase().includes(q)
      );
    });
  }, [wallets, searchQuery, showArchived, hidden]);

  const toggleSelect = (pk: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(pk)) next.delete(pk);
      else next.add(pk);
      return next;
    });
  };

  const totalBalance = useMemo(() => {
    let sum = 0;
    for (const w of wallets) {
      if (selected.has(w.publicKey)) sum += w.balance;
    }
    return sum;
  }, [wallets, selected]);

  const totalUsd = totalBalance * SOL_PRICE_USD_MOCK;

  const focused =
    wallets.find((w) => w.publicKey === focusWallet) ?? wallets[0];
  const displaySol =
    selected.size === 0
      ? 0
      : selected.size === 1
        ? (wallets.find((w) => selected.has(w.publicKey))?.balance ?? 0)
        : totalBalance;
  const displayUsd = displaySol * SOL_PRICE_USD_MOCK;
  const headlineSol = focused ? focused.balance : 0;
  const headlineUsd = headlineSol * SOL_PRICE_USD_MOCK;

  const copyPk = async (pk: string) => {
    try {
      await navigator.clipboard.writeText(pk);
      showToast("Address copied");
    } catch {
      showToast("Copy failed");
    }
  };

  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [importOpen, setImportOpen] = useState(false);
  const [importPk, setImportPk] = useState("");
  const [importLabel, setImportLabel] = useState("");
  const [removeTarget, setRemoveTarget] = useState<PortfolioWalletRow | null>(
    null,
  );
  const [pkModal, setPkModal] = useState<PortfolioWalletRow | null>(null);

  const addWallet = (row: PortfolioWalletRow) => {
    setWallets((prev) => [...prev, row]);
    setSelected((prev) => new Set(prev).add(row.publicKey));
    setFocusWallet(row.publicKey);
  };

  const handleCreate = () => {
    const name = createName.trim();
    if (!name) {
      showToast("Enter a wallet name");
      return;
    }
    addWallet({
      publicKey: randomMockPubkey(),
      label: name,
      isMain: false,
      balance: 0,
      tokenCount: 0,
      change24h: 0,
    });
    setCreateName("");
    setCreateOpen(false);
    showToast(`Trading wallet “${name}” created (mock)`);
  };

  const handleImport = () => {
    if (!importPk.trim()) {
      showToast("Paste a private key (prototype accepts any text)");
      return;
    }
    const label = importLabel.trim() || "Imported";
    addWallet({
      publicKey: randomMockPubkey(),
      label,
      isMain: false,
      balance: 0.42,
      tokenCount: 2,
      change24h: 0,
    });
    setImportPk("");
    setImportLabel("");
    setImportOpen(false);
    showToast(`Wallet “${label}” imported (mock)`);
  };

  const handleRemove = () => {
    if (!removeTarget || removeTarget.isMain) return;
    setWallets((prev) =>
      prev.filter((w) => w.publicKey !== removeTarget.publicKey),
    );
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(removeTarget.publicKey);
      return next;
    });
    if (focusWallet === removeTarget.publicKey) {
      const rest = wallets.filter(
        (w) => w.publicKey !== removeTarget.publicKey,
      );
      setFocusWallet(rest[0]?.publicKey ?? "");
    }
    setRemoveTarget(null);
    showToast("Wallet removed from list (mock)");
  };

  const hideWallet = (pk: string) => {
    const w = wallets.find((x) => x.publicKey === pk);
    if (w?.isMain) {
      showToast("Default wallet can’t be hidden");
      return;
    }
    setHidden((prev) => {
      const next = new Set(prev);
      const willUnhide = next.has(pk);
      if (willUnhide) {
        next.delete(pk);
        queueMicrotask(() => showToast("Wallet visible again"));
      } else {
        next.add(pk);
        queueMicrotask(() => showToast("Wallet hidden from list"));
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {toast && (
        <div
          className="mx-4 mt-3 px-3 py-2 rounded-md border border-trench-accent/30 bg-trench-accent-soft text-trench-accent text-[11px] text-center shrink-0"
          style={{ fontFamily: "var(--font-jetbrains)" }}
          role="status"
        >
          {toast}
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-stable p-4 sm:p-5">
        <div className="max-w-6xl mx-auto space-y-3">
          <div>
            <h2
              className="text-lg font-semibold text-[#E8EDF5]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Wallet management
            </h2>
            <p
              className="text-xs text-trench-label mt-1"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Ported from Caesarx portfolio IA — create, import, select, and act
              on balances (mock only; no chain calls).
            </p>
          </div>

          <div className="flex flex-col lg:flex-row rounded-xl border border-trench-line bg-trench-panel/50 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] min-h-[420px]">
            <div className="flex-1 flex flex-col min-w-0 min-h-[320px] lg:min-h-[420px]">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 border-b border-trench-line-subtle bg-trench-bg/80">
                <div className="relative flex-1 max-w-md">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-trench-dim pointer-events-none" />
                  <input
                    type="search"
                    placeholder="Search by name or address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-trench-raised border border-trench-line text-[11px] text-[#E8EDF5] placeholder:text-trench-dim outline-none focus:border-trench-accent/35"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <label className="flex items-center gap-2 cursor-pointer text-[10px] text-trench-label">
                    <input
                      type="checkbox"
                      checked={showArchived}
                      onChange={(e) => setShowArchived(e.target.checked)}
                      className="rounded border-trench-line bg-trench-raised text-trench-accent focus:ring-trench-accent/30"
                    />
                    Show hidden
                  </label>
                  <button
                    type="button"
                    onClick={() => setImportOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-trench-line text-[10px] font-semibold uppercase tracking-wider text-trench-label hover:border-trench-accent/35 hover:text-[#E8EDF5] transition-colors"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    <IconUpload />
                    Import
                  </button>
                  <button
                    type="button"
                    onClick={() => setCreateOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-trench-accent-soft text-trench-accent border border-trench-accent/25 text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-500/15 transition-colors"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    <IconPlus />
                    Create
                  </button>
                </div>
              </div>

              <div
                className="grid grid-cols-12 gap-2 px-3 py-2 border-b border-trench-line-subtle text-[9px] uppercase tracking-[0.1em] text-trench-dim bg-trench-bg/50"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                <div className="col-span-5">Wallet</div>
                <div className="col-span-3 text-right">Balance</div>
                <div className="col-span-2 text-right">Tokens</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-stable">
                {filtered.map((w) => {
                  const isSel = selected.has(w.publicKey);
                  return (
                    <div
                      key={w.publicKey}
                      className={`group relative grid grid-cols-12 gap-2 px-3 py-3 border-b border-trench-line-subtle cursor-pointer transition-colors ${
                        focusWallet === w.publicKey
                          ? "bg-trench-accent-soft/40"
                          : "hover:bg-trench-raised-hover/80"
                      }`}
                      onClick={() => {
                        toggleSelect(w.publicKey);
                        setFocusWallet(w.publicKey);
                      }}
                    >
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-r ${isSel ? "bg-trench-accent" : "bg-transparent group-hover:bg-trench-line"}`}
                      />
                      <div className="col-span-5 flex items-center gap-2 min-w-0 pl-1">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isSel
                              ? "bg-trench-accent/25 border-trench-accent"
                              : "border-trench-line"
                          }`}
                          aria-hidden
                        >
                          {isSel && (
                            <svg
                              className="w-2.5 h-2.5 text-trench-accent"
                              fill="none"
                              viewBox="0 0 12 12"
                            >
                              <path
                                d="M2 6l3 3 5-5"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            isSel
                              ? "bg-trench-accent/20 text-trench-accent"
                              : "bg-trench-raised text-trench-label"
                          }`}
                        >
                          {w.label.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            {w.isMain && (
                              <IconStar
                                className="text-amber-400 w-3 h-3 shrink-0"
                                filled
                              />
                            )}
                            <span
                              className={`text-[13px] font-medium truncate ${isSel ? "text-trench-accent" : "text-[#E8EDF5]"}`}
                            >
                              {w.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span
                              className="text-[10px] text-trench-dim font-mono truncate"
                              title={w.publicKey}
                            >
                              {truncatePk(w.publicKey)}
                            </span>
                            <button
                              type="button"
                              className="opacity-0 group-hover:opacity-100 text-trench-label hover:text-[#E8EDF5] p-0.5"
                              onClick={(e) => {
                                e.stopPropagation();
                                void copyPk(w.publicKey);
                              }}
                              aria-label="Copy address"
                            >
                              <IconCopy />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 text-right flex flex-col justify-center">
                        <span
                          className="text-[13px] font-semibold tabular-nums text-[#E8EDF5]"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {w.balance.toFixed(3)} SOL
                        </span>
                        <span className="text-[10px] text-trench-dim tabular-nums">
                          ${(w.balance * SOL_PRICE_USD_MOCK).toFixed(2)}
                        </span>
                      </div>
                      <div className="col-span-2 text-right text-[13px] font-medium tabular-nums text-trench-label self-center">
                        {w.tokenCount}
                      </div>
                      <div
                        className="col-span-2 flex items-center justify-end gap-0.5 self-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="p-1.5 rounded text-trench-dim hover:text-[#E8EDF5] hover:bg-trench-raised opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Solscan"
                          onClick={() =>
                            window.open(
                              `https://solscan.io/account/${w.publicKey}`,
                              "_blank",
                              "noopener,noreferrer",
                            )
                          }
                        >
                          <IconExternal />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded text-trench-dim hover:text-[#E8EDF5] hover:bg-trench-raised opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Private key (mock)"
                          onClick={() => setPkModal(w)}
                        >
                          <IconKey />
                        </button>
                        {!w.isMain && (
                          <button
                            type="button"
                            className="p-1.5 rounded text-trench-dim hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Hide from list"
                            onClick={() => hideWallet(w.publicKey)}
                          >
                            <span className="text-[10px]">⌁</span>
                          </button>
                        )}
                        {!w.isMain && (
                          <button
                            type="button"
                            className="p-1.5 rounded text-trench-dim hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove"
                            onClick={() => setRemoveTarget(w)}
                          >
                            <IconTrash />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-14 text-trench-dim gap-2">
                    <IconWallet className="w-10 h-10 opacity-40" />
                    <p
                      className="text-sm"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      No wallets match
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div
              className="hidden lg:block w-px bg-trench-line shrink-0"
              aria-hidden
            />

            <div className="w-full lg:w-[min(100%,380px)] flex-shrink-0 flex flex-col border-t lg:border-t-0 border-trench-line bg-trench-bg/60">
              <div className="flex items-center justify-between gap-2 p-3 border-b border-trench-line-subtle">
                <h3
                  className="text-[11px] font-semibold text-trench-label uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  Balances ({selected.size}/{wallets.length})
                </h3>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-trench-line bg-trench-raised text-[10px] text-[#E8EDF5] hover:border-trench-accent/30"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    <IconWallet className="text-trench-dim w-3.5 h-3.5" />
                    <span className="truncate max-w-[100px]">
                      {focused?.label ?? "—"}
                    </span>
                    <span className="text-trench-accent tabular-nums">
                      ${headlineUsd.toFixed(2)}
                    </span>
                    <IconChevronDown
                      className={`text-trench-dim transition-transform shrink-0 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-trench-line bg-trench-panel shadow-xl z-20 max-h-56 overflow-y-auto">
                      {wallets.map((w) => (
                        <button
                          key={w.publicKey}
                          type="button"
                          className={`w-full px-3 py-2 text-left text-[11px] hover:bg-trench-raised transition-colors ${
                            focusWallet === w.publicKey
                              ? "text-trench-accent bg-trench-accent-soft/30"
                              : "text-[#E8EDF5]"
                          }`}
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                          onClick={() => {
                            setFocusWallet(w.publicKey);
                            setDropdownOpen(false);
                          }}
                        >
                          <span className="block truncate">{w.label}</span>
                          <span className="text-trench-dim tabular-nums">
                            ${(w.balance * SOL_PRICE_USD_MOCK).toFixed(2)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 p-5 flex flex-col gap-6">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-trench-accent/15 border border-trench-accent/25 flex items-center justify-center text-trench-accent font-bold text-sm">
                    ◎
                  </div>
                  <div>
                    <p
                      className="text-[10px] text-trench-dim uppercase tracking-wider mb-1"
                      style={{ fontFamily: "var(--font-jetbrains)" }}
                    >
                      {selected.size === 0
                        ? "No selection"
                        : selected.size === 1
                          ? "Wallet balance"
                          : `Selected total (${selected.size} wallets)`}
                    </p>
                    <p
                      className="text-2xl font-bold tabular-nums text-[#E8EDF5]"
                      style={{ fontFamily: "var(--font-jetbrains)" }}
                    >
                      {displaySol.toFixed(5)} SOL
                    </p>
                    <p className="text-xs text-trench-label tabular-nums">
                      ~${displayUsd.toFixed(2)}
                    </p>
                    {selected.size > 1 && focused && (
                      <p
                        className="text-[10px] text-trench-dim mt-2"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        Focus: {focused.label} · {headlineSol.toFixed(4)} SOL
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      showToast("Receive — connect wallet in production")
                    }
                    className="h-10 rounded-lg border border-trench-line bg-trench-raised text-[11px] font-semibold text-[#E8EDF5] hover:border-trench-accent/35 flex items-center justify-center gap-1.5 transition-colors"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    <IconArrowDownRight className="text-trench-accent" />
                    Receive
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      showToast("Send — connect wallet in production")
                    }
                    className="h-10 rounded-lg border border-trench-line bg-trench-raised text-[11px] font-semibold text-trench-label hover:text-[#E8EDF5] hover:border-trench-accent/25 flex items-center justify-center gap-1.5 transition-colors"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    <IconArrowUpRight />
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast("Distribute — mock")}
                    className="h-10 rounded-lg border border-trench-line bg-trench-raised text-[11px] font-semibold text-trench-label hover:text-[#E8EDF5] flex items-center justify-center gap-1 transition-colors"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    Distribute
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast("Consolidate — mock")}
                    className="h-10 rounded-lg border border-trench-line bg-trench-raised text-[11px] font-semibold text-trench-label hover:text-[#E8EDF5] flex items-center justify-center gap-1 transition-colors"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    Consolidate
                  </button>
                </div>

                <p
                  className="text-[10px] text-trench-dim leading-relaxed"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  Selection checkboxes drive the aggregate; focus wallet sets
                  the right-hand headline. Matches Caesarx BalancePanel +
                  WalletManagerSection behavior at a prototype level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {createOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal
        >
          <div className="w-full max-w-md rounded-xl border border-trench-line bg-trench-panel p-5 shadow-2xl">
            <h3
              className="text-sm font-semibold text-[#E8EDF5] mb-1"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Create trading wallet
            </h3>
            <p
              className="text-[10px] text-trench-dim mb-4"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Mock only — in Caesarx this calls{" "}
              <code className="text-trench-label">/wallets/live-create</code>.
            </p>
            <label
              className="block text-[10px] text-trench-label mb-1"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Label
            </label>
            <input
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              placeholder="e.g. Burner 4"
              className="w-full px-3 py-2 rounded-lg border border-trench-line bg-trench-bg text-[#E8EDF5] text-sm mb-4 outline-none focus:border-trench-accent/35"
              style={{ fontFamily: "var(--font-jetbrains)" }}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                className="px-3 py-2 text-[11px] text-trench-label hover:text-[#E8EDF5]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="px-4 py-2 rounded-lg bg-trench-accent-soft text-trench-accent border border-trench-accent/25 text-[11px] font-bold uppercase"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {importOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal
        >
          <div className="w-full max-w-md rounded-xl border border-trench-line bg-trench-panel p-5 shadow-2xl">
            <h3
              className="text-sm font-semibold text-[#E8EDF5] mb-1"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Import wallet
            </h3>
            <p
              className="text-[10px] text-trench-dim mb-4"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Prototype accepts any string; production encrypts and calls{" "}
              <code className="text-trench-label">/wallets/import</code>.
            </p>
            <input
              value={importLabel}
              onChange={(e) => setImportLabel(e.target.value)}
              placeholder="Label (optional)"
              className="w-full px-3 py-2 rounded-lg border border-trench-line bg-trench-bg text-sm mb-2 text-[#E8EDF5]"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            />
            <textarea
              value={importPk}
              onChange={(e) => setImportPk(e.target.value)}
              placeholder="Private key (base58) — never share real keys"
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-trench-line bg-trench-bg text-[11px] font-mono text-[#E8EDF5] mb-4 resize-none outline-none focus:border-trench-accent/35"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setImportOpen(false);
                  setImportPk("");
                  setImportLabel("");
                }}
                className="px-3 py-2 text-[11px] text-trench-label"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImport}
                className="px-4 py-2 rounded-lg bg-trench-accent-soft text-trench-accent border border-trench-accent/25 text-[11px] font-bold uppercase"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}

      {removeTarget && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal
        >
          <div className="w-full max-w-sm rounded-xl border border-trench-line bg-trench-panel p-5">
            <h3
              className="text-sm font-semibold text-[#E8EDF5] mb-2"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Remove wallet?
            </h3>
            <p
              className="text-[11px] text-trench-label mb-4"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Remove “{removeTarget.label}” from this list (mock). Caesarx keeps
              data for re-import.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRemoveTarget(null)}
                className="px-3 py-2 text-[11px] text-trench-label"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-4 py-2 rounded-lg bg-red-500/15 text-red-400 border border-red-500/30 text-[11px] font-bold uppercase"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {pkModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal
        >
          <div className="w-full max-w-md rounded-xl border border-trench-line bg-trench-panel p-5">
            <h3
              className="text-sm font-semibold text-[#E8EDF5] mb-1"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Private key
            </h3>
            <p
              className="text-[10px] text-trench-dim mb-3"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Placeholder only — not fetched from a server in this build.
            </p>
            <p className="text-[10px] text-trench-label mb-2 font-mono break-all">
              {pkModal.publicKey}
            </p>
            <div className="rounded-lg border border-trench-line bg-trench-bg p-3 text-[10px] font-mono text-trench-dim break-all">
              {Array.from({ length: 8 })
                .map(() => "•")
                .join("")}
              … (mock)
            </div>
            <button
              type="button"
              onClick={() => setPkModal(null)}
              className="mt-4 w-full py-2 rounded-lg border border-trench-line text-[11px] text-trench-label hover:text-[#E8EDF5]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
