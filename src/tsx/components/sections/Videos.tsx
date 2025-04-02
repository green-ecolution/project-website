import ReactPlayer from "react-player"

const VIDEO_SHORT = "https://s3.green-ecolution.de/public-videos/project-video/short/green-ecolution-short.m3u8"
const VIDEO_SHORT_THMBNL = "https://s3.green-ecolution.de/public-videos/project-video/short/green-ecolution-thumbnail.png"
const VIDEO_LONG = "https://s3.green-ecolution.de/public-videos/project-video/long/green-ecolution-long.m3u8"
const VIDEO_LONG_THMBNL = "https://s3.green-ecolution.de/public-videos/project-video/long/green-ecolution-thumbnail.png"

const Videos = () => {

    return (
        <section className="relative px-4 mx-auto md:px-6 py-28 lg:py-36 xl:py-52 before:bg-cover before:bg-background-light-dot before:w-[90%] before:h-[80%] before:absolute before:-right-4 before:top-12 before:-z-10 before:bg-no-repeat xl:before:bg-contain xl:before:top-20 xl:before:left-[10%] 3xl:before:left-[20%]">
            <article className="mx-auto mb-8 lg:mb-14 lg:text-center xl:max-w-screen-lg">
                <h2 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">
                    Lerne das Projekt per Video kennen
                </h2>
                <p>
                    Im Rahmen des Forschungsprojekts wurden nicht nur eine Sensorlösung und eine Software entwickelt,
                    sondern auch Videos produziert. Diese Videos veranschaulichen anschaulich die Inhalte des Projekts,
                    einschließlich der Zielsetzung, der Problemstellung und der von uns entwickelten Lösung.
                </p>
            </article>

            <section className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-2 xl:max-w-screen-xl">
                <article className="video__player h-full bg-white shadow-md rounded-2xl p-6 border border-grey-100">
                    <ReactPlayer
                        className="aspect-video"
                        playing
                        controls
                        url={VIDEO_SHORT}
                        width="100%"
                        height="auto"
                        light={VIDEO_SHORT_THMBNL}
                    />
                    <h3 className="mt-8 mb-4 font-lato text-xl lg:text-2xl">
                        <strong>Kurzvideo</strong>&nbsp;|&nbsp;
                        <span className="text-base lg:text-lg text-grey-900/60">ca. 30 Sekunden</span>
                    </h3>
                    <p>
                        In diesem kurzen Video geben wir dir einen ersten Einblick in unser Projekt.
                        Erfahre in wenigen Minuten, worum es geht und was du von den kommenden Inhalten erwarten kannst.
                        Schau dir das Video an, um einen schnellen Überblick zu bekommen!
                    </p>
                </article>

                <article className="video__player h-full bg-white shadow-md rounded-2xl p-6 border border-grey-100">
                    <ReactPlayer
                        className="aspect-video"
                        playing
                        controls
                        url={VIDEO_LONG}
                        width="100%"
                        height="auto"
                        light={VIDEO_LONG_THMBNL}
                    />
                    <h3 className="mt-8 mb-4 font-lato text-xl lg:text-2xl">
                        <strong>Langvideo</strong>&nbsp;|&nbsp;
                        <span className="text-base lg:text-lg text-grey-900/60">ca. 4 Minuten</span>
                    </h3>
                    <p>
                        In diesem ausführlichen Video tauchen wir tiefer in unser Projekt ein.
                        Hier erläutern wir die wichtigsten Details, Hintergründe und die nächsten Schritte.
                        Dieses Video bietet dir umfassende Informationen und hilft dir, das Projekt besser zu verstehen.
                        Viel Spaß beim Anschauen und Entdecken!
                    </p>
                </article>
            </section>
        </section>
    )

}

export default Videos
