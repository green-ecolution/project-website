import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactPage from "./pages/ContactPage";

function App() {
    const ogImage = document.getElementById('og-image');
    if (ogImage) {
        const currentDomain = window.location.origin;
        ogImage.setAttribute('content', currentDomain + '/assets/images/open-graph-image.png');
    }

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="projekt" element={<ProjectPage />} />
            <Route path="kontakt" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
