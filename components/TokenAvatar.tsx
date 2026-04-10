"use client";

import Image from "next/image";

import { useCallback, useState } from "react";

import { memeFileStem } from "@/lib/tokenMemeImages";

const EXT = ["jpg", "png", "webp", "jpeg"] as const;

const sizeClass = {
  sm: "h-5 w-5 min-h-[20px] min-w-[20px] text-[9px]",

  md: "h-7 w-7 min-h-[28px] min-w-[28px] text-[10px]",

  lg: "h-8 w-8 min-h-[32px] min-w-[32px] text-xs",
} as const;

type Size = keyof typeof sizeClass;

interface Props {
  imageIndex: number;

  fallbackLetter: string;

  size?: Size;

  up?: boolean;

  className?: string;
}

export default function TokenAvatar({
  imageIndex,

  fallbackLetter,

  size = "md",

  up = true,

  className = "",
}: Props) {
  const [extI, setExtI] = useState(0);

  const stem = memeFileStem(imageIndex);

  const exhausted = extI >= EXT.length;

  const src = exhausted ? null : `/assets/${stem}.${EXT[extI]}`;

  const onImgError = useCallback(() => {
    setExtI((i) => i + 1);
  }, []);

  const dim = size === "sm" ? 20 : size === "lg" ? 32 : 28;

  if (!src) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-sm font-bold ${sizeClass[size]} ${className}`}
        style={{
          background: up ? "rgba(0,255,133,0.12)" : "rgba(255,59,59,0.12)",

          color: up ? "#00FF85" : "#FF3B3B",

          fontFamily: "var(--font-jetbrains)",
        }}
        aria-hidden
      >
        {fallbackLetter.slice(0, 1).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-sm border border-[#1C2535] bg-[#0A0E18] ${sizeClass[size]} ${className}`}
    >
      <Image
        key={src}
        src={src}
        alt=""
        width={dim}
        height={dim}
        className="h-full w-full object-cover"
        onError={onImgError}
        unoptimized
      />
    </div>
  );
}
