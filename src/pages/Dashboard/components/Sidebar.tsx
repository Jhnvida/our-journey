import { ChefHat, History, Image, LogOut, Sparkles, TableConfig } from "lucide-react";
import { motion } from "motion/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./Sidebar.module.css";

const navigations = [
    { value: "", label: "A Linha do Tempo", icon: <History /> },
    { value: "recipes", label: "A Nossa Cozinha", icon: <ChefHat /> },
    { value: "chapters", label: "Próximos Capítulos", icon: <Sparkles /> },
    { value: "settings", label: "Configurações", icon: <TableConfig /> },
    { value: "gallery", label: "Galeria", icon: <Image /> },
];

export function Sidebar() {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    async function handleSignOut() {
        signOut();
        navigate("/login");
    }

    return (
        <motion.div
            className={styles.sidebar}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.header}>
                <h1>Nossa Jornada</h1>
                <p>Painel de Controle</p>
            </div>

            <div className={styles.nav}>
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
            </div>

            <div className={styles.footer}>
                <motion.button
                    onClick={handleSignOut}
                    className="btn btn-secondary"
                    style={{ width: "100%" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <LogOut className={styles.icon} />
                    Sair
                </motion.button>
            </div>
        </motion.div>
    );
}
