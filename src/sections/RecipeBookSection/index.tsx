import { SectionHeader } from "../../components/SectionHeader";
import { useRecipes } from "../../hooks/useRecipes";
import { RecipeCard } from "./components/RecipeCard";
import styles from "./styles.module.css";

export const RecipeBookSection = () => {
    const { recipes } = useRecipes();

    return (
        <section className={`${styles.recipe_section} reveal_up`}>
            <div className={styles.recipes_container}>
                <SectionHeader
                    title="A Nossa Cozinha"
                    subtitle="Porque algumas das nossas melhores memórias foram construídas em volta da mesa, entre um tempero e outro."
                />

                {recipes && recipes.length > 0 && (
                    <div className={styles.recipes_list}>
                        {recipes.map((recipe, i) => (
                            <RecipeCard
                                key={recipe.id}
                                index={i}
                                title={recipe.title}
                                description={recipe.description}
                                ingredients={recipe.ingredients}
                                imageUrl={recipe.image_url}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
