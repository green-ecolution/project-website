import Lottie from "lottie-react";
import cableAnimation from "../../json/cableAnimation.json"
import Button from "../components/Button";
import Arrow from "../icons/Arrow";


function NotFoundPage() {
    return (
        <main className="relative h-screen overflow-hidden before:bg-cover before:bg-background-dark-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain">
            <figure aria-hidden="true" className="absolute top-0 inset-x-0">
                <Lottie className="h-[50vh]" animationData={cableAnimation} />
            </figure>

            <div className="mt-[55vh] mx-auto max-w-208 xl:max-w-screen-lg">
                <section className="my-28 px-4 md:px-6 lg:my-36 xl:my-52">
                    <h1 className="font-lato font-bold text-4xl mb-4 lg:mb-6 lg:text-5xl lg:text-center xl:text-6xl">
                        Die Seite konnte leider nicht gefunden werden.
                    </h1>
                    <p className="lg:text-center mb-10">
                        Eu elit quis eiusmod proident officia aute tempor tempor qui commodo aute qui.
                        Excepteur id ea laboris fugiat dolor exercitation ut pariatur ut commodo non.
                    </p>
                    <div className="lg:flex lg:items-center lg:justify-center">
                        <Button href="/" ariaLabel="Zur Statseite" isDark>
                            <span>Zur Startseite</span>
                            <Arrow classes="w-6 text-white transition-all ease-in-out duration-300 group-hover:translate-x-2"/>
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default NotFoundPage;
