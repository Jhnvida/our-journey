import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth, useCounter } from "../../../../hooks";
import { supabase } from "../../../../lib/supabase";
import styles from "./styles.module.css";

export function HomeTab() {
    const { user } = useAuth();
    const { refetch } = useCounter();

    const [date, setDate] = useState("");
    const [settings, setSettings] = useState("");

    async function loadDate() {
        const { data } = await supabase.from("settings").select("id, started_at").single();

        if (data) {
            setDate(data.started_at);
            setSettings(data.id);
        }
    }

    useEffect(() => {
        if (user) loadDate();
    }, [user]);

    async function handleSave() {
        await supabase.from("settings").update({ started_at: date }).eq("id", settings);
        await refetch();
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Visão Geral</h2>
                <p className={styles.cardDescription}>Configure a data inicial para o contador de dias.</p>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Data Oficial</label>

                <div className={styles.inputRow}>
                    <input
                        type="date"
                        className={styles.input}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <button className={styles.button} onClick={handleSave}>
                        <Save size={18} />
                        <span>Salvar Alterações</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
