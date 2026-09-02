import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AuthProvider } from "@/contexts/AuthProvider";
import { Home } from "@/pages/Home";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";

const Login = lazy(() => import("@/pages/Login").then((m) => ({ default: m.Login })));
const Dashboard = lazy(() => import("@/pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const Timeline = lazy(() => import("@/pages/Timeline").then((m) => ({ default: m.Timeline })));
const Gallery = lazy(() => import("@/pages/Gallery").then((m) => ({ default: m.Gallery })));
const Chapters = lazy(() => import("@/pages/Chapters").then((m) => ({ default: m.Chapters })));
const Recipes = lazy(() => import("@/pages/Recipes").then((m) => ({ default: m.Recipes })));
const Settings = lazy(() => import("@/pages/Settings").then((m) => ({ default: m.Settings })));

export function App() {
    return (
        <SmoothScroll>
            <BrowserRouter>
                <AuthProvider>
                    <div className={styles.app_container}>
                        <Suspense fallback={null}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/dashboard" element={<Dashboard />}>
                                    <Route index element={<Timeline />} />
                                    <Route path="gallery" element={<Gallery />} />
                                    <Route path="chapters" element={<Chapters />} />
                                    <Route path="recipes" element={<Recipes />} />
                                    <Route path="settings" element={<Settings />} />
                                </Route>
                            </Routes>
                        </Suspense>
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </SmoothScroll>
    );
}
