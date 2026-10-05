import { MasonryCard } from "@/components/ui/MasonryCard";
import type { Recipe } from "@/types";
import styles from "./KitchenCard.module.css";

export const KitchenCard = ({ recipe, index }: { recipe: Recipe; index: number }) => {
    return (
        <MasonryCard index={index} imageUrl={recipe.image_url || undefined} imageAlt={recipe.title}>
            <h3 className={styles.title}>{recipe.title}</h3>
            {recipe.description && <p className={styles.description}>{recipe.description}</p>}

            {recipe.ingredients && recipe.ingredients.length > 0 && (
                <p className={styles.ingredients}>
                    <span className={styles.ingredients_prefix}>Ingredientes: </span>
                    {recipe.ingredients.join(", ")}
                </p>
            )}
        </MasonryCard>
    );
};
