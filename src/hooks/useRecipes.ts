import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface Recipe {
    id: number;
    title: string;
    description: string | null;
    ingredients: string[];
    image_url: string | null;
    created_at: string;
}

export function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        async function fetchRecipes() {
            const { data, error } = await supabase.from("recipes").select("*").order("created_at", { ascending: true });

            if (error) {
                console.error(error);
            } else if (data) {
                setRecipes(data as Recipe[]);
            }
        }

        fetchRecipes();
    }, []);

    return { recipes };
}
