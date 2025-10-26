export { default as App } from "./App.tsx";
export { default as routes } from "./Routers/routes.tsx";
export { AboutTemplate } from "./Template/AboutTemplate.tsx";
export { HomeTemplate } from "./Template/HomeTemplate.tsx";
export { Navbar } from "./components/Navbar.jsx";
export { ProtectedRoute } from "./components/ProtectedRoute.jsx";
export { useAuth, AuthProvider } from "./context/AuthContext.jsx";
export { app, auth } from "./firebase/firebase.jsx";
