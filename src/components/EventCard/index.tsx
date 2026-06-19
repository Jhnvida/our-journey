import styles from "./styles.module.css";
import type { Event } from "../../types/global";

type EventProps = {
    event: Event;
    even: boolean;
};

export function EventCard({ event, even }: EventProps) {
    return (
        <div className={`${styles.timelineEvent} ${!even ? styles.reverse : ""}`}>
            <img className={styles.eventImage} src={event.image} alt={event.title} />

            <div className={styles.eventContent}>
                <span className={styles.eventDate}>{event.date}</span>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDescription}>{event.description}</p>

                {event.subEvents && (
                    <div className={styles.subEventsList}>
                        {event.subEvents.map((sub, i) => (
                            <div key={i} className={styles.subEventItem}>
                                <span className={styles.subEventDate}>{sub.date}</span>
                                <span className={styles.subEventDesc}>{sub.description}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
