import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import styles from "./styles.module.css";

export function Dashboard() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    if (loading || !user) {
        return <div className={styles.container}>Carregando...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Painel de Controle</h1>

                <p className={styles.email}>
                    Logado como: <strong>{user.email}</strong>
                </p>

                <button onClick={handleLogout} className={styles.button}>
                    Sair
                </button>
            </div>
        </div>
    );
}
