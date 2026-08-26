import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { AuthProvider } from "./hooks/useAuth";
import { Chapters } from "./pages/Chapters";
import { Dashboard } from "./pages/Dashboard";
import { Gallery } from "./pages/Gallery";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Recipes } from "./pages/Recipes";
import { Settings } from "./pages/Settings";
import { Timeline } from "./pages/Timeline";

export function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className={styles.app_container}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route index element={<Timeline />} />
                            <Route path="gallery" element={<Gallery />} />
                            <Route path="chapters" element={<Chapters />} />
                            <Route path="recipes" element={<Recipes />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}
