import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import styles from "./styles.module.css";
import Chapters from "./components/Chapters";
import Recipes from "./components/Recipes";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import Timeline from "./components/Timeline";

export default function AdminDashboard() {
    const [currentTab, setCurrentTab] = useState<string>("timeline");

    return (
        <ProtectedRoute>
            <main className={styles.container}>
                <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

                <div className={styles.content}>
                    {currentTab === "timeline" && <Timeline />}
                    {currentTab === "chapters" && <Chapters />}
                    {currentTab === "recipes" && <Recipes />}
                    {currentTab === "settings" && <Settings />}
                </div>
            </main>
        </ProtectedRoute>
    );
}
