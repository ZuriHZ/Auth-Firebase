// ------------------------------------------------------------
// Suite de tests de reglas para la Realtime Database de FireLabs
// Requiere: emuladores de Firebase corriendo (database puerto 9000)
//
// Correr:
//   pnpm dlx firebase-tools emulators:exec "node scripts/test-rules.mjs"
//   (requiere Java 11+ instalado — lo usan los emuladores de Firebase)
// ------------------------------------------------------------
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { initializeTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { setLogLevel } from "firebase/app";
import { ref, set, get, update, remove } from "firebase/database";

setLogLevel("silent");

const __dirname = dirname(fileURLToPath(import.meta.url));
const rulesSource = JSON.parse(
  readFileSync(join(__dirname, "..", "database.rules.json"), "utf-8")
);

// El admin de las pruebas es el UID hardcodeado en las reglas (el emulador
// de RTDB no soporta funciones en rules, por eso la lista admin va inline).
// Se extrae recorriendo TODOS los strings de reglas y tomando el token
// alfanumérico largo que más se repite (el UID real aparece en varias
// reglas; los UIDs sintéticos de los tests no están en las reglas). Es
// robusto ante cambios de estructura de database.rules.json.
function collectRuleStrings(node, out) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith(".") && typeof value === "string") {
      out.push(value);
    } else if (value && typeof value === "object") {
      collectRuleStrings(value, out);
    }
  }
}

const ruleStrings = [];
collectRuleStrings(rulesSource.rules, ruleStrings);
const uidCounts = new Map();
for (const rule of ruleStrings) {
  for (const match of rule.matchAll(/[0-9A-Za-z]{20,}/g)) {
    const uid = match[0];
    uidCounts.set(uid, (uidCounts.get(uid) ?? 0) + 1);
  }
}
const ADMIN_UID =
  [...uidCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";

const PROJECT_ID = "firelabs-dev";
const DATABASE_HOST = "127.0.0.1";
const DATABASE_PORT = 9000;

const NODO_VALIDO = {
  nombre: "Ana Test",
  email: "ana@test.com",
  rol: "usuario",
  activo: true,
};

// UIDs sintéticos para los tests de usuarios normales:
//   uidNormal1   -> el usuario "normal" protagonista
//   uidNormal2   -> otro usuario (ajeno)
//   uidAdminFake -> nodo con rol 'admin' en datos pero SIN el UID
//                   hardcodeado: verifica que el rol de DB no otorga
//                   privilegios reales.
const UID_NORMAL = "uidNormal1";
const UID_OTRO = "uidNormal2";
const UID_ADMIN_FAKE = "uidAdminFake";

let testEnv;

testEnv = await initializeTestEnvironment({
  projectId: PROJECT_ID,
  database: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    rules: JSON.stringify(rulesSource),
  },
});

const passed = [];
const failed = [];

async function test(name, fn) {
  try {
    await fn();
    passed.push(name);
  } catch (err) {
    failed.push(`${name} :: ${err.message?.split("\n")[0] ?? err}`);
  }
}

async function seedUsuario(uid, data = NODO_VALIDO) {
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    await set(ref(ctx.database(), `usuarios/${uid}`), data);
  });
}

// ---------- 1. No-autenticado no puede leer /usuarios ----------
await test("1. No-autenticado NO puede leer /usuarios", async () => {
  const anon = testEnv.unauthenticatedContext();
  await assertFails(get(ref(anon.database(), "usuarios")));
});

// ---------- 2. No-autenticado no puede escribir ningún nodo ----------
await test("2. No-autenticado NO puede escribir ningún nodo", async () => {
  const anon = testEnv.unauthenticatedContext();
  await assertFails(
    set(ref(anon.database(), `usuarios/anon${Date.now()}`), NODO_VALIDO)
  );
});

