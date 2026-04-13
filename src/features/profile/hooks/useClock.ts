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
        return () => clearInterval(timer);
    }, []);

    return currentTime;
};
