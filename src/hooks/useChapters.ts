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
            .order("created_at", { ascending: true });

        if (data) {
            setChapters(data as Chapter[]);
        }
    }

    async function addChapter(label: string) {
        const { data } = await supabase
            .from("chapters")
            .insert({ label, completed: false })
            .select("id, label, completed")
            .single();

        if (data) {
            setChapters((prev) => [...prev, data as Chapter]);
        }
    }

    async function checkChapter(id: string, completed: boolean) {
        await supabase.from("chapters").update({ completed }).eq("id", id);
        setChapters((prev) => prev.map((chapter) => (chapter.id === id ? { ...chapter, completed } : chapter)));
    }

    async function deleteChapter(id: string) {
        await supabase.from("chapters").delete().eq("id", id);
        setChapters((prev) => prev.filter((chapter) => chapter.id !== id));
    }

    async function updateChapter(id: string, label: string) {
        await supabase.from("chapters").update({ label }).eq("id", id);
        setChapters((prev) => prev.map((chapter) => (chapter.id === id ? { ...chapter, label } : chapter)));
    }

    useEffect(() => {
        fetchChapters();
    }, []);

    return { chapters, addChapter, checkChapter, deleteChapter, updateChapter };
}
