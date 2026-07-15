import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

type MobileMenuProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <nav className={styles.mobileNav}>
            <NavLink
                to="/dashboard/home"
                className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ""}`}
                onClick={onClose}
            >
                Configurações
            </NavLink>

            <NavLink
                to="/dashboard/chapters"
                className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ""}`}
                onClick={onClose}
            >
                Capítulos
            </NavLink>

            <NavLink
                to="/dashboard/timeline"
                className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ""}`}
                onClick={onClose}
            >
                Linha do Tempo
            </NavLink>
        </nav>
    );
}
