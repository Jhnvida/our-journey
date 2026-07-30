import { compareAsc, parseISO } from "date-fns";
import SectionHeader from "../../components/SectionHeader";
import { useTimelineEvents } from "../../hooks/useTimelineEvents";
import TimelineEvent from "./components/TimelineEvent";
import styles from "./styles.module.css";

export default function Timeline() {
    const { events } = useTimelineEvents();
    const sortedEvents = [...events].sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)));

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <SectionHeader title="A Linha do Tempo" subtitle="Os marcos que definem a nossa história." />

                <div className={styles.grid}>
                    {sortedEvents.map((event, index) => {
                        const isFeatured = index % 5 === 0;

                        return (
                            <TimelineEvent
                                key={event.id}
                                index={index}
                                title={event.title}
                                description={event.description}
                                date={event.date}
                                imageUrl={event.image_url}
                                isFeatured={isFeatured}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
