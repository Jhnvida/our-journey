import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import styles from "./Chapters.module.css";

export default function Chapters() {
    return (
        <div className={styles.container}>
            <SectionHeader title="Próximos Capítulos" subtitle="Gerencie os planos futuros" />
        </div>
    );
}
