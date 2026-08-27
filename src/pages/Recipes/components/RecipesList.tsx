import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "../../../lib/motion";
import styles from "../../../styles/admin.module.css";
import type { Recipe } from "../../../types";

interface RecipesListProps {
    recipes: Recipe[];
    onEdit: (recipe: Recipe) => void;
    onDelete: (id: string) => void;
}

const containerVariants = staggerContainer(0.05);
const cardVariants = fadeInUp(12, 0.3);

export function RecipesList({ recipes, onEdit, onDelete }: RecipesListProps) {
    return (
        <div className={styles.list_section}>
            <motion.div className={styles.event_list} initial="hidden" animate="visible" variants={containerVariants}>
                {recipes.map((recipe) => (
                    <motion.div key={recipe.id} className={styles.event_card} variants={cardVariants}>
                        {recipe.image_url && (
                            <img src={recipe.image_url} alt={recipe.title} className={styles.event_image} />
                        )}

                        <div className={styles.event_card_body}>
                            <div className={styles.event_content}>
                                <h4 className={styles.event_title}>{recipe.title}</h4>
                                {recipe.description && <p className={styles.event_description}>{recipe.description}</p>}
                            </div>

                            <div className={styles.event_actions}>
                                <button className="btn btn-small" onClick={() => onEdit(recipe)}>
                                    Editar
                                </button>
                                <button className="btn btn-small" onClick={() => onDelete(recipe.id)}>
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
