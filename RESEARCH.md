# Assignment 2 — Terminal Design Research + Prototype (Deep Research)

## How this research was done

- **Primary:** hands-on patterns from widely documented product surfaces (web terminals, docs, trader reviews, 2025–2026 comparisons).
- **Lens:** not “which app is popular,” but **which surface is best-in-class for which job** — then **what Trenchers should borrow** vs **where every incumbent is weak**.

“Best” here means **best fit for a specific trader job** (speed, chart, wallet story, launch discovery, execution). No single competitor wins all dimensions.

---

## Dimensional leaderboard (who wins what)

| Dimension | Best reference | Why |
|-----------|----------------|-----|
| **Raw execution + routing story** | Axiom, Photon | Sub-second mental model, MEV/Jito narrative, sniper workflows tuned for Solana launches. |
| **Wallet radar density** | GMGN | Smart money lists, copy streams, PnL language baked into wallet rows. |
| **Telegram + scale + command muscle** | Trojan | Huge volume, BOLT execution, sniper/limit/migrate flows without leaving chat; optional web terminal. |
| **Multi-chart + portfolio breadth** | BullX Neo | TradingView-grade charts, multi-chart layouts, cross-chain portfolio — power user, higher cognitive load. |
| **Chart + TV integration + “serious terminal”** | BonkBot Telemetry | TradingView Advanced Charts in-product; unifies charting + execution story. |
| **Pair discovery + cross-chain charts** | DEXScreener | Default place to *look up* a pair; charts and liquidity context; weak on *why to trade* and wallet narrative. |
| **Solana-native analytics + alerts** | Birdeye | Deep filters, wallet metrics, LP/deployer signals — analyst-grade, less “one-tap degen” clarity. |
| **Launch context + social feed** | Pump.fun | Owns *creation* and early attention; not a full execution + wallet-intel terminal by itself. |

**Takeaway:** Trenchers should not try to be “BullX breadth + Birdeye analytics + Pump social” in v1. It should **win one wedge clearly**: **decision-grade wallet story + terminal speed in one shell** (see Unique Angle).

---

## One-by-one: platforms, critique, best match for Trenchers

### GMGN

- **What it does well:** Wallet tracking, smart-money framing, copy-trade and scanner in one ecosystem; strong **wallet-as-signal** language (PnL, activity) vs raw addresses.
- **Where it falls short:** Wallets still read as **rows in a database** — limited **behavioral narrative** (who is this trader, risk posture, timing style) in the default path.
- **Best match for Trenchers prototype:** **Whale / wallet tracker** — density of wallet + activity; **borrow** scan-first layout and PnL vocabulary.
- **Avoid cloning:** Spreadsheet aesthetics without a **“should I copy?”** summary.

### Trojan (Telegram + web)

- **What it does well:** **Action-first** UX for snipe, migrate, limits; massive distribution; **BOLT** execution story; multi-wallet without feeling like a hedge fund terminal.
- **Where it falls short:** Core habit is **chat + buttons** — deep **persona / risk** layers are not the hero; telemetry is improving but brand is “bot,” not “intel terminal.”
- **Best match for Trenchers prototype:** **Sniper + execution affordances** — one-tap clarity, slippage/MEV language; **borrow** urgency and minimal steps to act.
- **Avoid cloning:** Pure chat UI as the only surface — Trenchers web should stay **scannable tables + panels**.

### Axiom

- **What it does well:** **Sniper + analytics** positioning; wallet tracking scale (marketing claims); Pulse-style momentum; charting and holder dashboards; **unified “pro terminal”** feel.
- **Where it falls short:** Same class as others: **wallet rows ≠ trader profiles**; copy-trade can feel bolted next to analytics rather than **explained**.
- **Best match for Trenchers prototype:** **Token detail + terminal** — fast tabs, safety language, sniper adjacency; **borrow** information hierarchy for power users.
- **Avoid cloning:** Overwhelming panel count — keep **one primary question per view**.

### Photon

- **What it does well:** **Speed and chart-forward** trading; live candles; one-click buys; often cited as **fastest-feeling** web execution for memecoins.
- **Where it falls short:** **Wallet intelligence** is not the product center — optimized for **token + chart**, not **who to copy**.
- **Best match for Trenchers prototype:** **Token detail page** — chart + trade panel marriage; **borrow** tight coupling of price action and order entry.
- **Avoid cloning:** Ignoring wallet story entirely — that’s Trenchers’ wedge.

### BullX Neo

- **What it does well:** **Portfolio + multi-chart + discovery** in one product; TradingView charts; multi-chain; serious **terminal** ambition.
- **Where it falls short:** **Feature surface area** — easy to feel like ten products in one; slower **time-to-decision** for new users.
- **Best match for Trenchers prototype:** **Portfolio dashboard** — summary cards + positions table; **borrow** “overview → drill down” structure.
- **Avoid cloning:** Everything visible at once — Trenchers should **stage** complexity (terminal vs portfolio vs tracker).

### BonkBot Telemetry

