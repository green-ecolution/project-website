interface HomepageIconsProps {
    index: number;
}

const HomepageIcons: React.FC<HomepageIconsProps> = ({ index }) => {
    const icons = [
        {
            figureClasses: "top-[20%] left-[10%] w-28 h-28 before:w-36 before:h-36 after:absolute after:top-[130%] after:w-1 after:h-[calc(80vh-28rem)]",
            imageClasses: "w-14",
            activeOnIndex: [1],
            icon: "/assets/svg/general/wlan.svg",
        },
        {
            figureClasses: "top-[calc(20%+16rem)] left-[calc(10%+20rem)] w-28 h-28 before:w-36 before:h-36 after:absolute after:w-1 after:h-56 after:-rotate-[50deg] after:-top-[170%] after:-left-[90%]",
            imageClasses: "h-12 w-12",
            activeOnIndex: [1, 2],
            icon: "/assets/svg/general/mobile.svg",
        },
        {
            figureClasses: "bottom-[10rem] left-[10%] w-28 h-28 ro before:w-36 before:h-36",
            imageClasses: "w-14",
            activeOnIndex: [1],
            icon: "/assets/svg/general/gateway.svg",
        },
        {
            figureClasses: "bottom-[5rem] right-[45%] w-28 h-28 before:w-36 before:h-36 after:h-2 after:max-w-[35rem] after:w-[calc(41vw-14rem)] after:right-[130%] after:origin-bottom-right after:rotate-[8deg]",
            imageClasses: "w-14 h-14",
            activeOnIndex: [0],
            icon: "/assets/svg/general/tensiometer.svg",
        },
        {
            figureClasses: "bottom-[6rem] right-[22%] w-20 h-20 before:w-28 before:h-28 2xl:right-[32%] after:h-2 after:w-[13.5vw] after:right-[130%] 2xl:after:w-[5vw] 3xl:after:w-28",
            imageClasses: "w-12 h-12",
            activeOnIndex: [0],
            icon: "/assets/svg/general/tensiometer.svg",
        },
        {
            figureClasses: "bottom-[6rem] right-[10%] w-16 h-16 before:w-[5.5rem] before:h-[5.5rem] 2xl:right-[20%] 3xl:right-[24%] after:h-2 after:w-[4vw] after:rotate-[3deg] after:right-[130%] 2xl:after:w-[5.5vw] 3xl:after:w-12",
            imageClasses: "w-10 h-10",
            activeOnIndex: [0],
            icon: "/assets/svg/general/tensiometer.svg",
        },
    ];

    return (
        <div className="hidden xl:block">
            {icons.map((icon, key) => (
                <figure
                    key={key}
                    aria-hidden="true"
                    className={`absolute rounded-full flex items-center justify-center before:bg-white/30 before:absolute before:-z-10 before:rounded-full after:absolute after:border-dotted
                        ${key > 2 ? 'after:border-t-[6px] after:border-t-white' : 'after:border-l-[6px] after:border-l-white'}
                        ${icon.figureClasses}
                        ${icon.activeOnIndex.includes(index) ? 'bg-white before:animate-pulse' : ''}`}
                >
                    <img
                        src={icon.icon} alt=""
                        className={`object-contain h-10 w-10 ${icon.imageClasses}`} />
                </figure>
            ))}
        </div>
    );
}

export default HomepageIcons;
