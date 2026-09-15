import { ProtectedRoute } from "@/components/routing/ProtectedRoute";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
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
};