- **What it does well:** **TradingView Advanced Charts** inside the product — pro chart expectations met; cross-surface (web/mobile/TG) story; wallet/token docs show **contract-level** panels (LP, dev, holders).
- **Where it falls short:** Still emerging as **the** reference vs incumbents; ecosystem tied to Bonkbot auth flows.
- **Best match for Trenchers prototype:** **Token detail** — **borrow** “serious chart + execution in one place” without building a worse chart than TV.
- **Avoid cloning:** Vendor lock-in narrative — stay **neutral Solana terminal** in brand.

### DEXScreener

- **What it does well:** **Pair lookup + charts + liquidity** across many chains; default **truth** for “show me the chart”; lightweight, fast.
- **Where it falls short:** **Not a trader operating system** — limited **execution + wallet** story in one workflow; emotionally neutral.
- **Best match for Trenchers prototype:** **Terminal table** — column discipline, % / liq / age language; **borrow** scannable numeric grid.
- **Avoid cloning:** Lifeless **read-only** feel — Trenchers needs **live + intent** (persona, copy, risk).

### Birdeye

- **What it does well:** **Solana analytics depth** — wallets, deployers, LP, alerts; fast monitoring mindset.
- **Where it falls short:** **Analyst / pro-sumer** tone; more **screens of filters** than **one-glance copy decision**.
- **Best match for Trenchers prototype:** **Risk + holder signals** on token detail; **borrow** severity language (flags, concentration).
- **Avoid cloning:** Corporate density — keep **degen-readable** hierarchy.

### Pump.fun

- **What it does well:** **Launch attention** — owns creation, bonding curve culture, real-time **new coin** energy; default **on-ramp** for attention.
- **Where it falls short:** Not where traders run **unified portfolio + wallet intel + sniper** — it’s **upstream of** the terminal job.
- **Best match for Trenchers prototype:** **Sniper / new-pair** — age, mcap, vol, **launch moment** language; **borrow** urgency and “just launched” framing.
- **Avoid cloning:** Treating Pump as the whole product — Trenchers is **downstream execution + tracking**.

---

## Best prototype mapping (what to imitate most)

| Trenchers prototype | Lead inspiration | Secondary |
|---------------------|------------------|-----------|
| **Terminal (market table)** | DEXScreener columns + Axiom/Photon density | GMGN activity language |
| **Token detail + trade** | Photon / Axiom layout + Telemetry TV seriousness | Caesarx-style trade panel patterns (internal ref) |
| **Portfolio** | BullX overview cards + Birdeye seriousness | GMGN PnL vocabulary |
| **Wallet / whale feed** | GMGN wallet lists + Trojan clarity of action | **Trenchers persona layer (unique)** |
| **Sniper / launches** | Pump.fun urgency + Axiom sniper | Photon one-click |

---

## Design philosophy (brief, 5–15 lines)

1. **Decisions before dashboards** — every screen answers one primary question; secondary data is one click or one row away, not one screen away.
2. **Dark, legible, one accent system** — green = edge / positive / live; red = harm / sell; cyan = info / routing — scanning is habit, not decoration.
3. **Tables first** — monospace numerics, stable column widths, minimal chrome; motion only for **true** updates (price flash, new row).
4. **One shell across tools** — shared header and cross-links so Terminal, Tracker, Portfolio, Sniper feel like **one app**.
5. **Honest prototype** — simulated ticks are visually obvious in demos; components are structured for **production swap-in** (data hooks, sockets later).
6. **Mobile parity of comprehension** — the “copy?” decision must survive **narrow width** (feed first, wallet context collapsed but reachable).

---

## Unique angle (what incumbents do poorly)

**Persona + risk on wallets, not only PnL.**

Most terminals optimize **token columns** (speed, liq, age). Wallet products optimize **lists of addresses + PnL**. Almost nobody merges **behavioral identity** (sniper vs accumulator vs flipper), **risk posture**, and **copy safety** into the **same** viewport as the live feed — so “copy” stays **anonymous**.

Trenchers’ wedge: **wallet-as-trader** — persona badge, risk, timing hints — next to **live trades** and **one-tap copy intent**, so users answer **“should I follow this wallet right now?”** in seconds, not after exporting CSVs.

---

## Repo routes (current)

| Route | Focus |
|-------|--------|
| `/app` | Terminal — token table, filters, live tick sim |
| `/app/tracker` | Whale tracker — split panel, personas, feed |
| `/app/token/[mint]` | Token detail + trade panel prototype |
| `/app/portfolio` | Portfolio — summary + tables |
| `/app/sniper` | Sniper / new-pair stream |

Legacy paths (`/terminal`, `/whale-tracker`, etc.) redirect into `/app/*`.

---

## What we’d ship next (production)

1. **WebSocket-backed feeds** — real ticks, real wallet logs.
2. **Persona model** — trained on historical trades, not static labels.
3. **Chart drawer** — TradingView or lightweight chart with parity to DEXScreener/Birdeye depth where needed.
4. **Copy-trade safety** — confirm, slippage, jurisdiction-aware copy.
5. **Virtualized tables** — long lists without jank.

---

## Assignment checklist

- [ ] Repo + deploy links.
- [ ] **Loom (5–10 min):** walk `/app` + `/app/tracker`, show 2–3 competitor contrasts, read philosophy + unique angle, end with “what we’d ship next.”
