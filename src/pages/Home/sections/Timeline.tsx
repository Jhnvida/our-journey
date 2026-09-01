import { useMemo } from "react";
import { SectionHeader } from "../../../components/SectionHeader";
import { useTimelineEvents } from "../../../hooks/useTimelineEvents";
import { TimelineCard } from "../components/TimelineCard";
import styles from "./Timeline.module.css";

export function Timeline() {
    const { events } = useTimelineEvents();

    const { leftEvents, rightEvents } = useMemo(() => {
        if (!events) return { leftEvents: [], rightEvents: [] };
        return {
            leftEvents: events.filter((_, i) => i % 2 === 0),
            rightEvents: events.filter((_, i) => i % 2 !== 0),
        };
    }, [events]);

    if (!events || events.length === 0) return null;

    return (
        <section className={styles.timeline_section}>
            <SectionHeader title="A Linha do Tempo" subtitle="Relembre os melhores momentos da nossa história." />

            <div className={styles.timeline_mobile}>
                {events.map((event, index) => (
                    <TimelineCard key={`mobile-${event.id}`} event={event} index={index} />
                ))}
            </div>

            <div className={styles.timeline_desktop}>
                <div className={styles.timeline_column}>
                    {leftEvents.map((event, index) => (
                        <TimelineCard key={`desktop-left-${event.id}`} event={event} index={index} />
                    ))}
                </div>

                <div className={`${styles.timeline_column} ${styles.timeline_staggered}`}>
                    {rightEvents.map((event, index) => (
                        <TimelineCard key={`desktop-right-${event.id}`} event={event} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
