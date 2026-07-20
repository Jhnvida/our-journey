import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type TimelineEvent = {
    id: number;
    title: string;
    date: string;
    description: string | null;
    image_url: string | null;
    created_at: string;
};

export function useTimelineEvents() {
    const [events, setEvents] = useState<TimelineEvent[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            const { data, error } = await supabase
                .from("timeline_events")
                .select("*")
                .order("date", { ascending: true });

            if (error) {
                console.error(error);
            } else if (data) {
                setEvents(data as TimelineEvent[]);
            }
        }

        fetchEvents();
    }, []);

    return { events };
}
