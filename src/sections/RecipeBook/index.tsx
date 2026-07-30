import SectionHeader from "../../components/SectionHeader";
import { useRecipes } from "../../hooks/useRecipes";
import RecipeCard from "./components/RecipeCard";
import styles from "./styles.module.css";

export default function RecipeBook() {
    const { recipes } = useRecipes();

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <SectionHeader
                    title="A Nossa Cozinha"
                    subtitle="Porque algumas das nossas melhores memórias foram construídas em volta da mesa, entre um tempero e outro."
                />

                <div className={styles.grid}>
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
}
