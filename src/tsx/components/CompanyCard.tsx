import React, { ReactNode } from 'react';
import Arrow from '../icons/Arrow';

interface CompanyCardProps {
    label: string;
    url: string;
    image: string;
    children: ReactNode;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ label, url, image, children }) => {
    return (
        <figure className="cursor-pointer mx-4 mb-10 bg-white shadow-md rounded-2xl p-6 border border-grey-100 md:mx-6 md:p-8 md:grid md:grid-cols-[15rem,auto] md:gap-x-12 md:items-center">
            <img
                src={image}
                className="object-contain w-44 mx-auto" alt={`Logo ${label}`}/>

            <figcaption className="mt-10 md:mt-0">
                <h3 className="font-lato font-semibold text-lg">{label}</h3>
                {children}
                <a
                    href={url}
                    target="_blank"
                    className="text-green-dark-900 font-bold flex itemx-center gap-x-4 group"
                >
                    <p className="transition-all ease-in-out duration-300 group-hover:text-green-light-900">
                        Zur Website
                    </p>
                    <Arrow classes="w-6 transition-all ease-in-out duration-300 group-hover:translate-x-2 group-hover:text-green-light-900"/>
                </a>
            </figcaption>
        </figure>
    );
};

export default CompanyCard;
