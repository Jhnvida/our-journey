import { useEffect, useState } from "react";
import type { Recipe } from "../../../types";
import styles from "../styles.module.css";

type RecipesFormProps = {
    data?: Recipe | null;
    onCancel: () => void;
};

export default function RecipesForm({ data, onCancel }: RecipesFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setDescription(data.description || "");
            setIngredients(data.ingredients.join("\n"));
            setImageUrl(data.image_url || "");
        } else {
            setTitle("");
            setDescription("");
            setIngredients("");
            setImageUrl("");
        }
    }, [data]);

    return (
        <div className={styles.form_container}>
            <h3 className={styles.list_title}>{data ? "Editar Receita" : "Nova Receita"}</h3>

            <div className={styles.form_row}>
                <div className={styles.form_group}>
                    <label className={styles.label} htmlFor="title">
                        Título
                    </label>
                    <input
                        className={styles.input}
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Bolo de Cenoura"
                    />
                </div>

                <div className={styles.form_group}>
                    <label className={styles.label} htmlFor="imageUrl">
                        URL da Imagem (opcional)
                    </label>
                    <input
                        className={styles.input}
                        id="imageUrl"
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://exemplo.com/imagem.jpg"
                    />
                </div>
            </div>

            <div className={styles.form_group_full}>
                <label className={styles.label} htmlFor="description">
                    Descrição (opcional)
                </label>
                <textarea
                    className={styles.textarea}
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Conte um pouco sobre essa receita..."
                />
            </div>

            <div className={styles.form_group_full}>
                <label className={styles.label} htmlFor="ingredients">
                    Ingredientes (um por linha)
                </label>
                <textarea
                    className={styles.textarea}
                    id="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="1 xícara de açúcar&#10;2 cenouras..."
                />
            </div>

            <div className={styles.form_actions}>
                <button className={styles.button} onClick={onCancel}>
                    Salvar
                </button>
                <button className={styles.button_secondary} onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}
