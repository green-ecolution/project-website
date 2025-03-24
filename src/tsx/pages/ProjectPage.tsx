import { useEffect } from "react";
import Advantages from "../components/sections/Advantages";
import DashboardPreview from "../components/sections/DashboardPreview";
import Hero from "../components/sections/Hero";
import Contact from "../components/sections/Contact";
import ProjectHeroContent from "../components/hero/ProjectHeroContent";

function ProjectPage() {
    useEffect(() => {
        document.title =
            "Projekt | Green Ecolution | Smartes Grünflächenmanagement";
    }, []);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    const heroHeadline = "Alles wissenswerte über das Projekt";
    const heroDescription =
        "Das Projekt Green Ecolution beschäftigt sich mit der Frage, wie man die Bewässerung von Bäumen effizienter umsetzen kann. \
        In Zusammenarbeit mit dem TBZ-Flensburg werden mehrere Bäume an verschiedenen Standorten mit Sensorik ausgestattet, \
        um den Wasserbedarf von Bäumen zu ermitteln und entsprechend anhand der Daten Handlungsempfehlungen auszusprechen, um diese \
        in der Einsatzplanung mit zu berücksichtigen. Dabei wird die Vereinfachung und die Digitalisierung der Einsatzplanung umgesetzt, \
        inklusive einer dynamischen Routenplanung, um die Bewässerung noch gezielter und ressourcenschonender umzusetzen.";

    return (
        <main className="relative overflow-hidden before:bg-cover before:bg-background-light-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain">
            <Hero headline={heroHeadline} description={heroDescription}>
                <ProjectHeroContent />
            </Hero>
            <DashboardPreview />
            <Advantages />
            <Contact />
        </main>
    );
}

export default ProjectPage;
