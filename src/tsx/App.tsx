import Faq from "./components/sections/Faq";
import HompageHero from "./components/sections/HomepageHero";
import Introduction from "./components/sections/Introduction";
import Process from "./components/sections/Process";
import Stakeholder from "./components/sections/Stakeholder";
import StartpageDevider from "./components/sections/StartpageDevider";

function App() {
  return (
    <div>
        <HompageHero />
        <StartpageDevider />
        <Introduction />
        <Process />
        <Stakeholder />
        <Faq />
    </div>
  );
}

export default App;
