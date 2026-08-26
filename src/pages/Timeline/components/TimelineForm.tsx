import { useState, type SubmitEvent } from "react";
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

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        onSave({
            title,
            date,
            description: description || null,
            image_url: imageUrl || null,
        });
    }

    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <h3 className={styles.list_title}>{data ? "Editar Evento" : "Novo Evento"}</h3>

            <div className={styles.form_row}>
                <div className={styles.form_group}>
                    <label className="form-label" htmlFor="title">
                        Título
                    </label>
                    <input
                        className="form-input"
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: O primeiro encontro"
                        disabled={loading}
                        required
                    />
                </div>

                <div className={styles.form_group}>
                    <label className="form-label" htmlFor="date">
                        Data
                    </label>
                    <input
                        className="form-input"
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>
            </div>

            <div className={styles.form_group_full}>
                <label className="form-label">Imagem (opcional)</label>
                <ImageSelector value={imageUrl} onChange={setImageUrl} />
            </div>

            <div className={styles.form_group_full}>
                <label className="form-label" htmlFor="description">
                    Descrição (opcional)
                </label>
                <textarea
                    className="form-input"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Conte um pouco sobre esse momento..."
                    disabled={loading}
                />
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
