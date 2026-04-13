import { LucideIcon } from "lucide-react";

export interface ProfileUser {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    metadata: {
        creationTime?: string;
        lastSignInTime?: string;
    };
    providerData: Array<{
        providerId: string;
    }>;
}

export interface MenuItem {
    icon: LucideIcon;
    label: string;
    href: string;
}
