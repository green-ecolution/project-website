import { Splide, SplideSlide } from '@splidejs/react-splide';
import { i18nTranslated } from '../../helper/sliderTranslations';
import '@splidejs/react-splide/css';
import ProcessCard from "../cards/ProcessCard";

function Process() {
    const activeStep = 1;

    const steps = [
        {
            label: "Konzepterstellung",
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
        {
            label: "Produktvorstellung 02",
            shortName: "Vorstellung 02",
            description: "Occaecat in dolor eiusmod fugiat. Excepteur proident nostrud aliquip esse ut nostrud in ut esse. Proident ut consequat consequat consectetur magna."
        },
        {
            label: "Finale Vorstellung",
            shortName: "Finalisierung",
            description: "Occaecat in dolor eiusmod fugiat. Excepteur proident nostrud aliquip esse ut nostrud in ut esse. Proident ut consequat consequat consectetur magna."
        },
    ];

    const breakpoints = {
        640: {
            padding: '20%'
        },
        1024: {
            padding: '24%'
        },
        1280: {
            destroy: true,
        },
    };

    return (
        <section className="my-28 lg:my-36 xl:my-44">
            <article className="px-4 mb-8 max-w-208 mx-auto md:px-6 lg:mb-14 lg:text-center xl:max-w-screen-lg 2xl:max-w-screen-xl">
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
                options={{ rewind: true, arrows: false, pagination: false, i18n: i18nTranslated, mediaQuery: 'min', breakpoints: breakpoints, start: activeStep }}
                aria-label="Fakten zum Grünflächenmanagement"
                className="md:px-2 xl:mx-auto xl:max-w-screen-lg 2xl:max-w-screen-xl"
            >
                {steps.map((step, index) => (
                    <SplideSlide key={index} className="pb-10 xl:w-1/2 xl:even:ml-auto xl:even:mr-0 xl:even:pl-10 xl:pb-0 xl:odd:pr-10">
                        <ProcessCard
                            label={step.label}
                            shortName={step.shortName}
                            index={index}
                            activeStep={activeStep}
                            maxIndex={steps.length}
                            isCurrent={index === activeStep}
                            isCompleted={index < activeStep}
                            description={step.description} />
                    </SplideSlide>
                ))}
            </Splide>
        </section>
    );
}

export default Process;
