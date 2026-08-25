import { motion } from "motion/react";
import { useState } from "react";
import { SectionHeader } from "../../components/SectionHeader";
import { useRecipes } from "../../hooks/useRecipes";
import type { Recipe } from "../../types";
import styles from "../Dashboard/admin.module.css";
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
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.header}>
                <SectionHeader title="A Nossa Cozinha" subtitle="Gerencie as receitas" />

                {!isFormOpen && (
                    <motion.button
                        className={styles.button}
                        onClick={handleOpenForm}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Nova Receita
                    </motion.button>
                )}
            </div>

            {error && <div className={styles.error_message}>{error}</div>}

            {isFormOpen ? (
                <RecipesForm data={selectedRecipe} onSave={handleSave} onCancel={handleCloseForm} loading={loading} />
            ) : (
                <RecipesList recipes={recipes} onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </motion.div>
    );
}
