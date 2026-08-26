import { Check, CircleDashed } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeader } from "../../../components/SectionHeader";
import { useChapters } from "../../../hooks/useChapters";
import styles from "../styles.module.css";

export function ChaptersSection() {
    const { chapters } = useChapters();

    if (!chapters || chapters.length === 0) return null;

    return (
        <motion.div
            className={styles.chapters_section}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
        >
            <SectionHeader title="PRÓXIMOS CAPÍTULOS" subtitle="Acompanhe a nossa jornada passo a passo." />
            <div className={styles.chapters_list}>
                {chapters.map((chapter) => {
                    const isCompleted = chapter.status === "concluido";

                    return (
                        <div key={chapter.id} className={styles.chapter_item}>
                            <div className={styles.chapter_info}>
                                <div className={isCompleted ? styles.chapter_icon_done : styles.chapter_icon_pending}>
                                    {isCompleted ? <Check size={24} /> : <CircleDashed size={24} />}
                                </div>
                                <h4 className={styles.chapter_title}>{chapter.title}</h4>
                            </div>
                            <div className={styles.chapter_status}>
                                <span className={isCompleted ? styles.status_label_done : styles.status_label_pending}>
                                    {isCompleted ? "CONCLUÍDO" : "PENDENTE"}
                                </span>
                                <div
                                    className={`${styles.progress_bar} ${isCompleted ? styles.progress_bar_done : styles.progress_bar_pending}`}
                                >
                                    <div
                                        className={
                                            isCompleted
                                                ? styles.progress_bar_done_fill
                                                : styles.progress_bar_pending_fill
                                        }
                                    ></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
