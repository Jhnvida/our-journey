import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type Event = {
    id: string;
    image_url: string;
    month_label: string;
    title: string;
    description: string;
    timeline_sub_events: { event_date: string; description: string }[];
};

export function useTimeline() {
    const [events, setEvents] = useState<Event[]>([]);

    async function fetchEvents() {
        const { data } = await supabase
            .from("timeline_events")
            .select(`id, image_url, month_label, title, description, timeline_sub_events (event_date, description)`)
            .order("created_at", { ascending: true })
            .order("created_at", { referencedTable: "timeline_sub_events", ascending: true });

        if (data) {
            setEvents(data as Event[]);
        }
    }

    async function addEvent(
        eventData: Omit<Event, "id" | "timeline_sub_events">,
        subEvents: { event_date: string; description: string }[],
    ) {
        const { data, error } = await supabase.from("timeline_events").insert([eventData]).select().single();

        if (error) {
            console.error("Error adding event:", error);
            return { error };
        }

        if (data && subEvents.length > 0) {
            const subEventsData = subEvents.map((sub) => ({ ...sub, timeline_event_id: data.id }));
            await supabase.from("timeline_sub_events").insert(subEventsData);
        }

        await fetchEvents();
        return { data };
    }

    async function updateEvent(
        id: string,
        eventData: Omit<Event, "id" | "timeline_sub_events">,
        subEvents: { event_date: string; description: string }[],
    ) {
        const { error } = await supabase.from("timeline_events").update(eventData).eq("id", id);

        if (error) {
            console.error("Error updating event:", error);
            return { error };
        }

        await supabase.from("timeline_sub_events").delete().eq("timeline_event_id", id);

        if (subEvents.length > 0) {
            const subEventsData = subEvents.map((sub) => ({ ...sub, timeline_event_id: id }));
            await supabase.from("timeline_sub_events").insert(subEventsData);
        }

        await fetchEvents();
        return { success: true };
    }

    async function removeEvent(id: string) {
        await supabase.from("timeline_sub_events").delete().eq("timeline_event_id", id);
        const { error } = await supabase.from("timeline_events").delete().eq("id", id);

        if (error) {
            console.error("Error removing event:", error);
            return { error };
        }

        await fetchEvents();
        return { success: true };
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return { events, addEvent, updateEvent, removeEvent, fetchEvents };
}
