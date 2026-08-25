import { Check, CircleDashed, Clock, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useChapters } from "../hooks/useChapters";
import { useRecipes } from "../hooks/useRecipes";
import { useSettings } from "../hooks/useSettings";
import { useTimelineEvents } from "../hooks/useTimelineEvents";
import { calculateTimeDifference } from "../lib/calculateTimeDifference";
import { formatDate } from "../lib/formatDate";

import styles from "./Home.module.css";

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

        function calculateTime() {
            if (settings?.relationship_start_date) {
                setTimePassed(calculateTimeDifference(settings.relationship_start_date));
            }
        }

        calculateTime();
        const interval = setInterval(calculateTime, 1000 * 60 * 60);
        return () => clearInterval(interval);
    }, [settings?.relationship_start_date]);

    function formatNumber(num: number) {
        return num.toString().padStart(2, "0");
    }

    return (
        <main className={styles.container}>
            <section className={styles.hero_section}>
                <div className={styles.hero_bg}></div>

                <motion.header
                    className={styles.header}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.brand_label}>A NOSSA JORNADA</div>
                    <div className={styles.header_actions}>
                        {isMenuOpen && (
                            <div className={styles.nav_links}>
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
                            </div>
                        )}

                        <motion.button
                            className={styles.menu_button}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </motion.header>

                <motion.div
                    className={styles.hero_content}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className={styles.hero_content_inner}>
                        <div className={styles.counter_container}>
                            <div className={styles.counter_item}>
                                <span className={styles.counter_value}>{formatNumber(timePassed.years)}</span>
                                <span className={styles.counter_label}>ANOS</span>
                            </div>
                            <div className={styles.counter_item}>
                                <span className={styles.counter_value}>{formatNumber(timePassed.months)}</span>
                                <span className={styles.counter_label}>MESES</span>
                            </div>
                            <div className={styles.counter_item}>
                                <span className={styles.counter_value}>{formatNumber(timePassed.days)}</span>
                                <span className={styles.counter_label}>DIAS</span>
                            </div>
                        </div>

                        <div className={styles.hero_subtitle_container}>
                            <p className={styles.hero_subtitle}>
                                Cada segundo da nossa história, medido em momentos preciosos.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {events && events.length > 0 && (
                <section className={styles.timeline_section}>
                    <div className={styles.section_header}>
                        <h2 className={`${styles.section_title} ${styles.section_title_small}`}>A LINHA DO TEMPO</h2>
                        <p className={styles.kitchen_subtitle}>Relembre os melhores momentos da nossa história.</p>
                    </div>
                    <div className={styles.timeline_masonry}>
                        {events.map((event, index) => (
                            <motion.div
                                key={event.id}
                                className={styles.timeline_masonry_item}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <img
                                    src={
                                        event.image_url ||
                                        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486"
                                    }
                                    alt={event.title}
                                    className={styles.timeline_masonry_image}
                                />
                                <div className={styles.timeline_masonry_content}>
                                    <p className={styles.timeline_masonry_date}>{formatDate(event.date)}</p>
                                    <h3 className={styles.timeline_masonry_title}>{event.title}</h3>
                                    <p className={styles.timeline_masonry_text}>{event.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            <section className={styles.split_section}>
                <div className={styles.split_grid}>
                    {recipes && recipes.length > 0 && (
                        <motion.div
                            className={styles.timeline_carousel_inner}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className={`${styles.section_title} ${styles.section_title_small}`}>A NOSSA COZINHA</h2>
                            <p className={styles.kitchen_subtitle}>
                                Porque algumas das nossas melhores memórias foram construídas em volta da mesa, entre um
                                tempero e outro.
                            </p>

                            <div className={styles.kitchen_cards_container}>
                                {recipes.map((recipe, index) => {
                                    const isMain = index === activeRecipeIndex;
                                    const isBg =
                                        recipes.length > 1 && index === (activeRecipeIndex + 1) % recipes.length;

                                    if (!isMain && !isBg) return null;

                                    return (
                                        <div
                                            key={recipe.id}
                                            className={styles.kitchen_card}
                                            style={{
                                                opacity: isMain ? 1 : 0.4,
                                                transform: isMain
                                                    ? "scale(1) translateY(0)"
                                                    : "scale(0.9) translateY(40px)",
                                                zIndex: isMain ? 10 : 0,
                                                transition: "all 0.5s ease-in-out",
                                                pointerEvents: isMain ? "auto" : "none",
                                            }}
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

                                            {isMain && recipe.ingredients && recipe.ingredients.length > 0 && (
                                                <div className={styles.ingredients_header}>
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
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {chapters && chapters.length > 0 && (
                        <motion.div
                            className={styles.chapters_section}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className={`${styles.section_title} ${styles.section_title_small}`}>
                                PRÓXIMOS CAPÍTULOS
                            </h2>
                            <p className={styles.kitchen_subtitle}>Acompanhe a nossa jornada passo a passo.</p>
                            <div className={styles.chapters_list}>
                                {chapters.map((chapter) => {
                                    const isCompleted = chapter.status === "concluido";

                                    return (
                                        <div key={chapter.id} className={styles.chapter_item}>
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
                                        </div>
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
