"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const COPY_RESET_MS = 2500;

export type Persona =
  | "Early Sniper"
  | "Flip Artist"
  | "Trend Follower"
  | "DCA Accumulator"
  | "Diamond Hands";
export type RiskLevel = "Low" | "Medium" | "High" | "Degen";
export type Platform = "Pump.fun" | "Raydium" | "Jupiter" | "PumpSwap";

export interface WalletProfile {
  id: string;
  address: string;
  label: string;
  persona: Persona;
  winRate: number;
  pnl7d: number;
  pnlPct7d: number;
  avgHoldTime: string;
  totalTrades7d: number;
  bestTrade: string;
  riskLevel: RiskLevel;
  tracked: boolean;
  lastActive: string;
  holding: string[];
  verified: boolean;
  copiers: number;
}

export interface Trade {
  id: string;
  walletId: string;
  walletAddress: string;
  walletLabel: string;
  persona: Persona;
  type: "buy" | "sell";
  token: string;
  amountSol: number;
  valueUsd: number;
  timestamp: number;
  platform: Platform;
  pnlUsd?: number;
  pnlPct?: number;
  copied: boolean;
}
export const PERSONA_CONFIG: Record<
  Persona,
  { color: string; bg: string; desc: string }
> = {
  "Early Sniper": {
    color: "#00FF85",
    bg: "rgba(0,255,133,0.10)",
    desc: "Buys within 60s of launch",
  },
  "Flip Artist": {
    color: "#00D4FF",
    bg: "rgba(0,212,255,0.10)",
    desc: "Quick entries, 2–10x exits",
  },
  "Trend Follower": {
    color: "#FFB800",
    bg: "rgba(255,184,0,0.10)",
    desc: "Rides momentum post-launch",
  },
  "DCA Accumulator": {
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.10)",
    desc: "Builds positions over time",
  },
  "Diamond Hands": {
    color: "#FF6535",
    bg: "rgba(255,101,53,0.10)",
    desc: "Holds for 10x+ or bust",
  },
};

export const RISK_COLOR: Record<RiskLevel, string> = {
  Low: "#00FF85",
  Medium: "#FFB800",
  High: "#FF6535",
  Degen: "#FF3B3B",
};
const SEED_WALLETS: WalletProfile[] = [
  {
    id: "w1",
    address: "7xKp...3mNq",
    label: "Whale #1",
    persona: "Early Sniper",
    winRate: 84,
    pnl7d: 142800,
    pnlPct7d: 312,
    avgHoldTime: "4m",
    totalTrades7d: 48,
    bestTrade: "+$41K on $MOODENG",
    riskLevel: "Degen",
    tracked: true,
    lastActive: "12s",
    holding: ["PEPE2", "BOME"],
    verified: true,
    copiers: 1240,
  },
  {
    id: "w2",
    address: "9pRm...7aKx",
    label: "Flip King",
    persona: "Flip Artist",
    winRate: 71,
    pnl7d: 89200,
    pnlPct7d: 178,
    avgHoldTime: "18m",
    totalTrades7d: 92,
    bestTrade: "+$22K on $PONKE",
    riskLevel: "High",
    tracked: true,
    lastActive: "1m",
    holding: ["WOJAK"],
    verified: true,
    copiers: 876,
  },
  {
    id: "w3",
    address: "3nBv...1cPw",
    label: "CT Oracle",
    persona: "Trend Follower",
    winRate: 68,
    pnl7d: 54100,
    pnlPct7d: 94,
    avgHoldTime: "2h",
    totalTrades7d: 31,
    bestTrade: "+$18K on $WIF",
    riskLevel: "Medium",
    tracked: true,
    lastActive: "4m",
    holding: ["GOAT", "POPCAT"],
    verified: false,
    copiers: 432,
  },
  {
    id: "w4",
    address: "5sLt...8dFg",
    label: "Steady Eddie",
    persona: "DCA Accumulator",
    winRate: 77,
    pnl7d: 31400,
    pnlPct7d: 67,
    avgHoldTime: "6h",
    totalTrades7d: 14,
    bestTrade: "+$9K on $BONK2",
    riskLevel: "Low",
    tracked: false,
    lastActive: "22m",
    holding: ["BONK2", "DOGWIFHAT"],
    verified: false,
    copiers: 198,
  },
  {
    id: "w5",
    address: "2mHq...4bYz",
    label: "Moon Seeker",
    persona: "Diamond Hands",
    winRate: 52,
    pnl7d: 198400,
    pnlPct7d: 890,
    avgHoldTime: "3d",
    totalTrades7d: 8,
    bestTrade: "+$190K on $GOAT",
    riskLevel: "Degen",
    tracked: false,
    lastActive: "1h",
    holding: ["HARAMBE"],
    verified: true,
    copiers: 3102,
  },
  {
    id: "w6",
    address: "8jKc...6eWr",
    label: "Safe Hands",
    persona: "Trend Follower",
    winRate: 65,
    pnl7d: 22800,
    pnlPct7d: 44,
    avgHoldTime: "45m",
    totalTrades7d: 27,
    bestTrade: "+$7K on $FWOG",
    riskLevel: "Medium",
    tracked: false,
    lastActive: "8m",
    holding: ["CHAD"],
    verified: false,
    copiers: 87,
  },
];

