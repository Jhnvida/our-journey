import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Chapter } from "../types";

export function useChapters() {
    const [chapters, setChapters] = useState<Chapter[]>([]);

    useEffect(() => {
        async function fetchChapters() {
            const { data, error } = await supabase.from("chapters").select("*").order("id", { ascending: true });

            if (error) {
                console.error(error);
            } else if (data) {
                setChapters(data as Chapter[]);
            }
        }

        fetchChapters();
    }, []);

    return { chapters };
}
