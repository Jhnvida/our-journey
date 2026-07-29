import { ChefHat, History, LogOut, Sparkles, TableConfig } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import styles from "./Sidebar.module.css";

type SidebarProps = {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
};

const navigations = [
    { value: "timeline", label: "A Linha do Tempo", icon: <History /> },
    { value: "chapters", label: "Próximos Capítulos", icon: <Sparkles /> },
    { value: "recipes", label: "A Nossa Cozinha", icon: <ChefHat /> },
    { value: "settings", label: "Configurações", icon: <TableConfig /> },
];

export default function Sidebar({ currentTab, setCurrentTab }: SidebarProps) {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    async function handleSignOut() {
        signOut();
        navigate("/login");
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <h1>Nossa Jornada</h1>
                <p>Painel de Controle</p>
            </div>

            <div className={styles.nav}>
                {navigations.map((nav) => (
                    <button
                        key={nav.label}
                        className={`${styles.navItem} ${currentTab === nav.value ? styles.active : ""}`}
                        onClick={() => setCurrentTab(nav.value)}
                    >
                        {nav.icon}
                        <span>{nav.label}</span>
                    </button>
                ))}
            </div>

            <div className={styles.footer}>
                <button onClick={handleSignOut} className={styles.button}>
                    <LogOut className={styles.icon} />
                    Sair
                </button>
            </div>
        </div>
    );
}
