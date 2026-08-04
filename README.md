# 🔥 FireLabs

> **Firebase + React 19 + Dark/Fire Design System**
> Panel de administración SaaS con identidad dark/fire — UX inspirada en Vercel, Linear y Supabase.

---

## ✨ Stack

| Categoría | Tecnología |
|-----------|------------|
| **Core** | React 19 + TypeScript ~5.9 + Vite 6 |
| **Auth/DB** | Firebase 12 (Auth + Realtime Database) |
| **Estilos** | Tailwind CSS v4 + Shadcn/ui (new-york) + Radix UI |
| **Animaciones** | Framer Motion / Motion |
| **Ruteo** | React Router 7 |
| **Build** | pnpm + ESLint flat config |
| **Deploy** | Vercel + Firebase Hosting |

---

## 🔥 FireLabs Design System

Paleta oscura con acentos naranja/fuego y cian de contraste.

### Colores
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-surface` | `#1a1a2e` | Fondo principal de cards/surfaces |
| `--color-surface-container-lowest` | `#121220` | Fondo más oscuro (sidebar) |
| `--color-primary` | `#ff6b1a` | Botones, links, acentos principales |
| `--color-secondary` | `#fb923c` | Glows, hover states |
| `--color-fire-accent` | `#22d3ee` | Contraste cian (bordes, highlights) |
| `--color-background` | `#0d0d18` | Fondo de página |

### Utilidades CSS
- `glass-card` — Efecto glassmorphism con blur + borde translúcido
- `fire-border` — Borde con gradiente naranja
- `cyan-border` — Borde con gradiente cian
- `fire-gradient` / `fire-gradient-subtle` — Fondo gradiente fire
- `fire-text` — Texto con gradiente fire
- `hero-pattern` — Grid sutil de fondo
- `circuit-pattern` — Patrón de circuitos

### Animaciones
`pulse-glow`, `heartbeat`, `float`, `shimmer`, `blink` en utilidades CSS.

---

## 🚀 Features

### Autenticación
- Email/Password + Google OAuth
- Verificación de email obligatoria (con reenvío)
- Recuperación de contraseña
- Roles en Realtime DB: `admin` / `usuario`

### Dashboard Premium
- **Header** con barra de búsqueda ⌘K, notificaciones y CTA "Nuevo Proyecto"
- **Sidebar colapsable** con persistencia en localStorage, secciones por rol e indicador activo tipo Linear
- **Stats compactas** en formato horizontal con micro-interacciones
- **Feed de actividad reciente** con timestamps relativos
- **Accesos directos** contextuales según el rol del usuario
- **CTAs principales** duplicados (header + página) siguiendo la Ley de Fitts
- Transiciones suaves (150-200ms) en todas las interacciones

### Páginas Públicas
| Ruta | Descripción |
|------|-------------|
| `/` | Home — Hero + tools grid |
| `/about` | Sobre FireLabs |
| `/pricing` | Planes y precios |
| `/docs` | Documentación |
| `/enterprise` | Enterprise |
| `/terms` | Términos |
| `/privacy` | Privacidad |

### Dashboard y Features (con mock data)
| Ruta | Feature | Descripción |
|------|---------|-------------|
| `/dashboard` | Dashboard | Stats por rol, actividad reciente, accesos directos |
| `/auth-lab` | Auth Lab | Cards: sesión activa, token JWT, claims, providers |
| `/projects` | Proyectos | Grid con filtros por estado + búsqueda |
| `/functions` | Funciones | Listado de Cloud Functions (admin) |
| `/settings` | Ajustes | Perfil, Seguridad, Preferencias, Apariencia |

### Gestión de Usuarios (Firebase DB real)
| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/database` | Autenticado | Tabla de usuarios (solo lectura para user) |
| `/admin/usuarios` | Admin | CRUD completo + cambiar roles + eliminar |

### Otras Rutas
| Ruta | Descripción |
|------|-------------|
| `/login` | Login |
| `/register` | Registro |
| `/verify-email` | Verificación de email |
| `/profile` | Perfil de usuario |
| `/dashboard/docs` | Documentación interna del dashboard |
| `*` | 404 |

---

## 🛡️ Route Guards

| Guard | Requisito |
|-------|-----------|
| `ProtectedRoute` | Auth + email verificado |
| `ProtectedAdminRoute` | Auth + rol `admin` |
| `ProtectedDatabaseRoute` | Auth + email verificado |
| `PublicRoute` | Sin auth (redirige si logueado) |

---

## 📂 Estructura

```
src/
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx    # Header (search, notificaciones, CTA) + Content
│   │   ├── Sidebar.tsx             # Nav colapsable con secciones e indicador activo
│   │   └── Navbar.tsx              # Navbar público/auth
│   └── ui/                         # Shadcn/ui components (button, card, dialog...)
├── guards/
│   ├── ProtectedRoute.tsx
│   ├── ProtectedAdminRoute.tsx
│   ├── ProtectedDatabaseRoute.tsx
│   └── PublicRoute.tsx
├── features/
│   ├── auth-lab/   → components/, data/  (mock)
│   ├── projects/   → components/, data/  (mock)
│   ├── functions/  → components/, data/  (mock)
│   ├── settings/   → components/, data/  (mock + UI)
│   └── profile/                        # Feature completo
├── pages/
│   ├── app/
│   │   ├── DashboardPage.tsx       # Panel principal rediseñado
│   │   ├── DashboardDocsPage.tsx   # Docs internos
│   │   └── ...                     # Otras páginas lazy-loaded
│   └── public/                     # Páginas públicas
├── context/
│   └── AuthContext.jsx             # Auth + roles
├── firebase/
│   └── firebase.jsx                # Firebase config
├── routers/
│   └── routes.tsx                   # Lazy-loaded routes
├── styles/
│   └── global.css                  # Ajustes mobile-first
├── index.css                       # Tailwind + Design System tokens
└── index.ts                        # Barrel exports
```

---

## ⚙️ Setup

```bash
pnpm install
cp .env.example .env   # Completar credenciales Firebase
pnpm dev                # Dev server → localhost:5173
```

### Variables de Entorno
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

### Comandos
| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Dev server (puerto 5173) |
| `pnpm build` | `tsc -b && vite build` |
| `pnpm lint` | ESLint |
| `pnpm preview` | Preview build |
| `pnpm deploy` | Build + Firebase Hosting |

---

## 🔑 Demo Accounts

| Email | Password | Rol |
|-------|----------|-----|
| `admin@firelabs.dev` | `Admin123!` | admin |
| `user@firelabs.dev` | `User123!` | usuario |

---

## 🌐 Deploy

- **Vercel**: `vercel.json` con rewrites SPA
- **Firebase Hosting**: `firebase.json` → sirve `dist/`
