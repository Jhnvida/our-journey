import { SectionHeader } from "@/components/ui/SectionHeader";
import { useRecipes } from "@/features/recipes/hooks/useRecipes";
import { KitchenCard } from "@/pages/Home/components/KitchenCard";
import { useMemo } from "react";
import styles from "./styles.module.css";

export function Kitchen() {
    const { recipes } = useRecipes();

    const { leftRecipes, rightRecipes } = useMemo(() => {
        if (!recipes) return { leftRecipes: [], rightRecipes: [] };
        return {
            leftRecipes: recipes.filter((_, i) => i % 2 === 0),
            rightRecipes: recipes.filter((_, i) => i % 2 !== 0),
        };
    }, [recipes]);

    if (!recipes || recipes.length === 0) return null;

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
