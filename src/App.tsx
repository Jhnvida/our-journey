import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import AdminDashboard from "./pages/Admin";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

export default function App() {
    return (
        <BrowserRouter>
            <div className={styles.app_container}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
