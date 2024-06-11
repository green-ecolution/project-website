import Advantages from "../components/sections/Advantages";
import DashboardPreview from "../components/sections/DashboardPreview";
import Hero from "../components/sections/Hero";

function ProjectPage() {
    const heroHeadline = "Alles wissenswerte über das Projekt";
    const heroDescription = "Eu elit quis eiusmod proident officia aute tempor tempor qui commodo aute qui. Excepteur id ea laboris fugiat dolor exercitation ut pariatur ut commodo non. Eu deserunt laboris dolore elit. Aliquip magna do nostrud velit esse anim do. Dolor culpa duis laboris nisi ea nulla nulla magna"

    return (
        <main>
            <Hero headline={heroHeadline} description={heroDescription} type="project" />
            <DashboardPreview />
            <Advantages />
        </main>
    );
}

export default ProjectPage;
