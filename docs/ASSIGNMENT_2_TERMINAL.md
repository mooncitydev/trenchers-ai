# Assignment 2 — Terminal design research + prototype (TrenchersAI)

## What’s built in this repo

| Route | Prototype focus |
|-------|-----------------|
| `/app` | Terminal — token table, filters/tabs, live tick simulation, stats strip, search — **market table** direction |
| `/app/tracker` | Wallet list + persona/risk, live trade feed, copy-trade — **wallet / whale feed** |
| `/tracker` | Redirects to `/app/tracker` |
| `/app/token/[mint]` | **Token detail** layout: chart placeholder, stats, trade panel |
| `/app/portfolio` | **Positions dashboard** summary + tables (Spot-style layout; mock data) |
| `/app/sniper` | **Launch / sniper stream** filters + rows + Snipe (mock data) |

Shared **tool shell** nav: `components/tool-shell/ToolShellHeader.tsx` (links between Terminal, Whales, Portfolio, Sniper).

**Caesarx (`caesarx/frontend`)** is the production app: real `TokenPage` (TradingView, sockets, `usePlatformSwap`), `PortfolioContent`, `SniperContent`, `WalletTracker`. **Trenchers landing** prototypes mirror **routes and layout intent** only — not a code port.

---

**Deep research (dimensional matrix, platform-by-platform, best prototype match):** see root `RESEARCH.md`.

---

## Research targets — short critique (usage + takeaway)

- **GMGN / Axiom / Photon / BullX:** Strong at **speed + dense token rows** and green/red PnL language; often **noisy** (many columns, competing panels) and **weak on “why this wallet”** narrative beyond PnL.
- **Trojan / BonkBot-style bots:** Great **action clarity** (buy/sell/snipe); telemetry can feel **transactional**, not **explainable** (risk, intent, copy safety).
- **DEXScreener / Birdeye:** Excellent **charts + aggregates**; less focused on **terminal workflows** (snipe + copy + watch in one place).
- **Pump.fun:** Dominant **launch context**; light on **post-launch execution** and **wallet intelligence** in one surface.

**Design takeaway for Trenchers:** pair **terminal-grade density** (Axiom-like) with **wallet story** (who is trading, risk persona) that pure tickers rarely surface in one viewport.

---

## Design philosophy (brief)

1. **Dark, legible, one accent system** — green = edge/live/safe cues; red = harm; cyan = routing/info — so scanning is muscle-memory, not decoration.
2. **Tables first** — degens decide in seconds; rows are scannable, monospace numbers, minimal chrome.
3. **Motion only for truth** — flash rows on price updates, pulse on live; no gratuitous animation.
4. **Same shell for tools** — header pattern (Home / cross-link / title) across Terminal and Whale Tracker so the product feels like **one app**, not two websites.
5. **Honest prototype** — simulated ticks and feeds are labeled implicitly; UI is production-shaped so research maps to shippable components.

---

## Unique angle (incumbents miss this)

**Persona + risk on wallets, not only PnL.**  
Most terminals optimize **token columns**; **whale UIs** often stop at address + size. Here, each wallet carries **persona** (e.g. Early Sniper vs Diamond Hands) and **risk** as first-class labels beside address, so “copy” isn’t anonymous — it’s **contextualized** before the user commits. The **trade feed + filter-by-wallet** pattern ties **narrative** to **execution** in one flow (GMGN shows activity; this prototype pushes **who + why** next to **what**).

---

## What you’d change next (post-prototype)

- Real data + WebSocket; persist watchlists; chart drawer for a selected token (DEXScreener depth).
- Copy-trade: confirm modal, slippage, and risk disclaimer (regulatory/UX).
- Performance: virtualize long token lists; consolidate font loading on marketing shell.

---

## Deliverables checklist (assignment)

- [ ] GitHub repo + Vercel deploy (link in README or cover page).
- [ ] **Loom (~5–10 min):** walk `/app` + `/app/tracker`, show 2–3 competitor screens for contrast, read `RESEARCH.md` philosophy + unique angle aloud, end with “what we’d ship next.”

---

## Files to show in Loom (quick)

- `app/app/page.tsx` — terminal shell
- `components/terminal/TokenTable.tsx` — table + filters
- `app/app/tracker/page.tsx` — split view
- `components/whale-tracker/WalletCard.tsx` / `TradeFeed.tsx` — whale + feed
