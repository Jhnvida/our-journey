import { useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import { useRecipes } from "../../hooks/useRecipes";
import type { Recipe } from "../../types";
import RecipesForm from "./components/RecipesForm";
import RecipesList from "./components/RecipesList";
import styles from "./styles.module.css";

export default function Recipes() {
    const { recipes } = useRecipes();

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

            {isFormOpen ? (
                <RecipesForm data={selectedRecipe} onCancel={handleCloseForm} />
            ) : (
                <RecipesList recipes={recipes} onEdit={handleEdit} />
            )}
        </div>
    );
}
