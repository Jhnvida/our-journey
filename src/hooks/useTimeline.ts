import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type Event = {
    image_url: string;
    month_label: string;
    title: string;
    description: string;
    timeline_sub_events: { event_date: string; description: string }[];
};

export function useTimeline() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function fetchEvents() {
            const { data } = await supabase
                .from("timeline_events")
                .select(`image_url, month_label, title, description, timeline_sub_events (event_date, description)`)
                .order("sort_order")
                .order("sort_order", { referencedTable: "timeline_sub_events" });

            if (isMounted && data) {
                setEvents(data as Event[]);
            }
        }

        fetchEvents();

        return () => {
            isMounted = false;
        };
    }, []);

    return events;
}
