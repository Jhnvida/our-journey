import { useEffect, useState } from "react";
import type { Chapter } from "../../../types";
import styles from "../styles.module.css";

type ChaptersFormProps = {
    data?: Chapter | null;
    onCancel: () => void;
};

export default function ChaptersForm({ data, onCancel }: ChaptersFormProps) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("pendente");

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setStatus(data.status);
        } else {
            setTitle("");
            setStatus("pendente");
        }
    }, [data]);

    return (
        <div className={styles.form_container}>
            <h3 className={styles.list_title}>{data ? "Editar Capítulo" : "Novo Capítulo"}</h3>

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
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pendente">Pendente</option>
                        <option value="concluido">Concluído</option>
                    </select>
                </div>
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
