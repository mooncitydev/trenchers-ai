"use client";

import React, { useCallback, useEffect, useId, useState } from "react";

const TRADE_BUY_GREEN = "#5EC169";
const TRADE_SELL_RED = "#E05252";
const ROW_PRESETS = "#101820";

type AmountType = "sol" | "percentage" | "supply_pct";
type TradingMode = "market" | "limit";

type MevMode = "off" | "reduced" | "secure";

const DEFAULT_SETTINGS: {
  slippage: string;
  priorityFee: string;
  bribe: string;
  mevMode: MevMode;
} = {
  slippage: "20",
  priorityFee: "0.001",
  bribe: "0.01",
  mevMode: "off",
};

const PRESET_SLIPPAGE: Record<"P1" | "P2" | "P3", typeof DEFAULT_SETTINGS> = {
  P1: { slippage: "5", priorityFee: "0.001", bribe: "0.01", mevMode: "off" },
  P2: { slippage: "10", priorityFee: "0.002", bribe: "0.02", mevMode: "reduced" },
  P3: { slippage: "20", priorityFee: "0.005", bribe: "0.05", mevMode: "secure" },
};

function SolPercentToggleIcon({ gid }: { gid: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.6447 2.0869C2.72581 2.00904 2.83286 1.96362 2.94316 1.96362H13.24C13.4282 1.96362 13.5223 2.19071 13.3893 2.32372L11.3552 4.35779C11.2773 4.43565 11.1703 4.48107 11.0567 4.48107H0.759863C0.571703 4.48107 0.477623 4.25398 0.610632 4.12097L2.6447 2.0869Z"
        fill={`url(#${gid}_0)`}
      />
      <path
        d="M11.3552 5.86473C11.2773 5.78687 11.1703 5.74146 11.0567 5.74146H0.759863C0.571703 5.74146 0.477623 5.96854 0.610632 6.10155L2.6447 8.13563C2.72256 8.21349 2.82962 8.2589 2.94316 8.2589H13.24C13.4282 8.2589 13.5223 8.03181 13.3893 7.8988L11.3552 5.86473Z"
        fill={`url(#${gid}_1)`}
      />
      <path
        d="M2.6447 9.64159C2.72256 9.56373 2.82962 9.51831 2.94316 9.51831H13.24C13.4282 9.51831 13.5223 9.7454 13.3893 9.87841L11.3552 11.9125C11.2773 11.9903 11.1703 12.0358 11.0567 12.0358H0.759863C0.571703 12.0358 0.477623 11.8087 0.610632 11.6757L2.6447 9.64159Z"
        fill={`url(#${gid}_2)`}
      />
      <defs>
        <linearGradient id={`${gid}_0`} x1="9.1404" y1="-0.878284" x2="2.01414" y2="12.7714" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient id={`${gid}_1`} x1="10.6885" y1="-0.0651545" x2="3.56222" y2="13.5845" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient id={`${gid}_2`} x1="12.2564" y1="0.70869" x2="5.13013" y2="14.3584" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface Props {
  tokenSymbol: string;
  /** Mock market cap USD for %supply → SOL hint */
  mockMarketCapUsd?: number;
  mockSolPriceUsd?: number;
}

export default function TokenTradePanel({
  tokenSymbol,
  mockMarketCapUsd = 4_200_000,
  mockSolPriceUsd = 140,
}: Props) {
  const gid = useId().replace(/:/g, "");
  const [activePreset, setActivePreset] = useState<"P1" | "P2" | "P3">("P3");
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const [isBuy, setIsBuy] = useState(true);
  const [tradingMode, setTradingMode] = useState<TradingMode>("market");
  const [amountType, setAmountType] = useState<AmountType>("sol");
  const [amountInput, setAmountInput] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableSol, setEditableSol] = useState([0.01, 0.05, 0.1, 0.5]);
  const [editablePct, setEditablePct] = useState([10, 25, 50, 100]);
  const [editableSupply, setEditableSupply] = useState([0.1, 0.5, 1, 2]);
  const [isRiskOn, setIsRiskOn] = useState(false);
  const [isTxLoading, setIsTxLoading] = useState(false);

  const solBalance = 12.42;

  useEffect(() => {
    setSettings({ ...PRESET_SLIPPAGE[activePreset] });
  }, [activePreset]);

  useEffect(() => {
    setAmountInput("");
    setSelectedAmount(0);
    if (isBuy) setAmountType("sol");
    else setAmountType("percentage");
  }, [isBuy]);

  const supplyPctToSol = useCallback(
    (pct: number) => {
      if (mockSolPriceUsd <= 0) return 0;
      return ((pct / 100) * mockMarketCapUsd) / mockSolPriceUsd;
    },
    [mockMarketCapUsd, mockSolPriceUsd],
  );

  const formatSol = (sol: number) => {
    if (sol <= 0) return "";
    if (sol < 0.001) return `${sol.toFixed(5)} SOL`;
    if (sol < 1) return `${sol.toFixed(3)} SOL`;
    return `${sol.toLocaleString(undefined, { maximumFractionDigits: 3 })} SOL`;
  };

  const handlePresetVal = (index: number, value: string, type: "sol" | "percentage" | "supply_pct") => {
    if (value === "") {
      if (type === "supply_pct") {
        const nb = [...editableSupply];
        nb[index] = 0;
        setEditableSupply(nb);
      } else if (type === "percentage") {
        const nb = [...editablePct];
        nb[index] = 0;
        setEditablePct(nb);
      } else {
        const nb = [...editableSol];
        nb[index] = 0;
        setEditableSol(nb);
      }
      return;
    }
    const n = parseFloat(value);
    if (Number.isNaN(n) || n < 0) return;
    if (type === "supply_pct") {
      const nb = [...editableSupply];
      nb[index] = n;
      setEditableSupply(nb);
    } else if (type === "percentage") {
      const nb = [...editablePct];
      nb[index] = n;
      setEditablePct(nb);
    } else {
      const nb = [...editableSol];
      nb[index] = n;
      setEditableSol(nb);
    }
  };

  const cycleAmountType = () => {
    setSelectedAmount(0);
    setAmountInput("");
    if (amountType === "sol") setAmountType(isBuy ? "supply_pct" : "percentage");
    else if (amountType === "percentage") setAmountType("supply_pct");
    else setAmountType("sol");
  };

  const onExecute = () => {
    if (selectedAmount <= 0) return;
    setIsTxLoading(true);
    window.setTimeout(() => setIsTxLoading(false), 900);
  };

  const ctaLabel = (() => {
    const sym = tokenSymbol ? ` ${tokenSymbol}` : "";
    if (!isBuy) return `Sell${sym}${selectedAmount > 0 ? ` ${selectedAmount}%` : ""}`;
    if (selectedAmount <= 0) return `Buy${sym}`;
    if (amountType === "sol") return `Buy${sym} ${selectedAmount} SOL`;
    if (amountType === "supply_pct") {
      const sol = supplyPctToSol(selectedAmount);
      return sol > 0 ? `Buy${sym} ${formatSol(sol)}` : `Buy${sym} ${selectedAmount}%`;
    }
    return `Buy${sym}`;
  })();

  const renderPresetRow = () => {
    const sep = (i: number) => (i > 0 ? <div key={`s-${i}`} className="w-px h-full bg-[#1C2535]" /> : null);

    if (isBuy) {
      if (amountType === "percentage") {
        return editablePct.map((value, index) => (
          <React.Fragment key={`pb-${index}`}>
            {sep(index)}
            <div className="flex-1 min-w-0">
              {isEditMode ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handlePresetVal(index, e.target.value, "percentage")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setIsEditMode(false);
                  }}
                  className="w-full h-full min-h-[34px] text-xs text-center text-[#E8EDF5] bg-transparent border-0 outline-none"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAmount(value);
                    setAmountInput(String(value));
                  }}
                  className="w-full h-full min-h-[34px] text-xs text-trench-label hover:text-[#E8EDF5] transition-colors"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {value}%
                </button>
              )}
            </div>
          </React.Fragment>
        ));
      }
      if (amountType === "supply_pct") {
        return editableSupply.map((value, index) => (
          <React.Fragment key={`sb-${index}`}>
            {sep(index)}
            <div className="flex-1 min-w-0">
              {isEditMode ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handlePresetVal(index, e.target.value, "supply_pct")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setIsEditMode(false);
                  }}
                  className="w-full h-full min-h-[34px] text-xs text-center text-[#E8EDF5] bg-transparent border-0 outline-none"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAmount(value);
                    setAmountInput(String(value));
                  }}
                  className="w-full h-full min-h-[34px] text-xs text-trench-label hover:text-[#E8EDF5] transition-colors"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {value}%S
                </button>
              )}
            </div>
          </React.Fragment>
        ));
      }
      return editableSol.map((value, index) => (
        <React.Fragment key={`solb-${index}`}>
          {index > 0 ? <div className="w-px h-full bg-white/10" /> : null}
          <div className="flex-1 min-w-0">
            {isEditMode ? (
              <input
                type="text"
                value={value}
                onChange={(e) => handlePresetVal(index, e.target.value, "sol")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setIsEditMode(false);
                }}
                className="w-full h-full min-h-[34px] text-xs text-center text-[#E8EDF5] bg-transparent border-0 outline-none"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSelectedAmount(value);
                  setAmountInput(String(value));
                }}
                className="w-full h-full min-h-[34px] text-xs text-trench-label hover:text-[#E8EDF5] transition-colors"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {value}
              </button>
            )}
          </div>
        </React.Fragment>
      ));
    }

    if (!isBuy && amountType === "supply_pct") {
      return editableSupply.map((value, index) => (
        <React.Fragment key={`ssup-${index}`}>
          {sep(index)}
          <div className="flex-1 min-w-0">
            {isEditMode ? (
              <input
                type="text"
                value={value}
                onChange={(e) => handlePresetVal(index, e.target.value, "supply_pct")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setIsEditMode(false);
                }}
                className="w-full h-full min-h-[34px] text-xs text-center text-[#E8EDF5] bg-transparent border-0 outline-none"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSelectedAmount(value);
                  setAmountInput(String(value));
                }}
                className="w-full h-full min-h-[34px] text-xs text-trench-label hover:text-[#E8EDF5] transition-colors"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {value}%S
              </button>
            )}
          </div>
        </React.Fragment>
      ));
    }

    if (amountType === "percentage") {
      return editablePct.map((value, index) => (
        <React.Fragment key={`ps-${index}`}>
          {sep(index)}
          <div className="flex-1 min-w-0">
            {isEditMode ? (
              <input
                type="text"
                value={value}
                onChange={(e) => handlePresetVal(index, e.target.value, "percentage")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setIsEditMode(false);
                }}
                className="w-full h-full min-h-[34px] text-xs text-center text-[#E8EDF5] bg-transparent border-0 outline-none"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSelectedAmount(value);
                  setAmountInput(String(value));
                }}
                className="w-full h-full min-h-[34px] text-xs text-trench-label hover:text-[#E8EDF5] transition-colors"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {value}%
              </button>
            )}
          </div>
        </React.Fragment>
      ));
    }
    return editableSol.map((value, index) => (
      <React.Fragment key={`ss-${index}`}>
        {sep(index)}
        <div className="flex-1 min-w-0">
          {isEditMode ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handlePresetVal(index, e.target.value, "sol")}
              onKeyDown={(e) => {
                if (e.key === "Enter") setIsEditMode(false);
              }}
              className="w-full h-full min-h-[34px] text-xs text-center text-[#E8EDF5] bg-transparent border-0 outline-none"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setSelectedAmount(value);
                setAmountInput(String(value));
              }}
              className="w-full h-full min-h-[34px] text-xs text-trench-label hover:text-[#E8EDF5] transition-colors"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {value}
            </button>
          )}
        </div>
      </React.Fragment>
    ));
  };

  return (
    <aside
      className="w-full lg:w-[340px] flex-shrink-0 flex flex-col h-full min-h-0 border-t lg:border-t-0 border-trench-line-subtle bg-trench-bg"
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      <div className="p-4 border-b border-trench-line flex-shrink-0 bg-trench-panel/50">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {(["P1", "P2", "P3"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setActivePreset(p)}
              className={`text-[11px] font-semibold h-7 rounded-sm border transition-colors ${
                activePreset === p
                  ? "bg-[#00D4FF]/15 text-[#00D4FF] border-[#00D4FF]/35"
                  : "bg-trench-panel text-trench-label border-trench-line hover:border-[#2A3545]"
              }`}
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              PRESET {p.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            type="button"
            onClick={() => setIsBuy(true)}
            className="text-sm font-semibold rounded-sm h-9 transition-all border"
            style={
              isBuy
                ? { background: TRADE_BUY_GREEN, color: "#0a0f14", borderColor: "transparent" }
                : { background: "transparent", color: "#8892A4", borderColor: "#1C2535" }
            }
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setIsBuy(false)}
            className="text-sm font-semibold rounded-sm h-9 transition-all border"
            style={
              !isBuy
                ? { background: TRADE_SELL_RED, color: "#fff", borderColor: "transparent" }
                : { background: "transparent", color: "#8892A4", borderColor: "#1C2535" }
            }
          >
            Sell
          </button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setTradingMode("market")}
              className={`px-2.5 h-6 text-[11px] rounded-[5px] transition-all ${
                tradingMode === "market" ? "bg-trench-raised text-[#E8EDF5] font-medium" : "text-trench-label hover:text-[#C8D0DC]"
              }`}
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Market
            </button>
            <button
              type="button"
              onClick={() => setTradingMode("limit")}
              className={`px-2.5 h-6 text-[11px] rounded-[5px] transition-all ${
                tradingMode === "limit" ? "bg-trench-raised text-[#E8EDF5] font-medium" : "text-trench-label hover:text-[#C8D0DC]"
              }`}
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Limit
            </button>
          </div>
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 h-6 bg-trench-raised rounded-[5px] text-[11px] text-[#C8D0DC]"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            <span className="text-[#FFB800]">◎</span>
            <span>{solBalance.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {tradingMode === "limit" ? (
          <div className="p-4 text-center">
            <p className="text-[11px] text-trench-label" style={{ fontFamily: "var(--font-jetbrains)" }}>
              Limit orders — coming soon.
            </p>
          </div>
        ) : (
          <>
            <div className="p-2.5 border-b border-trench-line">
              <div className="flex flex-col gap-1">
                <div className="border border-trench-line rounded-t-md px-2.5 py-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-[11px] text-trench-label shrink-0" style={{ fontFamily: "var(--font-jetbrains)" }}>
                      AMOUNT:
                    </span>
                    <input
                      type="text"
                      value={amountInput}
                      onChange={(e) => {
                        setAmountInput(e.target.value);
                        setSelectedAmount(parseFloat(e.target.value) || 0);
                      }}
                      placeholder={amountType === "sol" ? "Enter SOL" : "Enter %"}
                      className="min-w-0 flex-1 h-6 bg-transparent text-[11px] text-[#E8EDF5] placeholder:text-trench-dim border-0 outline-none px-0"
                      style={{ fontFamily: "var(--font-jetbrains)", boxShadow: "none" }}
                    />
                    {selectedAmount > 0 && amountType === "supply_pct" && supplyPctToSol(selectedAmount) > 0 && (
                      <span className="text-[11px] text-trench-label whitespace-nowrap" style={{ fontFamily: "var(--font-jetbrains)" }}>
                        ≈ {formatSol(supplyPctToSol(selectedAmount))}
                      </span>
                    )}
                  </div>
                  <div className="shrink-0 flex items-center">
                    {amountType === "sol" ? (
                      <button type="button" onClick={cycleAmountType} className="cursor-pointer hover:opacity-80 p-0.5" title="Switch amount type">
                        <SolPercentToggleIcon gid={gid} />
                      </button>
                    ) : amountType === "percentage" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setAmountType("supply_pct");
                          setSelectedAmount(0);
                          setAmountInput("");
                        }}
                        className="text-sm font-bold text-[#E8EDF5] hover:opacity-80"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        %
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setAmountType("sol");
                          setSelectedAmount(0);
                          setAmountInput("");
                        }}
                        className="text-[11px] font-bold text-[#00FF85] hover:opacity-80 rounded px-1"
                        style={{ fontFamily: "var(--font-jetbrains)" }}
                      >
                        %
                      </button>
                    )}
                  </div>
                </div>

                <div
                  className="border border-t-0 border-trench-line rounded-b-md h-[34px] flex items-center"
                  style={{ background: ROW_PRESETS }}
                >
                  {renderPresetRow()}
                  <div className="w-px h-full bg-[#1C2535]" />
                  <button
                    type="button"
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`w-10 flex items-center justify-center hover:bg-trench-raised transition-colors h-full ${isEditMode ? "bg-trench-raised/80" : ""}`}
                    title={isEditMode ? "Save" : "Edit presets"}
                  >
                    {isEditMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path
                          d="M11.9937 2.58963C12.3357 2.93159 12.3357 3.48535 11.9937 3.82731L6.20531 9.61569C5.86335 9.95766 5.30959 9.95766 4.96762 9.61569L2.00628 6.65435C1.66432 6.31239 1.66432 5.75862 2.00628 5.41666C2.34825 5.0747 2.90201 5.0747 3.24397 5.41666L5.58647 7.75916L10.7561 2.58963C11.098 2.24766 11.6518 2.24766 11.9937 2.58963Z"
                          fill="#00FFA3"
                        />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path
                          d="M10.6281 0.128141C10.7992 -0.042714 11.0758 -0.042714 11.2469 0.128141L13.872 2.75315C14.0428 2.92401 14.0428 3.20057 13.872 3.37143L5.12187 12.1215C5.08 12.1634 5.02835 12.1949 4.97166 12.2141L0.59666 13.9641C0.437501 14.0337 0.251732 13.9954 0.128141 13.872C0.00454879 13.7484 -0.0336938 13.5626 0.0312709 13.4034L1.78127 9.02835C1.80044 8.97167 1.83193 8.92002 1.87383 8.87815L10.6281 0.128141Z"
                          fill="currentColor"
                          className="text-trench-label"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {isBuy && (
              <div className="px-2.5 py-3 border-b border-trench-line">
                <button type="button" onClick={() => setIsRiskOn(!isRiskOn)} className="flex items-center gap-1.5 cursor-pointer w-full text-left">
                  <span className="relative h-[18px] w-[18px] flex-shrink-0 inline-block">
                    {isRiskOn ? (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <rect x="1.88" y="1.88" width="14.25" height="14.25" rx="3.12" fill="#5EC169" stroke="#6A6A6A" strokeWidth="0.75" />
                        <path d="M6 9L8.25 11.25L12 7.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <rect x="1.88" y="1.88" width="14.25" height="14.25" rx="3.12" stroke="#6A6A6A" strokeWidth="0.75" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-trench-label" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    Risk Management (SL/TP)
                  </span>
                </button>
              </div>
            )}

            <div className="p-2.5 border-b border-trench-line">
              <button
                type="button"
                onClick={onExecute}
                disabled={isTxLoading || selectedAmount <= 0}
                className="w-full text-base font-semibold h-12 rounded-xl border-0 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  background: isBuy ? TRADE_BUY_GREEN : TRADE_SELL_RED,
                  color: isBuy ? "#0a0f14" : "#fff",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {isTxLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : null}
                {ctaLabel}
              </button>

              <div className="flex items-center justify-between text-[11px] mt-2 gap-1 flex-wrap">
                <span className="text-trench-dim" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  Presets:
                </span>
                <div className="flex items-center gap-2 text-trench-label flex-wrap justify-end" style={{ fontFamily: "var(--font-jetbrains)" }}>
                  <span>{settings.slippage}% slip</span>
                  <span>·</span>
                  <span>{settings.priorityFee}</span>
                  <span>·</span>
                  <span>{settings.bribe}</span>
                  <span>·</span>
                  <span className="uppercase">{settings.mevMode}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
