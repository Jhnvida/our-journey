import { motion } from "motion/react";
import type { Recipe } from "../../../types";
import styles from "../../Dashboard/admin.module.css";

interface RecipesListProps {
    recipes: Recipe[];
    onEdit: (recipe: Recipe) => void;
    onDelete: (id: string) => void;
}

export function RecipesList({ recipes, onEdit, onDelete }: RecipesListProps) {
    return (
        <div className={styles.list_section}>
            <div className={styles.event_list}>
                {recipes.map((recipe) => (
                    <motion.div key={recipe.id} className={styles.event_card} whileHover={{ y: -5 }}>
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
            </div>
        </div>
    );
}
