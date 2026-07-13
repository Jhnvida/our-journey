import { LogOut } from "lucide-react";
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
        return <div className={styles.layout}>Carregando...</div>;
    }

    const renderCounter = () => (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Data de Início do Relacionamento</h2>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Data</label>
                <input type="date" className={styles.input} defaultValue="2020-01-01" />
            </div>

            <button className={styles.button}>Salvar Alterações</button>
        </div>
    );

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <h1 className={styles.headerTitle}>Painel</h1>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <LogOut size={16} />
                        Sair
                    </button>
                </div>
            </header>

            <main className={styles.main}>{renderCounter()}</main>
        </div>
    );
}
