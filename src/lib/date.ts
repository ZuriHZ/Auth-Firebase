// ------------------------------------------------
// getAccountAge — Calcula la antiguedad de una cuenta
// ------------------------------------------------
//
// Toma la fecha de creación del usuario (viene de
// Firebase Auth: user.metadata.creationTime) y devuelve
// un texto legible: "Hoy", "5 días", "2 meses", "1 año".
//
// Cálculo:
//   1. Convierte el string ISO a Date
//   2. Resta la fecha actual - fecha de creación
//   3. Convierte la diferencia a días
//   4. Según la cantidad, elige la unidad (días/meses/años)

export const getAccountAge = (creationTime?: string) => {
    if (!creationTime) return "Reciente";
    const created = new Date(creationTime);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "Hoy";
    if (diffDays < 30) return `${diffDays} día${diffDays > 1 ? 's' : ''}`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} mes${Math.floor(diffDays / 30) > 1 ? 'es' : ''}`;
    return `${Math.floor(diffDays / 365)} año${Math.floor(diffDays / 365) > 1 ? 's' : ''}`;
};
