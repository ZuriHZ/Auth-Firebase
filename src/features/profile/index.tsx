import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navbar } from "../../components/Navbar";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileSidebarCard } from "./components/ProfileSidebarCard";
import { ProfileInfoGrid } from "./components/ProfileInfoGrid";
import { ProfileUser } from "./types";

export const ProfileFeature: React.FC = () => {
    const { user } = useAuth();

    const profileUser: ProfileUser | null = user ? {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        metadata: {
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
        },
        providerData: user.providerData.map((p: { providerId: string }) => ({ providerId: p.providerId }))
    } : null;

    return (
        <div className="min-h-screen bg-background text-on-background">
            <Navbar />

            <main className="max-w-[1280px] mx-auto px-[40px] pt-28 pb-20">
                <ProfileHeader user={profileUser} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-4">
                        <ProfileSidebarCard user={profileUser} />
                    </div>

                    <div className="lg:col-span-8">
                        <ProfileInfoGrid user={profileUser} />
                    </div>
                </div>
            </main>
        </div>
    );
};
