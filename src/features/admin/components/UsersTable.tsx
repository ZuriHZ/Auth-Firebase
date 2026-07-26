import { useEffect, useState } from "react";
import { ref, get, set, remove, push } from "firebase/database";
import { db } from "../../../firebase/firebase";
import { useAuth } from "../../../context/AuthContext";
import { DashboardLayout } from "../../../components/layout/DashboardLayout";
import {
  Users, Search, Plus, Trash2, Shield, User,
  X, Check, UserPlus, Eye, EyeOff
} from "lucide-react";


interface Usuario {
  uid: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  demo?: boolean;
}

export const UsersTable = () => {
  const { userRole } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre: "",
    email: "",
    rol: "usuario",
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const isAdmin = userRole === "admin";

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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
      } else {
        setUsuarios([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast("Error al cargar usuarios", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.nombre || !newUser.email) {
      showToast("Nombre y email son requeridos", "error");
      return;
    }
    setActionLoading(true);
    try {
      const usuariosRef = ref(db, "usuarios");
      await push(usuariosRef, {
        nombre: newUser.nombre,
        email: newUser.email,
        rol: newUser.rol,
        activo: true,
      });
      setShowAddModal(false);
      setNewUser({ nombre: "", email: "", rol: "usuario" });
      showToast("Usuario agregado correctamente", "success");
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      showToast("Error al agregar usuario", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (usuario: Usuario) => {
    if (
      !confirm(
        `¿Eliminar a ${usuario.nombre || usuario.email}? Esta acción no se puede deshacer.`
      )
    )
      return;

    setActionLoading(true);
    try {
      await remove(ref(db, `usuarios/${usuario.uid}`));
      showToast("Usuario eliminado", "success");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast("Error al eliminar usuario", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleRole = async (usuario: Usuario) => {
    const newRole = usuario.rol === "admin" ? "usuario" : "admin";
    setActionLoading(true);
    try {
      await set(ref(db, `usuarios/${usuario.uid}/rol`), newRole);
      showToast(`Usuario cambiado a ${newRole}`, "success");
      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
      showToast("Error al actualizar rol", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleActive = async (usuario: Usuario) => {
    setActionLoading(true);
    try {
      await set(ref(db, `usuarios/${usuario.uid}/activo`), !usuario.activo);
      showToast(usuario.activo ? "Usuario desactivado" : "Usuario activado", "success");
      fetchUsers();
    } catch (error) {
      console.error("Error toggling active:", error);
      showToast("Error al cambiar estado", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = usuarios.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-headline-lg md:text-display-lg font-display-lg text-on-surface mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-secondary" />
            Base de Datos
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            {isAdmin
              ? "Gestiona todos los usuarios registrados"
              : "Usuarios registrados en la plataforma"}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-secondary text-on-secondary rounded-xl text-label-md font-label-md hover:opacity-90 active:scale-[0.97] transition-all"
          >
            <Plus className="w-4 h-4" />
            Agregar Usuario
          </button>
        )}
      </div>

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
                    Estado
                  </th>
                  {isAdmin && (
                    <th className="text-right px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                      Acciones
                    </th>
                  )}
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
                          {u.rol === "admin" ? (
                            <Shield className="w-4.5 h-4.5 text-secondary" />
                          ) : (
                            <User className="w-4.5 h-4.5 text-secondary" />
                          )}
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
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-body-sm font-medium ${
                          u.activo
                            ? "bg-success/10 text-success"
                            : "bg-error/10 text-error"
                        }`}
                      >
                        {u.activo ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <X className="w-3.5 h-3.5" />
                        )}
                        {u.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleRole(u)}
                            disabled={actionLoading}
                            className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-secondary hover:bg-secondary/10 transition-all disabled:opacity-40"
                            title={u.rol === "admin" ? "Cambiar a usuario" : "Cambiar a admin"}
                          >
                            <Shield className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleActive(u)}
                            disabled={actionLoading}
                            className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-warning hover:bg-warning/10 transition-all disabled:opacity-40"
                            title={u.activo ? "Desactivar" : "Activar"}
                          >
                            {u.activo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u)}
                            disabled={actionLoading}
                            className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-error hover:bg-error/10 transition-all disabled:opacity-40"
                            title="Eliminar usuario"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="text-center py-16 text-on-surface-variant">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-body-lg">
                {search ? "No se encontraron usuarios" : "No hay usuarios registrados"}
              </p>
            </div>
          )}
        </div>
      )}

      {showAddModal && isAdmin && (
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
                disabled={actionLoading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-secondary text-on-secondary rounded-xl text-label-md font-label-md hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
              >
                <UserPlus className="w-4 h-4" />
                {actionLoading ? "Agregando..." : "Crear Usuario"}
              </button>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-body-sm font-medium shadow-2xl transition-all ${
            toast.type === "success"
              ? "bg-success text-on-success"
              : "bg-error text-on-error"
          }`}
        >
          {toast.message}
        </div>
      )}
    </DashboardLayout>
  );
};
