import { Chapters } from "../../sections/Chapters";
import { Footer } from "../../sections/Footer";
import { Hero } from "../../sections/Hero";
import { RecipeBook } from "../../sections/RecipeBook";
import { Timeline } from "../../sections/Timeline";
import styles from "./styles.module.css";

export function HomePage() {
    return (
        <main className={styles.container}>
            <Hero />
            <Timeline />
            <RecipeBook />
            <Chapters />
            <Footer />
        </main>
    );
}
