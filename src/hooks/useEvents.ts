import type { TimelineEvent } from "@/types";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export function useEvents() {
    const [events, setEvents] = useState<TimelineEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchEvents() {
        setLoading(true);
        const { data, error: err } = await supabase
            .from("timeline_events")
            .select("*")
            .order("date", { ascending: true });

        if (err) setError("Erro ao carregar eventos da linha do tempo.");
        else setEvents(data);

        setLoading(false);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    async function addEvent(event: Omit<TimelineEvent, "id" | "created_at">) {
        setLoading(true);
        const { error: err } = await supabase.from("timeline_events").insert(event);

        if (err) setError("Erro ao adicionar evento.");
        else await fetchEvents();
    }

    async function updateEvent(id: string, updates: Partial<TimelineEvent>) {
        setLoading(true);
        const { error: err } = await supabase.from("timeline_events").update(updates).eq("id", id);

        if (err) setError("Erro ao atualizar evento.");
        else await fetchEvents();
    }

    async function removeEvent(id: string) {
        setLoading(true);
        const { error: err } = await supabase.from("timeline_events").delete().eq("id", id);

        if (err) setError("Erro ao excluir evento.");
        else await fetchEvents();
    }

    return { events, loading, error, addEvent, updateEvent, removeEvent };
}
