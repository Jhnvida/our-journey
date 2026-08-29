import { Check, CircleDashed } from "lucide-react";
import { SectionHeader } from "../../../components/SectionHeader";
import { useChapters } from "../../../hooks/useChapters";
import styles from "./Chapters.module.css";

export function Chapters() {
    const { chapters } = useChapters();
    if (!chapters || chapters.length === 0) return null;

    return (
        <section className={styles.chapters_section}>
            <SectionHeader title="Próximos Capítulos" subtitle="Acompanhe a nossa jornada passo a passo." />

            <div className={styles.chapters_container}>
                <div className={styles.chapters_list}>
                    {chapters.map((chapter) => {
                        const isCompleted = chapter.status === "concluido";

                        return (
                            <div key={chapter.id} className={styles.chapter_item}>
                                <div className={styles.chapter_info}>
                                    <div
                                        className={isCompleted ? styles.chapter_icon_done : styles.chapter_icon_pending}
                                    >
                                        {isCompleted ? <Check size={24} /> : <CircleDashed size={24} />}
                                    </div>
                                    <h4 className={styles.chapter_title}>{chapter.title}</h4>
                                </div>

                                <div className={styles.chapter_status}>
                                    <span
                                        className={isCompleted ? styles.status_label_done : styles.status_label_pending}
                                    >
                                        {isCompleted ? "Concluído" : "Pendente"}
                                    </span>

                                    <div
                                        className={`${styles.progress_bar} ${isCompleted ? styles.progress_bar_done : styles.progress_bar_pending}`}
                                    >
                                        {isCompleted ? (
                                            <div className={styles.progress_bar_done_fill}></div>
                                        ) : (
                                            <div className={styles.progress_bar_pending_fill}></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