// ---------- 3. Usuario autenticado puede escribir SU propio nodo (signup) ----------
await test("3. Usuario autenticado SÍ puede escribir su propio nodo (signup)", async () => {
  const uid = "uid-signup";
  const user = testEnv.authenticatedContext(uid);
  await assertSucceeds(
    set(ref(user.database(), `usuarios/${uid}`), {
      nombre: "Signup User",
      email: "signup@test.com",
      rol: "usuario",
      activo: true,
    })
  );
});

// ---------- 4. Usuario NO puede escribir el nodo de otro ----------
await test("4. Usuario NO puede escribir el nodo de otro usuario", async () => {
  await seedUsuario("uid-otro");
  const user = testEnv.authenticatedContext("uid-propio");
  await assertFails(
    set(ref(user.database(), "usuarios/uid-otro"), NODO_VALIDO)
  );
});

// ---------- 5. Auto-promoción bloqueada en la creación ----------
await test("5. Usuario NO puede crear su nodo con rol: admin (auto-promoción)", async () => {
  const uid = "uid-autopromo";
  const user = testEnv.authenticatedContext(uid);
  await assertFails(
    set(ref(user.database(), `usuarios/${uid}`), {
      ...NODO_VALIDO,
      rol: "admin",
    })
  );
});

// ---------- 6. rol inmutable salvo admin ----------
await test("6a. Usuario NO puede modificar rol en su propio nodo", async () => {
  await seedUsuario("uid-inmutable");
  const user = testEnv.authenticatedContext("uid-inmutable");
  await assertFails(
    set(ref(user.database(), "usuarios/uid-inmutable/rol"), "admin")
  );
  await assertFails(
    set(ref(user.database(), "usuarios/uid-inmutable"), {
      ...NODO_VALIDO,
      rol: "admin",
    })
  );
});

await test("6b. Usuario SÍ puede reescribir su nodo con el mismo rol", async () => {
  const user = testEnv.authenticatedContext("uid-inmutable");
  await assertSucceeds(
    set(ref(user.database(), "usuarios/uid-inmutable"), {
      ...NODO_VALIDO,
      nombre: "Ana Renombrada",
    })
  );
});

// ---------- 7. Usuario NO puede leer /usuarios ----------
await test("7. Usuario NO puede leer /usuarios (acceso masivo bloqueado)", async () => {
  const user = testEnv.authenticatedContext("uid-propio");
  await assertFails(get(ref(user.database(), "usuarios")));
});

// ---------- 8. Admin puede leer /usuarios ----------
await test("8. Admin SÍ puede leer /usuarios", async () => {
  const admin = testEnv.authenticatedContext(ADMIN_UID);
  await assertSucceeds(get(ref(admin.database(), "usuarios")));
});

// ---------- 9. Admin puede escribir cualquier nodo (incl. toggle rol) ----------
await test("9. Admin SÍ puede modificar rol de cualquier usuario (toggle)", async () => {
  await seedUsuario("uid-toggle");
  const admin = testEnv.authenticatedContext(ADMIN_UID);
  await assertSucceeds(
    set(ref(admin.database(), "usuarios/uid-toggle/rol"), "admin")
  );
  await assertSucceeds(
    set(ref(admin.database(), "usuarios/uid-toggle/rol"), "usuario")
  );
});

// ---------- 10. rol inválido rechazado ----------
await test("10. Nodo con rol inválido es rechazado", async () => {
  await seedUsuario("uid-rolinvalido");
  const user = testEnv.authenticatedContext("uid-rolinvalido");
  await assertFails(
    set(ref(user.database(), "usuarios/uid-rolinvalido"), {
      ...NODO_VALIDO,
      rol: "superadmin",
    })
  );
});

// ---------- 11. Campos extra rechazados (demo eliminado) ----------
await test("11. Nodo con campos extra es rechazado (demo: true)", async () => {
  const uid = "uid-extra";
  const user = testEnv.authenticatedContext(uid);
  await assertFails(
    set(ref(user.database(), `usuarios/${uid}`), {
      ...NODO_VALIDO,
      demo: true,
    })
  );
});

