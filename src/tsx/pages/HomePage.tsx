import Faq from "./../components/sections/Faq";
import Introduction from "./../components/sections/Introduction";
import Process from "./../components/sections/Process";
import Stakeholder from "./../components/sections/Stakeholder";

function HomePage() {
  return (
    <main>
        <Introduction />
        <Process />
        <Stakeholder />
        <Faq />
    </main>
  );
}

export default HomePage;
