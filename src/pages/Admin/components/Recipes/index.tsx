import SectionHeader from "../../../../components/SectionHeader";
import styles from "./styles.module.css";

export default function Recipes() {
    return (
        <div className={styles.container}>
            <SectionHeader title="A Nossa Cozinha" subtitle="Gerencie as receitas" />
        </div>
    );
}