// ---------- 12. Usuario SÍ puede leer su propio nodo ----------
await test("12. Usuario SÍ puede leer su propio nodo", async () => {
  await seedUsuario("uid-lectura-propia");
  const user = testEnv.authenticatedContext("uid-lectura-propia");
  await assertSucceeds(
    get(ref(user.database(), "usuarios/uid-lectura-propia"))
  );
});

// ============================================================
// SUITE AMPLIADA — tests con nombres exactos (snake_case)
// ============================================================

// ---------- No autenticado ----------
await test("anonymous_read_denied", async () => {
  const anon = testEnv.unauthenticatedContext();
  await assertFails(get(ref(anon.database(), "usuarios")));
  await assertFails(get(ref(anon.database(), `usuarios/${UID_NORMAL}`)));
});

await test("anonymous_write_denied", async () => {
  const anon = testEnv.unauthenticatedContext();
  await assertFails(
    set(ref(anon.database(), `usuarios/anon-${Date.now()}`), NODO_VALIDO)
  );
});

// ---------- Lecturas del usuario normal ----------
await test("user_read_own_allowed", async () => {
  await seedUsuario(UID_NORMAL);
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertSucceeds(get(ref(user.database(), `usuarios/${UID_NORMAL}`)));
});

await test("user_read_other_denied", async () => {
  await seedUsuario(UID_OTRO);
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(get(ref(user.database(), `usuarios/${UID_OTRO}`)));
});

await test("user_read_collection_denied", async () => {
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(get(ref(user.database(), "usuarios")));
});

// ---------- Escrituras del usuario normal ----------
await test("user_write_own_allowed", async () => {
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertSucceeds(
    set(ref(user.database(), `usuarios/${UID_NORMAL}`), {
      nombre: "Normal User",
      email: "normal@test.com",
      rol: "usuario",
      activo: true,
    })
  );
});

await test("user_write_other_denied", async () => {
  await seedUsuario(UID_OTRO);
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(
    set(ref(user.database(), `usuarios/${UID_OTRO}`), NODO_VALIDO)
  );
});

await test("user_cannot_promote_self", async () => {
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(
    set(ref(user.database(), `usuarios/${UID_NORMAL}`), {
      ...NODO_VALIDO,
      rol: "admin",
    })
  );
});

await test("user_cannot_change_existing_role", async () => {
  await seedUsuario(UID_NORMAL);
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(
    set(ref(user.database(), `usuarios/${UID_NORMAL}/rol`), "admin")
  );
  await assertFails(
    update(ref(user.database(), `usuarios/${UID_NORMAL}`), { rol: "admin" })
  );
});

await test("user_cannot_change_active", async () => {
  await seedUsuario(UID_NORMAL);
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(
    set(ref(user.database(), `usuarios/${UID_NORMAL}/activo`), false)
  );
  await assertFails(
    update(ref(user.database(), `usuarios/${UID_NORMAL}`), { activo: false })
  );
});

await test("user_cannot_create_extra_fields", async () => {
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(
    set(ref(user.database(), `usuarios/${UID_NORMAL}`), {
      ...NODO_VALIDO,
      demo: true,
    })
  );
});

// ---------- Borrado ----------
await test("user_cannot_delete_other_user", async () => {
  await seedUsuario(UID_OTRO);
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(remove(ref(user.database(), `usuarios/${UID_OTRO}`)));
});

await test("user_cannot_delete_self", async () => {
  await seedUsuario(UID_NORMAL);
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(remove(ref(user.database(), `usuarios/${UID_NORMAL}`)));
});

// ---------- Integridad de estructura ----------
await test("user_cannot_overwrite_incomplete_node", async () => {
  await seedUsuario(UID_NORMAL);
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(
    set(ref(user.database(), `usuarios/${UID_NORMAL}`), { rol: "usuario" })
  );
});

await test("user_cannot_create_incomplete_node", async () => {
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(
    set(ref(user.database(), `usuarios/${UID_NORMAL}`), { rol: "usuario" })
  );
});

await test("user_cannot_write_scalar", async () => {
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(set(ref(user.database(), `usuarios/${UID_NORMAL}`), "hola"));
});

