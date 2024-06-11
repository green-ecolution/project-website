import React from 'react';

interface AdvantageCardProps {
    label: string;
    description: string;
    icon: string;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ label, description, icon }) => {


    return (
        <div className="h-full shadow-md rounded-2xl p-6 bg-green-light-900/15 group-odd:bg-green-dark-900/15 md:group-odd:bg-green-light-900/15 md:group-[:nth-child(4)]:bg-green-dark-900/15 md:flex md:justify-center md:items-center lg:p-8 lg:min-h-64 lg:items-center lg:justify-center">
            <div className="text-lg text-center max-w-96 mx-auto lg:text-xl">
                <figure className="w-16 mx-auto mb-3">
                    <img
                        src={icon}
                        className="object-contain w-10 md:w-10 lg:w-14" alt=""/>
                </figure>
                <h3 className="mb-1 font-lato font-semibold">{label}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default AdvantageCard;
