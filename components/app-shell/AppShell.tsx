"use client";

import { usePathname } from "next/navigation";
import ToolShellHeader, {
  type ToolId,
} from "@/components/tool-shell/ToolShellHeader";
import AppTrustStrip from "@/components/app-shell/AppTrustStrip";

function getActive(pathname: string): ToolId | null {
  if (
    pathname === "/app" ||
    pathname === "/app/" ||
    pathname.startsWith("/app/terminal")
  )
    return "terminal";
  if (pathname.startsWith("/app/tracker")) return "whale";
  if (pathname.startsWith("/app/portfolio")) return "portfolio";
  if (pathname.startsWith("/app/sniper")) return "sniper";
  if (pathname.startsWith("/app/token")) return "token";
  return null;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = getActive(pathname);

  return (
    <div
      className="terminal-app flex flex-col h-screen overflow-hidden bg-trench-bg text-[#E8EDF5] antialiased"
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      <ToolShellHeader active={active} />
      <AppTrustStrip />
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