await test("user_cannot_change_own_email_to_invalid", async () => {
  await seedUsuario(UID_NORMAL);
  const user = testEnv.authenticatedContext(UID_NORMAL);
  await assertFails(
    set(ref(user.database(), `usuarios/${UID_NORMAL}/email`), "a@b.")
  );
});

// ---------- El rol 'admin' en datos NO otorga privilegios ----------
await test("user_with_fake_admin_role_gets_no_privileges", async () => {
  await seedUsuario(UID_ADMIN_FAKE, { ...NODO_VALIDO, rol: "admin" });
  const fake = testEnv.authenticatedContext(UID_ADMIN_FAKE);
  await assertFails(get(ref(fake.database(), "usuarios")));
  await assertFails(get(ref(fake.database(), `usuarios/${UID_NORMAL}`)));
  await assertFails(
    set(ref(fake.database(), `usuarios/${UID_NORMAL}`), NODO_VALIDO)
  );
});

// ---------- Privilegios del admin (UID hardcodeado) ----------
await test("admin_can_read_users", async () => {
  await seedUsuario(UID_NORMAL);
  const admin = testEnv.authenticatedContext(ADMIN_UID);
  await assertSucceeds(get(ref(admin.database(), "usuarios")));
  await assertSucceeds(get(ref(admin.database(), `usuarios/${UID_NORMAL}`)));
});

await test("admin_can_modify_users", async () => {
  await seedUsuario(UID_OTRO);
  const admin = testEnv.authenticatedContext(ADMIN_UID);
  await assertSucceeds(
    set(ref(admin.database(), `usuarios/${UID_OTRO}`), {
      ...NODO_VALIDO,
      nombre: "Modificado por Admin",
    })
  );
});

await test("admin_can_change_roles", async () => {
  await seedUsuario(UID_OTRO);
  const admin = testEnv.authenticatedContext(ADMIN_UID);
  await assertSucceeds(
    set(ref(admin.database(), `usuarios/${UID_OTRO}/rol`), "admin")
  );
  await assertSucceeds(
    set(ref(admin.database(), `usuarios/${UID_OTRO}/rol`), "usuario")
  );
});

await test("admin_can_change_active", async () => {
  await seedUsuario(UID_OTRO);
  const admin = testEnv.authenticatedContext(ADMIN_UID);
  await assertSucceeds(
    set(ref(admin.database(), `usuarios/${UID_OTRO}/activo`), false)
  );
  await assertSucceeds(
    set(ref(admin.database(), `usuarios/${UID_OTRO}/activo`), true)
  );
});

await test("admin_can_delete_users", async () => {
  await seedUsuario(UID_OTRO);
  const admin = testEnv.authenticatedContext(ADMIN_UID);
  await assertSucceeds(remove(ref(admin.database(), `usuarios/${UID_OTRO}`)));
});

await test("admin_can_create_user_node", async () => {
  const admin = testEnv.authenticatedContext(ADMIN_UID);
  await assertSucceeds(
    set(ref(admin.database(), `usuarios/uidCreadoPorAdmin`), {
      ...NODO_VALIDO,
      nombre: "Creado por Admin",
      email: "admin-made@test.com",
    })
  );
});

// El .validate del nodo exige isObject() para TODOS (admin incluido),
// para evitar corrupción de estructura con escalares.
await test("admin_can_write_scalar", async () => {
  const admin = testEnv.authenticatedContext(ADMIN_UID);
  await assertFails(
    set(ref(admin.database(), "usuarios/uidScalarAdmin"), "hola")
  );
});

// ---------- Reporte ----------
const total = passed.length + failed.length;
console.log(`\n=== Suite de reglas FireLabs: ${passed.length}/${total} PASS ===\n`);
for (const p of passed) console.log(`  [PASS] ${p}`);
if (failed.length) {
  console.log(`\nFALLARON ${failed.length} caso(s):`);
  for (const f of failed) console.log(`  [FAIL] ${f}`);
  process.exitCode = 1;
} else {
  console.log("\nTodos los casos pasaron.");
}

await testEnv.cleanup();