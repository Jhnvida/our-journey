import { CheckIcon, Circle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useChapters } from "../../../../hooks";
import styles from "./styles.module.css";

export function Chapters() {
    const { chapters } = useChapters();
    const observerRef = useRef<IntersectionObserver | null>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

        itemsRef.current.forEach((item) => {
            if (item) observerRef.current?.observe(item);
        });

        return () => observerRef.current?.disconnect();
    }, [chapters]);

    return (
        <section className={styles.section}>
            <div className={styles.shell}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>Planos & Sonhos</span>
                    <h2 className={styles.title}>Nossa Lista de Desejos</h2>
                </div>

                <div className={styles.list}>
                    {chapters.map((chapter, index) => (
                        <div
                            key={chapter.label}
                            className={styles.item}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            ref={(el) => {
                                itemsRef.current[index] = el;
                            }}
                        >
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
