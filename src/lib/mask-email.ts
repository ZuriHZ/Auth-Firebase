// ------------------------------------------------
// Utilidades para ocultar datos sensibles
// ------------------------------------------------
//
// useToggleVisibility: hook simple para mostrar/ocultar.
//
// maskEmail: oculta parcialmente un email.
//   "usuario@gmail.com" -> "us****@gmail.com"
//   Sirve para mostrar el email en pantalla sin exponerlo
//   completamente (seguridad por oscurecimiento visual).
//
// maskUID: igual pero para UIDs de Firebase.
//   "abc123def456..." -> "abc***************"

import { useState } from "react";

export function useToggleVisibility(initial = false) {
    const [visible, setVisible] = useState(initial);
    const toggle = () => setVisible(v => !v);
    return { visible, toggle };
}

export function maskEmail(email: string, visibleChars = 2) {
    if (!email) return "";

    const [name, domain] = email.split("@");

    const visible = name.slice(0, visibleChars);
    const hidden = "*".repeat(Math.max(name.length - visibleChars, 4));

    return `${visible}${hidden}@${domain}`;
}