// ------------------------------------------------
// useClock — Hook de reloj en tiempo real
// ------------------------------------------------
//
// Devuelve la hora actual como string, actualizándose
// cada segundo. Se usa en el header del perfil para
// mostrar un reloj en vivo.
//
// CÓMO FUNCIONA:
//   1. useState inicializa con la hora actual
//   2. useEffect crea un setInterval de 1 segundo
//   3. Cada segundo, actualiza el estado con la nueva hora
//   4. El return del useEffect hace clearInterval cuando
//      el componente se desmonta (limpieza de recursos)
//
// Por qué un hook custom y no inline en el componente:
//   - Separa la lógica del reloj de la UI del header
//   - Si otro componente necesita la hora, reusa el hook
//   - Más fácil de testear

import { useState, useEffect } from "react";

export const useClock = () => {
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
        }, 1000);

        // Limpia el intervalo al desmontar: sin esto, el
        // reloj seguiría actualizándose en memoria aunque
        // el componente ya no exista (memory leak).
        return () => clearInterval(timer);
    }, []);

    return currentTime;
};
