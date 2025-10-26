"use client";
import { useEffect, useState } from "react";
import { ref, onValue, push } from "firebase/database";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

interface Usuario {
    nombre: string;
    email: string;
    rol: string;
    activo: boolean;
}

export const TablaUsuarios = () => {
    const { userRole } = useAuth();
    const [usuarios, setUsuarios] = useState<Record<string, Usuario>>({});

    useEffect(() => {
        const usuariosRef = ref(db, "usuarios");
        const unsubscribe = onValue(usuariosRef, (snapshot) => {
            const data = snapshot.val() || {};
            setUsuarios(data);
        });
        return () => unsubscribe();
    }, []);

    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: "",
        rol: "usuario",
        activo: true,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
    };

    const agregarUsuario = () => {
        if (!nuevoUsuario.nombre) {
            alert("Nombre y email son requeridos");
            return;
        }
        const usuariosRef = ref(db, "usuarios");
        push(usuariosRef, nuevoUsuario);
        setNuevoUsuario({
            nombre: "",
            rol: "usuario",
            activo: true,
        });
    };

    return (
        <>
            {/* Solo mostrar formulario de agregar si es admin */}
            {userRole === "admin" && (
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">Agregar Usuario</h2>
                    <div className="flex items-center gap-4 mb-4 p-4 bg-gray-800 rounded-lg">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={nuevoUsuario.nombre}
                            onChange={handleInputChange}
                            className="p-2 border rounded bg-gray-700 text-white"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={nuevoUsuario.email}
                            onChange={handleInputChange}
                            className="p-2 border rounded bg-gray-700 text-white"
                        />
                        <select
                            title="rol"
                            name="rol"
                            value={nuevoUsuario.rol}
                            onChange={handleInputChange}
                            className="p-2 border rounded bg-gray-700 text-white"
                        >
                            <option value="usuario">Usuario</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button
                            onClick={agregarUsuario}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            )}
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Usuarios registrados</h2>
                <table className="min-w-full border border-gray-700 rounded-lg text-left">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Rol</th>
                            <th className="p-2">Activo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(usuarios).map(([uid, user]) => (
                            <tr key={uid} className="border-t border-gray-600">
                                <td className="p-2">{user.nombre}</td>
                                <td className="p-2">{user.rol}</td>
                                <td className="p-2">
                                    {user.activo ? "Sí" : "No"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
