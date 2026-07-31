import SectionHeader from "../../../../components/SectionHeader";
import { useChapters } from "../../../../hooks/useChapters";
import ChapterCard from "../../../../sections/Chapters/components/ChapterCard";
import AddForm from "./AddForm";
import styles from "./styles.module.css";

export default function Chapters() {
    const { chapters, addChapter, deleteChapter } = useChapters();

    return (
        <div className={styles.container}>
            <SectionHeader title="Próximos Capítulos" subtitle="Gerencie os planos futuros" />

            <AddForm onAdd={addChapter} />

            <div className={styles.list_section}>
                <h3 className={styles.list_title}>Capítulos Cadastrados</h3>

                <div className={styles.chapter_list}>
                    {chapters.map((chapter) => (
                        <ChapterCard key={chapter.id} title={chapter.title} status={chapter.status}>
                            <button className={styles.button_secondary} onClick={() => deleteChapter(chapter.id)}>
                                Excluir
                            </button>
                        </ChapterCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
