import Hero from "../components/Hero";
import Contact from "../components/sections/Contact";

function ProjectPage() {
    const heroHeadline = "Alles wissenswerte über das Projekt";
    const heroDescription = "Eu elit quis eiusmod proident officia aute tempor tempor qui commodo aute qui. Excepteur id ea laboris fugiat dolor exercitation ut pariatur ut commodo non. Eu deserunt laboris dolore elit. Aliquip magna do nostrud velit esse anim do. Dolor culpa duis laboris nisi ea nulla nulla magna"

    return (
        <main>
            <Hero headline={heroHeadline} description={heroDescription} type="project" />
            <Contact />
        </main>
    );
}

export default ProjectPage;
