import { SectionHeader } from "@/components/ui/SectionHeader";
import { useChapters } from "@/features/chapters/hooks/useChapters";
import { Check, CircleDashed } from "lucide-react";
import { motion, type Variants } from "motion/react";
import styles from "./styles.module.css";

const chapterItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 },
    }),
};

const progressVariants: Variants = {
    hidden: { scaleX: 0 },
    visibleDone: (index: number) => ({
        scaleX: 1,
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 + index * 0.1 },
    }),
    visiblePending: (index: number) => ({
        scaleX: 0.1,
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 + index * 0.1 },
    }),
};

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
                                variants={chapterItemVariants}
                                initial="hidden"
                                whileInView="visible"
                                custom={index}
                                viewport={{ once: true, margin: "-50px" }}
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
                                        <motion.div
                                            className={
                                                isCompleted
                                                    ? styles.progress_bar_done_fill
                                                    : styles.progress_bar_pending_fill
                                            }
                                            variants={progressVariants}
                                            initial="hidden"
                                            whileInView={isCompleted ? "visibleDone" : "visiblePending"}
                                            custom={index}
                                            style={{ transformOrigin: "left" }}
                                            viewport={{ once: true }}
                                        />
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
