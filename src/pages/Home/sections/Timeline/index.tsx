import { SectionHeader } from "@/components/ui/SectionHeader";
import { useEvents } from "@/features/timeline/hooks/useEvents";
import { TimelineCard } from "@/pages/Home/components/TimelineCard";
import { useMemo } from "react";
import styles from "./styles.module.css";

export function Timeline() {
    const { events } = useEvents();

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
