import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Chapter } from "../types";

export function useChapters() {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchChapters() {
        setLoading(true);
        const { data, error: err } = await supabase.from("chapters").select("*").order("status", { ascending: true });

        if (err) setError("Erro ao carregar capítulos.");
        else setChapters(data);

        setLoading(false);
    }

    useEffect(() => {
        fetchChapters();
    }, []);

    async function addChapter(chapter: Omit<Chapter, "id" | "created_at">) {
        setLoading(true);
        const { error: err } = await supabase.from("chapters").insert(chapter);

        if (err) setError("Erro ao adicionar capítulo.");
        else await fetchChapters();
    }

    async function updateChapter(id: string, updates: Partial<Chapter>) {
        setLoading(true);
        const { error: err } = await supabase.from("chapters").update(updates).eq("id", id);

        if (err) setError("Erro ao atualizar capítulo.");
        else await fetchChapters();
    }

    async function removeChapter(id: string) {
        setLoading(true);
        const { error: err } = await supabase.from("chapters").delete().eq("id", id);

        if (err) setError("Erro ao excluir capítulo.");
        else await fetchChapters();
    }

    return { chapters, loading, error, addChapter, updateChapter, removeChapter };
}
