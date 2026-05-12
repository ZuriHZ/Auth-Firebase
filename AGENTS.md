# AGENTS.md

## Stack
- React 19 + Vite 6 + TypeScript (~5.9)
- Tailwind CSS v4 (Vite plugin, no `tailwind.config.js`)
- Shadcn/ui (style: new-york, ui alias: `@/components/ui`)
- Firebase 12 (Auth + Realtime Database)
- ESLint flat config + typescript-eslint

## Dev Commands
```bash
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
Add components: `npx shadcn@latest add <component>`. Schema: `components.json`. CSS entry: `src/index.css`. Utils: `src/lib/utils.ts`.

## Routing
`src/routers/routes.tsx` — React Router 7, lazy-loaded routes. `AuthProvider` wraps routes. Protected routes via `ProtectedRoute`, `ProtectedDatabaseRoute`, `PublicRoute` in `src/components/`.

## Auth / Firebase
- Config: `src/firebase/firebase.jsx` (reads env vars)
- Context: `src/context/AuthContext.jsx` — `useAuth()` hook
- User roles stored in Realtime DB (`usuarios/{uid}/rol`)
- On signup: auto-creates DB node + sends email verification

## CSS
- `src/index.css` — Tailwind + shadcn + imports
- `src/styles/global.css` — global overrides, mobile-first
- `src/style.css` — additional styles
- Dark mode via `.dark` class on root

## TypeScript
Strict mode. Two tsconfigs: `tsconfig.json` (app/library, `moduleResolution: bundler`) and `tsconfig.app.json` (used by build). `verbatimModuleSyntax: true` in app config.

## Deploy
- Vercel: `vercel.json` (rewrites all to `/`)
- Firebase Hosting: `firebase.json` serves `dist/`
- `.env` con vars Firebase (NO commitear)
