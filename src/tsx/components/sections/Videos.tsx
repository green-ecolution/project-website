import ReactPlayer from "react-player"

const VIDEO_SHORT = "https://s3.green-ecolution.de/public-videos/project-video/short/green-ecolution-short.m3u8"
const VIDEO_SHORT_THMBNL = "https://s3.green-ecolution.de/public-videos/project-video/short/green-ecolution-short-thumbnail.png"
const VIDEO_SHORT_THMBNL2 = "https://s3.green-ecolution.de/public-videos/project-video/short/green-ecolution-thumbnail-dummy.png"

const Videos = () => {

    return (
        <section>
            <article className="px-4 mb-8 max-w-208 mx-auto md:px-6 lg:mb-14 lg:text-center xl:max-w-screen-lg">
                <h2 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">
                    Projektvideos
                </h2>
            </article>
            <section className="max-w-208 mx-auto mt-48 md:mt-52 lg:mt-16 lg:max-w-screen-lg lg:grid lg:grid-cols-[1fr,1.5fr] lg:gap-x-10 lg:items-center xl:grid-cols-2 xl:max-w-screen-xl">
                <ReactPlayer
                    controls
                    url={VIDEO_SHORT}
                    light={VIDEO_SHORT_THMBNL2}
                    config={{
                        file: {
                            forceHLS: true
                        }
                    }}
                />
                <article className="px-4 mb-8 md:px-6 lg:mb-14">
                    <p className="mb-6">
                        In diesem kurzen Video geben wir dir einen ersten Einblick in unser Projekt. Erfahre in wenigen Minuten, worum es geht und was du von den kommenden Inhalten erwarten kannst. Schau dir das Video an, um einen schnellen Überblick zu bekommen!
                    </p>
                </article>

            </section>

            <section className="max-w-208 mx-auto mt-48 md:mt-52 lg:mt-16 lg:max-w-screen-lg lg:grid lg:grid-cols-[1fr,1.5fr] lg:gap-x-10 lg:items-center xl:grid-cols-2 xl:max-w-screen-xl">
                <article className="px-4 mb-8 md:px-6 lg:mb-14">
                    <p className="mb-6">
                        In diesem ausführlichen Video tauchen wir tiefer in unser Projekt ein. Hier erläutern wir die wichtigsten Details, Hintergründe und die nächsten Schritte. Dieses Video bietet dir umfassende Informationen und hilft dir, das Projekt besser zu verstehen. Viel Spaß beim Anschauen und Entdecken!
                    </p>
                </article>
                <ReactPlayer
                    controls
                    url={VIDEO_SHORT}
                    light={VIDEO_SHORT_THMBNL}
                    config={{
                        file: {
                            forceHLS: true
                        }
                    }}
                />
            </section>
        </section>
    )

}

export default Videos
