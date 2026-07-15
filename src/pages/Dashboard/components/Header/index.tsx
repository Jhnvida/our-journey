import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks";
import { DesktopNav } from "../DesktopNav";
import { MobileMenu } from "../MobileMenu";
import styles from "./styles.module.css";

export function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    function toggleMobileMenu() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <header className={styles.topNav}>
            <div className={styles.navContainer}>
                <div className={styles.brand}>
                    <h1 className={styles.brandTitle}>Painel Administrativo</h1>
                </div>

                <DesktopNav />

                <div className={styles.navActions}>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <LogOut size={18} />
                        <span className={styles.logoutText}>Sair</span>
                    </button>

                    <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </header>
    );
}
