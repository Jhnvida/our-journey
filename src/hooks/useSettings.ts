import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Setting } from "../types";

export function useSettings() {
    const [settings, setSettings] = useState<Setting | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = useCallback(async () => {
        setLoading(true);
        setError(null);
        const { data, error: err } = await supabase.from("settings").select("*").limit(1).single();

        if (err) {
            console.error(err);
            if (err.code !== "PGRST116") {
                setError("Erro ao carregar configurações.");
            }
        } else if (data) {
            setSettings(data as Setting);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    async function updateDate(date: string) {
        if (!settings) {
            setLoading(true);
            setError(null);
            const { error: err } = await supabase.from("settings").insert({ relationship_start_date: date });
            if (err) {
                console.error(err);
                setError("Erro ao salvar configurações.");
                setLoading(false);
                throw err;
            }
            await fetchSettings();
            return;
        }

        setLoading(true);
        setError(null);
        const { error: err } = await supabase
            .from("settings")
            .update({ relationship_start_date: date })
            .eq("id", settings.id);

        if (err) {
            console.error(err);
            setError("Erro ao atualizar configurações.");
            setLoading(false);
            throw err;
        }
        await fetchSettings();
    }

    return { settings, loading, error, updateDate, fetchSettings };
}
