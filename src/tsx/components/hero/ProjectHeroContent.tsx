import { useState, useMemo } from 'react';
import ProcessCard from './../cards/ProcessCard';
import { steps } from '../../../data/processSteps';
import StepCircle from './../process/StepCircle';

function ProjectHeroContent() {
    const activeStep = useMemo(() => steps.findIndex(step => step.isCurrent), []);

    const [visibleStep, setVisibleStep] = useState(activeStep);

    function toggleVisibleStep(index: number) {
        setVisibleStep(index);
    }

    return (
        <div className="flex flex-col mt-12">
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
    );
}

export default ProjectHeroContent;
