import { useState } from "react";
import { ImageSelector } from "../../../components/ImageSelector";
import styles from "../../../styles/admin.module.css";
import type { TimelineEvent } from "../../../types";

interface TimelineFormProps {
    data?: TimelineEvent | null;
    onSave: (event: Omit<TimelineEvent, "id" | "created_at">) => void;
    onCancel: () => void;
    loading?: boolean;
}

export function TimelineForm({ data, onSave, onCancel, loading }: TimelineFormProps) {
    const [title, setTitle] = useState(data?.title || "");
    const [date, setDate] = useState(data?.date || "");
    const [description, setDescription] = useState(data?.description || "");
    const [imageUrl, setImageUrl] = useState(data?.image_url || "");
    const [formError, setFormError] = useState<string | null>(null);

    function handleSave() {
        if (!title || !date) {
            setFormError("Título e Data são obrigatórios!");
            return;
        }
        setFormError(null);

        onSave({
            title,
            date,
            description: description || null,
            image_url: imageUrl || null,
        });
    }

    return (
        <div className={styles.form_container}>
            <h3 className={styles.list_title}>{data ? "Editar Evento" : "Novo Evento"}</h3>

            {formError && <div className={styles.error_message}>{formError}</div>}

            <div className={styles.form_row}>
                <div className={styles.form_group}>
                    <label className={styles.label} htmlFor="title">
                        Título
                    </label>
                    <input
                        className={styles.input}
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: O primeiro encontro"
                        disabled={loading}
                    />
                </div>

                <div className={styles.form_group}>
                    <label className={styles.label} htmlFor="date">
                        Data
                    </label>
                    <input
                        className={styles.input}
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        disabled={loading}
                    />
                </div>
            </div>

            <div className={styles.form_group_full}>
                <label className={styles.label}>Imagem (opcional)</label>
                <ImageSelector value={imageUrl} onChange={setImageUrl} />
            </div>

            <div className={styles.form_group_full}>
                <label className={styles.label} htmlFor="description">
                    Descrição (opcional)
                </label>
                <textarea
                    className={styles.textarea}
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Conte um pouco sobre esse momento..."
                    disabled={loading}
                />
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
