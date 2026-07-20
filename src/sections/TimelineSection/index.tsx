import { compareAsc, parseISO } from "date-fns";
import { SectionHeader } from "../../components/SectionHeader";
import { useTimelineEvents } from "../../hooks/useTimelineEvents";
import { TimelineEvent } from "./components/TimelineEvent";
import styles from "./styles.module.css";

export const TimelineSection = () => {
    const { events } = useTimelineEvents();
    const sortedEvents = [...events].sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));

    return (
        <section className={styles.timeline_section}>
            <div className={styles.timeline_container}>
                <SectionHeader title="A Linha do Tempo" subtitle="Os marcos que definem a nossa história." />

                <div className={styles.timeline_events}>
                    {sortedEvents.map((event, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <TimelineEvent
                                key={event.id}
                                index={index}
                                title={event.title}
                                description={event.description}
                                date={event.date}
                                imageUrl={event.image_url}
                                isEven={isEven}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
