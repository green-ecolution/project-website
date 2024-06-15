import React, { ReactNode } from 'react';

interface HeroProps {
    headline: string;
    description: string;
    isDark?: boolean;
    children: ReactNode;
}

const Hero: React.FC<HeroProps> = ({ headline, description, isDark = false, children }) => {
    return (
        <section className={`relative overflow-hidden before:bg-cover before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain
            ${isDark ? 'before:bg-background-dark-dot' : 'before:bg-background-light-dot'}`}
        >
            <div className="py-28 px-4 max-w-208 mx-auto md:px-6 lg:py-36 xl:py-44 xl:max-w-screen-lg">
                <h1 className="font-lato font-bold text-4xl mb-4 lg:mb-6 lg:text-5xl lg:text-center xl:text-6xl">{headline}</h1>
                <p className="lg:text-center">{description}</p>

                {children}
            </div>
        </section>
    );
};

export default Hero;
