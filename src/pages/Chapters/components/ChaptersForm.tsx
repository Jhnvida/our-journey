import { useState, type SubmitEvent } from "react";
import type { Chapter } from "../../../types";
import styles from "../../Dashboard/admin.module.css";

interface ChaptersFormProps {
    data?: Chapter | null;
    onSave: (chapter: Omit<Chapter, "id" | "created_at">) => void;
    onCancel: () => void;
    loading?: boolean;
}

export function ChaptersForm({ data, onSave, onCancel, loading }: ChaptersFormProps) {
    const [title, setTitle] = useState(data?.title || "");
    const [status, setStatus] = useState<"concluido" | "pendente">(
        (data?.status as "concluido" | "pendente") || "pendente",
    );

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        onSave({ title, status });
    }

    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <h3 className={styles.list_title}>{data ? "Editar CapÃ­tulo" : "Novo CapÃ­tulo"}</h3>

            <div className={styles.form_row}>
                <div className={styles.form_group}>
                    <label className={styles.label} htmlFor="title">
                        TÃ­tulo do CapÃ­tulo
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        id="title"
                        placeholder="Ex: Viagem para Paris"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                        required
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
                        <option value="concluido">ConcluÃ­do</option>
                    </select>
                </div>
            </div>

            <div className={styles.form_actions}>
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                </button>
                <button type="button" className={styles.button_secondary} onClick={onCancel} disabled={loading}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}
