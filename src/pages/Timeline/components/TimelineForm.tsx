import { useEffect, useState } from "react";
import type { TimelineEvent } from "../../../types";
import styles from "../styles.module.css";

type TimelineFormProps = {
    data?: TimelineEvent | null;
    onCancel: () => void;
};

export default function TimelineForm({ data, onCancel }: TimelineFormProps) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setDate(data.date);
            setDescription(data.description || "");
            setImageUrl(data.image_url || "");
        } else {
            setTitle("");
            setDate("");
            setDescription("");
            setImageUrl("");
        }
    }, [data]);

    return (
        <div className={styles.form_container}>
            <h3 className={styles.list_title}>{data ? "Editar Evento" : "Novo Evento"}</h3>

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
                    />
                </div>
            </div>

            <div className={styles.form_group_full}>
                <label className={styles.label} htmlFor="imageUrl">
                    URL da Imagem (opcional)
                </label>
                <input
                    className={styles.input}
                    id="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                />
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
                />
            </div>

            <div className={styles.form_actions}>
                <button className={styles.button} onClick={onCancel}>
                    Salvar
                </button>
                <button className={styles.button_secondary} onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}
