import React from 'react';

interface ProcessCardProps {
    label: string;
    shortName: string;
    index: number;
    description: string;
    isCurrent?: boolean
}

const ProcessCard: React.FC<ProcessCardProps> = ({ label, shortName, index, description, isCurrent = false }) => {
    return (
        <div className={`h-full cursor-pointer shadow-md rounded-2xl p-6 border  xl:cursor-default ${isCurrent ? 'bg-green-light-900/10 border-green-light-900' : 'border-grey-100 bg-white'}`}>
            <span className="text-sm">
                Schritt {index} von 5: {shortName}
            </span>
            <h3 className="my-4 font-lato font-semibold text-lg md:my-5">{label}</h3>
            <p>{description}</p>
        </div>
    );
};

export default ProcessCard;
