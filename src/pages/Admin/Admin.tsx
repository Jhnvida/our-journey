import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import styles from "./Admin.module.css";
import Chapters from "./components/Chapters/Chapters";
import Recipes from "./components/Recipes/Recipes";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";
import Timeline from "./components/Timeline/Timeline";

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
