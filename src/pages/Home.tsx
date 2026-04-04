"use client";
import { HomeTemplate } from "../index.ts";
import { NavbarDesktop } from "../components/NavbarDesktop";
export const Home = () => {
    return (
        <>
            <NavbarDesktop />
            <HomeTemplate />
        </>
    );
};
