import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Chapter } from "../types";

export function useChapters() {
    const [chapters, setChapters] = useState<Chapter[]>([]);

    useEffect(() => {
        async function fetchChapters() {
            const { data, error } = await supabase.from("chapters").select("*").order("status", { ascending: true });

            if (error) {
                console.error(error);
            } else if (data) {
                setChapters(data as Chapter[]);
            }
        }

        fetchChapters();
    }, []);

    async function addChapter(title: string, status: string) {
        const { data, error } = await supabase.from("chapters").insert({ title, status }).select();

        if (error) {
            console.error(error);
        } else if (data) {
            setChapters((prev) => [...prev, data[0]]);
        }
    }

    async function deleteChapter(id: string) {
        const { data, error } = await supabase.from("chapters").delete().eq("id", id).select();

        if (error) {
            console.error(error);
        } else if (data) {
            setChapters(chapters.filter((chapter) => chapter.id !== id));
        }
    }

    return { chapters, addChapter, deleteChapter };
}
