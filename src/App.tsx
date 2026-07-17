import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, Home, Login } from "./pages";
import { ChaptersTab, HomeTab, TimelineTab } from "./pages/Dashboard/components";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/entrar" element={<Login />} />
                <Route path="/painel" element={<Dashboard />}>
                    <Route index element={<Navigate to="inicio" />} />
                    <Route path="inicio" element={<HomeTab />} />
                    <Route path="capitulos" element={<ChaptersTab />} />
                    <Route path="linha-do-tempo" element={<TimelineTab />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
