import { Splide, SplideSlide } from '@splidejs/react-splide';
import { i18nTranslated } from '../../helper/sliderTranslations';
import { steps } from '../../../data/processSteps';
import '@splidejs/react-splide/css';
import ProcessCard from "../cards/ProcessCard";
import StepCircle from '../process/StepCircle';

function Process() {
    const activeStep = steps.findIndex(step => step.isCurrent);

    const breakpoints = {
        640: {
            padding: '20%'
        },
        1024: {
            destroy: true,
        },
    };

    return (
        <section className="relative overflow-hidden pt-28 my-28 lg:pt-36 lg:mb-36 xl:pt-52 xl:mb-52 before:bg-cover before:bg-background-dark-dot before:-scale-x-100 before:w-[90%] before:h-[80%] before:absolute before:-left-4 before:top-8 before:-z-10 before:bg-no-repeat sm:before:-left-[10%] xl:before:w-[80rem] 2xl:before:left-[10%] 2xl:before:bg-contain 3xl:before:left-[20%]">
            <article className="px-4 mb-8 max-w-208 mx-auto md:px-6 lg:mb-14 lg:text-center xl:max-w-screen-lg">
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
                aria-label="Der aktuelle Projektfortschritt"
                className="md:px-2 lg:mx-auto lg:max-w-screen-lg xl:max-w-screen-xl"
            >
                {steps.map((step, index) => (
                    <SplideSlide key={index} className="pb-14 lg:w-1/2 lg:even:ml-auto lg:even:mr-0 lg:even:pl-10 lg:pb-0 lg:odd:pr-10">
                        <div className="relative h-[85%] lg:h-auto">
                            <ProcessCard
                                label={step.label}
                                description={step.description}
                                shortName={step.shortName}
                                index={index}
                                maxIndex={steps.length}
                                isCurrent={index === activeStep}
                                isCompleted={index < activeStep}
                                detailedShow />

                            <div className={`relative mt-6 lg:static lg:mt-0 lg:before:w-0.5 lg:before:h-1/2 lg:after:w-0.5 lg:after:h-1/2
                                ${index !== 0 ? 'before:w-1/2 before:h-0.5 before:absolute before:left-0 before:top-1/2 before:-z-10' : ''}
                                ${index + 1 < steps.length ? 'after:w-1/2 after:h-0.5 after:absolute after:right-0 after:top-1/2 after:-z-10 ' : ''}
                                ${index === activeStep ? 'before:bg-green-dark-900 after:bg-grey-100' : ''}
                                ${index < activeStep ? 'before:bg-green-dark-900 after:bg-green-dark-900' : ''}
                                ${index > activeStep ? 'before:bg-grey-100 after:bg-grey-100' : ''}
                                ${index % 2 === 0 ? 'lg:before:-right-10 lg:before:left-auto lg:before:top-0 lg:after:-right-10' : 'lg:before:-left-[2.6rem] lg:before:right-auto lg:before:top-0 lg:after:-left-[2.6rem]'}`}
                            >
                                <StepCircle
                                    index={index}
                                    activeStep={activeStep}
                                    detailedShow />
                            </div>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </section>
    );
}

export default Process;
