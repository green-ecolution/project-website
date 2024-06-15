import React from 'react';
import ProcessCard from './../cards/ProcessCard';
import { steps } from '../../../data/processSteps';
import StepCircle from './../process/StepCircle';

interface HeroProps {
    headline: string;
    description: string;
    type: string;
}

const Hero: React.FC<HeroProps> = ({ headline, description, type }) => {
    const activeStep = steps.findIndex(step => step.isCurrent);

    const [visibleStep, setVisibleStep] = React.useState(activeStep);

    function toggleVisibleStep(index: number) {
        setVisibleStep(index);
    }

    return (
        <section className={`relative overflow-hidden before:bg-cover before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain
            ${type === 'project' ? 'before:bg-background-light-dot' : ''}`}
        >
            <div className="py-28 px-4 max-w-208 mx-auto md:px-6 lg:py-36 xl:py-44 xl:max-w-screen-lg">
                <h1 className="font-lato font-bold text-4xl mb-4 lg:mb-6 lg:text-5xl lg:text-center xl:text-6xl">{headline}</h1>
                <p className="lg:text-center">{description}</p>

                <div className={`mt-16 ${type === 'project' ? 'flex flex-col' : 'hidden'}`}>
                    <p className="font-bold text-center">Akueller Projektstand:</p>
                    <ul className="flex items-center justify-center gap-x-8 mb-10 mt-6 md:gap-x-12 lg:gap-x-16">
                        {steps.map((step, index) => (
                            <li key={index} className={`relative
                                ${index === 0 ? '' : 'before:h-0.5 before:w-8 before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 md:before:w-12 lg:before:w-16'}
                                ${index < activeStep + 1 ? 'before:bg-green-dark-900' : 'before:bg-grey-100'}`}>
                                <button
                                    className="transition-all ease-in-out duration-300 hover:opacity-75"
                                    aria-label={`Anzeige von Prozess-Schritt ${index}: ${step.shortName}`}
                                    aria-current={index === visibleStep}
                                    onClick={() => toggleVisibleStep(index)}
                                >
                                    <StepCircle
                                        index={index}
                                        activeStep={activeStep} />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <ul className="flex items-center justify-center gap-x-6">
                        {steps.map((step, index) => (
                            <li key={index} className={`${visibleStep === index ? 'block' : 'hidden'}`}>
                                <ProcessCard
                                    label={step.label}
                                    shortName={step.shortName}
                                    description={step.description}
                                    index={index}
                                    maxIndex={steps.length}
                                    isCurrent={index === activeStep}
                                    isCompleted={index < activeStep} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Hero;
