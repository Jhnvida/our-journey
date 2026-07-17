import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { Header } from "./components";
import styles from "./styles.module.css";

export function Dashboard() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/entrar");
        }
    }, [user, loading, navigate]);

    if (loading || !user) {
        return <div className={styles.loadingContainer}>Carregando...</div>;
    }

    return (
        <div className={styles.layout}>
            <Header />

            <main className={styles.main}>
                <div className={styles.contentArea}>
                    <div className={styles.container}>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
