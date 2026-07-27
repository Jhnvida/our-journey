import { ChefHat } from "lucide-react";
import styles from "./RecipeCard.module.css";

type RecipeCardProps = {
    title: string;
    description: string | null;
    ingredients: string[];
    imageUrl?: string | null;
};

export const RecipeCard = ({ title, description, ingredients, imageUrl }: RecipeCardProps) => {
    return (
        <div className={`${styles.recipe_card} reveal_up`}>
            {imageUrl && (
                <div className={`img_zoom_container ${styles.image_container}`}>
                    <img src={imageUrl} alt={title} className={`img_zoom ${styles.image}`} />
                </div>
            )}

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    {description && <p className={styles.description}>{description}</p>}
                </div>

                <div className={styles.ingredients_section}>
                    <div className={styles.ingredients_header}>
                        <ChefHat size={18} className={styles.icon} />
                        <h4 className={styles.ingredients_title}>Ingredientes</h4>
                    </div>
                    
                    <ul className={styles.ingredients_list}>
                        {ingredients.map((ingredient, idx) => (
                            <li key={idx} className={styles.ingredient_chip}>
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
