import { useState, useEffect, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { i18nTranslated } from '../../helper/sliderTranslations';
import '@splidejs/react-splide/css';
import ProcessCard from "../cards/ProcessCard";

function Process() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const activeStep = 1;
    const splideRef = useRef<any>(null);

    const steps = [
        {
            label: "Konzepterstellung & Ideenfindung",
            shortName: "Konzept",
            description: "Occaecat in dolor eiusmod fugiat. Excepteur proident nostrud aliquip esse ut nostrud in ut esse. Proident ut consequat consequat consectetur magna."
        },
        {
            label: "MVP (Most Valid Product)",
            shortName: "MVP",
            description: "Occaecat in dolor eiusmod fugiat. Excepteur proident nostrud aliquip esse ut nostrud in ut esse. Proident ut consequat consequat consectetur magna."
        },
        {
            label: "Produktvorstellung 01",
            shortName: "Vorstellung 01",
            description: "Occaecat in dolor eiusmod fugiat. Excepteur proident nostrud aliquip esse ut nostrud in ut esse. Proident ut consequat consequat consectetur magna."
        },
    ];

    const breakpoints = {
        1280: {
            destroy: true,
        },
    };

    useEffect(() => {
        if (!splideRef.current) return;

        const splideInstance = splideRef.current.splide;
        splideInstance.on('move', (newIndex: number) => {
            setCurrentSlide(newIndex);
        });
    }, []);

    return (
        <section className="max-w-208 mx-auto my-28 lg:my-36 xl:my-44 xl:max-w-screen-lg">
            <article className="px-4 mb-8 md:px-6 lg:mb-14">
                <h2 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">
                    Der aktuelle Projektfortschritt
                </h2>
                <p>
                    Sit sint sit incididunt magna esse incididunt incididunt consectetur ex sit.
                    Ipsum labore dolor minim culpa Lorem incididunt nisi nulla culpa dolor.
                    Occaecat in dolor eiusmod fugiat. Excepteur proident nostrud aliquip esse ut nostrud in ut esse.
                    Proident ut consequat consequat consectetur magna.
                </p>
            </article>

            <Splide
                options={{ rewind: true, arrows: false, pagination: false, i18n: i18nTranslated, mediaQuery: 'min', breakpoints: breakpoints }}
                aria-label="Fakten zum Grünflächenmanagement"
                className="splide--grid md:px-2"
                ref={splideRef}
            >
                {steps.map((step, index) => (
                    <SplideSlide key={index} className="pb-10 px-4 lg:px-2 lg:pb-2 xl:first:mb-16 xl:[&:nth-child(2)]:mt-16 xl:[&:nth-child(3)]:-mt-16 xl:[&:nth-child(3)]:mb-16">
                        <ProcessCard
                            label={step.label}
                            shortName={step.shortName}
                            index={index + 1}
                            isCurrent={index === activeStep}
                            description={step.description} />
                    </SplideSlide>
                ))}
            </Splide>

            <ul className="w-full">
                {steps.map((step, index) => (
                    <li key={index} className={`relative before:w-1/2 before:h-0.5 before:absolute before:left-0 before:top-1/2 before:-z-10 after:w-1/2 after:h-0.5 after:absolute after:right-0 after:top-1/2 after:-z-10
                        ${index === currentSlide ? 'block' : 'hidden'} ${index === activeStep ? 'before:bg-green-dark-900 after:bg-grey-100' : ''} ${index < activeStep ? 'before:bg-green-dark-900 after:bg-green-dark-900' : ''} ${index > activeStep ? 'before:bg-grey-100 after:bg-grey-100' : ''}`}
                    >
                        <div className={`mx-auto flex items-center justify-between rounded-full w-8 h-8
                                ${index === activeStep ? 'text-white bg-green-dark-900' : 'text-white bg-green-light-900'} ${index < activeStep ? 'border-2 border-green-dark-900 bg-white' : ''}`}>
                            <span className="block font-semibold font-lato mx-auto">
                                {index < activeStep ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="#4C7741" className="w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Process;
