import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import styles from "./Recipes.module.css";

export default function Recipes() {
    return (
        <div className={styles.container}>
            <SectionHeader title="A Nossa Cozinha" subtitle="Gerencie as receitas" />
        </div>
    );
}
