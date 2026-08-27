import { ChefHat, History, Image, LogOut, Menu, Sparkles, TableConfig, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { fadeInUp, slideDown, staggerContainer } from "../../../lib/motion";
import styles from "./Sidebar.module.css";

const navigations = [
    { value: "", label: "A Linha do Tempo", icon: <History /> },
    { value: "recipes", label: "A Nossa Cozinha", icon: <ChefHat /> },
    { value: "chapters", label: "Próximos Capítulos", icon: <Sparkles /> },
    { value: "settings", label: "Configurações", icon: <TableConfig /> },
    { value: "gallery", label: "Galeria", icon: <Image /> },
];

const mobileNavVariants = slideDown();
const mobileStaggerVariants = staggerContainer(0.03);
const mobileItemVariants = fadeInUp(8, 0.2);

export function Sidebar() {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    async function handleSignOut() {
        signOut();
        navigate("/login");
    }

    const navContent = (
        <>
            {navigations.map((nav) => (
                <NavLink
                    key={nav.label}
                    to={nav.value ? `/dashboard/${nav.value}` : "/dashboard"}
                    end={nav.value === ""}
                    className={({ isActive }: { isActive: boolean }) =>
                        `${styles.nav_item} ${isActive ? styles.active : ""}`
                    }
                >
                    {nav.icon}
                    <span>{nav.label}</span>
                </NavLink>
            ))}

            <div className={styles.footer}>
                <button onClick={handleSignOut} className="btn btn-secondary" style={{ width: "100%" }}>
                    <LogOut className={styles.icon} />
                    Sair
                </button>
            </div>
        </>
    );

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.header_content}>
                    <h1>A Nossa Jornada</h1>
                    <p>Painel Administrativo</p>
                </div>

                <button className={styles.mobile_menu_btn} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            <div className={styles.nav_desktop}>{navContent}</div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.nav_mobile}
                        variants={mobileNavVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            variants={mobileStaggerVariants}
                            initial="hidden"
                            animate="visible"
                            className={styles.nav_mobile_inner}
                        >
                            {navigations.map((nav) => (
                                <motion.div key={nav.label} variants={mobileItemVariants}>
                                    <NavLink
                                        to={nav.value ? `/dashboard/${nav.value}` : "/dashboard"}
                                        end={nav.value === ""}
                                        className={({ isActive }: { isActive: boolean }) =>
                                            `${styles.nav_item} ${isActive ? styles.active : ""}`
                                        }
                                    >
                                        {nav.icon}
                                        <span>{nav.label}</span>
                                    </NavLink>
                                </motion.div>
                            ))}

                            <div className={styles.footer}>
                                <button onClick={handleSignOut} className="btn btn-secondary" style={{ width: "100%" }}>
                                    <LogOut className={styles.icon} />
                                    Sair
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
