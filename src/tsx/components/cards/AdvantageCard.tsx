import React from 'react';

interface AdvantageCardProps {
    label: string;
    icon: string;
    description: string;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ label, icon, description }) => {
    return (
        <div className="h-full shadow-md rounded-2xl p-6 bg-green-light-900/15 group-odd:bg-green-dark-900/15 lg:group-odd:bg-green-light-900/15 lg:group-[:nth-child(4)]:bg-green-dark-900/15 lg:p-8 lg:min-h-64 lg:flex lg:items-center lg:justify-center">
            <div className="text-lg text-center max-w-96 mx-auto lg:text-xl">
                <figure className="bg-green-light-900/25 w-12 h-12 rounded-full flex items-center justify-center">
                    <img
                        src={icon}
                        className="object-contain w-6 h-6" alt={label}/>
                </figure>
                <h3 className="mb-1 font-lato font-semibold">{label}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default AdvantageCard;
