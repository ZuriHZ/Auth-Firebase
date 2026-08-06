# 🔥 FireLabs

> **Firebase + React 19 + Dark/Fire Design System**
> Panel de administración SaaS con identidad dark/fire — UX inspirada en Vercel, Linear y Supabase.

---

## ✨ Stack

| Categoría | Tecnología |
|-----------|------------|
| **Core** | React 19 + TypeScript ~5.9 + Vite 8 |
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
- Verificación de email (con reenvío) y recuperación de contraseña
- Roles: la autoridad de **admin se define por lista explícita de UIDs** en `database.rules.json` (UIDs literales inline en las reglas); el campo `rol` en la DB es informativo para la UI, nunca un gate de seguridad

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

### Dashboard y Features
| Ruta | Feature | Descripción |
|------|---------|-------------|
| `/dashboard` | Dashboard | Stats reales de Firebase (admin: conteo de `/usuarios`; user: datos de su sesión) + accesos directos |
| `/auth-lab` | Auth Lab | Cards con datos reales de la sesión: claims del ID token, providers, metadata |
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
│   ├── auth-lab/   → components/ (datos reales de la sesión)
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
│   └── AuthContext.tsx             # Auth + roles
├── firebase/
│   └── firebase.ts                 # Firebase config
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

## 🧪 Cuentas Demo

La app incluye 2 cuentas de prueba reales, accesibles desde el panel **"Modo Demo"** de la página de login (login con un click, credenciales visibles en pantalla — son demo, no secretos):

- 👑 **Admin Demo** — `admin@firelabs.dev` (rol `admin`)
- 👤 **Usuario Demo** — `usuario@firelabs.dev` (rol `usuario`)

Las passwords están visibles en la pantalla de login (LoginPage.tsx); no se documentan acá para no duplicarlas en el repo. Son cuentas demo, no secretos: su exposición es **deliberada** (ver 🔒 Seguridad).

---

## 🔒 Seguridad

### Contexto del proyecto

FireLabs es una **app demo/portafolio** construida para probar las herramientas de Firebase (Auth, Realtime Database, Hosting, Emulators). **No almacena datos reales de usuarios**: las cuentas existentes son de demostración y se exhiben en la pantalla de login con sus credenciales a la vista.

### Modelo de seguridad (Realtime Database)

Las reglas viven en `database.rules.json` y se validan con la suite de tests (ver más abajo) antes de tocar producción:

| Garantía | Cómo se implementa |
|----------|--------------------|
| **El admin se define por UID, no por datos** | Lista admin explícita **inline** en las reglas (`auth.uid == 'xkSkF0DVSGfJuJlNA5vpqiAfVQ92'`). El check de admin **NO** depende del campo `rol` de la DB, porque ese campo lo escribe el propio usuario — depender de él permitiría auto-promoción circular. |
| **Un usuario solo escribe su propio nodo** | `usuarios/{uid}/.write`: solo si `auth.uid == $uid` (o eres admin). |
| **Rol seguro en el primer write** | Un usuario nuevo solo puede crearse con `rol: "usuario"` (`!data.exists()` + `newData.child('rol').val() == 'usuario'`). |
| **Rol inmutable para el usuario** | En un nodo existente, el `rol` solo se puede reescribir con su valor actual (`data.exists() && newData.child('rol').val() == data.child('rol').val()`). Solo el admin puede cambiarlo. |
| **PII protegida** | Solo el admin puede **leer** `/usuarios` completo (emails de todos los usuarios). Un usuario puede leer únicamente su propio nodo (`usuarios/{uid}`). |
| **Sin campos fantasma** | `$other: { ".validate": false }` rechaza campos extra (el backdoor `demo` fue eliminado). |
| **Validación de datos** | `email` (formato), `nombre` (no vacío), `rol` (`admin`\|`usuario`), `activo` (boolean). |

### ¿Por qué es seguro para un demo público?

Las credenciales demo están a la vista **a propósito**. Aun así, el modelo resiste el abuso esperable:

- Nadie puede **auto-promoverse a admin**: escribir `rol: "admin"` en su propio nodo devuelve `permission_denied` (verificado en producción, no solo en emulador).
- Nadie puede **leer datos ajenos**: `/usuarios` es admin-only.
- El único vector aceptado es **usar la cuenta admin demo** con las credenciales públicas. Ese riesgo es **deliberado y documentado**: se mitiga con (1) datos no reales y (2) rotación del password antes de cualquier uso serio. Es el trade-off de una demo pública: cero fricción de acceso a cambio de una cuenta admin expuesta.

### Validación

Suite de reglas en `scripts/test-rules.mjs` (**12 casos** que cubren auto-promoción, inmutabilidad de rol, acceso masivo, lectura propia, campos extra y toggles de admin):

```bash
pnpm dlx firebase-tools emulators:exec "node scripts/test-rules.mjs"
```

> ⚠️ Requiere Java (JDK 17+) en el PATH. Si `java -version` falla en Windows (javapath de Oracle roto), setea `JAVA_HOME` a un JDK válido antes de correr:
> ```powershell
> $env:JAVA_HOME = "C:\Program Files\Java\jdk-23"
> pnpm dlx firebase-tools emulators:exec "node scripts/test-rules.mjs"
> ```
>
> Resultado esperado: `13/12 PASS` (13 assertions repartidas en 12 casos) y `Todos los casos pasaron`.

### Cómo dar de alta un nuevo admin

1. Creá la cuenta en **Firebase Console → Authentication** (o registrala en la app) y copiá su UID.
2. Agregá el UID a la lista admin inline en `database.rules.json` (en las reglas `.read`, `.write` y `.validate` de `usuarios`).
3. Con la cuenta admin, creá su nodo `usuarios/{uid}` con `rol: "admin"` (desde el panel `/admin/usuarios` o la consola).
4. Redesplegá las reglas:
   ```bash
   pnpm dlx firebase-tools deploy --only database:rules --project backend-01-f0da4
   ```

---

## 🌐 Deploy

- **Vercel**: `vercel.json` con rewrites SPA
- **Firebase Hosting**: `firebase.json` → sirve `dist/`

### Deploy a producción (Firebase)

```bash
pnpm build   # tsc -b && vite build → genera dist/

# 1. Reglas de la Realtime Database
pnpm dlx firebase-tools deploy --only database:rules --project backend-01-f0da4

# 2. Hosting (SPA con rewrites a /index.html)
pnpm dlx firebase-tools deploy --only hosting --project backend-01-f0da4

# 3. Todo junto
pnpm deploy   # = build + firebase-tools deploy (usa el proyecto de .firebaserc)
```

URLs de producción: hosting en `https://backend-01-f0da4.web.app` / `https://backend-01-f0da4.firebaseapp.com`; DB en `https://backend-01-f0da4-default-rtdb.firebaseio.com` (ver `.env`).
