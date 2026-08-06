# AGENTS.md — FireLabs

## Stack
- React 19 + Vite 6 + TypeScript (~5.9)
- Tailwind CSS v4 (Vite plugin, no `tailwind.config.js`)
- Shadcn/ui (style: new-york, ui alias: `@/components/ui`)
- Firebase 12 (Auth + Realtime Database)
- React Router 7 + Framer Motion
- ESLint flat config + typescript-eslint

## Dev Commands
```
pnpm dev        # vite dev server (port 5173)
pnpm build      # tsc -b && vite build
pnpm lint       # eslint .
pnpm preview    # vite preview
pnpm deploy     # build + firebase deploy
```

## Build order matters
`build` runs `tsc -b` before `vite build`. Always run lint before build locally.

## Tailwind CSS v4
Styles via `@import "tailwindcss"` in `src/index.css`. No `tailwind.config.js`. Theme vars defined inline with `@theme inline`.

## Aliases
`@` → `./src/` (configured in vite + tsconfig).

## Shadcn/ui
Add: `npx shadcn@latest add <component>`. Schema: `components.json`. CSS entry: `src/index.css`. Utils: `src/lib/utils.ts`.

## FireLabs Design System (src/index.css)
**Surface palette** (dark theme with contrast layers):
- `surface` (#1a1a2e), `surface-container-lowest` (#121220), `surface-container-low` (#24243a), `surface-container` (#2c2c44), `surface-container-high` (#353551), `surface-container-highest` (#3d3d5a)
- `background` (#0d0d18), `on-surface` (#f0eff5), `on-surface-variant` (#b8b6cc)

**Primary/Accent**:
- `primary` (#ff6b1a) — fire orange buttons/links
- `secondary` (#fb923c) — amber glow
- `fire-accent` (#22d3ee) — cyan contrast for borders/highlights

**Utility classes** (defined in `src/styles/global.css` → inspect there for exact rules):
- `glass-card` — glassmorphism surface
- `fire-border` / `cyan-border` — gradient borders
- `fire-gradient` / `fire-gradient-subtle` — background gradients
- `fire-text` — gradient text (orange→amber)
- `hero-pattern` / `circuit-pattern` — background SVGs

## Routing (`src/routers/routes.tsx`)
- React Router 7, lazy-loaded via `React.lazy()` + `Suspense`
- `AuthProvider` wraps all routes
- Public pages: `/`, `/about`, `/pricing`, `/docs`, `/enterprise`, `/terms`, `/privacy`
- Protected: `/dashboard`, `/profile`, `/auth-lab`, `/projects`, `/settings`, `/database`
- Admin-only: `/admin/usuarios`, `/functions`
- Guards in `src/components/`: `ProtectedRoute`, `ProtectedAdminRoute`, `ProtectedDatabaseRoute`, `PublicRoute`

## Auth / Firebase
- Config: `src/firebase/firebase.ts` (reads `VITE_FIREBASE_*` env vars)
- Context: `src/context/AuthContext.jsx` → `useAuth()` hook
- Roles stored in Realtime DB at `usuarios/{uid}/rol` (values: `admin`, `usuario`) — informational only for the UI
- **Admin authority lives in `database.rules.json` (`ADMIN_UIDS` explicit UID list)** — the DB is never the source of truth for admin
- Admin creation: manual via Firebase Console + `ADMIN_UIDS` (see README "Alta de Admin"); no demo credentials exist

## Layout Pattern
Pages use `DashboardLayout` (`src/components/layouts/DashboardLayout.tsx`) which wraps:
- TopBar (logo + avatar dropdown + logout)
- Sidebar (collapsible, Framer Motion, role-filtered nav items)
- Content area
- Public pages use standalone `Navbar.tsx` instead.

## Feature Structure
Each feature lives in `src/features/{name}/` with:
```
components/     # Feature-specific UI components
data/           # Mock data or Firebase queries
types/          # TypeScript interfaces
index.tsx       # Main export
```
Features with mock data: `projects`, `functions`, `settings`.
`auth-lab` shows real session data (ID token claims, providers, metadata).
Settings also has partial real functionality (profile form, password change).

## Barrel Export
`src/index.ts` re-exports all public components, pages, context, firebase, and utils. Import from `../index.ts` (or `@/`) rather than deep imports where possible.

## CSS Files
- `src/index.css` — Tailwind + shadcn + design tokens + imports
- `src/styles/global.css` — component utilities (glass-card, fire-border, gradients, animations)
- `src/style.css` — additional styles
- Dark mode via `.dark` class on root element
- Fonts: `Plus Jakarta Sans` (headings), `Inter` (body), `JetBrains Mono` (code)

## Deploy
- Vercel: `vercel.json` (rewrites all to `/`)
- Firebase Hosting: `firebase.json` serves `dist/`
- `.env` with Firebase vars (DO NOT commit)
