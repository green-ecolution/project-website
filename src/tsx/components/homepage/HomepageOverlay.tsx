import { useState } from "react";
import Arrow from "../../icons/Arrow";

interface HomepageOverlayProps {
    onClose: () => void;
}

const HomepageOverlay: React.FC<HomepageOverlayProps> = ({ onClose }) => {
    const popups = [
        {
            label: "Messung des Bewässerungsstand",
            shortName: "Bewässerungsstand",
            description: "Die Bodenfeuchte um den Wurzelballen herum wird in drei (30cm, 60cm und 90cm) unterschiedlichen Bodentiefen gemessen. Daraus lässt sich erschließen, wie feucht der Boden auch in tieferen Bodenschichten ist."
        },
        {
            label: "Übertragung der Daten",
            shortName: "Datenübertragung",
            description: "Die Daten werden mithilfe von öffentlichen LoRaWAN (Long Range Wide Area Network) Zugängen übermittelt."
        },
        {
            label: "Handlungsempfehlungen",
            shortName: "Handlungsempfehlungen",
            description: "Die gemessenen Sensordaten werden mittels wissenschaftlichen, mathematischen Daten interpretiert und in Empfehlungen umgewandelt. Dies wird alles auf ein Dashboard dargestellt."
        },
    ];

    const [currentPopupIndex, setCurrentPopupIndex] = useState(0);

    const handleNextClick = () => {
        currentPopupIndex < popups.length - 1
        ? setCurrentPopupIndex(currentPopupIndex + 1)
        : onClose();
    };

    const currentPopup = popups[currentPopupIndex];

    return (
        <section className="absolute bg-grey-900/80 inset-0 z-50 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-2xl p-6 border border-grey-100 w-[22.5rem]">
                <span className="text-sm">Info {currentPopupIndex + 1} von {popups.length}: {currentPopup.shortName}</span>
                <h2 className="font-lato font-semibold text-xl mb-4">{currentPopup.label}</h2>
                <p>{currentPopup.description}</p>
                <div className="mt-6">
                    <button
                        className="text-sm flex items-center justify-center gap-x-4 rounded-2xl w-max font-semibold px-4 py-1.5 group bg-green-dark-900 transition-color ease-in-out duration-300 text-white hover:bg-green-light-900 hover:border-green-light-900"
                        onClick={handleNextClick}
                    >
                        {currentPopupIndex < popups.length - 1 ? 'Weiter' : 'Schließen'}
                        <Arrow classes={`w-6 transition-all ease-in-out duration-300 ${currentPopupIndex < popups.length - 1 ? "group-hover:translate-x-0.5" : ""}`}/>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HomepageOverlay;
