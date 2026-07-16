import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { db } from "../firebase/firebase";
import { ref, get, set, remove } from "firebase/database";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  Users,
  Search,
  Plus,
  Trash2,
  Shield,
  User,
  X,
  Check,
  UserPlus,
} from "lucide-react";

interface Usuario {
  uid: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  demo?: boolean;
}

export const AdminUsers = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre: "",
    email: "",
    password: "",
    adminPassword: "",
    rol: "usuario",
  });
  const [modalError, setModalError] = useState("");

  const fetchUsers = async () => {
    try {
      const snapshot = await get(ref(db, "usuarios"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.entries(data).map(([uid, val]: [string, any]) => ({
          uid,
          ...val,
        }));
        setUsuarios(list);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError("");

    const adminEmail = auth.currentUser?.email;
    if (!adminEmail || !newUser.adminPassword) {
      setModalError("Debes ingresar tu contraseña actual para confirmar");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      await set(ref(db, `usuarios/${result.user.uid}`), {
        nombre: newUser.nombre,
        email: newUser.email,
        rol: newUser.rol,
        activo: true,
      });

      await signOut(auth);
      await signInWithEmailAndPassword(auth, adminEmail, newUser.adminPassword);

      setShowAddModal(false);
      setNewUser({ nombre: "", email: "", password: "", adminPassword: "", rol: "usuario" });
      fetchUsers();
    } catch (error) {
      setModalError(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  const handleDeleteUser = async (usuario: Usuario) => {
    if (
      !confirm(
        `¿Eliminar a ${usuario.nombre || usuario.email}? Esta acción no se puede deshacer.`
      )
    )
      return;

    try {
      await remove(ref(db, `usuarios/${usuario.uid}`));
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleToggleRole = async (usuario: Usuario) => {
    const newRole = usuario.rol === "admin" ? "usuario" : "admin";
    try {
      await set(ref(db, `usuarios/${usuario.uid}/rol`), newRole);
      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const filteredUsers = usuarios.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-headline-lg md:text-display-lg font-display-lg text-on-surface mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-secondary" />
            Usuarios
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            Gestiona los usuarios registrados en FireLabs
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-secondary text-on-secondary rounded-xl text-label-md font-label-md hover:opacity-90 active:scale-[0.97] transition-all"
        >
          <Plus className="w-4 h-4" />
          Agregar Usuario
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre o email..."
          className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
        />
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary" />
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="text-left px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="text-left px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="text-left px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                    Demo
                  </th>
                  <th className="text-right px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr
                    key={u.uid}
                    className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center">
                          <span className="material-symbols-outlined text-secondary text-lg">
                            {u.rol === "admin"
                              ? "admin_panel_settings"
                              : "person"}
                          </span>
                        </div>
                        <span className="text-body-md font-medium text-on-surface">
                          {u.nombre || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-body-sm text-on-surface-variant">
                        {u.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-body-sm font-medium ${
                          u.rol === "admin"
                            ? "bg-secondary/15 text-secondary"
                            : "bg-surface-container-low text-on-surface-variant"
                        }`}
                      >
                        {u.rol === "admin" ? (
                          <Shield className="w-3.5 h-3.5" />
                        ) : (
                          <User className="w-3.5 h-3.5" />
                        )}
                        {u.rol === "admin" ? "Admin" : "Usuario"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.demo ? (
                        <span className="inline-flex items-center gap-1 text-body-sm text-cyan-400">
                          <Check className="w-3.5 h-3.5" />
                          Demo
                        </span>
                      ) : (
                        <span className="text-body-sm text-on-surface-variant">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleRole(u)}
                          className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-secondary hover:bg-secondary/10 transition-all"
                          title={
                            u.rol === "admin"
                              ? "Cambiar a usuario"
                              : "Cambiar a admin"
                          }
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u)}
                          className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-error hover:bg-error/10 transition-all"
                          title="Eliminar usuario"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="text-center py-16 text-on-surface-variant">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-body-lg">No se encontraron usuarios</p>
            </div>
          )}
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-8 w-full max-w-md border border-outline-variant/30 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-headline-md font-headline-md text-on-surface">
                Agregar Usuario
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-surface-container-low transition-colors"
              >
                <X className="w-5 h-5 text-on-surface-variant" />
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-body-sm">
                {modalError}
              </div>
            )}

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-body-sm font-label-md text-on-surface-variant mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={newUser.nombre}
                  onChange={(e) =>
                    setNewUser({ ...newUser, nombre: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  placeholder="Nombre del usuario"
                />
              </div>
              <div>
                <label className="block text-body-sm font-label-md text-on-surface-variant mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  placeholder="email@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-body-sm font-label-md text-on-surface-variant mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20 text-body-sm text-on-surface-variant">
                Para crear un usuario, confirma tu contraseña actual de admin:
              </div>
              <div>
                <label className="block text-body-sm font-label-md text-on-surface-variant mb-2">
                  Tu contraseña (admin)
                </label>
                <input
                  type="password"
                  required
                  value={newUser.adminPassword}
                  onChange={(e) =>
                    setNewUser({ ...newUser, adminPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  placeholder="tu contraseña actual"
                />
              </div>
              <div>
                <label className="block text-body-sm font-label-md text-on-surface-variant mb-2">
                  Rol
                </label>
                <select
                  value={newUser.rol}
                  onChange={(e) =>
                    setNewUser({ ...newUser, rol: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                >
                  <option value="usuario">Usuario</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-secondary text-on-secondary rounded-xl text-label-md font-label-md hover:opacity-90 active:scale-[0.97] transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Crear Usuario
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
