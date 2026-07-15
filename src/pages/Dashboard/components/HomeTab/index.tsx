import { Save } from "lucide-react";
import { useCounter } from "../../../../hooks";
import styles from "./styles.module.css";

export function HomeTab() {
    const { date, setDate, handleSave } = useCounter();

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Gerenciar Configurações</h2>
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
