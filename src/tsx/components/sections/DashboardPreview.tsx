import Lottie from "lottie-react";
import dashboardAnimation from "../../../json/dashboardAnimation.json"

function DashboardPreview() {
  return (
    <section className="my-28 px-4 max-w-208 mx-auto md:px-6 lg:my-36 xl:max-w-screen-lg xl:my-52">
        <article className="mb-8 g:mb-14 md:text-center">
            <h2 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">
                Fundierte Handlungsempfehlungen<br/>
                zur Bewässerung auf einen Blick:
            </h2>
            <p>
                Unser System liefert durch die wissenschaftliche Datenauswertung fundierte Handlungsempfehlungen, wann welche Vegetation an welchem Standort
                werden muss. Excepteur do consectetur quis nulla ut et nisi aute id consectetur excepteur nostrud anim culpa reprehenderit.
            </p>
        </article>

        <figure className="translate-x-4 xl:translate-x-16">
            <Lottie animationData={dashboardAnimation} />
        </figure>
    </section>
  );
}

export default DashboardPreview;
