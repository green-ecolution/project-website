import ContactHeroContent from "../components/hero/ContactHeroContent";
import Hero from "../components/sections/Hero";
import Stakeholder from "../components/sections/Stakeholder";

function ContactPage() {
    const heroHeadline = "Noch neugierig?";
    const heroDescription = "Eu elit quis eiusmod proident officia aute tempor tempor qui commodo aute qui. Excepteur id ea laboris fugiat dolor exercitation ut pariatur ut commodo non. Eu deserunt laboris dolore elit. Aliquip magna do nostrud velit esse anim do. Dolor culpa duis laboris nisi ea nulla nulla magna"

    return (
        <main className="relative overflow-hidden before:bg-cover before:bg-background-dark-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain">
            <Hero headline={heroHeadline} description={heroDescription}>
                <ContactHeroContent />
            </Hero>
            <Stakeholder hasDesktopList/>
        </main>
    );
}

export default ContactPage;
