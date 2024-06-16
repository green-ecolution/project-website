import { Splide, SplideSlide } from '@splidejs/react-splide';
import { i18nTranslated } from '../../helper/sliderTranslations';
import '@splidejs/react-splide/css';
import IntroductionCard from "../cards/IntroductionCard";

function Introduction() {
    const facts = [
        {
            label: "Auswertung der Messdaten",
            icon: "/assets/svg/general/statistics.svg",
            description: "Durch die wissenschaftliche Datenauswertung wird eine fundierte Datengrundlage geliefert."
        },
        {
            label: "Monitoring mehrerer Standorte",
            icon: "/assets/svg/general/location.svg",
            description: "Bei der Interpretation der Daten werden die unterschiedlichen Standortbedingungen mit berücksichtigt."
        },
        {
            label: "Augenmerk auf Jungbäume und Beete",
            icon: "/assets/svg/general/tree.svg",
            description: "Beobachtet werden sollen besonders hitzeanfällige Vegetation wie Jungbäume und Blumenbeete."
        },
        {
            label: "Entwicklung einer Sensorlösung",
            icon: "/assets/svg/general/sensor.svg",
            description: "Die Daten zur Bodenfeuchte werden mithilfe von Sensoren nahe des Wurzelballens geliefert."
        },
    ];

    const breakpoints = {
        640: {
            perPage: 2,
        },
		1024: {
			destroy: true,
		},
    }

    return (
        <section className="max-w-208 mx-auto my-28 lg:my-36 lg:max-w-screen-lg lg:grid lg:grid-cols-[1fr,1.5fr] lg:gap-x-10 lg:items-center xl:my-52 xl:grid-cols-2 xl:max-w-screen-xl">
            <article className="px-4 mb-8 md:px-6 lg:mb-14">
                <h2 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">
                    Was beinhaltet smartes Grünflächenmanagement alles?
                </h2>
                <p>
                    Smartes Grünflächenmanagement umfasst die effiziente Überwachung und Bewässerung von
                    Vegetationsformen auf Grünflächen durch den Einsatz moderner Technologien wie Sensoren und Datenanalyse.
                    Dadurch wird eine präzise Steuerung der Pflegemaßnahmen ermöglicht, die angepasst sind an die spezifischen
                    Standortbedingungen und Art und Alter der Vegetation.
                </p>
            </article>

            <Splide
                options={{ rewind: true, arrows: false, i18n: i18nTranslated, mediaQuery: 'min', breakpoints: breakpoints }}
                aria-label="Fakten zum Grünflächenmanagement"
                className="splide--grid md:px-2"
            >
                {facts.map((fact, index) => (
                    <SplideSlide key={index} className="pb-10 px-4 lg:px-2 lg:pb-2 lg:first:mb-16 lg:[&:nth-child(2)]:mt-16 lg:[&:nth-child(3)]:-mt-16 lg:[&:nth-child(3)]:mb-16">
                        <IntroductionCard
                            label={fact.label}
                            icon={fact.icon}
                            description={fact.description} />
                    </SplideSlide>
                ))}
            </Splide>
        </section>
    );
}

export default Introduction;
