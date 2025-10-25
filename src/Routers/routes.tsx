"use client";
import { Route, Routes } from "react-router";
import { Home, About } from "../index";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
};

export default AppRoutes;
