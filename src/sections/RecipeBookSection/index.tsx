import { useRef } from "react";
import { SectionHeader } from "../../components/SectionHeader";
import { useRecipes } from "../../hooks/useRecipes";
import { RecipeNav } from "./components/RecipeNav";
import styles from "./styles.module.css";

export const RecipeBookSection = () => {
    const { recipes } = useRecipes();
    const bookRef = useRef<{ pageFlip: () => { flipPrev: () => void; flipNext: () => void } }>(null);

    return (
        <section className={`${styles.recipe_section} reveal_up`}>
            <div className={styles.recipe_container}>
                <SectionHeader
                    title="A Nossa Cozinha"
                    subtitle="Porque algumas das nossas melhores memórias foram construídas em volta da mesa, entre um tempero e outro."
                />

                {recipes && recipes.length > 0 && (
                    <>
                        <div className={styles.book_wrapper_container}>
                            <div className={styles.book_wrapper}></div>
                        </div>

                        <RecipeNav
                            onPrev={() => bookRef.current?.pageFlip()?.flipPrev()}
                            onNext={() => bookRef.current?.pageFlip()?.flipNext()}
                        />
                    </>
                )}
            </div>
        </section>
    );
};
