import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { useSettings } from "../hooks/useSettings";
import styles from "./Settings.module.css";

export function Settings() {
    const { settings, loading, error, updateDate } = useSettings();
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        if (settings) {
            setDate(settings.relationship_start_date);
        }
    }, [settings]);

    async function handleSave() {
        if (!date) {
            alert("A data é obrigatória!");
            return;
        }

        try {
            await updateDate(date);
            alert("Configurações salvas com sucesso!");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.header}>
                <SectionHeader title="Configurações" subtitle="Gerencie as configurações gerais" />
            </div>

            {error && <div className={styles.error_message}>{error}</div>}

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
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className={styles.form_actions}>
                    <motion.button
                        className={styles.button}
                        onClick={handleSave}
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
