"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { stableImageIndex } from "@/lib/tokenMemeImages";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  imageIndex: number;
  price: number;
  change1h: number;
  change24h: number;
  volume24h: number;
  mcap: number;
  holders: number;
  ageMinutes: number;
  txns: number;
  safe: boolean;
  trending: boolean;
  favorited: boolean;
  flash: "up" | "down" | null;
}

const SEED_TOKENS_RAW: Omit<Token, "flash" | "favorited" | "imageIndex">[] = [
  {
    id: "1",
    name: "PEPE2",
    symbol: "P",
    price: 0.0000043,
    change1h: 12.4,
    change24h: 184.2,
    volume24h: 891000,
    mcap: 4200000,
    holders: 1240,
    ageMinutes: 2,
    txns: 4821,
    safe: true,
    trending: true,
  },
  {
    id: "2",
    name: "WOJAK",
    symbol: "W",
    price: 0.0000012,
    change1h: 4.2,
    change24h: 67.1,
    volume24h: 412000,
    mcap: 1800000,
    holders: 654,
    ageMinutes: 8,
    txns: 2103,
    safe: true,
    trending: true,
  },
  {
    id: "3",
    name: "BONK2",
    symbol: "B",
    price: 0.000091,
    change1h: -3.1,
    change24h: -12.4,
    volume24h: 2100000,
    mcap: 12400000,
    holders: 8912,
    ageMinutes: 14,
    txns: 9341,
    safe: true,
    trending: false,
  },
  {
    id: "4",
    name: "MOODENG",
    symbol: "M",
    price: 0.0000089,
    change1h: 28.9,
    change24h: 341.0,
    volume24h: 204000,
    mcap: 890000,
    holders: 421,
    ageMinutes: 1,
    txns: 1092,
    safe: false,
    trending: true,
  },
  {
    id: "5",
    name: "GOAT",
    symbol: "G",
    price: 0.000067,
    change1h: 2.1,
    change24h: 28.3,
    volume24h: 1400000,
    mcap: 6700000,
    holders: 3102,
    ageMinutes: 22,
    txns: 6720,
    safe: true,
    trending: true,
  },
  {
    id: "6",
    name: "FWOG",
    symbol: "F",
    price: 0.0000031,
    change1h: -1.8,
    change24h: -8.2,
    volume24h: 340000,
    mcap: 3100000,
    holders: 2087,
    ageMinutes: 31,
    txns: 3201,
    safe: true,
    trending: false,
  },
  {
    id: "7",
    name: "PONKE",
    symbol: "P",
    price: 0.000014,
    change1h: 7.3,
    change24h: 92.4,
    volume24h: 720000,
    mcap: 5100000,
    holders: 1876,
    ageMinutes: 45,
    txns: 4102,
    safe: true,
    trending: true,
  },
  {
    id: "8",
    name: "SLERF",
    symbol: "S",
    price: 0.000003,
    change1h: -5.2,
    change24h: -22.1,
    volume24h: 180000,
    mcap: 980000,
    holders: 502,
    ageMinutes: 60,
    txns: 891,
    safe: false,
    trending: false,
  },
  {
    id: "9",
    name: "POPCAT",
    symbol: "P",
    price: 0.00042,
    change1h: 1.4,
    change24h: 14.8,
    volume24h: 3200000,
    mcap: 18000000,
    holders: 12041,
    ageMinutes: 120,
    txns: 14200,
    safe: true,
    trending: false,
  },
  {
    id: "10",
    name: "DOGWIFHAT",
    symbol: "D",
    price: 0.00234,
    change1h: -0.8,
    change24h: -4.2,
    volume24h: 8100000,
    mcap: 42000000,
    holders: 28900,
    ageMinutes: 240,
    txns: 32100,
    safe: true,
    trending: false,
  },
  {
    id: "11",
    name: "BOME",
    symbol: "B",
    price: 0.0000071,
    change1h: 18.2,
    change24h: 103.4,
    volume24h: 560000,
    mcap: 2900000,
    holders: 1120,
    ageMinutes: 5,
    txns: 3012,
    safe: true,
    trending: true,
  },
  {
    id: "12",
    name: "MYRO",
    symbol: "M",
    price: 0.0000018,
    change1h: -2.4,
    change24h: -18.9,
    volume24h: 290000,
    mcap: 1200000,
    holders: 780,
    ageMinutes: 90,
    txns: 1890,
    safe: true,
    trending: false,
  },
  {
    id: "13",
    name: "RETARDIO",
    symbol: "R",
    price: 0.0000092,
    change1h: 9.1,
    change24h: 47.2,
    volume24h: 430000,
    mcap: 3400000,
    holders: 2310,
    ageMinutes: 38,
    txns: 2890,
    safe: false,
    trending: true,
  },
  {
    id: "14",
    name: "CHAD",
    symbol: "C",
    price: 0.000033,
    change1h: 3.7,
    change24h: 21.5,
    volume24h: 670000,
    mcap: 4800000,
    holders: 3401,
    ageMinutes: 55,
    txns: 4201,
    safe: true,
    trending: false,
  },
  {
    id: "15",
    name: "HARAMBE",
    symbol: "H",
    price: 0.0000055,
    change1h: -7.3,
    change24h: -31.2,
    volume24h: 210000,
    mcap: 1600000,
    holders: 890,
    ageMinutes: 75,
    txns: 1402,
    safe: true,
    trending: false,
  },
];

