import { useState } from "react";
import { SectionHeader } from "../../components/SectionHeader";
import { useRecipes } from "../../hooks/useRecipes";
import styles from "./styles.module.css";
import type { Recipe } from "../../types";
import { RecipesForm } from "./components/RecipesForm";
import { RecipesList } from "./components/RecipesList";

export function Recipes() {
    const { recipes, addRecipe, updateRecipe, removeRecipe, loading, error } = useRecipes();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    function handleOpenForm() {
        setSelectedRecipe(null);
        setIsFormOpen(true);
    }

    function handleEdit(recipe: Recipe) {
        setSelectedRecipe(recipe);
        setIsFormOpen(true);
    }

    function handleCloseForm() {
        setIsFormOpen(false);
        setSelectedRecipe(null);
    }

    async function handleSave(data: Omit<Recipe, "id" | "created_at">) {
        if (selectedRecipe) {
            await updateRecipe(selectedRecipe.id, data);
        } else {
            await addRecipe(data);
        }
        handleCloseForm();
    }

    async function handleDelete(id: string) {
        if (window.confirm("Tem certeza que deseja excluir esta receita?")) {
            await removeRecipe(id);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <SectionHeader title="A Nossa Cozinha" subtitle="Gerencie as receitas" />

                {!isFormOpen && (
                    <button className={styles.button} onClick={handleOpenForm}>
                        Nova Receita
                    </button>
                )}
            </div>

            {error && <div className={styles.error_message}>{error}</div>}

            {isFormOpen ? (
                <RecipesForm data={selectedRecipe} onSave={handleSave} onCancel={handleCloseForm} loading={loading} />
            ) : (
                <RecipesList recipes={recipes} onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </div>
    );
}
