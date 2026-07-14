import { Loader2 } from "lucide-react";
import styles from "./styles.module.css";

export type HomeTabProps = {
    date: string;
    setDate: (date: string) => void;
    handleSave: () => void;
    isSaving?: boolean;
};

export function HomeTab({ date, setDate, handleSave, isSaving }: HomeTabProps) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Início do Relacionamento</h2>
                <p className={styles.cardDescription}>Configure a data inicial para o contador</p>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Data</label>

                <input
                    type="date"
                    className={styles.input}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={isSaving}
                />
            </div>

            <button className={styles.button} onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className={styles.spinner} size={18} /> : null}
                {isSaving ? "Salvando..." : "Salvar Alterações"}
            </button>
        </div>
    );
}
