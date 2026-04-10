import { redirect } from "next/navigation";

/** Terminal lives at `/app`; keep this route for old links. */
export default function AppTerminalRedirectPage() {
  redirect("/app");
}
