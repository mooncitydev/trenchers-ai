import AppShell from "@/components/app-shell/AppShell";
import TerminalRouteMotion from "@/components/terminal/TerminalRouteMotion";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <TerminalRouteMotion>{children}</TerminalRouteMotion>
    </AppShell>
  );
}
