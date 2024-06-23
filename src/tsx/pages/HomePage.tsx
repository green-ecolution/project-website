import Contact from "../components/sections/Contact";
import HompageHero from "../components/homepage/HomepageHero";
import HomepageDevider from "../components/homepage/HomepageDevider";
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
        <div className="relative overflow-x-hidden before:bg-cover before:bg-background-light-dot before:w-[90%] before:h-[120vh] before:absolute before:-right-4 before:top-8 before:-z-10 before:bg-no-repeat sm:before:-right-[5%] xl:before:w-[90rem] 2xl:before:right-[10%] 2xl:before:bg-contain 3xl:before:right-[20%]">
            <Stakeholder />
            <Faq />
        </div>
        <Contact spacingTop={false}/>
    </main>
  );
}

export default HomePage;
