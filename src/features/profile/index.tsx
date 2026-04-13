import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Home, Info, Users } from "lucide-react";
import { ProfileNavbar } from "./components/ProfileNavbar";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileSidebarCard } from "./components/ProfileSidebarCard";
import { ProfileInfoGrid } from "./components/ProfileInfoGrid";
import { MenuItem, ProfileUser } from "./types";

export const ProfileFeature: React.FC = () => {
    const { user, logout } = useAuth();

    // Map Firebase User to our ProfileUser type
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

    const menuItems: MenuItem[] = [
        { icon: Home, label: "Inicio", href: "/dashboard" },
        { icon: Info, label: "Acerca de", href: "/about" },
        { icon: Users, label: "Comunidad", href: "/database" },
    ];

    return (
        <div className="min-h-screen bg-[#fcfcfd] selection:bg-blue-100 selection:text-blue-900">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/30 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/30 blur-[120px] rounded-full" />
            </div>

            <ProfileNavbar 
                user={profileUser} 
                logout={logout} 
                menuItems={menuItems} 
            />

            <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
