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
import { ref, set, get } from "firebase/database";

setLogLevel("silent");

const __dirname = dirname(fileURLToPath(import.meta.url));
const rulesSource = JSON.parse(
  readFileSync(join(__dirname, "..", "database.rules.json"), "utf-8")
);

// El admin de las pruebas es el UID hardcodeado en la regla .read de
// /usuarios (el emulador de RTDB no soporta funciones en rules, por eso
// la lista admin va inline). Se extrae por regex para que la suite siga
// funcionando al reemplazar el placeholder por el UID real.
const ADMIN_UID =
  rulesSource.rules.usuarios[".read"].match(/auth\.uid\s*==\s*'([^']+)'/)?.[1] ??
  "";

const PROJECT_ID = "firelabs-dev";
const DATABASE_HOST = "127.0.0.1";
const DATABASE_PORT = 9000;

const NODO_VALIDO = {
  nombre: "Ana Test",
  email: "ana@test.com",
  rol: "usuario",
  activo: true,
};

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

// ---------- Reporte ----------
console.log(`\n=== Suite de reglas FireLabs: ${passed.length}/12 PASS ===\n`);
for (const p of passed) console.log(`  [PASS] ${p}`);
if (failed.length) {
  console.log(`\nFALLARON ${failed.length} caso(s):`);
  for (const f of failed) console.log(`  [FAIL] ${f}`);
  process.exitCode = 1;
} else {
  console.log("\nTodos los casos pasaron.");
}

await testEnv.cleanup();
