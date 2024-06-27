import AdvantageCard from "../cards/AdvantageCard";

function Advantages() {
    const advantages = [
        {
            label: "Für neugierige Augen",
            icon: "/assets/svg/general/eye.svg",
            description: "Öffentlicher Zugang zu den Daten und zum Projekt.",
        },
        {
            label: "Optimierte Routen",
            icon: "/assets/svg/general/map.svg",
            description:
                "Individuelle Einsatzplanung zur effizienteren Bewässerung.",
        },
        {
            label: "Weniger ist mehr",
            icon: "/assets/svg/general/reduce.svg",
            description: "Gezielte Bewässerung, weniger Wasserverbrauch.",
        },
    ];

    return (
        <section className="px-4 max-w-208 mx-auto my-28 md:px-6 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-6 lg:gap-10 lg:my-36 lg:max-w-screen-lg xl:my-52 xl:max-w-screen-xl">
            <article className="mb-8 lg:mb-14">
                <h2 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">
                    Alle weiteren Funktionen und Vorteile im Überblick.
                </h2>
                <p>
                    Das Projekt ist öffentlich einsehbar und hat als Ziel, den
                    Wasserverbrauch für die Bewässerung zu veringern sowie eine
                    variable Einsatzplanung zu ermöglichen.
                </p>
            </article>

            {advantages.map((advantage, index) => (
                <article key={index} className="group mb-4 last:mb-0 md:mb-0">
                    <AdvantageCard
                        label={advantage.label}
                        icon={advantage.icon}
                        description={advantage.description}
                    />
                </article>
            ))}
        </section>
    );
}

export default Advantages;
