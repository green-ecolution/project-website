function HompageHero() {


  return (
    <section className="overflow-hidden relative mx-auto w-screen h-screen before:hidden before:absolute before:w-full before:h-full before:-z-10 before:bg-background-hero-mobile before:bg-no-repeat before:bg-contain before:bg-[center_bottom_-10rem]">
        <article className="max-w-208 mx-auto px-4 pt-28 mb-8 md:px-6 lg:mb-14 lg:pt-36 lg:max-w-screen-lg xl:max-w-screen-xl xl:pt-44">
            <div className="max-w-[30rem]">
                <h1 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">
                    Wir machen smarte Bewässerung von Bäumen und Beeten möglich!
                </h1>
                <p>
                    Ut cillum minim eu duis cupidatat culpa proident voluptate sint aute mollit nulla velit voluptate.
                    Consequat occaecat adipisicing culpa.
                </p>
            </div>
        </article>

        {/* <figure className="absolute bottom-[8%] right-[5%] -z-10">
            <svg className="h-[50vh]" aria-hidden="true" width="190" height="469" viewBox="0 0 190 469" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.1837 282.129C39.3732 309.529 69.6573 283.932 82.2758 267.708C112.32 270.712 164.325 283.33 177.383 244.154C184.624 222.433 171.445 198.518 145.607 202.724C164.835 181.092 194.399 125.661 188.631 105.471C182.862 85.2817 152.578 97.0589 138.157 105.471C134.552 66.4142 116.886 -9.17607 75.0652 0.918663C33.2442 11.0134 31.2012 92.8528 35.4073 132.511C26.995 131.91 8.36787 137.197 1.15735 163.155C-6.05317 189.113 22.1881 206.418 37.21 211.826C22.789 223.844 -1.00575 254.729 19.1837 282.129Z" fill="#ACB63B"/>
                <path d="M97.3852 217.687C115.182 206.774 119.547 186.454 125.008 174.394C125.008 172.534 124.253 170.795 122.992 173.711C115.356 191.368 104.524 212.795 92.1003 211.29C83.8772 219.439 79.0554 228.926 97.3852 217.687Z" fill="#92633B"/>
                <path d="M83.5749 190.676C70.4687 184.517 66.5853 163.55 66.2819 153.837C66.2819 152.347 66.7829 150.954 67.6203 153.289C72.6919 167.433 79.8847 184.595 88.1356 183.389C93.5966 189.917 96.6812 196.835 83.5749 190.676Z" fill="#92633B"/>
                <path d="M92.9236 256.104C107.405 256.105 119.838 238.782 124.244 230.12C124.878 228.772 125.017 227.298 123.266 229.055C112.66 239.698 98.8499 252.171 91.8955 247.57C84.1766 251.155 78.4423 256.103 92.9236 256.104Z" fill="#92633B"/>
                <path d="M92.1023 149.965C91.1609 152.169 60.1805 365.66 50.6812 469H93.428C93.428 469 94.9264 167.048 94.9264 149.965C94.9264 149.319 93.0437 147.76 92.1023 149.965Z" fill="#92633B"/>
            </svg>
        </figure> */}
    </section>
  );
}

export default HompageHero;
