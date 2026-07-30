import { useState } from "react";
import SectionHeader from "../../../../components/SectionHeader";
import { useSettings } from "../../../../hooks/useSettings";
import styles from "./styles.module.css";

export default function Settings() {
    const { settings, updateDate } = useSettings();
    const [date, setDate] = useState<string>("");

    return (
        <div className={styles.container}>
            <SectionHeader title="Configurações" subtitle="Gerencie as configurações gerais" />

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="date">
                    Data de início do relacionamento
                </label>

                <input
                    className={styles.input}
                    type="date"
                    id="date"
                    defaultValue={settings?.relationship_start_date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <button className={styles.button} onClick={() => updateDate(date)}>
                Salvar Alterações
            </button>
        </div>
    );
}
