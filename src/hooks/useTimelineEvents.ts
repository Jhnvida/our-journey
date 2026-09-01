import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { TimelineEvent } from "../types";

export function useTimelineEvents() {
    const [events, setEvents] = useState<TimelineEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        const { data, error: err } = await supabase
            .from("timeline_events")
            .select("*")
            .order("date", { ascending: true });

        if (err) setError("Erro ao carregar eventos da linha do tempo.");
        else setEvents(data);

        setLoading(false);
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const addEvent = useCallback(
        async (event: Omit<TimelineEvent, "id" | "created_at">) => {
            setLoading(true);
            const { error: err } = await supabase.from("timeline_events").insert(event);

            if (err) setError("Erro ao adicionar evento.");
            else await fetchEvents();
        },
        [fetchEvents],
    );

    const updateEvent = useCallback(
        async (id: string, updates: Partial<TimelineEvent>) => {
            setLoading(true);
            const { error: err } = await supabase.from("timeline_events").update(updates).eq("id", id);

            if (err) setError("Erro ao atualizar evento.");
            else await fetchEvents();
        },
        [fetchEvents],
    );

    const removeEvent = useCallback(
        async (id: string) => {
            setLoading(true);
            const { error: err } = await supabase.from("timeline_events").delete().eq("id", id);

            if (err) setError("Erro ao excluir evento.");
            else await fetchEvents();
        },
        [fetchEvents],
    );

    return { events, loading, error, addEvent, updateEvent, removeEvent };
}
