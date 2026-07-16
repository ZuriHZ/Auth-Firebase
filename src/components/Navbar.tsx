import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  LogOut,
  Home,
  Database,
  User as UserIcon,
  Flame,
  Sparkles,
  CreditCard,
  BookOpen,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItemsPublic = [
  { name: "Características", path: "/#features", icon: Sparkles },
  { name: "Precios", path: "/pricing", icon: CreditCard },
  { name: "Documentación", path: "/docs", icon: BookOpen },
  { name: "Empresa", path: "/enterprise", icon: Building2 },
];

const menuItemsAuth = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Perfil", path: "/profile", icon: UserIcon },
  { name: "Usuarios", path: "/database", icon: Database },
];

interface NavbarProps {
  variant?: "public" | "auth";
}

export const Navbar: React.FC<NavbarProps> = ({ variant = "public" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthVariant = variant === "auth" || user !== null;
  const menuItems = isAuthVariant ? menuItemsAuth : menuItemsPublic;

  const handleLogout = async () => {
    setIsMenuOpen(false);
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-surface/85 backdrop-blur-lg border-b border-outline-variant/20 sticky top-0 z-50 w-full h-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex justify-between items-center h-full">
          {/* Logo + Desktop Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-9 h-9 rounded-lg bg-secondary/15 flex items-center justify-center group-hover:bg-secondary/25 transition-colors">
                <Flame className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-headline-md font-headline-lg tracking-tight text-on-surface">
                FireLabs
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-body-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all"
                  onClick={handleNavClick}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthVariant ? (
              <>
                {/* User Info */}
                <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20">
                  <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      person
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-body-sm font-semibold text-on-surface leading-none">
                      {user?.displayName || "Usuario"}
                    </p>
                    <p className="text-label-md text-on-surface-variant leading-none mt-0.5">
                      {user?.email?.split("@")[0]}
                    </p>
                  </div>
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 border border-outline-variant/30 rounded-lg text-body-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar sesión</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-lg text-body-sm font-medium text-on-surface-variant hover:text-on-surface border border-outline-variant/30 hover:border-outline-variant/60 transition-all"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-lg text-body-sm font-medium bg-secondary text-on-secondary hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-secondary/20"
                >
                  Comenzar Gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-container-low transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-on-surface" />
            ) : (
              <Menu className="w-6 h-6 text-on-surface" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-outline-variant/20 overflow-hidden z-40"
          >
            <div className="px-6 py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all"
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-outline-variant/20 mt-3 space-y-2">
                {isAuthVariant ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary text-lg">
                          person
                        </span>
                      </div>
                      <div>
                        <p className="text-body-md font-semibold text-on-surface leading-none">
                          {user?.displayName || "Usuario"}
                        </p>
                        <p className="text-label-md text-on-surface-variant leading-none mt-0.5">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface-container-low text-on-surface-variant font-medium rounded-lg hover:bg-surface-container hover:text-on-surface transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={handleNavClick}
                      className="block w-full text-center px-4 py-3 border border-outline-variant/30 rounded-lg text-body-md font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/register"
                      onClick={handleNavClick}
                      className="block w-full text-center px-4 py-3 bg-secondary text-on-secondary font-medium rounded-lg hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                      Comenzar Gratis
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
