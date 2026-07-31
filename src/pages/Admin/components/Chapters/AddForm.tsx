import { useState } from "react";
import styles from "./styles.module.css";

type AddFormProps = {
    onAdd: (title: string, status: string) => void;
};

export default function AddForm({ onAdd }: AddFormProps) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("pendente");

    function handleAdd() {
        if (!title) return;

        onAdd(title, status);
        setTitle("");
        setStatus("pendente");
    }

    return (
        <div className={styles.form_container}>
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

            <button className={styles.button} onClick={handleAdd}>
                Adicionar Capítulo
            </button>
        </div>
    );
}
