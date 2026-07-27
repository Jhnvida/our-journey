import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles.module.css";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className={styles.loading_container}>
                <p>Carregando...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
