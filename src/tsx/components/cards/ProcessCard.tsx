import React from 'react';
interface ProcessCardProps {
    label: string;
    kicker: string;
    index: number;
    maxIndex: number;
    description: string;
    isCurrent?: boolean;
    isCompleted?: boolean;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ label, kicker, index, maxIndex, description, isCurrent = false, isCompleted = false }) => {
    return (
        <article className={`h-full p-6 shadow-md rounded-2xl mx-4 border md:mx-6 lg:max-w-[32rem] lg:h-auto
            ${isCurrent && !isCompleted ? 'bg-green-light-900/10 border-green-light-900' : ''}
            ${isCompleted && !isCurrent ? 'border-green-dark-900 bg-white' : ''}
            ${!isCompleted && !isCurrent ? 'border-grey-100  bg-white' : ''}
            ${index % 2 !== 0 ? 'xl:ml-auto' : ''}
            ${index + 1 === maxIndex ? 'lg:mb-2' : 'lg:mb-0'}`}
        >
            <span className="text-sm">{kicker}</span>
            <h3 className="my-4 font-lato font-semibold text-lg lg:my-5">{label}</h3>
            <p>{description}</p>
        </article>
    );
};

export default ProcessCard;
