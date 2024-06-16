import React, { ReactNode } from 'react';

interface HeroProps {
    headline: string;
    description: string;
    children: ReactNode;
}

const Hero: React.FC<HeroProps> = ({ headline, description, children }) => {
    return (
        <section className="my-28 px-4 max-w-208 mx-auto md:px-6 lg:my-36 xl:my-52 xl:max-w-screen-lg">
            <h1 className="font-lato font-bold text-4xl mb-4 lg:mb-6 lg:text-5xl lg:text-center xl:text-6xl">{headline}</h1>
            <p className="lg:text-center">{description}</p>

            {children}
        </section>
    );
};

export default Hero;
