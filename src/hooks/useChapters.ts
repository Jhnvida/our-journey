import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Chapter } from "../types";

export function useChapters() {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchChapters = useCallback(async () => {
        setLoading(true);
        setError(null);
        const { data, error: err } = await supabase.from("chapters").select("*").order("status", { ascending: true });

        if (err) {
            console.error(err);
            setError("Erro ao carregar capítulos.");
        } else if (data) {
            setChapters(data as Chapter[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchChapters();
    }, [fetchChapters]);

    async function addChapter(chapter: Omit<Chapter, "id" | "created_at">) {
        setLoading(true);
        setError(null);
        const { error: err } = await supabase.from("chapters").insert(chapter);
        if (err) {
            console.error(err);
            setError("Erro ao adicionar capítulo.");
            setLoading(false);
            throw err;
        }
        await fetchChapters();
    }

    async function updateChapter(id: string, updates: Partial<Chapter>) {
        setLoading(true);
        setError(null);
        const { error: err } = await supabase.from("chapters").update(updates).eq("id", id);
        if (err) {
            console.error(err);
            setError("Erro ao atualizar capítulo.");
            setLoading(false);
            throw err;
        }
        await fetchChapters();
    }

    async function removeChapter(id: string) {
        setLoading(true);
        setError(null);
        const { error: err } = await supabase.from("chapters").delete().eq("id", id);
        if (err) {
            console.error(err);
            setError("Erro ao excluir capítulo.");
            setLoading(false);
            throw err;
        }
        await fetchChapters();
    }

    return { chapters, loading, error, addChapter, updateChapter, removeChapter, fetchChapters };
}
