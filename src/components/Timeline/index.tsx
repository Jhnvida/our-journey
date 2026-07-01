import styles from "./styles.module.css";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Event = {
    image_url: string;
    month_label: string;
    title: string;
    description: string;
    timeline_sub_events: { event_date: string; description: string }[];
};

export function Timeline() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            const { data } = await supabase
                .from("timeline_events")
                .select(`image_url, month_label, title, description, timeline_sub_events (event_date, description)`)
                .order("sort_order")
                .order("sort_order", { referencedTable: "timeline_sub_events" });

            if (data) setEvents(data as Event[]);
        }

        fetchEvents();
    }, []);

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
