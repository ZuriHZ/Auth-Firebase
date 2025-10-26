"use client";
import { HomeTemplate } from "../index.ts";
import { Navbar } from "../index.ts";

export const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div>
                <Navbar />
            </div>
            <HomeTemplate />
        </div>
    );
};
