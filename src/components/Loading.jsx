// src/components/Loading.jsx

export const Loading = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
            <div className="relative flex flex-col items-center">
                {/* Glow effect container */}
                <div className="relative w-12 h-12">
                    {/* Outer glow */}
                    <div className="absolute inset-0 rounded-full bg-secondary/20 blur-xl"></div>
                    {/* Spinner */}
                    <div className="w-12 h-12 rounded-full border-4 border-secondary/10 border-t-secondary animate-spin"></div>
                </div>
                {/* Brand name */}
                <div className="mt-8 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-3xl">
                        shield_lock
                    </span>
                    <span className="text-headline-md font-headline-lg tracking-tight text-on-surface">
                        AuthPro
                    </span>
                </div>
            </div>
        </div>
    );
};