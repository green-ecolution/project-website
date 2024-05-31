import { useEffect, useState } from "react";

export interface FakeProgressProps { }

const messages = [
  "🌳 Bäume müssen noch gepflanzt werden...",
  "🔧 MVP wird noch entwickelt...",
  "🌱 Seite wird noch aufgebaut...",
  "🌿 Noch nicht ganz fertig...",
  "🌲 Seite wird noch entwickelt...",
  "📡 Vernetzung der Stadt läuft...",
  "🏗️ Virtuelle Gebäude werden noch gebaut...",
  "🚧 Straße zu SmartCity wird asphaltiert...",
  "🔌 IoT-Geräte werden noch verbunden...",
  "📱 Smart Apps werden noch programmiert...",
  "🌟 Innovationen werden noch geträumt...",
  "🔍 Visionen werden noch geschärft...",
  "🚀 Start in die Zukunft wird vorbereitet...",
  "💡 Intelligente Lösungen werden noch ausgeklügelt...",
  "🛠️ Verbesserungen werden noch implementiert...",
  "⏳ Fortschritt braucht noch ein bisschen Zeit...",
  "🌏 Zukunft wird noch gestaltet...",
  "🧩 Komponenten werden noch zusammengesetzt...",
  "🗺️ Stadtkarte wird noch gezeichnet...",
  "🔋 Energiesysteme werden noch geladen...",
  "📊 Daten werden noch analysiert...",
  "🌐 Netzwerke werden noch aufgebaut...",
  "🏙️ Skyline wird noch designt...",
  "🖥️ SmartCity Dashboard wird noch konfiguriert...",
  "💼 Kooperationen werden noch geschlossen...",
  "🕹️ Smart Controls werden noch eingerichtet...",
  "🌞 Solarzellen werden noch installiert...",
  "🌳 Parks und Grünanlagen werden noch angelegt...",
  "🌏 Umweltfreundliche Technologien werden noch erforscht...",
  "🔋 Erneuerbare Energien werden noch genutzt...",
  "🌱 Nachhaltige Projekte werden noch initiiert...",
  "🧪 Forschungsteams arbeiten noch an Innovationen...",
  "📡 Smart City Sensoren werden noch installiert...",
  "🖥️ Big Data wird noch analysiert...",
  "🛰️ Satellitendaten werden noch ausgewertet...",
  "🔬 Wissenschaftler arbeiten noch an Lösungen...",
  "👨‍🎓 Studierende sind noch in den Laboren...",
  "🏫 Universitäten forschen noch an neuen Ideen...",
  "🌞 Solarenergie wird noch gespeichert...",
  "💧 Wasserversorgung wird noch optimiert...",
  "🚰 Sauberes Wasser wird noch gefiltert...",
  "♻️ Recycling-Programme werden noch gestartet...",
  "🚍 Smarte Verkehrssysteme werden noch getestet...",
  "🚖 Autonome Fahrzeuge werden noch programmiert...",
  "🛴 Elektroroller werden noch geladen...",
  "🚲 Fahrradleihsysteme werden noch installiert...",
  "📶 5G-Netzwerk wird noch ausgebaut...",
  "💡 Straßenlaternen werden noch vernetzt...",
  "🔋 Energiespeicher werden noch installiert...",
  "📊 Echtzeitdaten werden noch gesammelt...",
  "📉 Umweltparameter werden noch gemessen...",
  "🌐 IoT-Plattform wird noch entwickelt...",
  "📈 Smart Grids werden noch optimiert...",
  "🧠 KI-Algorithmen werden noch trainiert...",
  "📦 Lieferketten werden noch automatisiert...",
  "🛡️ Datenschutzrichtlinien werden noch geprüft...",
  "🚨 Sicherheitssysteme werden noch installiert...",
  "🧳 Reisedaten werden noch aktualisiert...",
  "🚆 Smarte Zugverbindungen werden noch geplant...",
  "🚇 U-Bahnen werden noch vernetzt...",
  "📍 Standortdaten werden noch integriert...",
  "🗺️ Kartenmaterial wird noch aktualisiert...",
  "🚏 Haltestellen werden noch vernetzt...",
  "📱 Mobile Apps werden noch programmiert...",
  "💻 Webplattformen werden noch entwickelt...",
  "🌐 APIs werden noch integriert...",
  "🔍 Forschungsergebnisse werden noch veröffentlicht...",
  "📚 Wissen wird noch geteilt...",
  "📖 Studien werden noch abgeschlossen...",
  "📝 Berichte werden noch geschrieben...",
  "📅 Konferenzen werden noch organisiert...",
  "🎓 Abschlussarbeiten werden noch geprüft...",
  "🧬 Biotechnologische Forschungen werden noch durchgeführt...",
  "🧪 Chemische Analysen werden noch gemacht...",
  "🔬 Mikroskopische Untersuchungen werden noch durchgeführt...",
  "🛰️ Weltraummissionen werden noch vorbereitet...",
  "🌠 Sternbeobachtungen werden noch gemacht...",
  "🛡️ Schutzmaßnahmen werden noch getroffen...",
  "🌍 Umweltverträglichkeitsprüfungen werden noch durchgeführt...",
  "🔋 Batterietechnologien werden noch erforscht...",
  "🔧 Mechanische Systeme werden noch getestet...",
  "🔩 Bauteile werden noch montiert...",
  "🚗 Elektrofahrzeuge werden noch entwickelt...",
  "🔋 Akkus werden noch geladen...",
  "🛠️ Prototypen werden noch gebaut...",
  "📈 Datenmodelle werden noch erstellt...",
  "🗄️ Datenbanken werden noch befüllt...",
  "🔗 Blockchain-Netzwerke werden noch gesichert...",
  "🔍 Big Data Analysen werden noch durchgeführt...",
  "📊 Statistische Modelle werden noch entwickelt...",
  "🧑‍💼 Projekte werden noch gemanagt...",
  "🧠 Neuronale Netze werden noch trainiert...",
  "🛡️ Sicherheitsprotokolle werden noch verifiziert...",
  "🌐 Webanwendungen werden noch skaliert...",
  "📦 Lagerbestände werden noch überprüft...",
  "🛒 Bestellvorgänge werden noch automatisiert...",
  "🚚 Lieferwege werden noch optimiert...",
  "🔒 Zugangskontrollen werden noch installiert...",
  "🚨 Alarmsysteme werden noch getestet...",
  "🧑‍🔬 Forschungslabore werden noch eingerichtet...",
  "🔬 Laborgeräte werden noch kalibriert...",
  "🧪 Chemikalien werden noch gemischt...",
  "💉 Impfstoffe werden noch entwickelt...",
  "🧬 DNA-Analysen werden noch durchgeführt...",
  "🩺 Gesundheitsdaten werden noch ausgewertet...",
  "🌱 Biotechnologien werden noch erforscht...",
  "🔋 Energieeffizienz wird noch gesteigert...",
  "🚰 Wasseraufbereitung wird noch optimiert...",
  "🚯 Abfallwirtschaft wird noch verbessert...",
  "🚜 Agrartechnologien werden noch getestet...",
  "🌳 Aufforstungsprojekte werden noch gestartet...",
  "🌿 Nachhaltige Materialien werden noch entwickelt...",
  "🏭 Emissionswerte werden noch reduziert...",
  "🌊 Meeresforschung wird noch betrieben...",
  "🌾 Agrarwissenschaften werden noch angewendet...",
  "🌞 Solarfarmen werden noch gebaut...",
  "🚗 Fahrzeugtechnologien werden noch optimiert...",
  "🚇 Verkehrssysteme werden noch modernisiert...",
  "🚀 Raumfahrttechnologien werden noch getestet...",
  "📡 Kommunikationstechnologien werden noch verbessert...",
  "🔋 Speichersysteme werden noch entwickelt...",
  "💡 Smart Home Geräte werden noch vernetzt...",
  "🌐 Virtuelle Realität wird noch erforscht...",
  "🔧 Automatisierungslösungen werden noch entwickelt...",
  "🧠 Mensch-Maschine-Schnittstellen werden noch getestet...",
  "🌍 Klimamodelle werden noch erstellt...",
  "🧩 Systemintegrationen werden noch durchgeführt...",
  "🔗 Interoperabilität wird noch gewährleistet...",
  "📈 Prognosemodelle werden noch validiert...",
  "🛠️ Technik-Workshops werden noch vorbereitet...",
  "📱 Nutzerfreundlichkeit wird noch getestet...",
  "💻 Softwarelösungen werden noch verbessert...",
  "📊 Marktforschungen werden noch betrieben...",
  "🔍 Nutzerdaten werden noch analysiert...",
  "🧑‍🏫 Lehrmaterialien werden noch erstellt...",
  "🎓 Studiengänge werden noch akkreditiert...",
  "📚 Fachartikel werden noch veröffentlicht...",
  "🗣️ Diskussionen werden noch geführt...",
  "📅 Webinare werden noch geplant...",
  "📈 Trendanalysen werden noch durchgeführt...",
  "🔍 Marktentwicklungen werden noch beobachtet...",
  "🛠️ Technologietrends werden noch erforscht...",
  "📚 Lehrbücher werden noch geschrieben...",
  "📈 Wirtschaftsdaten werden noch ausgewertet...",
  "🔬 Biometrische Daten werden noch erhoben...",
  "🔋 Solarbatterien werden noch geladen...",
  "🚦 Verkehrssteuerungen werden noch programmiert...",
  "🔧 Infrastrukturprojekte werden noch umgesetzt...",
  "📱 Mobile Technologien werden noch entwickelt...",
  "🌍 Nachhaltigkeitsziele werden noch verfolgt...",
  "🚀 Raumfahrtprojekte werden noch geplant...",
  "🛠️ Ingenieure arbeiten noch an Prototypen...",
  "🔋 Energiespeichertechnologien werden noch erforscht...",
  "🌐 Smart Grid Systeme werden noch integriert...",
  "🚰 Wasserverbrauch wird noch optimiert...",
  "🧑‍💻 Cybersicherheit wird noch gewährleistet...",
  "📈 Innovationsstrategien werden noch ausgearbeitet...",
  "🧑‍🎓 Studierende forschen noch an neuen Projekten...",
  "📊 Datenvisualisierungen werden noch erstellt...",
  "🔍 Smart City Daten werden noch gesammelt...",
  "🛠️ Technische Lösungen werden noch implementiert...",
  "📱 Digitale Dienste werden noch entwickelt...",
  "🔋 Batterietechnologien werden noch optimiert...",
  "🌱 Ökologische Lösungen werden noch erforscht...",
  "🔧 Maschinen werden noch kalibriert...",
  "📡 Sensoren werden noch getestet...",
  "💡 Kreative Ideen werden noch umgesetzt...",
  "📊 Businessmodelle werden noch entwickelt...",
  "🧬 Genomdaten werden noch analysiert...",
  "🔒 Sicherheitsrichtlinien werden noch erstellt...",
  "📉 Risikomanagement wird noch betrieben...",
  "🚦 Verkehrsanalysen werden noch durchgeführt...",
  "📊 Nutzerfeedback wird noch ausgewertet...",
  "📊 Datenmuster werden noch erkannt...",
  "📡 Kommunikationsnetze werden noch aufgebaut...",
  "🛠️ Wartungsarbeiten werden noch durchgeführt...",
  "📊 Nutzungsmuster werden noch analysiert...",
  "📊 Datenstrukturen werden noch definiert...",
  "🚀 Start-Up Ideen werden noch entwickelt...",
  "🔧 Smart Technologien werden noch getestet...",
  "📱 App-Funktionen werden noch erweitert...",
  "🛠️ Smart City Tools werden noch entwickelt...",
  "💡 Innovationen werden noch erfunden...",
  "🔬 Forschungsergebnisse werden noch analysiert...",
  "📊 Big Data Projekte werden noch geplant...",
  "🔍 Nutzerverhalten wird noch erforscht...",
  "📱 Mobile Anwendungen werden noch optimiert...",
  "🔋 Solarenergie wird noch gespeichert...",
  "🚗 Elektroautos werden noch geladen...",
  "🔧 Infrastruktur wird noch aufgebaut...",
  "📊 Smart Analytics werden noch entwickelt...",
];

const FakeProgress = ({ }: FakeProgressProps) => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prevMessage) => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1,
      );
    }, 100);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full sm:w-1/2 px-4">
      <div className="relative w-full sm:w-3/4 h-2 sm:h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-green-middle-900 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-1 text-base sm:text-lg font-medium text-gray-700 text-center">
        {currentMessage}
      </p>
    </div>
  );
};

export default FakeProgress;
