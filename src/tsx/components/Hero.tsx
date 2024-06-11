import React from 'react';

interface HeroProps {
    headline: string;
    description: string;
    type: string;
}

const Hero: React.FC<HeroProps> = ({ headline, description, type }) => {

    return (
        <section className="my-28 lg:my-36 xl:my-44 px-4 mb-8 max-w-208 mx-auto md:px-6 lg:mb-14 lg:text-center xl:max-w-screen-lg">
            <h1 className="font-lato font-bold text-4xl mb-4 lg:mb-6 lg:text-5xl xl:text-6xl">{headline}</h1>
            <p>{description}</p>

            <div className={`mt-16 ${type === 'project' ? 'block' : 'hidden'}`}>
                <p className="font-bold">Akueller Projektstand:</p>
            </div>
        </section>
    );
};

export default Hero;
