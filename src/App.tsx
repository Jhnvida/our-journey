import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import { Chapters } from "./pages/Chapters";
import { DashboardLayout } from "./pages/Dashboard";
import { Gallery } from "./pages/Gallery";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { Recipes } from "./pages/Recipes";
import { Settings } from "./pages/Settings";
import { Timeline } from "./pages/Timeline";

function AdminRedirect() {
    const location = useLocation();
    return <Navigate to={location.pathname.replace("/admin", "/dashboard")} replace />;
}

function AnimatedRoutes() {
    const location = useLocation();
    const rootPath = location.pathname.split("/")[1] || "/";
    return (
        <Routes location={location} key={rootPath}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate to="timeline" replace />} />
                <Route path="timeline" element={<Timeline />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="chapters" element={<Chapters />} />
                <Route path="recipes" element={<Recipes />} />
                <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/admin/*" element={<AdminRedirect />} />
        </Routes>
    );
}

export function App() {
    return (
        <BrowserRouter>
            <div className={styles.app_container}>
                <AnimatedRoutes />
            </div>
        </BrowserRouter>
    );
}
