import { useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import { useSettings } from "../../hooks/useSettings";
import styles from "./styles.module.css";

export default function Settings() {
    const { settings, updateDate } = useSettings();
    const [date, setDate] = useState<string>("");

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <SectionHeader title="Configurações" subtitle="Gerencie as configurações gerais" />
            </div>

            <div className={styles.form_container}>
                <h3 className={styles.list_title}>Editar Configurações</h3>

                <div className={styles.form_row}>
                    <div className={styles.form_group}>
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
                </div>

                <div className={styles.form_actions}>
                    <button className={styles.button} onClick={() => updateDate(date)}>
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
}
