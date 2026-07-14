import { CheckIcon, Circle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useChapters } from "../../../../hooks";
import styles from "./styles.module.css";

export function Chapters() {
    const chapters = useChapters();
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.itemVisible);
                        observerRef.current?.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -20px 0px" },
        );

        const items = document.querySelectorAll(`.${styles.item}`);
        items.forEach((item) => observerRef.current?.observe(item));

        return () => observerRef.current?.disconnect();
    }, [chapters]);

    return (
        <section className={styles.section}>
            <div className={styles.shell}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>Continuidade</span>
                    <h2 className={styles.title}>Próximos Capítulos</h2>
                </div>

                <div className={styles.list}>
                    {chapters.map((chapter: any, index: number) => (
                        <div key={chapter.label} className={styles.item} style={{ animationDelay: `${index * 0.1}s` }}>
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
