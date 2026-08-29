import { SectionHeader } from "../../../components/SectionHeader";
import { useRecipes } from "../../../hooks/useRecipes";
import { KitchenCard } from "../components/KitchenCard";
import styles from "./Kitchen.module.css";

export function Kitchen() {
    const { recipes } = useRecipes();
    if (!recipes || recipes.length === 0) return null;

    const leftRecipes = recipes.filter((_, i) => i % 2 === 0);
    const rightRecipes = recipes.filter((_, i) => i % 2 !== 0);

    return (
        <section className={styles.kitchen_section}>
            <SectionHeader
                title="A Nossa Cozinha"
                subtitle="Porque algumas das melhores memórias foram construídas em volta da mesa, entre um tempero e outro."
            />

            <div className={styles.kitchen_container}>
                <div className={styles.kitchen_mobile}>
                    {recipes.map((recipe, index) => (
                        <KitchenCard key={`mobile-${recipe.id}`} recipe={recipe} index={index} />
                    ))}
                </div>

                <div className={styles.kitchen_desktop}>
                    <div className={styles.kitchen_column}>
                        {leftRecipes.map((recipe, index) => (
                            <KitchenCard key={`desktop-left-${recipe.id}`} recipe={recipe} index={index} />
                        ))}
                    </div>

                    <div className={`${styles.kitchen_column} ${styles.kitchen_staggered}`}>
                        {rightRecipes.map((recipe, index) => (
                            <KitchenCard key={`desktop-right-${recipe.id}`} recipe={recipe} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
