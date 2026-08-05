import type { Recipe } from "../../../types";
import styles from "../styles.module.css";

type RecipesListProps = {
    recipes: Recipe[];
    onEdit: (recipe: Recipe) => void;
};

export default function RecipesList({ recipes, onEdit }: RecipesListProps) {
    if (recipes.length === 0) {
        return <p>Nenhuma receita cadastrada.</p>;
    }

    return (
        <div className={styles.list_section}>
            <div className={styles.event_list}>
                {recipes.map((recipe) => (
                    <div key={recipe.id} className={styles.event_card}>
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
                                <button className={styles.button_small}>Excluir</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
