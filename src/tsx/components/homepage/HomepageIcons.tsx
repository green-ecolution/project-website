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
            figureClasses: "top-[calc(20%+10rem)] left-[calc(10%+20rem)] w-28 h-28 before:w-36 before:h-36 after:absolute after:w-1 after:h-44 after:-rotate-[60deg] after:-top-full after:-left-[90%]",
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
            figureClasses: "bottom-[5rem] right-1/2 w-28 h-28  before:w-36 before:h-36",
            imageClasses: "w-14 h-14",
            activeOnIndex: [0],
            icon: "/assets/svg/general/tensiometer.svg",
        },
        {
            figureClasses: "bottom-[6rem] right-[26%] w-20 h-20 before:w-28 before:h-28 2xl:right-[32%]",
            imageClasses: "w-12 h-12",
            activeOnIndex: [0],
            icon: "/assets/svg/general/tensiometer.svg",
        },
        {
            figureClasses: "bottom-[6rem] right-[10%] w-16 h-16 before:w-[5.5rem] before:h-[5.5rem] 2xl:right-[20%]",
            imageClasses: "w-10 h-10",
            activeOnIndex: [0],
            icon: "/assets/svg/general/tensiometer.svg",
        },
    ];

    return (
        <div>
            {icons.map((icon, key) => (
                <figure
                    key={key}
                    aria-hidden="true"
                    className={`absolute rounded-full flex items-center justify-center before:bg-white/30 before:absolute before:-z-10 before:rounded-full after:border-l-[6px] after:border-l-white after:border-dotted
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
