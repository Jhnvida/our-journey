import { Home, Library, LogOut, Menu, TableOfContents, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { supabase } from "../../lib/supabase";
import { HomeTab } from "./components/HomeTab";
import styles from "./styles.module.css";

const Tabs = {
    home: {
        title: "Visão Geral",
        subtitle: "Gerencie as configurações.",
    },
    timeline: {
        title: "Linha do Tempo",
        subtitle: "Gerencie os eventos.",
    },
    chapters: {
        title: "Capítulos",
        subtitle: "Gerencie os capítulos.",
    },
};

export function Dashboard() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [settings, setSettings] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<keyof typeof Tabs>("home");
    const [isSaving, setIsSaving] = useState(false);

    const currentTab = Tabs[activeTab];

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        async function loadDate() {
            const { data } = await supabase.from("settings").select("id, started_at").single();

            if (data) {
                setDate(data.started_at);
                setSettings(data.id);
            }
        }

        if (user) {
            loadDate();
        }
    }, [user]);

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    async function handleSave() {
        setIsSaving(true);
        const { error } = await supabase.from("settings").update({ started_at: date }).eq("id", settings);
        setIsSaving(false);

        if (error) {
            console.error(error);
        }
    }

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    if (loading || !user) {
        return <div className={styles.loadingContainer}>Carregando...</div>;
    }

    return (
        <div className={styles.layout}>
            <div className={styles.mobileHeader}>
                <h1 className={styles.mobileTitle}>Painel Administrativo</h1>

                <button className={styles.menuButton} onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
            </div>

            {isSidebarOpen && <div className={styles.sidebarOverlay} onClick={toggleSidebar} />}

            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}>
                <div className={styles.sidebarHeader}>
                    <h1 className={styles.sidebarTitle}>Painel Administrativo</h1>

                    <button className={styles.closeButton} onClick={toggleSidebar}>
                        <X size={20} />
                    </button>
                </div>

                <nav className={styles.sidebarNav}>
                    <button
                        className={`${styles.navItem} ${activeTab === "home" ? styles.navItemActive : ""}`}
                        onClick={() => {
                            setActiveTab("home");
                            setIsSidebarOpen(false);
                        }}
                    >
                        <Home size={18} />
                        <span>Início</span>
                    </button>

                    <button
                        className={`${styles.navItem} ${activeTab === "timeline" ? styles.navItemActive : ""}`}
                        onClick={() => {
                            setActiveTab("timeline");
                            setIsSidebarOpen(false);
                        }}
                    >
                        <TableOfContents size={18} />
                        <span>Linha do Tempo</span>
                    </button>

                    <button
                        className={`${styles.navItem} ${activeTab === "chapters" ? styles.navItemActive : ""}`}
                        onClick={() => {
                            setActiveTab("chapters");
                            setIsSidebarOpen(false);
                        }}
                    >
                        <Library size={18} />
                        <span>Capítulos</span>
                    </button>
                </nav>

                <div className={styles.sidebarFooter}>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <LogOut size={18} />
                        <span>Sair da conta</span>
                    </button>
                </div>
            </aside>

            <main className={styles.main}>
                <div className={styles.mainHeader}>
                    <div>
                        <h2 className={styles.pageTitle}>{currentTab.title}</h2>
                        <p className={styles.pageSubtitle}>{currentTab.subtitle}</p>
                    </div>
                </div>

                <div className={styles.contentArea}>
                    {activeTab === "home" && (
                        <HomeTab date={date} setDate={setDate} handleSave={handleSave} isSaving={isSaving} />
                    )}
                </div>
            </main>
        </div>
    );
}
