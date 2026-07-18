# Jon Stark Portfolio

A single-page developer portfolio with dark/light mode, animated sections, skill cards, a project showcase, and a contact form powered by EmailJS.

## Run & Operate

- `artifacts/portfolio: web` workflow — runs the portfolio dev server
- `artifacts/api-server: API Server` workflow — runs the Express API (contact form persistence, health check)
- `pnpm install` — install / sync all workspace deps
- `pnpm run typecheck` — typecheck all packages
- `pnpm run build` — build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite 7, Tailwind CSS v4, Framer Motion, next-themes, react-hook-form + Zod
- Icons: lucide-react, react-icons
- Contact form: @emailjs/browser (client-side email sending)
- API: Express 5 (contact submissions persisted to DB)
- DB: PostgreSQL + Drizzle ORM

## Where things live

- `artifacts/portfolio/src/components/` — Hero, About, Skills, Projects, Contact, Navbar, Footer, theme-provider
- `artifacts/portfolio/src/pages/` — not-found.tsx
- `artifacts/portfolio/src/index.css` — Tailwind v4 theme tokens (colors, fonts, radius)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contracts)
- `lib/db/src/schema/` — Drizzle DB schema (contact table)
- `artifacts/api-server/src/` — Express routes

## Architecture decisions

- Portfolio is a pure SPA — no server-side rendering, routes handled client-side
- Contact form uses EmailJS for direct browser-to-email delivery; the API server also persists submissions to the DB
- Theme (dark/light) stored in localStorage via next-themes

## Product

A developer portfolio for Jon Stark showcasing bio, skills, projects, and a contact form.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `vite.config.ts` requires `PORT` and `BASE_PATH` env vars at startup — these are injected by the artifact workflow automatically
- After any OpenAPI spec change, re-run codegen: `pnpm --filter @workspace/api-spec run codegen`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