const TOKEN_POOL = [
  "PEPE2",
  "WOJAK",
  "MOODENG",
  "BOME",
  "PONKE",
  "GOAT",
  "POPCAT",
  "FWOG",
  "BONK2",
  "CHAD",
  "RETARDIO",
  "SLERF",
];
const PLATFORMS: Platform[] = ["Pump.fun", "Raydium", "Jupiter", "PumpSwap"];

function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function fmtTimeAgo(ms: number): string {
  const s = Math.floor((Date.now() - ms) / 1000);
  if (s < 60) return s + "s";
  if (s < 3600) return Math.floor(s / 60) + "m";
  return Math.floor(s / 3600) + "h";
}

let tradeIdCounter = 100;

function generateTrade(wallet: WalletProfile): Trade {
  const isBuy = Math.random() > 0.35;
  const amountSol = parseFloat((0.1 + Math.random() * 4.9).toFixed(2));
  const solPrice = 148;
  const valueUsd = parseFloat((amountSol * solPrice).toFixed(0));
  const pnlUsd = isBuy
    ? undefined
    : parseFloat(((Math.random() * 2 - 0.4) * valueUsd).toFixed(0));
  const pnlPct =
    pnlUsd !== undefined
      ? parseFloat(((pnlUsd / valueUsd) * 100).toFixed(1))
      : undefined;

  return {
    id: String(tradeIdCounter++),
    walletId: wallet.id,
    walletAddress: wallet.address,
    walletLabel: wallet.label,
    persona: wallet.persona,
    type: isBuy ? "buy" : "sell",
    token: randItem(TOKEN_POOL),
    amountSol,
    valueUsd,
    timestamp: Date.now(),
    platform: randItem(PLATFORMS),
    pnlUsd,
    pnlPct,
    copied: false,
  };
}
function seedTrades(): Trade[] {
  const now = Date.now();
  return SEED_WALLETS.flatMap((w) =>
    Array.from({ length: 3 }, (_, i) => ({
      ...generateTrade(w),
      timestamp: now - (i + 1) * (30000 + Math.random() * 60000),
    })),
  ).sort((a, b) => b.timestamp - a.timestamp);
}
export function useWalletSimulator() {
  const [wallets, setWallets] = useState<WalletProfile[]>(SEED_WALLETS);
  const [trades, setTrades] = useState<Trade[]>(seedTrades);
  const copyResetTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;
    const tick = () => {
      const wallet = randItem(SEED_WALLETS);
      const trade = generateTrade(wallet);
      setTrades((prev) => [trade, ...prev].slice(0, 80));
      setWallets((prev) =>
        prev.map((w) =>
          w.id !== wallet.id
            ? w
            : {
                ...w,
                lastActive: "0s",
                totalTrades7d: w.totalTrades7d + 1,
                pnl7d:
                  w.pnl7d +
                  (Math.random() > 0.4 ? 1 : -1) * Math.random() * 800,
              },
        ),
      );
      tid = setTimeout(tick, 1800 + Math.random() * 2200);
    };
    tid = setTimeout(tick, 1000);
    return () => clearTimeout(tid);
  }, []);
  useEffect(() => {
    const iv = setInterval(() => {
      setTrades((prev) => [...prev]); // trigger re-render for time display
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const timers = copyResetTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const toggleTrack = useCallback((id: string) => {
    setWallets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, tracked: !w.tracked } : w)),
    );
  }, []);

  const copyTrade = useCallback((tradeId: string) => {
    const prevTimer = copyResetTimers.current.get(tradeId);
    if (prevTimer) clearTimeout(prevTimer);

    setTrades((p) =>
      p.map((t) => (t.id === tradeId ? { ...t, copied: true } : t)),
    );

    const tid = setTimeout(() => {
      setTrades((p) =>
        p.map((t) => (t.id === tradeId ? { ...t, copied: false } : t)),
      );
      copyResetTimers.current.delete(tradeId);
    }, COPY_RESET_MS);
    copyResetTimers.current.set(tradeId, tid);
  }, []);

  return { wallets, trades, toggleTrack, copyTrade, fmtTimeAgo };
}
export function fmtUsd(n: number): string {
  if (Math.abs(n) >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  if (Math.abs(n) >= 1_000) return "$" + (n / 1_000).toFixed(1) + "K";
  return "$" + n.toFixed(0);
}
