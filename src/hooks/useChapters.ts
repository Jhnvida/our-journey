import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type Chapter = {
    id: string;
    label: string;
    completed: boolean;
};

export function useChapters() {
    const [chapters, setChapters] = useState<Chapter[]>([]);

    async function fetchChapters() {
        const { data } = await supabase
            .from("chapters")
            .select("id, label, completed")
            .order("sort_order", { ascending: true });

        if (data) {
            setChapters(data as Chapter[]);
        }
    }

    useEffect(() => {
        fetchChapters();
    }, []);

    return { chapters };
}
