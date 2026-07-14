import styles from "../styles.module.css";

export type HomeTabProps = {
    date: string;
    setDate: (date: string) => void;
    handleSave: () => void;
};

export function HomeTab({ date, setDate, handleSave }: HomeTabProps) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Início do Relacionamento</h2>
                <p className={styles.cardDescription}>Configure a data inicial para o contador</p>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Data</label>
                <input type="date" className={styles.input} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <button className={styles.button} onClick={handleSave}>
                Salvar Alterações
            </button>
        </div>
    );
}
