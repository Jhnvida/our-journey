import { useState } from "react";
import { DashboardHeader } from "../../components/DashboardHeader";
import { useRecipes } from "../../hooks/useRecipes";
import styles from "../../styles/admin.module.css";
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
                <DashboardHeader title="A Nossa Cozinha" subtitle="Gerencie as receitas" />

                {!isFormOpen && (
                    <button className="btn btn-primary" onClick={handleOpenForm}>
                        Nova Receita
                    </button>
                )}
            </div>

            {error && <div className="alert-error">{error}</div>}

            {isFormOpen ? (
                <div key="form">
                    <RecipesForm
                        data={selectedRecipe}
                        onSave={handleSave}
                        onCancel={handleCloseForm}
                        loading={loading}
                    />
                </div>
            ) : (
                <div key="list">
                    <RecipesList recipes={recipes} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            )}
        </div>
    );
}
