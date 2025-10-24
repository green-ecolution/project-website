import Accordion from '../Accordion'

function Faq() {
  return (
    <section className="px-4 max-w-208 mx-auto my-28 md:px-6 lg:my-36 xl:my-52">
      <h2 className="font-lato font-bold text-center text-2xl mb-6 lg:mb-10 lg:text-3xl">
        Oft gestellte Fragen zu Green Ecolution
      </h2>
      <ul className="flex flex-col gap-y-4 md:gap-y-6">
        <Accordion label="Wer steckt hinter dem Projekt Green Ecolution?">
          <p>
            Das Projekt "Green Ecolution" wurde im Rahmen eines Forschungsprojekts im
            Masterstudiengang "Angewandte Informatik" an der&nbsp;
            <a
              href="https://hs-flensburg.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
            >
              Hochschule Flensburg
            </a>
            &nbsp;ins Leben gerufen. Nach dem erfolgreichen Abschluss des Forschungsprojekts wird
            die Weiterentwicklung des Systems nun von&nbsp;
            <a
              href="https://progeek.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
            >
              PROGEEK
            </a>
            &nbsp;übernommen, in enger Zusammenarbeit mit der&nbsp;
            <a
              href="https://smarte-grenzregion.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
            >
              Smarten Grenzregion
            </a>
            &nbsp;und der&nbsp;
            <a
              href="https://www.flensburg.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
            >
              Stadt Flensburg
            </a>
            .
          </p>
        </Accordion>
        <Accordion label="Welchen Mehrwert bietet das Projekt?">
          <p className="mb-4">
            Das Forschungsprojekt "Green Ecolution" hat gezeigt, wie digitale Technologien gezielt
            eingesetzt werden können, um die Bewässerung von Stadtbäumen effizienter, nachhaltiger
            und ressourcenschonender zu gestalten. Durch den Einsatz moderner Sensorik und
            intelligenter Datenauswertung wurde eine Grundlage geschaffen, um Wasserverbrauch und
            Pflegeaufwand deutlich zu reduzieren.
          </p>
          <p>
            Die gewonnenen Erkenntnisse und entwickelten Systeme leisten einen wichtigen Beitrag zur
            nachhaltigen Stadtentwicklung in Flensburg. Sie unterstützen eine datenbasierte
            Entscheidungsfindung und fördern den verantwortungsvollen Umgang mit natürlichen
            Ressourcen - zum Nutzen von Umwelt, Stadtverwaltung und Bürger:innen.
          </p>
        </Accordion>
        <Accordion label="Was bedeutet es, dass das Projekt öffentlich zugänglich ist?">
          <p className="mb-4 text-blue-600">
            Der Quellcode des Projekts ist in einem öffentlich zugänglichen&nbsp;
            <a
              href="https://github.com/green-ecolution"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
            >
              GitHub-Repository
            </a>
            &nbsp;verfügbar. Dadurch kann der aktuelle Entwicklungsstand jederzeit eingesehen
            werden, was Transparenz schafft und interessierten Personen ermöglicht, die
            Weiterentwicklung nachzuvollziehen oder sich aktiv einzubringen.
          </p>
          <p>
            Perspektivisch ist zudem eine Anbindung an das&nbsp;
            <a
              href="https://opendata.schleswig-holstein.de/dataset"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
            >
              Open-Data-Portal
            </a>
            &nbsp;des Landes Schleswig-Holstein vorgesehen, um zukünftig ausgewählte Sensordaten
            öffentlich zugänglich zu machen. Diese Erweiterung befindet sich derzeit in Planung.
          </p>
        </Accordion>
        <Accordion label="Welche Sensoren werden eingesetzt?">
          <p className="mb-4">
            Im Rahmen des Forschungsprojekts wurden folgende Sensoren eingesetzt, um präzise Daten
            zur Bodenfeuchte und -beschaffenheit zu erfassen. Diese Sensoren bildeten die Grundlage
            für die Entwicklung und Erprobung des Systems.
          </p>
          <ul className="list-disc pl-4">
            <li>
              Zur Messung der Bodenwasserspannung:&nbsp;
              <a
                href="https://www.irrometer.com/pdf/403.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
              >
                Watermark-Sensor
              </a>
            </li>
            <li>
              Zur Messung der Bodenfeuchte und -temperatur:&nbsp;
              <a
                href="https://www.truebner.de/de/smt100.php"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
              >
                SMT100-Sensor
              </a>
            </li>
          </ul>
          <p className="mt-4">
            In zukünftigen Entwicklungsphasen kann die Sensorik je nach Anforderungen und
            technologischem Fortschritt weiter angepasst oder erweitert werden.
          </p>
        </Accordion>
        <Accordion label="Wie ist der aktuelle Fortschritt des Projekts?">
          <p>
            Das Forschungsprojekt „Green Ecolution“ wurde im Rahmen des Masterstudiengangs
            „Angewandte Informatik“ an der&nbsp;
            <a
              href="https://hs-flensburg.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
            >
              Hochschule Flensburg
            </a>
            &nbsp;erfolgreich abgeschlossen. Aufbauend auf den im Projekt erzielten Ergebnissen wird
            die Weiterentwicklung nun fortgesetzt.
          </p>
          <p className="mt-4">
            Im Oktober 2025 erhielt das Projekt im Rahmen des&nbsp;
            <strong>DigitalHub Call for Concepts</strong>&nbsp;des Landesprogramms&nbsp;
            <strong>„Offene Innovation – Open Source made in Schleswig-Holstein“</strong>&nbsp;eine
            Förderung. Dadurch kann das System weiter ausgebaut und praxisnah erprobt werden.
          </p>
          <p className="mt-4">
            Aktuell arbeiten&nbsp;
            <a
              href="https://progeek.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
            >
              PROGEEK
            </a>
            ,&nbsp;die&nbsp;
            <a
              href="https://www.flensburg.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
            >
              Stadt Flensburg
            </a>
            &nbsp;und die&nbsp;
            <a
              href="https://smarte-grenzregion.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900"
            >
              Smarte Grenzregion
            </a>
            &nbsp;gemeinsam an der Weiterentwicklung und Integration des Systems, um die gewonnenen
            Erkenntnisse nachhaltig in den kommunalen Alltag zu überführen.
          </p>
        </Accordion>
      </ul>
    </section>
  )
}

export default Faq
