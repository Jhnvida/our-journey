import { Outlet } from "react-router-dom";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { Sidebar } from "./components/Sidebar";
import styles from "./styles.module.css";

export function Dashboard() {
    return (
        <ProtectedRoute>
            <main className={styles.container}>
                <Sidebar />

                <div className={styles.content}>
                    <Outlet />
                </div>
            </main>
        </ProtectedRoute>
    );
}
