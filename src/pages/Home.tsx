"use client";
import { HomeTemplate } from "../index.ts";
import { Navbar } from "../components/Navbar";

export const Home = () => {
    return (
        <>
            <Navbar />
            <HomeTemplate />
        </>
    );
};
