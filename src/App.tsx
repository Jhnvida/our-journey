import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app_container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>

                <footer className="site_footer">
                    <p className="footer_title">A Nossa Jornada</p>
                </footer>
            </div>
        </BrowserRouter>
    );
}
