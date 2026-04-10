"use client";

export type PortfolioMainTab = "spot" | "wallet";

interface Props {
  active: PortfolioMainTab;
  onChange: (tab: PortfolioMainTab) => void;
}
export default function PortfolioNavigation({ active, onChange }: Props) {
  return (
    <div className="border-b border-trench-line-subtle px-4 sm:px-6 bg-trench-bg flex-shrink-0">
      <div className="flex items-center gap-2 max-w-6xl mx-auto">
        <button
          type="button"
          onClick={() => onChange("spot")}
          className={`px-4 py-3.5 text-sm font-medium transition-all duration-200 border-b-2 rounded-t-md ${
            active === "spot"
              ? "border-trench-accent text-trench-accent"
              : "border-transparent text-trench-label hover:text-[#E8EDF5] hover:border-trench-accent/35"
          }`}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Spot
        </button>
        <button
          type="button"
          onClick={() => onChange("wallet")}
          className={`px-4 py-3.5 text-sm font-medium transition-all duration-200 border-b-2 rounded-t-md ${
            active === "wallet"
              ? "border-trench-accent text-trench-accent"
              : "border-transparent text-trench-label hover:text-[#E8EDF5] hover:border-trench-accent/35"
          }`}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Wallet
        </button>
      </div>
    </div>
  );
}
