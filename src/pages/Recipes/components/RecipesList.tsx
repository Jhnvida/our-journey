import { AdminListCard } from "@/components/ui/AdminListCard";
import styles from "@/styles/admin.module.css";
import type { Recipe } from "@/types";

interface RecipesListProps {
    recipes: Recipe[];
    onEdit: (recipe: Recipe) => void;
    onDelete: (id: string) => void;
}

export const RecipesList = ({ recipes, onEdit, onDelete }: RecipesListProps) => {
    return (
        <div className={styles.list_section}>
            <div className={styles.event_list}>
                {recipes.map((recipe) => (
                    <AdminListCard
                        key={recipe.id}
                        imageUrl={recipe.image_url || undefined}
                        imageAlt={recipe.title}
                        onEdit={() => onEdit(recipe)}
                        onDelete={() => onDelete(recipe.id)}
                    >
                        <h4 className={styles.event_title}>{recipe.title}</h4>
                        {recipe.description && <p className={styles.event_description}>{recipe.description}</p>}
                    </AdminListCard>
                ))}
            </div>
        </div>
    );
};
