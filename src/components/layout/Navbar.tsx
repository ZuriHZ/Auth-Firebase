import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Menu,
  X,
  LogOut,
  Flame,
  Sparkles,
  CreditCard,
  BookOpen,
  Building2,
  Settings,
  User as UserIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItemsPublic = [
  { name: "Características", path: "/#features", icon: Sparkles },
  { name: "Precios", path: "/pricing", icon: CreditCard },
  { name: "Documentación", path: "/docs", icon: BookOpen },
  { name: "Empresa", path: "/enterprise", icon: Building2 },
];

// Removed menuItemsAuth as per user request to keep public navbar corporate

interface NavbarProps {
  variant?: "public" | "auth";
}

export const Navbar: React.FC<NavbarProps> = ({ variant = "public" }) => {
  const { user, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = userRole === "admin";
  const isAuthVariant = variant === "auth" || user !== null;
  const menuItems = menuItemsPublic;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 hover:bg-surface-container-low p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-outline-variant/20"
                >
                  <div className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center border border-outline-variant/30 overflow-hidden">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-secondary text-xl">
                        {isAdmin ? "admin_panel_settings" : "person"}
                      </span>
                    )}
                  </div>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-body-sm font-medium text-on-surface leading-tight">
                      {user.displayName || "Usuario"}
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-medium uppercase tracking-wider leading-tight">
                      {isAdmin ? "Admin" : "Usuario"}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-outline-variant/10 mb-2">
                      <p className="text-sm font-medium text-on-surface truncate">{user.displayName || "Usuario"}</p>
                      <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                    </div>
                    
                    <Link 
                      to="/profile" 
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      Mi Perfil
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Ajustes
                    </Link>
                    <Link 
                      to="/dashboard/docs" 
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      Documentación
                    </Link>
                    
                    <div className="h-px bg-outline-variant/10 my-2"></div>
                    
                    <div className="px-2 pb-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
                    <div className="flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-lg mb-2">
                      <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center overflow-hidden">
                        {user?.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="material-symbols-outlined text-secondary text-lg">
                            {isAdmin ? "admin_panel_settings" : "person"}
                          </span>
                        )}
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

                    {/* Mobile Dashboard Links */}
                    <Link 
                      to="/profile" 
                      onClick={handleNavClick}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-body-md text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all"
                    >
                      <UserIcon className="w-5 h-5" />
                      Mi Perfil
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={handleNavClick}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-body-md text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all"
                    >
                      <Settings className="w-5 h-5" />
                      Ajustes
                    </Link>
                    <Link 
                      to="/dashboard/docs" 
                      onClick={handleNavClick}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-body-md text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all"
                    >
                      <BookOpen className="w-5 h-5" />
                      Documentación Interna
                    </Link>

                    <div className="h-px bg-outline-variant/20 my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 font-medium rounded-lg hover:bg-red-500/20 transition-all"
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
