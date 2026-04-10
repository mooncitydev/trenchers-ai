# TrenchersAI Landing Page

> The AI-powered Solana trading terminal that never sleeps.

Built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.
Designed for mobile-first, performance-focused delivery with a dark tactical aesthetic.

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/trenchers-landing.git
cd trenchers-landing

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
trenchers-landing/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page (assembles all sections)
│   └── globals.css         # Design tokens, animations, utilities
├── components/
│   ├── Navbar.tsx          # Sticky nav with mobile drawer
│   ├── Hero.tsx            # Above-fold hero (5-second clarity)
│   ├── Marquee.tsx         # Platform + stats ticker
│   ├── OverviewSection.tsx # 3 core feature highlights
│   ├── ToolsGrid.tsx       # 6 tools feature cards
│   ├── HowItWorks.tsx      # 3-step onboarding
│   ├── RanksSection.tsx    # Bronze → Titan rewards
│   ├── WaitlistSection.tsx # Email early access CTA
│   ├── Footer.tsx          # Links, status indicator
│   └── ScrollReveal.tsx    # Intersection Observer for fade-ins
├── vercel.json             # Vercel deployment config
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## 🎨 Design Decisions

| Decision | Choice | Why |
|---|---|---|
| Color | `#060810` bg + `#00FF85` accent | Dark tactical terminal — matches Axiom/GMGN energy |
| Display font | Bebas Neue | Aggressive, condensed — crypto-native |
| Mono font | JetBrains Mono | Terminal authenticity for data/code |
| Body font | DM Sans | Readable, clean on mobile |
| Layout | Mobile-first, max-w-6xl | Most degens are on phones |
| Animations | CSS-only (no JS libs) | Performance — no blocking bundles |
| CTA | Single "Get Early Access" | Clear answer to "what do I do next?" |

---

## ⚡ Deploying to Vercel

### Option A — One-click from GitHub

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Done ✓

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 🔧 Customisation

### Update waitlist form
In `components/WaitlistSection.tsx`, replace the mock timeout with your real API:

```typescript
// Replace this:
await new Promise((r) => setTimeout(r, 900));

// With your endpoint:
await fetch('/api/waitlist', {
  method: 'POST',
  body: JSON.stringify({ email }),
  headers: { 'Content-Type': 'application/json' },
});
```

### Change fonts
Fonts are loaded in `app/layout.tsx` via Google Fonts. Update the `href` to swap fonts.
CSS variables `--font-bebas`, `--font-jetbrains`, `--font-dm-sans` in `globals.css` control usage.

### Swap accent color
Change `--green: #00FF85` in `globals.css` and update `tailwind.config.ts` to match.

---

## 📊 Performance Targets

- Lighthouse Performance: **90+** (mobile)
- Lighthouse Accessibility: **95+**
- LCP: **< 2.5s**
- No layout shift from font loading (uses `display=swap`)
- No client-side JS on static sections (only Navbar + Waitlist are `"use client"`)

---

## 📜 License

MIT — built for TrenchersAI.
