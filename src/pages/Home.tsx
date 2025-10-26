"use client";
import { HomeTemplate } from "../index.ts";
import { Navbar } from "../index.ts";
import { HoverImageLinks } from "../components/HoverImageLinks";
export const Home = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <HomeTemplate />
            <HoverImageLinks />
        </div>
    );
};
