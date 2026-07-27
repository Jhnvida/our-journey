import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Setting } from "../types";

export function useSettings() {
    const [settings, setSettings] = useState<Setting | null>(null);

    useEffect(() => {
        async function fetchSettings() {
            const { data, error } = await supabase.from("settings").select("*").limit(1).single();

            if (error) {
                console.error(error);
            } else if (data) {
                setSettings(data as Setting);
            }
        }

        fetchSettings();
    }, []);

    return { settings };
}
