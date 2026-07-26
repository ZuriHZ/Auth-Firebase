"use client";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center p-8 bg-white rounded-lg shadow-2xl">
                <h1 className="text-9xl font-extrabold text-red-600 mb-4">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Página no encontrada
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Lo sentimos, la página que buscas no existe o ha sido
                    movida.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
};
