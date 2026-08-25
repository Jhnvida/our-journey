import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Setting } from "../types";

export function useSettings() {
    const [settings, setSettings] = useState<Setting | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchSettings() {
        setLoading(true);
        const { data, error: err } = await supabase.from("settings").select("*").limit(1).single();

        if (err) {
            if (err.code !== "PGRST116") setError("Erro ao carregar configurações.");
        } else {
            setSettings(data);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchSettings();
    }, []);

    async function updateDate(date: string) {
        setLoading(true);

        if (!settings) {
            const { error: err } = await supabase.from("settings").insert({ relationship_start_date: date });

            if (err) setError("Erro ao salvar configurações.");
            else await fetchSettings();

            return;
        }

        const { error: err } = await supabase
            .from("settings")
            .update({ relationship_start_date: date })
            .eq("id", settings.id);

        if (err) setError("Erro ao atualizar configurações.");
        else await fetchSettings();
    }

    return { settings, loading, error, updateDate, fetchSettings };
}
