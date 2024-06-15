import Contact from "../components/sections/Contact";
import HompageHero from "../components/sections/HomepageHero";
import HomepageDevider from "../components/sections/HomepageDevider";
import Faq from "./../components/sections/Faq";
import Introduction from "./../components/sections/Introduction";
import Process from "./../components/sections/Process";
import Stakeholder from "./../components/sections/Stakeholder";

function HomePage() {
  return (
    <main>
        <HompageHero />
        <HomepageDevider />
        <Introduction />
        <Process />
        <Stakeholder />
        <Faq />
        <Contact />
    </main>
  );
}

export default HomePage;
