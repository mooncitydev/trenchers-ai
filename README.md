# TrenchersAI

Marketing site and interactive product prototypes for an AI-assisted Solana trading terminal. Built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, and **Framer Motion**, with a mobile-first layout and a dark, terminal-inspired visual language.

## Prerequisites

- Node.js 18+
- npm (or pnpm / yarn)

## Getting started

```bash
git clone <repository-url>
cd trenchers-landing
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (includes lint and typecheck) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
trenchers-landing/
├── app/
│   ├── layout.tsx, page.tsx, globals.css   # Marketing landing
│   ├── app/                                  # In-app shell (/app/*)
│   │   ├── layout.tsx
│   │   ├── page.tsx                          # Terminal home
│   │   ├── portfolio/, sniper/, tracker/
│   │   ├── terminal/
│   │   └── token/[mint]/                     # Token detail + trade UI
│   ├── portfolio/, sniper/, tracker/         # Public tool entry routes
│   ├── token/[mint]/
│   └── whale-tracker/
├── components/
│   ├── app-shell/                            # App chrome, trust strip
│   ├── portfolio/                            # Portfolio + wallet tab (mock)
│   ├── sniper/
│   ├── terminal/                             # Token table, simulators, motion
│   ├── token-detail/                         # Detail + trade panel
│   ├── tool-shell/                           # Shared tool header / nav
│   ├── whale-tracker/
│   └── …                                     # Landing sections (Hero, Navbar, etc.)
├── lib/                                      # Shared helpers (e.g. token imagery)
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## Technical notes

- **Styling:** Tailwind with project-specific tokens (see `globals.css` and `tailwind.config.ts`). Fonts are wired in `app/layout.tsx` and exposed as CSS variables.
- **Motion:** Framer Motion is used for route and section transitions where it improves perceived quality; prefer lightweight patterns on list-heavy views.
- **Data:** Prototype screens use simulated or static data unless wired to a backend.
- **Token trade panel:** The trade UI on the token detail route is loaded with `next/dynamic` and `ssr: false` to defer a heavier client bundle and keep the first paint lean.

## Deployment

The app is compatible with [Vercel](https://vercel.com) and other Node hosts that support Next.js.

1. Push the repository to your Git provider.
2. Import the project in Vercel; the framework preset should detect Next.js.
3. Deploy with default build command `npm run build` and output handled by Next.

CLI alternative:

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Customization

- **Waitlist:** Replace the mock submit handler in `components/WaitlistSection.tsx` with a call to your API (e.g. `POST /api/waitlist`).
- **Branding:** Adjust accent and surface colors in `globals.css` and align `tailwind.config.ts` if you add new semantic tokens.
- **Fonts:** Change Google Font imports and CSS variables in `app/layout.tsx` / `globals.css` as needed.

## License

MIT.
