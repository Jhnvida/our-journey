import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { SectionHeader } from "../../components/SectionHeader";
import { useRecipes } from "../../hooks/useRecipes";
import { PageBackCover } from "./components/PageBackCover";
import { PageCover } from "./components/PageCover";
import { PageImage } from "./components/PageImage";
import { PageText } from "./components/PageText";
import { RecipeNav } from "./components/RecipeNav";
import styles from "./styles.module.css";

interface IFlipBook {
    pageFlip: () => {
        flipPrev: () => void;
        flipNext: () => void;
    };
}

export const RecipeBookSection = () => {
    const { recipes } = useRecipes();
    const bookRef = useRef<IFlipBook>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const onFlip = (e: { data: number }) => {
        setCurrentPage(e.data);
    };

    const totalPages = recipes.length > 0 ? recipes.length * 2 + 2 : 0;

    let bookState = "open";
    if (currentPage === 0) {
        bookState = "closed-front";
    } else if (currentPage >= totalPages - 1) {
        bookState = "closed-back";
    }

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
                            <div className={styles.book_wrapper} data-state={bookState}>
                                {/* @ts-expect-error react-pageflip typings are incomplete */}
                                <HTMLFlipBook
                                    width={400}
                                    height={550}
                                    size="stretch"
                                    minWidth={315}
                                    maxWidth={1000}
                                    minHeight={400}
                                    maxHeight={1533}
                                    maxShadowOpacity={0.5}
                                    showCover={true}
                                    mobileScrollSupport={true}
                                    className="demo-book"
                                    ref={bookRef}
                                    onFlip={onFlip}
                                >
                                    <PageCover />
                                    {recipes.flatMap((recipe, index) => [
                                        <PageImage
                                            key={`img-${recipe.id}`}
                                            imageUrl={recipe.image_url}
                                            number={index * 2 + 1}
                                        />,
                                        <PageText key={`txt-${recipe.id}`} recipe={recipe} number={index * 2 + 2} />,
                                    ])}
                                    <PageBackCover />
                                </HTMLFlipBook>
                            </div>
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
