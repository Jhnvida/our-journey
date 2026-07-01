import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type Chapter = {
    label: string;
    completed: boolean;
};

export function useChapters() {
    const [chapters, setChapters] = useState<Chapter[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function fetchChapters() {
            const { data } = await supabase.from("chapters").select("label, completed");

            if (isMounted && data) {
                setChapters(data as Chapter[]);
            }
        }

        fetchChapters();

        return () => {
            isMounted = false;
        };
    }, []);

    return chapters;
}
