// ------------------------------------------------
// maskUID — Oculta el UID de Firebase parcialmente
// ------------------------------------------------
//
// Los UIDs de Firebase son identificadores únicos largos
// (ej: "abc123def456ghi789..."). Al mostrarlos en pantalla
// (por ejemplo en una tarjeta de perfil), sólo mostramos
// los primeros 4 caracteres y el resto son asteriscos.
//
// No es una medida de seguridad real (el UID no es secreto),
// pero visualmente es más limpio que mostrar 28 caractéres
// de ID críptico.

export const maskUID = (uid: string) => {
    if (!uid) return "";

    const visible = uid.slice(0, 4);
    const hidden = "*".repeat(Math.max(uid.length - 4, 4));

    return `${visible}${hidden}`;
};
