import React from 'react';
interface ProcessCardProps {
    label: string;
    shortName: string;
    index: number;
    maxIndex: number;
    description: string;
    isCurrent?: boolean;
    isCompleted?: boolean;
    detailedShow?: boolean;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ label, shortName, index, maxIndex, description, isCurrent = false, isCompleted = false, detailedShow = false }) => {
    return (
        <article className={`h-full p-6 shadow-md rounded-2xl mx-4 border md:mx-6 lg:max-w-[32rem] lg:h-auto
            ${isCurrent && !isCompleted ? 'bg-green-light-100 border-green-light-900' : ''}
            ${isCompleted && !isCurrent ? 'border-green-dark-900 bg-white' : ''}
            ${!isCompleted && !isCurrent ? 'border-grey-100  bg-white' : ''}
            ${index % 2 !== 0 && detailedShow ? 'xl:ml-auto' : ''}
            ${index + 1 === maxIndex ? 'lg:mb-2' : 'lg:mb-0'}`}
        >
            <span className="text-sm">Schritt {index + 1} von {maxIndex}: {shortName}</span>
            <h3 className="my-3 font-lato font-semibold text-lg">{label}</h3>
            <p>{description}</p>
        </article>
    );
};

export default ProcessCard;
