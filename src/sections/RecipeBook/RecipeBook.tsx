import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { useRecipes } from "../../hooks/useRecipes";
import { RecipeCard } from "./components/RecipeCard/RecipeCard";
import styles from "./RecipeBook.module.css";

export const RecipeBook = () => {
    const { recipes } = useRecipes();

    return (
        <section className={styles.recipe_section}>
            <div className={styles.recipes_container}>
                <SectionHeader
                    title="A Nossa Cozinha"
                    subtitle="Porque algumas das nossas melhores memórias foram construídas em volta da mesa, entre um tempero e outro."
                />

                <div className={styles.recipes_grid}>
                    {recipes?.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            title={recipe.title}
                            description={recipe.description}
                            ingredients={recipe.ingredients}
                            imageUrl={recipe.image_url}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
