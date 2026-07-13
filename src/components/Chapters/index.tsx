import styles from "./styles.module.css";
import { CheckIcon, Circle } from "lucide-react";

import { useChapters } from "../../hooks";

export function Chapters() {
    const chapters = useChapters();

    return (
        <section className={styles.section}>
            <div className={styles.shell}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>Continuidade</span>
                    <h2 className={styles.title}>Próximos Capítulos</h2>
                </div>

                <div className={styles.list}>
                    {chapters.map((chapter) => (
                        <div className={styles.item}>
                            <div className={styles.icon}>
                                {chapter.completed ? (
                                    <CheckIcon className={styles.check} />
                                ) : (
                                    <Circle className={styles.circle} />
                                )}
                            </div>

                            <span className={styles.label}>{chapter.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
