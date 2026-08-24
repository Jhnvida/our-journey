import { intervalToDuration } from "date-fns";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Check, CircleDashed, Clock, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useChapters } from "../../hooks/useChapters";
import { useRecipes } from "../../hooks/useRecipes";
import { useSettings } from "../../hooks/useSettings";
import { useTimelineEvents } from "../../hooks/useTimelineEvents";

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
            const start = new Date(settings.relationship_start_date);
            const now = new Date();
            const duration = intervalToDuration({ start, end: now });

            setTimePassed({
                years: duration.years || 0,
                months: duration.months || 0,
                days: duration.days || 0,
            });
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000 * 60 * 60); // update every hour
        return () => clearInterval(interval);
    }, [settings?.relationship_start_date]);

    // Format numbers with leading zero
    const formatNumber = (num: number) => num.toString().padStart(2, "0");

    const fadeIn: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <main className={styles.container}>
            {/* HERO SECTION */}
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
                                    <Link to="/admin" className={styles.nav_link}>
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

            {/* TIMELINE SECTION */}
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
                                        <p className={styles.timeline_overlay_date}>
                                            {new Date(event.date).toLocaleDateString("pt-BR", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                        <h3 className={styles.timeline_overlay_title}>{event.title}</h3>
                                        <p className={styles.timeline_overlay_text}>{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* KITCHEN & CHAPTERS SPLIT SECTION */}
            <section className={styles.split_section}>
                <div className={styles.split_grid}>
                    {/* KITCHEN SECTION */}
                    {recipes && recipes.length > 0 && (
                        <motion.div
                            className={styles.kitchen_section}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={staggerContainer}
                        >
                            <motion.h2
                                className={styles.section_title}
                                variants={fadeIn}
                                style={{ marginBottom: "16px", textAlign: "center" }}
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
                                                            style={{ overflow: "hidden" }}
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

                    {/* CHAPTERS SECTION */}
                    {chapters && chapters.length > 0 && (
                        <motion.div
                            className={styles.chapters_section}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={staggerContainer}
                        >
                            <motion.h2
                                className={styles.section_title}
                                variants={fadeIn}
                                style={{ marginBottom: "16px", textAlign: "center" }}
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
                                                        isCompleted ? styles.chapter_icon_done : styles.chapter_icon_pending
                                                    }
                                                >
                                                    {isCompleted ? <Check size={24} /> : <CircleDashed size={24} />}
                                                </div>
                                                <h4 className={styles.chapter_title}>{chapter.title}</h4>
                                            </div>
                                            <div className={styles.chapter_status}>
                                                <span
                                                    className={
                                                        isCompleted ? styles.status_label_done : styles.status_label_pending
                                                    }
                                                >
                                                    {isCompleted ? "CONCLUÍDO" : "PENDENTE"}
                                                </span>
                                                <div
                                                    className={
                                                        isCompleted ? styles.progress_bar_done : styles.progress_bar_pending
                                                    }
                                                    style={{ width: "100%", height: "2px" }}
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

            {/* FOOTER */}
            <footer className={styles.footer}>
                <div className={styles.footer_brand}>A NOSSA JORNADA</div>
            </footer>
        </main>
    );
}
