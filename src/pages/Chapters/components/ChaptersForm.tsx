import { useState, type SubmitEvent } from "react";
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
    const [status, setStatus] = useState<"concluido" | "pendente">(
        (data?.status as "concluido" | "pendente") || "pendente",
    );

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        onSave({ title, status });
    }

    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <h3 className={styles.list_title}>{data ? "Editar Capítulo" : "Novo Capítulo"}</h3>

            <div className={styles.form_row}>
                <div className={styles.form_group}>
                    <label className="form-label" htmlFor="title">
                        Título do Capítulo
                    </label>
                    <input
                        className="form-input"
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
                    <label className="form-label" htmlFor="status">
                        Status
                    </label>
                    <select
                        className="form-input"
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
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}
