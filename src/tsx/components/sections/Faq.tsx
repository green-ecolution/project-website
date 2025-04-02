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
                        Das Projekt "Green Ecolution" wird von neun Studierenden
                        des Masters "Angewandte Informatik" der&nbsp;
                        <a
                            href="https://hs-flensburg.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
                        >
                            Hochschule-Flensburg
                        </a>
                        &nbsp;durchgeführt. Die Weiterentwicklung des Projektes erfolgt in enger Zusammenarbeit mit der&nbsp;
                        <a
                            href="https://smarte-grenzregion.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
                        >
                            Smarten-Grenzregion
                        </a>
                        &nbsp;und dem&nbsp;
                        <a
                            href="https://www.tbz-flensburg.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
                        >
                            TBZ-Flensburg
                        </a>
                        .
                    </p>
                </Accordion>
                <Accordion label="Welchen Mehrwert bietet das Projekt?">
                    <p className="mb-4">
                        Das grundlegende Ziel des Projekts liegt darin zu
                        erarbeiten, welche Maßnahmen zu einer effizienteren
                        Bewässerung von Bäumen beitragen können.
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
                        Der Quellcode ist in einem öffentlich zugänglichen&nbsp;
                        <a
                            href="https://github.com/green-ecolution"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
                        >
                            GitHub-Repository
                        </a>
                        &nbsp;sichtbar. So ist es jederzeit möglich, den aktuellen
                        Stand der Software zu betrachten. Dies ermöglicht, nicht direkt am Projekt beteiligten Personen an der Mitentwicklung und Nutzung des Projektes teilzuhaben.
                    </p>
                    <p>
                        Zusätzlich dazu werden alle von den Sensoren gesammelten
                        Daten in dem&nbsp;
                        <a
                            href="https://opendata.schleswig-holstein.de/dataset"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
                        >
                            Open-Data-Portal
                        </a>
                        &nbsp;des Landes Schleswig-Holstein zur Verfügung gestellt.
                    </p>
                </Accordion>
                <Accordion label="Welche Sensoren werden eingesetzt?">
                    <ul className="list-disc pl-4">
                        <li>Zur Messung der Bodenwasserspannung:&nbsp;
                            <a
                                href="https://www.irrometer.com/pdf/403.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
                            >
                                Watermark-Specsheet
                            </a></li>
                        <li>Zur Messung der Bodenfeuchte und -temperatur:&nbsp;
                            <a
                                href="https://www.truebner.de/de/smt100.php"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
                            >
                                SMT100
                            </a></li>
                    </ul>
                </Accordion>
                <Accordion label="Wie ist der aktuelle Fortschritt des Projekts?">
                    <p>
                        Da es sich bei diesem Projekt um ein Forschungsprojekt an der Hochschule Flensburg handelt,
                        wurde der Projektzeitraum auf ein Jahr festgelegt. Der Start erfolgte im April 2024,
                        und das Projekt endet voraussichtlich im April 2025. Nach Abschluss wird das Projekt
                        jedoch in einem anderen Kontext fortgeführt.
                    </p>
                </Accordion>
            </ul>
        </section>
    );
}

export default Faq;
