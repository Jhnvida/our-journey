import { AnimatePresence, motion } from "framer-motion";
import { Check, CircleDashed, Clock, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useChapters } from "../../hooks/useChapters";
import { useRecipes } from "../../hooks/useRecipes";
import { useSettings } from "../../hooks/useSettings";
import { useTimelineEvents } from "../../hooks/useTimelineEvents";
import { fadeIn, staggerContainer } from "../../lib/animations";
import { calculateTimeDifference } from "../../lib/calculateTimeDifference";
import { formatDate } from "../../lib/formatDate";

import styles from "./styles.module.css";

export function HomePage() {
    const { settings } = useSettings();
    const { events } = useTimelineEvents();
    const { recipes } = useRecipes();
    const { chapters } = useChapters();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [timePassed, setTimePassed] = useState({ years: 0, months: 0, days: 0 });
    const [activeRecipeIndex, setActiveRecipeIndex] = useState(0);

    useEffect(() => {
        if (!recipes || recipes.length <= 1) return;
        const interval = setInterval(() => {
            setActiveRecipeIndex((prev) => (prev + 1) % recipes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [recipes]);

    useEffect(() => {
        if (!settings?.relationship_start_date) return;

        const calculateTime = () => {
            setTimePassed(calculateTimeDifference(settings.relationship_start_date));
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000 * 60 * 60);
        return () => clearInterval(interval);
    }, [settings?.relationship_start_date]);

    const formatNumber = (num: number) => num.toString().padStart(2, "0");

    return (
        <main className={styles.container}>
            <section className={styles.hero_section}>
                <div className={styles.hero_bg}></div>

                <header className={styles.header}>
                    <div className={styles.brand_label}>A NOSSA JORNADA</div>
                    <div className={styles.header_actions}>
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    className={styles.nav_links}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                >
                                    <a
                                        href="https://github.com/Jhnvida/our-journey"
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.nav_link}
                                    >
                                        Código no GitHub
                                    </a>
                                    <Link to="/dashboard" className={styles.nav_link}>
                                        Painel Administrativo
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <button className={styles.menu_button} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </header>

                <div className={styles.hero_content}>
                    <div className={styles.hero_content_inner}>
                        <motion.div
                            className={styles.counter_container}
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div className={styles.counter_item} variants={fadeIn}>
                                <span className={styles.counter_value}>{formatNumber(timePassed.years)}</span>
                                <span className={styles.counter_label}>ANOS</span>
                            </motion.div>
                            <motion.div className={styles.counter_item} variants={fadeIn}>
                                <span className={styles.counter_value}>{formatNumber(timePassed.months)}</span>
                                <span className={styles.counter_label}>MESES</span>
                            </motion.div>
                            <motion.div className={styles.counter_item} variants={fadeIn}>
                                <span className={styles.counter_value}>{formatNumber(timePassed.days)}</span>
                                <span className={styles.counter_label}>DIAS</span>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className={styles.hero_subtitle_container}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                        >
                            <p className={styles.hero_subtitle}>
                                Cada segundo da nossa história, medido em momentos preciosos.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {events && events.length > 0 && (
                <section className={styles.timeline_section}>
                    <div className={styles.section_header}>
                        <motion.h2
                            className={styles.section_title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.8 }}
                            variants={fadeIn}
                        >
                            A LINHA DO TEMPO
                        </motion.h2>
                    </div>
                    <div className={styles.timeline_carousel}>
                        <motion.div
                            className={styles.timeline_carousel_inner}
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: Math.max(30, events.length * 15),
                            }}
                        >
                            {[...events, ...events].map((event, index) => (
                                <div key={`${event.id}-${index}`} className={styles.timeline_item}>
                                    <img
                                        src={
                                            event.image_url ||
                                            "https://images.unsplash.com/photo-1522673607200-164d1b6ce486"
                                        }
                                        alt={event.title}
                                        className={styles.timeline_image}
                                    />
                                    <div className={styles.timeline_overlay}>
                                        <p className={styles.timeline_overlay_date}>{formatDate(event.date)}</p>
                                        <h3 className={styles.timeline_overlay_title}>{event.title}</h3>
                                        <p className={styles.timeline_overlay_text}>{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            <section className={styles.split_section}>
                <div className={styles.split_grid}>
                    {recipes && recipes.length > 0 && (
                        <motion.div
                            className={styles.kitchen_section}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={staggerContainer}
                        >
                            <motion.h2
                                className={`${styles.section_title} ${styles.section_title_small}`}
                                variants={fadeIn}
                            >
                                A NOSSA COZINHA
                            </motion.h2>
                            <motion.p className={styles.kitchen_subtitle} variants={fadeIn}>
                                Porque algumas das nossas melhores memórias foram construídas em volta da mesa, entre um
                                tempero e outro.
                            </motion.p>

                            <motion.div className={styles.kitchen_cards_container} variants={fadeIn}>
                                <AnimatePresence>
                                    {recipes.map((recipe, index) => {
                                        const isMain = index === activeRecipeIndex;
                                        const isBg =
                                            recipes.length > 1 && index === (activeRecipeIndex + 1) % recipes.length;

                                        if (!isMain && !isBg) return null;

                                        return (
                                            <motion.div
                                                key={recipe.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.8, x: isBg ? 100 : -100 }}
                                                animate={{
                                                    opacity: isMain ? 1 : 0.85,
                                                    scale: isMain ? 1 : 0.85,
                                                    rotate: isMain ? -2 : 6,
                                                    x: isMain ? 0 : "10%",
                                                    y: isMain ? 0 : 60,
                                                    zIndex: isMain ? 10 : 0,
                                                }}
                                                exit={{ opacity: 0, scale: 0.8, x: -100 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                                className={styles.kitchen_card}
                                            >
                                                <img
                                                    src={
                                                        recipe.image_url ||
                                                        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35"
                                                    }
                                                    alt={recipe.title}
                                                    className={styles.kitchen_card_img}
                                                />
                                                <h3 className={styles.kitchen_card_title}>{recipe.title}</h3>
                                                <p className={styles.kitchen_card_desc}>{recipe.description}</p>

                                                <AnimatePresence>
                                                    {isMain && recipe.ingredients && recipe.ingredients.length > 0 && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className={styles.ingredients_header}
                                                        >
                                                            <p className={styles.ingredients_label}>
                                                                <Clock size={14} /> INGREDIENTES
                                                            </p>
                                                            <div className={styles.ingredients_list}>
                                                                {recipe.ingredients.map((ing: string, i: number) => (
                                                                    <span key={i} className={styles.ingredient_item}>
                                                                        {ing}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    )}

                    {chapters && chapters.length > 0 && (
                        <motion.div
                            className={styles.chapters_section}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={staggerContainer}
                        >
                            <motion.h2
                                className={`${styles.section_title} ${styles.section_title_small}`}
                                variants={fadeIn}
                            >
                                PRÓXIMOS CAPÍTULOS
                            </motion.h2>
                            <motion.p className={styles.kitchen_subtitle} variants={fadeIn}>
                                Acompanhe a nossa jornada passo a passo.
                            </motion.p>
                            <div className={styles.chapters_list}>
                                {chapters.map((chapter) => {
                                    const isCompleted =
                                        chapter.status === "completed" ||
                                        chapter.status === "concluido" ||
                                        chapter.status === "concluído";
                                    return (
                                        <motion.div key={chapter.id} className={styles.chapter_item} variants={fadeIn}>
                                            <div className={styles.chapter_info}>
                                                <div
                                                    className={
                                                        isCompleted
                                                            ? styles.chapter_icon_done
                                                            : styles.chapter_icon_pending
                                                    }
                                                >
                                                    {isCompleted ? <Check size={24} /> : <CircleDashed size={24} />}
                                                </div>
                                                <h4 className={styles.chapter_title}>{chapter.title}</h4>
                                            </div>
                                            <div className={styles.chapter_status}>
                                                <span
                                                    className={
                                                        isCompleted
                                                            ? styles.status_label_done
                                                            : styles.status_label_pending
                                                    }
                                                >
                                                    {isCompleted ? "CONCLUÍDO" : "PENDENTE"}
                                                </span>
                                                <div
                                                    className={`${styles.progress_bar} ${isCompleted ? styles.progress_bar_done : styles.progress_bar_pending}`}
                                                >
                                                    <div
                                                        className={
                                                            isCompleted
                                                                ? styles.progress_bar_done_fill
                                                                : styles.progress_bar_pending_fill
                                                        }
                                                    ></div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footer_brand}>A NOSSA JORNADA</div>
            </footer>
        </main>
    );
}
