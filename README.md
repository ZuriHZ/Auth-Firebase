# 🔐 Firebase Auth & Realtime Database

Sistema completo de autenticación con roles, verificación de email y perfiles de usuario — construido con React 19, Firebase 12 y Tailwind CSS v4.

---

## ✨ Características Clave

- 🔑 **Autenticación completa**: Email/Password + Google OAuth
- 📧 **Verificación de email**: Flujo obligatorio antes de acceder al dashboard
- 🛡️ **Rutas protegidas**: Admin, User (verificado) y Public
- 👥 **Gestión de usuarios**: Roles en Realtime Database (admin/usuario)
- 🌙 **Dark Mode**: Oscuro automático vía clase `.dark`
- 📱 **Responsive**: Navbar desktop + móvil con Framer Motion
- ⚡ **Lazy Loading**: Rutas y componentes cargados bajo demanda
- 🚀 **Despliegue dual**: Vercel + Firebase Hosting

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| **Core** | React 19 + TypeScript 5.9 + Vite 6 |
| **Backend** | Firebase 12 (Auth + Realtime Database) |
| **Estilos** | Tailwind CSS v4 + Shadcn/UI + Radix UI |
| **Animaciones** | Framer Motion / Motion |
| **Ruteo** | React Router 7 |
| **DevOps** | Vercel + Firebase Hosting |
| **Build** | pnpm + ESLint flat config |

---

## 🚀 Features Implementadas

### Sistema de Autenticación
- Registro con email + password y actualización automática de displayName
- Login con email/password y con Google (popup)
- Recuperación de contraseña por email
- Verificación de email obligatoria antes de acceder a rutas protegidas
- Reenvío de email de verificación desde la página de verificación

### Gestión de Roles
- Roles almacenados en `/usuarios/{uid}/rol` (Realtime Database)
- Auto-creación del nodo de usuario al registrarse o hacer login con Google
- Roles disponibles: `admin`, `usuario`

### Rutas Protegidas
- **`ProtectedRoute`**: Requiere autenticación + email verificado
- **`ProtectedDatabaseRoute`**: Requiere autenticación + email verificado (cualquier usuario autenticado)
- **`AdminRoute`**: Requiere rol `admin`
- **`PublicRoute`**: Solo accesible sin autenticación (redirige a dashboard si ya está logueado)

### Páginas
| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | Dashboard | Panel principal (requiere auth) |
| `/login` | Login | Inicio de sesión |
| `/register` | Register | Registro de nuevo usuario |
| `/verify-email` | VerifyEmail | Verificación de email pendiente |
| `/profile` | Profile | Perfil de usuario |
| `/database` | DataBase | Vista de usuarios (auth requerida) |
| `/about` | About | Página pública |
| `/dashboard` | Dashboard | Panel autenticado |
| `*` | 404 | Página no encontrada |

---

## 📦 Guía de Inicio Rápido

### Requisitos
- Node.js 18+
- pnpm
- Proyecto Firebase con Auth y Realtime Database habilitados

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd Auth-Firebase

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Firebase

# Iniciar servidor de desarrollo
pnpm dev
```

### Comandos

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo (Vite, puerto 5173) |
| `pnpm build` | Build de producción (tsc + vite build) |
| `pnpm lint` | Linting con ESLint |
| `pnpm preview` | Vista previa del build |
| `pnpm deploy` | Build + deploy a Firebase Hosting |

---

## 📂 Estructura de Carpetas

```
Auth-Firebase/
├── public/                    # Archivos estáticos
├── src/
│   ├── assets/               # Imágenes, iconos
│   ├── components/           # Componentes React
│   │   ├── ui/              # Shadcn/UI components
│   │   ├── Login.jsx        # Formulario de login
│   │   ├── Register.jsx     # Formulario de registro
│   │   ├── Dashboard.jsx    # Panel principal
│   │   ├── Navbar.tsx       # Navegación desktop
│   │   ├── NavbarMovil.jsx  # Navegación móvil
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx   # Estado global de auth
│   │   └── VerifyEmail.jsx  # Verificación de email
│   ├── features/
│   │   └── profile/         # Feature de perfil
│   ├── firebase/
│   │   └── firebase.jsx     # Config de Firebase
│   ├── lib/
│   │   └── utils.ts         # Utilidades (cn, etc.)
│   ├── pages/               # Páginas/rutas
│   ├── routers/
│   │   └── routes.tsx       # Definición de rutas
│   ├── styles/
│   │   └── global.css       # Estilos globales
│   ├── index.css            # Tailwind + Shadcn
│   ├── index.ts             # Barrel exports
│   └── main.tsx             # Entry point
├── .env                      # Variables de entorno
├── firebase.json             # Config Firebase Hosting
├── vercel.json               # Config Vercel
├── vite.config.ts            # Config Vite
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencias
```

---

## ⚙️ Configuración Importante

### Firebase Console
1. Habilitar **Authentication** → Métodos: Email/Password + Google
2. Habilitar **Realtime Database**
3. Crear nodo `/usuarios` para almacenar roles

### Variables de Entorno (`.env`)

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

---

## 🌐 Despliegue

### Vercel
- Configuración en `vercel.json`: rewrites a `/` para SPA
- Build automático desde el repositorio

### Firebase Hosting
- Configuración en `firebase.json`: sirve desde `dist/`
- Comando: `pnpm deploy`

---

## 🗺️ Roadmap

- [ ] Agregar actualización de perfil de usuario
- [ ] Persistencia de sesión con Firebase Persistence
- [ ] Gestión de usuarios admin (CRUD)
- [ ] Tests unitarios y de integración
- [ ] PWA (Progressive Web App)

---

> 💡 **Proyecto educativo** — Aprendizaje profundo en Firebase Authentication y Realtime Database con React 19.
