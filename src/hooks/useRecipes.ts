import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Recipe } from "../types";

export function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchRecipes() {
        setLoading(true);
        const { data, error: err } = await supabase
            .from("recipes")
            .select("*")
            .order("created_at", { ascending: true });

        if (err) setError("Erro ao carregar receitas.");
        else setRecipes(data);

        setLoading(false);
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    async function addRecipe(recipe: Omit<Recipe, "id" | "created_at">) {
        setLoading(true);
        const { error: err } = await supabase.from("recipes").insert(recipe);

        if (err) setError("Erro ao adicionar receita.");
        else await fetchRecipes();
    }

    async function updateRecipe(id: string, updates: Partial<Recipe>) {
        setLoading(true);
        const { error: err } = await supabase.from("recipes").update(updates).eq("id", id);

        if (err) setError("Erro ao atualizar receita.");
        else await fetchRecipes();
    }

    async function removeRecipe(id: string) {
        setLoading(true);
        const { error: err } = await supabase.from("recipes").delete().eq("id", id);

        if (err) setError("Erro ao excluir receita.");
        else await fetchRecipes();
    }

    return { recipes, loading, error, addRecipe, updateRecipe, removeRecipe };
}
