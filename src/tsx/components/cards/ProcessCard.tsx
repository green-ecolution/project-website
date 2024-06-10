import React from 'react';

interface ProcessCardProps {
    label: string;
    shortName: string;
    index: number;
    activeStep: number;
    maxIndex: number;
    description: string;
    isCurrent?: boolean;
    isCompleted?: boolean;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ label, shortName, index, activeStep, maxIndex, description, isCurrent = false, isCompleted = false }) => {
    return (
        <div className="relative">
            <article className={`h-full p-6 mb-6 cursor-pointer shadow-md rounded-2xl mx-4 border md:mx-6 xl:max-w-[32rem] xl:h-auto xl:cursor-default
                ${isCurrent && !isCompleted ? 'bg-green-light-900/10 border-green-light-900' : ''}
                ${isCompleted && !isCurrent ? 'border-green-dark-900 bg-white' : ''}
                ${!isCompleted && !isCurrent ? 'border-grey-100  bg-white' : ''}
                ${index % 2 !== 0 ? 'xl:ml-auto' : ''}
                ${index + 1 === maxIndex ? 'xl:mb-2' : 'xl:mb-0'}`}
            >
                <span className="text-sm">
                    Schritt {index + 1} von {maxIndex}: {shortName}
                </span>
                <h3 className="my-4 font-lato font-semibold text-lg lg:my-5">{label}</h3>
                <p>{description}</p>
            </article>

            <div className={`relative xl:static xl:before:w-0.5 xl:before:h-1/2 xl:after:w-0.5 xl:after:h-1/2
                ${index !== 0 ? 'before:w-1/2 before:h-0.5 before:absolute before:left-0 before:top-1/2 before:-z-10' : ''}
                ${index + 1 < maxIndex ? 'after:w-1/2 after:h-0.5 after:absolute after:right-0 after:top-1/2 after:-z-10 ' : ''}
                ${index === activeStep ? 'before:bg-green-dark-900 after:bg-grey-100' : ''}
                ${index < activeStep ? 'before:bg-green-dark-900 after:bg-green-dark-900' : ''}
                ${index > activeStep ? 'before:bg-grey-100 after:bg-grey-100' : ''}
                ${index % 2 === 0 ? 'xl:before:-right-10 xl:before:left-auto xl:before:top-0 xl:after:-right-10' : 'xl:before:-left-[2.6rem] xl:before:right-auto xl:before:top-0 xl:after:-left-[2.6rem]'}`}
            >
                <figure className={`mx-auto flex items-center justify-between rounded-full w-8 h-8 xl:absolute xl:top-1/2 xl:-translate-y-1/2
                    ${index === activeStep ? 'text-white bg-green-dark-900' : 'text-white bg-green-light-900'}
                    ${index < activeStep ? 'border-2 border-green-dark-900 bg-white' : ''}
                    ${index % 2 === 0 ? 'xl:-right-14' : 'xl:-left-14'}`}
                >
                    <span className="block font-semibold font-lato mx-auto">
                        {index < activeStep ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="#4C7741" className="w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        ) : (
                            index + 1
                        )}
                    </span>
                </figure>
            </div>
        </div>
    );
};

export default ProcessCard;
