import { useState, useEffect } from "react";
import Arrow from "../../icons/Arrow";
import HomepageOverlay from "./HomepageOverlay";
import HomepageTrees from "./HomepageTrees";

function HompageHero() {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const handleButtonClick = () => {
        setIsOverlayVisible(true);
    };

    const handleCloseOverlay = () => {
        setIsOverlayVisible(false);
    };

    useEffect(() => {
        isOverlayVisible
        ? document.body.classList.add('overflow-hidden')
        : document.body.classList.remove('overflow-hidden');

        return () => { document.body.classList.remove('overflow-hidden') };
    }, [isOverlayVisible]);

    return (
        <section>
            <div className="overflow-hidden relative mx-auto w-screen h-screen max-w-screen-3xl before:bg-background-yellow-dot before:bg-cover before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:bottom-0 before:-z-50 before:bg-no-repeat sm:before:-right-10 md:before:max-h-[70rem] 2xl:before:right-0 2xl:before:bg-contain">
                <article className={`max-w-208 mx-auto px-4 pt-28 mb-8 md:px-6 lg:mb-14 lg:pt-36 lg:max-w-screen-lg xl:max-w-screen-xl xl:pt-44
                    ${isOverlayVisible ? 'hidden' : ''}`}
                >
                    <div className="max-w-[30rem] 2xl:max-w-[40rem]">
                        <h1 className="font-lato font-bold text-2xl mb-6 lg:text-4xl xl:text-5xl">
                            Wir machen smarte Bewässerung von Bäumen und Beeten möglich!
                        </h1>
                        <p className="mb-4 lg:mb-6">
                            Ut cillum minim eu duis cupidatat culpa proident voluptate sint aute mollit nulla velit voluptate.
                            Consequat occaecat adipisicing culpa.
                        </p>
                        <button
                            className="hidden items-center justify-center gap-x-4 rounded-2xl w-max font-semibold px-5 py-2 group bg-green-dark-900 transition-color ease-in-out duration-300 text-white hover:bg-green-light-900 hover:border-green-light-900 xl:flex"
                            onClick={handleButtonClick}
                        >
                            Nach unten wischen
                            <Arrow classes="w-6 rotate-90 transition-all ease-in-out duration-300 group-hover:-translate-y-0.5"/>
                        </button>
                    </div>
                </article>

                <HomepageTrees />
            </div>
            {isOverlayVisible && <HomepageOverlay onClose={handleCloseOverlay} />}
        </section>
    );
}

export default HompageHero;