const SEED_TOKENS: Omit<Token, "flash" | "favorited">[] = SEED_TOKENS_RAW.map(
  (t) => ({ ...t, imageIndex: stableImageIndex(t.name) }),
);

function jitter(value: number, maxPct: number): number {
  const delta = value * (maxPct / 100) * (Math.random() * 2 - 1);
  return Math.max(0.000000001, value + delta);
}

export function useTokenSimulator() {
  const [tokens, setTokens] = useState<Token[]>(() =>
    SEED_TOKENS.map((t) => ({ ...t, flash: null, favorited: false })),
  );
  const flashTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  useEffect(() => {
    const tick = () => {
      const count = Math.floor(Math.random() * 4) + 1; // update 1–4 tokens
      const indices = new Set<number>();
      while (indices.size < count) {
        indices.add(Math.floor(Math.random() * SEED_TOKENS_RAW.length));
      }

      setTokens((prev) =>
        prev.map((token, i) => {
          if (!indices.has(i)) return token;
          const newPrice = jitter(token.price, 1.8);
          const direction: "up" | "down" =
            newPrice > token.price ? "up" : "down";
          const newChange1h = parseFloat(
            (token.change1h + (Math.random() * 0.6 - 0.3)).toFixed(2),
          );
          const newChange24h = parseFloat(
            (token.change24h + (Math.random() * 0.4 - 0.2)).toFixed(2),
          );
          const newVolume = jitter(token.volume24h, 0.5);
          const newTxns = token.txns + Math.floor(Math.random() * 8);
          return {
            ...token,
            price: newPrice,
            change1h: newChange1h,
            change24h: newChange24h,
            volume24h: newVolume,
            txns: newTxns,
            flash: direction,
          };
        }),
      );
      indices.forEach((i) => {
        const id = SEED_TOKENS_RAW[i].id;
        const existing = flashTimers.current.get(id);
        if (existing) clearTimeout(existing);
        const timer = setTimeout(() => {
          setTokens((prev) =>
            prev.map((t) => (t.id === id ? { ...t, flash: null } : t)),
          );
          flashTimers.current.delete(id);
        }, 450);
        flashTimers.current.set(id, timer);
      });
    };
    let timeoutId: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 600 + Math.random() * 500;
      timeoutId = setTimeout(() => {
        tick();
        schedule();
      }, delay);
    };
    schedule();

    return () => {
      clearTimeout(timeoutId);
      flashTimers.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setTokens((prev) =>
      prev.map((t) => (t.id === id ? { ...t, favorited: !t.favorited } : t)),
    );
  }, []);

  return { tokens, toggleFavorite };
}

export function fmtPrice(n: number): string {
  if (n < 0.000001) return "$" + n.toFixed(10).replace(/0+$/, "");
  if (n < 0.0001) return "$" + n.toFixed(7).replace(/0+$/, "");
  if (n < 0.01) return "$" + n.toFixed(6).replace(/0+$/, "");
  if (n < 1) return "$" + n.toFixed(4);
  return "$" + n.toFixed(2);
}

export function fmtPct(n: number): string {
  return (n >= 0 ? "+" : "") + n.toFixed(2) + "%";
}

export function fmtVolume(n: number): string {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return "$" + (n / 1_000).toFixed(1) + "K";
  return "$" + n.toFixed(0);
}

export function fmtAge(minutes: number): string {
  if (minutes < 60) return minutes + "m";
  if (minutes < 1440) return Math.floor(minutes / 60) + "h";
  return Math.floor(minutes / 1440) + "d";
}
