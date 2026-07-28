import Chapters from "../../sections/Chapters/Chapters";
import Footer from "../../sections/Footer/Footer";
import Hero from "../../sections/Hero/Hero";
import RecipeBook from "../../sections/RecipeBook/RecipeBook";
import Timeline from "../../sections/Timeline/Timeline";
import styles from "./Home.module.css";

export default function HomePage() {
    return (
        <main className={styles.home_main}>
            <Hero />
            <Timeline />
            <RecipeBook />
            <Chapters />
            <Footer />
        </main>
    );
}
