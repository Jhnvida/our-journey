import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "../../../lib/animations";
import styles from "../styles.module.css";
import type { Recipe } from "../../../types";

interface RecipesListProps {
    recipes: Recipe[];
    onEdit: (recipe: Recipe) => void;
    onDelete: (id: string) => void;
}

export function RecipesList({ recipes, onEdit, onDelete }: RecipesListProps) {
    if (recipes.length === 0) {
        return <p>Nenhuma receita cadastrada.</p>;
    }

    return (
        <div className={styles.list_section}>
            <motion.div className={styles.event_list} variants={staggerContainer} initial="hidden" animate="visible">
                {recipes.map((recipe) => (
                    <motion.div key={recipe.id} className={styles.event_card} variants={slideUp}>
                        {recipe.image_url && (
                            <img src={recipe.image_url} alt={recipe.title} className={styles.event_image} />
                        )}

                        <div className={styles.event_card_body}>
                            <div className={styles.event_content}>
                                <h4 className={styles.event_title}>{recipe.title}</h4>

                                {recipe.description && <p className={styles.event_description}>{recipe.description}</p>}
                            </div>

                            <div className={styles.event_actions}>
                                <button className={styles.button_small} onClick={() => onEdit(recipe)}>
                                    Editar
                                </button>
                                <button className={styles.button_small} onClick={() => onDelete(recipe.id)}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
