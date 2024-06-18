import Lottie from "lottie-react";
import treeLightGreenAnimation from "../../../json/treeLightGreenAnimation.json";
import treeMiddleGreenAnimation from "../../../json/treeMiddleGreenAnimation.json"
import treeDarkGreenAnimation from "../../../json/treeDarkGreenAnimation.json"

function HompageHero() {
    return (
        <section className="overflow-hidden relative mx-auto w-screen h-screen max-w-screen-3xl before:bg-background-yellow-dot before:bg-cover before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:bottom-0 before:-z-50 before:bg-no-repeat sm:before:-right-10 md:before:max-h-[70rem] 2xl:before:right-0 2xl:before:bg-contain">
            <article className="max-w-208 mx-auto px-4 pt-28 mb-8 md:px-6 lg:mb-14 lg:pt-36 lg:max-w-screen-lg xl:max-w-screen-xl xl:pt-44">
                <div className="max-w-[30rem] 2xl:max-w-[40rem]">
                    <h1 className="font-lato font-bold text-2xl mb-6 lg:text-4xl xl:text-5xl">
                        Wir machen smarte Bewässerung von Bäumen und Beeten möglich!
                    </h1>
                    <p>
                        Ut cillum minim eu duis cupidatat culpa proident voluptate sint aute mollit nulla velit voluptate.
                        Consequat occaecat adipisicing culpa.
                    </p>
                </div>
            </article>

            <figure aria-hidden="true" className="animate-move absolute bottom-96 md:bottom-1/2 right-2 -z-40 lg:right-1/3">
                <svg className="w-[85%]" width="855" height="178" viewBox="0 0 855 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.000244141 177.46L811.67 169.552C811.67 169.552 875.2 171.712 848 61.3116C820.8 -49.0884 666.334 13.5888 609.5 72.2555C488.7 -70.5445 378.167 47.0888 338 123.755C242.5 98.96 202.167 144.46 195 163.46C195 163.46 174.5 157.46 163 157.46C138.132 155.845 129.5 162.46 125 166.46C125 166.46 112.465 169.553 96.0002 167.96C84.0002 166.799 70.1939 166.472 52.5002 167.96C25.0002 171.96 0.000244141 174.625 0.000244141 177.46Z" fill="#F5F5F5" fillOpacity="0.75"/>
                </svg>
            </figure>

            <figure aria-hidden="true" className="absolute bottom-10 right-[5%] -z-20 xs:bottom-16 md:right-96 lg:right-[28rem] xl:bottom-32 2xl:right-[40rem] 3xl:right-[40%] md:landscape:bottom-0 md:landscape:right-[25%] lg:landscape:bottom-16">
                <Lottie
                    aria-hidden="true"
                    className="h-[65vh] max-h-[30rem] md:max-h-none md:min-h-96 md:h-[60vh]"
                    animationData={treeLightGreenAnimation} />
            </figure>

            <figure aria-hidden="true" className="hidden absolute right-64 -z-10 bottom-28 lg:block xl:bottom-48 2xl:right-[28rem] 2xl:bottom-28 3xl:right-[30%] landscape:hidden">
                <Lottie
                    aria-hidden="true"
                    className="h-[40vh] md:min-h-96"
                    animationData={treeMiddleGreenAnimation} />
            </figure>

            <figure aria-hidden="true" className="hidden absolute -right-20 -z-30 bottom-16 md:block lg:bottom-32 xl:bottom-48 2xl:right-28 2xl:bottom-28 3xl:right-[12%] landscape:bottom-4 lg:landscape:bottom-16 lg:landscape:32">
                <Lottie
                    aria-hidden="true"
                    className="h-[55vh] md:min-h-96"
                    animationData={treeDarkGreenAnimation} />
            </figure>
        </section>
    );
}

export default HompageHero;
