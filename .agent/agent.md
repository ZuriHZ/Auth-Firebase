# AGENT — FireLabs (Auth-Firebase)

## Git Workflow

### Branches
- `{tipo}/{desc}` — ej: `feat/tabla-usuarios-redesign`, `fix/settings-guardar`, `refactor/sidebar`

### Commits (Conventional Commits)
```
{tipo}: {mensaje corto}

{explicación detallada — qué se hizo y por qué}

Archivos: {paths de archivos modificados separados por comas}
```

Tipos permitidos:
- `feat` — nueva funcionalidad
- `fix` — corrección de bug
- `refactor` — refactor sin cambios funcionales
- `style` — cambios de UI/estilo
- `docs` — documentación
- `chore` — tareas de mantenimiento
- `perf` — optimización

### PRs
- Nombre ≤10 palabras — ej: `feat: rediseño tabla de usuarios con FireLabs`
- Body con:
  - Cambios realizados
  - Archivos modificados
  - Screenshots si aplica
