import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { useRecipes } from "@/hooks/useRecipes";
import styles from "@/styles/admin.module.css";
import type { Recipe } from "@/types";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { RecipesForm } from "./components/RecipesForm";
import { RecipesList } from "./components/RecipesList";

const fadeVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.2, ease: "easeIn" },
    },
};

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

            <AnimatePresence mode="wait">
                {isFormOpen ? (
                    <motion.div key="form" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
                        <RecipesForm
                            data={selectedRecipe}
                            onSave={handleSave}
                            onCancel={handleCloseForm}
                            loading={loading}
                        />
                    </motion.div>
                ) : (
                    <motion.div key="list" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
                        <RecipesList recipes={recipes} onEdit={handleEdit} onDelete={handleDelete} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
