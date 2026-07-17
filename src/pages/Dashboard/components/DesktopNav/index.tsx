import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

export function DesktopNav() {
    return (
        <nav className={styles.desktopNav}>
            <NavLink
                to="/painel/inicio"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
            >
                Configurações
            </NavLink>

            <NavLink
                to="/painel/capitulos"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
            >
                Capítulos
            </NavLink>

            <NavLink
                to="/painel/linha-do-tempo"
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
            >
                Linha do Tempo
            </NavLink>
        </nav>
    );
}
