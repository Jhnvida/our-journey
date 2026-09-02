import { SectionHeader } from "@/components/ui/SectionHeader";
import { useChapters } from "@/features/chapters/hooks/useChapters";
import { Check, CircleDashed } from "lucide-react";
import { motion } from "motion/react";
import styles from "./styles.module.css";

export function Chapters() {
    const { chapters } = useChapters();
    if (!chapters || chapters.length === 0) return null;

    return (
        <section className={styles.chapters_section}>
            <SectionHeader title="Próximos Capítulos" subtitle="Acompanhe a nossa jornada passo a passo." />

            <div className={styles.chapters_container}>
                <div className={styles.chapters_list}>
                    {chapters.map((chapter, index) => {
                        const isCompleted = chapter.status === "concluido";

                        return (
                            <motion.div
                                key={chapter.id}
                                className={styles.chapter_item}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                            >
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
                                            <motion.div
                                                className={styles.progress_bar_done_fill}
                                                initial={{ scaleX: 0 }}
                                                whileInView={{ scaleX: 1 }}
                                                style={{ transformOrigin: "left" }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 1.2,
                                                    ease: [0.22, 1, 0.36, 1],
                                                    delay: 0.3 + index * 0.1,
                                                }}
                                            />
                                        ) : (
                                            <motion.div
                                                className={styles.progress_bar_pending_fill}
                                                initial={{ scaleX: 0 }}
                                                whileInView={{ scaleX: 0.1 }}
                                                style={{ transformOrigin: "left" }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 1.2,
                                                    ease: [0.22, 1, 0.36, 1],
                                                    delay: 0.3 + index * 0.1,
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
