import { useState } from "react";
import styles from "../../../styles/admin.module.css";
import type { Chapter } from "../../../types";

interface ChaptersFormProps {
    data?: Chapter | null;
    onSave: (chapter: Omit<Chapter, "id" | "created_at">) => void;
    onCancel: () => void;
    loading?: boolean;
}

export function ChaptersForm({ data, onSave, onCancel, loading }: ChaptersFormProps) {
    const [title, setTitle] = useState(data?.title || "");
    const [status, setStatus] = useState<"concluido" | "pendente">(data?.status || "pendente");
    const [formError, setFormError] = useState<string | null>(null);

    function handleSave() {
        if (!title) {
            setFormError("Título é obrigatório!");
            return;
        }
        setFormError(null);

        onSave({ title, status });
    }

    return (
        <div className={styles.form_container}>
            <h3 className={styles.list_title}>{data ? "Editar Capítulo" : "Novo Capítulo"}</h3>

            {formError && <div className={styles.error_message}>{formError}</div>}

            <div className={styles.form_row}>
                <div className={styles.form_group}>
                    <label className={styles.label} htmlFor="title">
                        Título do Capítulo
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        id="title"
                        placeholder="Ex: Viagem para Paris"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className={styles.form_group}>
                    <label className={styles.label} htmlFor="status">
                        Status
                    </label>
                    <select
                        className={styles.input}
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as "concluido" | "pendente")}
                        disabled={loading}
                    >
                        <option value="pendente">Pendente</option>
                        <option value="concluido">Concluído</option>
                    </select>
                </div>
            </div>

            <div className={styles.form_actions}>
                <button className={styles.button} onClick={handleSave} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                </button>
                <button className={styles.button_secondary} onClick={onCancel} disabled={loading}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}
