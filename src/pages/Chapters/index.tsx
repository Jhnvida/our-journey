import { useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import { useChapters } from "../../hooks/useChapters";
import ChapterCard from "../../sections/Chapters/components/ChapterCard";
import styles from "./styles.module.css";

export default function Chapters() {
    const { chapters, addChapter, deleteChapter } = useChapters();

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("pendente");

    function handleAdd() {
        if (!title) return;

        addChapter(title, status);
        setTitle("");
        setStatus("pendente");
    }

    return (
        <div className={styles.container}>
            <SectionHeader title="Próximos Capítulos" subtitle="Gerencie os planos futuros" />

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

            <div className={styles.list_section}>
                <h3 className={styles.list_title}>Capítulos Cadastrados</h3>

                <div className={styles.chapter_list}>
                    {chapters.map((chapter) => (
                        <ChapterCard key={chapter.id} title={chapter.title} status={chapter.status}>
                            <button onClick={() => console.log(chapter.id)} className={styles.button_secondary}>
                                Editar
                            </button>

                            <button onClick={() => deleteChapter(chapter.id)} className={styles.button_secondary}>
                                Excluir
                            </button>
                        </ChapterCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
