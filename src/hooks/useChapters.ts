import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type Chapter = {
    label: string;
    completed: boolean;
};

export function useChapters() {
    const [chapters, setChapters] = useState<Chapter[]>([]);

    async function fetchChapters() {
        const { data } = await supabase.from("chapters").select("label, completed");

        if (data) {
            setChapters(data as Chapter[]);
        }
    }

    useEffect(() => {
        fetchChapters();
    }, []);

    return chapters;
}
