# 🔥 FireLabs — Plan de Rediseño

> Branch: `main` · Proyecto: Auth-Firebase
> Última actualización: 2026-07-26

---

## ✅ COMPLETADO — FireLabs Design System

### Identidad Visual (Paleta Dark/Fire)
- [x] Paleta dark con surfaces contrastadas (lowest → highest)
- [x] Primary fire/orange + Secondary amber glow + Cyan accent
- [x] Gradientes: `fire-gradient`, `fire-gradient-subtle`, `fire-text`
- [x] Utilidades: `glass-card`, `fire-border`, `cyan-border`, `hero-pattern`, `circuit-pattern`
- [x] Animaciones: pulse-glow, heartbeat, float, shimmer, blink

### Navegación
- [x] Navbar público con links a Características, Precios, Docs, Empresa
- [x] Navbar autenticado con Dashboard, Perfil, Usuarios
- [x] Sidebar colapsable con animación Framer Motion
- [x] Sidebar filtra items por rol (admin ve más)
- [x] DashboardLayout con top bar + avatar + logout

### Páginas Públicas
- [x] Home — Hero + tools grid (Auth, Firestore, Realtime DB, Functions...)
- [x] About
- [x] Pricing
- [x] Docs
- [x] Enterprise
- [x] Terms
- [x] Privacy
- [x] 404

### Dashboard y Features (con mock data OK)
- [x] Dashboard con stats por rol (admin: usuarios, métodos, servicios, sesiones / user: proyectos, auth requests)
- [x] Acciones rápidas para admin (Gestionar Usuarios, Base de Datos)
- [x] **Auth Lab** — Cards de sesión, token, claims, providers (mock data)
- [x] **Proyectos** — Grid con filtros por estado + búsqueda (mock data)
- [x] **Funciones** — Listado de Cloud Functions (mock data)
- [x] **Ajustes** — Perfil, Seguridad, Preferencias, Apariencia (mock data + UI parcial)

### Admin — Usuarios Reales (Firebase DB)
- [x] `/admin/usuarios` — CRUD completo con Firebase Realtime DB
- [x] Tabla con search, toggle rol admin/usuario, eliminar
- [x] Modal para agregar usuario con confirmación de contraseña admin
- [x] Manejo de sesión: re-login después de crear usuario
- [x] `/database` — Tabla de usuarios con DashboardLayout, búsqueda, CRUD

### Infrastructure
- [x] Lazy loading en todas las rutas
- [x] Guards: ProtectedRoute, ProtectedAdminRoute, ProtectedDatabaseRoute, PublicRoute
- [x] Demo accounts: admin@firelabs.dev / user@firelabs.dev
- [x] Export centralizado en `src/index.ts`
- [x] DashboardDocs — Página de documentación interna (`/dashboard/docs`)
- [x] Sidebar layout fix (h-screen, overflow-hidden)

---

## ⏳ PENDIENTE

### 1. 🔴 Reorganización de Archivos (EN PROCESO)
**Ver:** `docs/reorganizacion-archivos/implementation_plan.md`

Problemas a resolver:
- `components/` es un cajón de sastre (20+ archivos mezclados)
- Cadenas de wrappers innecesarios (3 niveles de indirección)
- Duplicación `AdminUsers.tsx` vs `Usuarios.tsx`
- Mezcla `.jsx` y `.tsx` (13 archivos sin tipar)
- CSS fragmentado (3 archivos)
- `VerifyEmail` vive en `context/` (debería ser página)

### 2. 🟡 Settings — Funcionalidad pendiente
**Archivos:** `src/features/settings/components/*`
- [ ] Perfil: botón "Guardar Cambios" habilitado
- [ ] Seguridad: cambiar contraseña funcional (Firebase Auth)
- [ ] Apariencia: toggle tema oscuro/claro persistente
- [ ] Remover label "Próximamente" de 2FA si no se va a implementar

### 3. 🟡 README desactualizado
- [ ] Actualizar con info de FireLabs, nuevas rutas, features

---

## 🧭 Próximos Pasos (orden sugerido)

1. **Reorganizar archivos** (ver implementation_plan.md)
2. Habilitar guardado en Settings
3. Actualizar README
