import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles.module.css";

export function AdminDashboard() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate("/login");
    };

    return (
        <section className={`${styles.admin_section} reveal_up`}>
            <div className={styles.admin_content}>
                <p className={styles.admin_subtitle}>A Nossa Jornada</p>
                <p className={styles.admin_title}>Logado com: {user?.email}</p>

                <div className={styles.sign_out_container}>
                    <button onClick={handleSignOut} className={styles.sign_out_button}>
                        <LogOut size={16} />
                        Sair
                    </button>
                </div>
            </div>
        </section>
    );
}
