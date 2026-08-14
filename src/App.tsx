import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { AdminDashboard } from "./pages/Admin";
import { Chapters } from "./pages/Chapters";
import { Gallery } from "./pages/Gallery";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { Recipes } from "./pages/Recipes";
import { Settings } from "./pages/Settings";
import { Timeline } from "./pages/Timeline";

export function App() {
    return (
        <BrowserRouter>
            <div className={styles.app_container}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminDashboard />}>
                        <Route index element={<Navigate to="timeline" replace />} />
                        <Route path="timeline" element={<Timeline />} />
                        <Route path="gallery" element={<Gallery />} />
                        <Route path="chapters" element={<Chapters />} />
                        <Route path="recipes" element={<Recipes />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
