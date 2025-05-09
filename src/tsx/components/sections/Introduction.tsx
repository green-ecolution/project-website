import { Splide, SplideSlide } from "@splidejs/react-splide";
import { i18nTranslated } from "../../helper/sliderTranslations";
import "@splidejs/react-splide/css";
import IntroductionCard from "../cards/IntroductionCard";

function Introduction() {
    const facts = [
        {
            label: "Entwicklung einer Sensorlösung",
            icon: "/assets/svg/general/sensor.svg",
            description:
                "Daten zur Bodenfeuchte werden mithilfe von in unterschiedlicher Tiefe platzierten Sensoren geliefert.",
        },
        {
            label: "Auswertung der Messdaten",
            icon: "/assets/svg/general/statistics.svg",
            description:
                "Auswertung der durch Sensoren übermittelten Daten für eine bedarfsgerechte Bewässerung von Jungbäumen.",
        },
        {
            label: "Augenmerk auf Jungbäume",
            icon: "/assets/svg/general/tree.svg",
            description:
                "Jungbäume sind besonders hitzeanfällig und daher äußerst schutzbedürftig. Aus diesem Grund werden Bäume in deren ersten drei Standjahren überwacht.",
        },
        {
            label: "Monitoring mehrerer Standorte",
            icon: "/assets/svg/general/location.svg",
            description:
                "Unter Verwendung des LoRaWan-Netzes können verschiedene Standorte überwacht und weitere einfach eingebunden werden.",
        },
    ];

    const breakpoints = {
        640: {
            perPage: 2,
        },
        1024: {
            destroy: true,
        },
    };

    return (
        <section className="max-w-208 mx-auto mt-48 md:mt-52 lg:mt-16 lg:max-w-screen-lg lg:grid lg:grid-cols-[1fr,1.5fr] lg:gap-x-10 lg:items-center xl:grid-cols-2 xl:max-w-screen-xl">
            <article className="px-4 mb-8 md:px-6 lg:mb-14">
                <h2 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">
                    Was beinhaltet smartes Grünflächenmanagement?
                </h2>
                <p>
                    Smartes Grünflächenmanagement umfasst die effiziente
                    Überwachung und Bewässerung von Vegetation auf
                    Grünflächen durch den Einsatz moderner Technologien wie
                    Sensoren und Datenanalyse. Dadurch wird eine präzise
                    Steuerung der Pflegemaßnahmen ermöglicht, die angepasst sind
                    an die spezifischen Standortbedingungen.
                </p>
            </article>

            <Splide
                options={{
                    rewind: true,
                    arrows: false,
                    i18n: i18nTranslated,
                    mediaQuery: "min",
                    breakpoints: breakpoints,
                }}
                aria-label="Fakten zum Grünflächenmanagement"
                className="splide--grid md:px-2"
            >
                {facts.map((fact) => (
                    <SplideSlide
                        key={fact.label}
                        className="pb-10 px-4 lg:px-2 lg:pb-2 lg:first:mb-16 lg:[&:nth-child(2)]:mt-16 lg:[&:nth-child(3)]:-mt-16 lg:[&:nth-child(3)]:mb-16"
                    >
                        <IntroductionCard
                            label={fact.label}
                            icon={fact.icon}
                            description={fact.description}
                        />
                    </SplideSlide>
                ))}
            </Splide>
        </section>
    );
}

export default Introduction;
