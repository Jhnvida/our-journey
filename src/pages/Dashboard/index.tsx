import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { supabase } from "../../lib/supabase";
import styles from "./styles.module.css";

export function Dashboard() {
    const { user, loading, logout } = useAuth();
    const [date, setDate] = useState("");
    const [settings, setSettings] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        async function loadDate() {
            const { data } = await supabase.from("settings").select("id, started_at").single();

            if (data) {
                setDate(data.started_at);
                setSettings(data.id);
            }
        }

        if (user) {
            loadDate();
        }
    }, [user]);

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    async function handleSave() {
        const { error } = await supabase.from("settings").update({ started_at: date }).eq("id", settings);

        if (error) {
            console.error(error);
        }
    }

    if (loading || !user) {
        return <div className={styles.layout}>Carregando...</div>;
    }

    function renderCounter() {
        return (
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Início do Relacionamento</h2>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Data</label>

                    <input
                        type="date"
                        className={styles.input}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <button className={styles.button} onClick={handleSave}>
                    Salvar Alterações
                </button>
            </div>
        );
    }

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <h1 className={styles.headerTitle}>Painel Administrativo</h1>

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
