import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { TimelineEvent } from "../types";

export function useTimelineEvents() {
    const [events, setEvents] = useState<TimelineEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        setError(null);
        const { data, error: err } = await supabase
            .from("timeline_events")
            .select("*")
            .order("date", { ascending: true });

        if (err) {
            console.error(err);
            setError("Erro ao carregar eventos da linha do tempo.");
        } else if (data) {
            setEvents(data as TimelineEvent[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    async function addEvent(event: Omit<TimelineEvent, "id" | "created_at">) {
        setLoading(true);
        setError(null);
        const { error: err } = await supabase.from("timeline_events").insert(event);
        if (err) {
            console.error(err);
            setError("Erro ao adicionar evento.");
            setLoading(false);
            throw err;
        }
        await fetchEvents();
    }

    async function updateEvent(id: string, updates: Partial<TimelineEvent>) {
        setLoading(true);
        setError(null);
        const { error: err } = await supabase.from("timeline_events").update(updates).eq("id", id);
        if (err) {
            console.error(err);
            setError("Erro ao atualizar evento.");
            setLoading(false);
            throw err;
        }
        await fetchEvents();
    }

    async function removeEvent(id: string) {
        setLoading(true);
        setError(null);
        const { error: err } = await supabase.from("timeline_events").delete().eq("id", id);
        if (err) {
            console.error(err);
            setError("Erro ao excluir evento.");
            setLoading(false);
            throw err;
        }
        await fetchEvents();
    }

    return { events, loading, error, addEvent, updateEvent, removeEvent, fetchEvents };
}
