"use client";

import { useState, useEffect, useRef } from "react";
import { useTokenSimulator } from "@/components/terminal/useTokenSimulator";
import TerminalToolbar from "@/components/terminal/TerminalToolbar";
import TerminalStats from "@/components/terminal/TerminalStats";
import TokenTable from "@/components/terminal/TokenTable";
import type { FilterTab } from "@/components/terminal/TokenTable";

export default function AppPage() {
  const { tokens, toggleFavorite } = useTokenSimulator();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [tickCount, setTickCount] = useState(0);
  const prevTokensRef = useRef(tokens);

  useEffect(() => {
    if (tokens.length > 0) {
      const t = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(t);
    }
  }, [tokens]);

  useEffect(() => {
    const changed = tokens.filter((t, i) => {
      const prev = prevTokensRef.current[i];
      return prev && (prev.price !== t.price || prev.txns !== t.txns);
    }).length;
    if (changed > 0) setTickCount((n) => n + changed);
    prevTokensRef.current = tokens;
  }, [tokens]);

  return (
    <>
      <TerminalToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={search}
        onSearch={setSearch}
        tickCount={tickCount}
      />
      <TerminalStats tokens={tokens} />
      <TokenTable
        tokens={tokens}
        activeTab={activeTab}
        search={search}
        onFavorite={toggleFavorite}
        loading={loading}
      />
    </>
  );
}
