import { Preloader } from "@/components/feedback/Preloader";
import { usePreloader } from "@/hooks/usePreloader";
import { AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { Chapters } from "./sections/Chapters";
import { Hero } from "./sections/Hero";
import { Kitchen } from "./sections/Kitchen";
import { Timeline } from "./sections/Timeline";

const mainVisibleStyle = { opacity: 1, transition: "opacity 0.4s ease" } as const;
const mainHiddenStyle = { opacity: 0, transition: "opacity 0.4s ease" } as const;

export const Home = () => {
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
                    <div className={styles.footer_inner}>
                        <span className={styles.brand}>A Nossa Jornada</span>

                        <div className={styles.links}>
                            <a
                                href="https://github.com/Jhnvida/our-journey"
                                target="_blank"
                                rel="noreferrer"
                                className={styles.link}
                            >
                                GitHub
                            </a>
                            <Link to="/dashboard" className={styles.link}>
                                Painel
                            </Link>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
};
