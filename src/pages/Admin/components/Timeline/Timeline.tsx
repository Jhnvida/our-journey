import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import styles from "./Timeline.module.css";

export default function Timeline() {
    return (
        <div className={styles.container}>
            <SectionHeader title="A Linha do Tempo" subtitle="Gerencie os eventos da história" />
        </div>
    );
}
