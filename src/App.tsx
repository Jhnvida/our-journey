import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, Home, Login } from "./pages";
import { ChaptersTab, HomeTab, TimelineTab } from "./pages/Dashboard/components";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<Navigate to="home" />} />
                    <Route path="home" element={<HomeTab />} />
                    <Route path="chapters" element={<ChaptersTab />} />
                    <Route path="timeline" element={<TimelineTab />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
