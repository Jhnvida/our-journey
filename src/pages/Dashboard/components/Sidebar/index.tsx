import { useAuth } from "@/features/auth/hooks/useAuth";
import { ChefHat, History, Image, LogOut, Menu, Sparkles, TableConfig, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const navigations = [
    { value: "", label: "A Linha do Tempo", icon: <History /> },
    { value: "recipes", label: "A Nossa Cozinha", icon: <ChefHat /> },
    { value: "chapters", label: "Próximos Capítulos", icon: <Sparkles /> },
    { value: "settings", label: "Configurações", icon: <TableConfig /> },
    { value: "gallery", label: "Galeria", icon: <Image /> },
];

const sidebarVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
};

const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: "auto",
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.2 },
    },
};

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
        <motion.div className={styles.sidebar} variants={sidebarVariants} initial="hidden" animate="visible">
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
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles.nav_mobile_inner}>
                            {navigations.map((nav) => (
                                <div key={nav.label}>
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
                                </div>
                            ))}

                            <div className={styles.footer}>
                                <button onClick={handleSignOut} className="btn btn-secondary" style={{ width: "100%" }}>
                                    <LogOut className={styles.icon} />
                                    Sair
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
