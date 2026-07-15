import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

export function DesktopNav() {
    return (
        <nav className={styles.desktopNav}>
            <NavLink
                to="/dashboard/home"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
            >
                Configurações
            </NavLink>

            <NavLink
                to="/dashboard/chapters"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
            >
                Capítulos
            </NavLink>

            <NavLink
                to="/dashboard/timeline"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
            >
                Linha do Tempo
            </NavLink>
        </nav>
    );
}
