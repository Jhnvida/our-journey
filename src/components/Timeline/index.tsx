import { useEffect, useRef } from "react";
import { useTimeline } from "../../hooks";
import styles from "./styles.module.css";

export function Timeline() {
    const events = useTimeline();
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.cardVisible);
                        observerRef.current?.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
        );

        const cards = document.querySelectorAll(`.${styles.card}`);
        cards.forEach((card) => observerRef.current?.observe(card));

        return () => observerRef.current?.disconnect();
    }, [events]);

    return (
        <section className={styles.section}>
            <div className={styles.shell}>
                {events.map((event, index) => (
                    <div
                        key={`${event.month_label}-${index}`}
                        className={index % 2 === 1 ? `${styles.card} ${styles.cardReverse}` : styles.card}
                    >
                        <div className={styles.imageColumn}>
                            <div className={styles.media}>
                                <img src={event.image_url} loading="lazy" alt={event.title} />
                            </div>
                        </div>

                        <div className={styles.content}>
                            <span className={styles.eyebrow}>{event.month_label}</span>
                            <h2 className={styles.title}>{event.title}</h2>
                            <p className={styles.copy}>{event.description}</p>

                            <div className={styles.events}>
                                {event.timeline_sub_events?.map((subEvent, subIndex) => (
                                    <div className={styles.event} key={`${event.month_label}-${subIndex}`}>
                                        <span>{subEvent.event_date}</span>
                                        <span>{subEvent.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
