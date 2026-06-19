import styles from "./styles.module.css";
import type { Event } from "../../types/global";

import { EventCard } from "../EventCard";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

export function Timeline() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function getEvents() {
            const { data: events } = await supabase
                .from("events")
                .select(
                    `id, title, date:date_label, description, image:image_url,
                    subEvents:sub_events (date:date_label, description)`,
                )
                .order("order_index", { ascending: true });

            if (events) setEvents(events as unknown as Event[]);
        }

        getEvents();
    }, []);

    return (
        <div className={styles.timeline}>
            {events.map((event, index) => (
                <EventCard key={event.id} event={event} even={index % 2 === 0} />
            ))}
        </div>
    );
}
