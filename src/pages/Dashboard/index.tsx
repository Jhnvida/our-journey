import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { ChaptersTab, HomeTab, TimelineTab } from "./components";
import styles from "./styles.module.css";

export function Dashboard() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"home" | "chapters" | "timeline">("home");

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    function toggleMobileMenu() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    if (loading || !user) {
        return <div className={styles.loadingContainer}>Carregando...</div>;
    }

    return (
        <div className={styles.layout}>
            <header className={styles.topNav}>
                <div className={styles.navContainer}>
                    <div className={styles.brand}>
                        <h1 className={styles.brandTitle}>Painel Administrativo</h1>
                    </div>

                    <nav className={styles.desktopNav}>
                        <button
                            className={`${styles.navItem} ${activeTab === "home" ? styles.navItemActive : ""}`}
                            onClick={() => setActiveTab("home")}
                        >
                            Início
                        </button>

                        <button
                            className={`${styles.navItem} ${activeTab === "chapters" ? styles.navItemActive : ""}`}
                            onClick={() => setActiveTab("chapters")}
                        >
                            Capítulos
                        </button>

                        <button
                            className={`${styles.navItem} ${activeTab === "timeline" ? styles.navItemActive : ""}`}
                            onClick={() => setActiveTab("timeline")}
                        >
                            Linha do Tempo
                        </button>
                    </nav>

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

                {isMobileMenuOpen && (
                    <nav className={styles.mobileNav}>
                        <button
                            className={`${styles.mobileNavItem} ${activeTab === "home" ? styles.mobileNavItemActive : ""}`}
                            onClick={() => {
                                setActiveTab("home");
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            Início
                        </button>

                        <button
                            className={`${styles.mobileNavItem} ${activeTab === "chapters" ? styles.mobileNavItemActive : ""}`}
                            onClick={() => {
                                setActiveTab("chapters");
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            Capítulos
                        </button>

                        <button
                            className={`${styles.mobileNavItem} ${activeTab === "timeline" ? styles.mobileNavItemActive : ""}`}
                            onClick={() => {
                                setActiveTab("timeline");
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            Linha do Tempo
                        </button>
                    </nav>
                )}
            </header>

            <main className={styles.main}>
                <div className={styles.contentArea}>
                    <div className={styles.container}>
                        {activeTab === "home" && <HomeTab />}
                        {activeTab === "chapters" && <ChaptersTab />}
                        {activeTab === "timeline" && <TimelineTab />}
                    </div>
                </div>
            </main>
        </div>
    );
}
