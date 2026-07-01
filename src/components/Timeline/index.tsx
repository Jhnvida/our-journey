import styles from "./styles.module.css";
import { useTimeline } from "../../hooks";

export function Timeline() {
    const events = useTimeline();

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
