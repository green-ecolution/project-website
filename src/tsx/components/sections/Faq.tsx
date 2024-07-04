import Accordion from "../Accordion";

function Faq() {
    return (
        <section className="px-4 max-w-208 mx-auto my-28 md:px-6 lg:my-36 xl:my-52">
            <h2 className="font-lato font-bold text-center text-2xl mb-6 lg:mb-10 lg:text-3xl">
                Oft gestellte Fragen zu Green Ecolution
            </h2>
            <ul className="flex flex-col gap-y-4 md:gap-y-6">
                <Accordion label="Wer steckt hinter dem Projekt Green Ecolution?">
                    <p>
                        Das Projekt "Green-Ecolution" wird von neun Studierenden
                        des Masters "Angewandte Informatik" der{" "}
                        <a
                            href="https://hs-flensburg.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-bold underline"
                        >
                            Hochschule-Flensburg
                        </a>{" "}
                        durchgeführt. Die Weiterentwicklung des Projektes erfolgt in enger Zusammenarbeit mit der {" "}
                        <a
                            href="https://smarte-grenzregion.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-bold underline"
                        >
                            Smarten-Grenzregion
                        </a>{" "}
                        und dem{" "}
                        <a
                            href="https://www.tbz-flensburg.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-bold underline"
                        >
                            TBZ-Flensburg
                        </a>{" "}
                        .
                    </p>
                </Accordion>
                <Accordion label="Welchen Mehrwert bietet das Projekt?">
                    <p className="mb-4">
                        Das grundlegende Ziel des Projekts liegt darin zu
                        erarbeiten, welche Maßnahmen zu einer effizienteren
                        Bewässerung von Bäumen und Beeten beitragen können.
                        Hierzu werden verschiedene Technologien eingesetzt.
                    </p>
                    <p>
                        Alle Bereiche, die Entwicklung und die gesammelten Daten
                        betreffen, sind öffentlich einsehbar, wodurch nicht in
                        das Projekt direkt involvierte Personen an den
                        Entwicklungen und Fortschritten teilhaben können.
                    </p>
                </Accordion>
                <Accordion label="Was bedeutet es, dass das Projekt öffentlich zugänglich ist?">
                    <p className="mb-4 text-blue-600">
                        Der Quellcode ist in einem öffentlich zugänglichen{" "}
                        <a
                            href="https://github.com/SmartCityFlensburg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-bold underline"
                        >
                            GitHub-Repository
                        </a>{" "}
                        sichtbar. So ist es jederzeit möglich, den aktuellen
                        Stand der Software zu betrachten. Dies ermöglicht, nicht direkt am Projekt beteiligten Personen an der Mitentwicklung und Nutzung des Projektes teilzuhaben.
                    </p>
                    <p>
                        Zusätzlich dazu werden alle von den Sensoren gesammelten
                        Daten in dem {" "}
                        <a
                            href="https://opendata.schleswig-holstein.de/dataset"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-bold underline"
                        >
                            Open-Data-Portal
                        </a>{" "}
                        des Landes Schleswig-Holstein zur Verfügung gestellt.
                    </p>
                </Accordion>
                <Accordion label="Welche Sensoren werden eingesetzt?">
                    <ul className="list-disc pl-4">
                        <li>Bodenwasserspannungsensoren für Bäume: {" "}
                        <a
                            href="https://www.irrometer.com/pdf/403.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-bold underline"
                        >
                            Watermark-Specsheet
                        </a>{" "}</li>
                        <li>Bodenfeuchtesensoren für Beete: {" "}
                        <a
                            href="https://www.truebner.de/de/smt100.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-bold underline"
                        >
                            SMT100
                        </a>{" "}</li>
                        <li>Stammfeuchte-Sensor (in "Entwicklung")</li>
                    </ul>
                </Accordion>
            </ul>
        </section>
    );
}

export default Faq;
