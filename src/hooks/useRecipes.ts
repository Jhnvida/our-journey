import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Recipe } from "../types";

export function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecipes = useCallback(async () => {
        setLoading(true);
        setError(null);
        const { data, error: err } = await supabase
            .from("recipes")
            .select("*")
            .order("created_at", { ascending: true });

        if (err) {
            console.error(err);
            setError("Erro ao carregar receitas.");
        } else if (data) {
            setRecipes(data as Recipe[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    async function addRecipe(recipe: Omit<Recipe, "id" | "created_at">) {
        setLoading(true);
        setError(null);
        const { error: err } = await supabase.from("recipes").insert(recipe);
        if (err) {
            console.error(err);
            setError("Erro ao adicionar receita.");
            setLoading(false);
            throw err;
        }
        await fetchRecipes();
    }

    async function updateRecipe(id: string, updates: Partial<Recipe>) {
        setLoading(true);
        setError(null);
        const { error: err } = await supabase.from("recipes").update(updates).eq("id", id);
        if (err) {
            console.error(err);
            setError("Erro ao atualizar receita.");
            setLoading(false);
            throw err;
        }
        await fetchRecipes();
    }

    async function removeRecipe(id: string) {
        setLoading(true);
        setError(null);
        const { error: err } = await supabase.from("recipes").delete().eq("id", id);
        if (err) {
            console.error(err);
            setError("Erro ao excluir receita.");
            setLoading(false);
            throw err;
        }
        await fetchRecipes();
    }

    return { recipes, loading, error, addRecipe, updateRecipe, removeRecipe, fetchRecipes };
}
