# TravellingSouls

Marketing and enquiry website for **TravellingSouls** — a freelance travel
agency based in Rohtak, Haryana, specialising in group tours and customized
journeys across North India.

Production domain: `https://travellingsouls.in` (not yet pointed).

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, Server Components by default) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| UI primitives | shadcn/ui *(phase 2)* |
| Icons | lucide-react *(phase 2)* |
| Database | Supabase / PostgreSQL *(phase 8)* |
| Hosting | Vercel |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Environment variables

See [`.env.example`](./.env.example) for the full list and descriptions.

`SUPABASE_SERVICE_ROLE_KEY` is **server-only** — it bypasses Row Level
Security. It must never be prefixed with `NEXT_PUBLIC_` or imported into a
Client Component.

## Build order

Foundation → design system → layout shell → homepage → destinations → tours →
group departures → Supabase → enquiries → WhatsApp → about/trip captain →
gallery/reviews → SEO → admin → testing → deployment.

Phase 1 (foundation) is complete.

## Content status

Business content is **not** yet supplied. Prices, departure dates, itineraries,
reviews, founder details and contact numbers are marked `TODO` in the codebase
and must be replaced with real information before launch. Nothing in this
repository should be treated as factual business data until then.
