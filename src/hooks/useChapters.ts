import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type Chapter = {
    id: number;
    title: string;
    status: string;
    created_at: string;
};

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
