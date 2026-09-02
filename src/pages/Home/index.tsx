import { Preloader } from "@/components/feedback/Preloader";
import { usePreloader } from "@/hooks/usePreloader";
import { AnimatePresence } from "motion/react";
import { Chapters } from "./sections/Chapters";
import { Hero } from "./sections/Hero";
import { Kitchen } from "./sections/Kitchen";
import { Timeline } from "./sections/Timeline";
import styles from "./styles.module.css";

const mainVisibleStyle = { opacity: 1, transition: "opacity 0.5s ease" } as const;
const mainHiddenStyle = { opacity: 0, transition: "opacity 0.5s ease" } as const;

export function Home() {
    const { isReady } = usePreloader();

    return (
        <>
            <AnimatePresence mode="wait">{!isReady && <Preloader key="preloader" />}</AnimatePresence>

            <main className={styles.container} style={isReady ? mainVisibleStyle : mainHiddenStyle}>
                <Hero isReady={isReady} />
                <Timeline />
                <Kitchen />
                <Chapters />

                <footer className={styles.footer}>
                    <div className={styles.footer_brand}>A Nossa Jornada</div>
                </footer>
            </main>
        </>
    );
}
