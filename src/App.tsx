import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminDashboard } from "./pages/Admin";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import styles from "./App.module.css";

export default function App() {
    return (
        <BrowserRouter>
            <div className={styles.app_container}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <footer className={styles.site_footer}>
                                <p className={styles.footer_title}>A Nossa Jornada</p>
                            </footer>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
