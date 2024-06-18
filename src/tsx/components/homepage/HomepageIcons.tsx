interface HomepageIconsProps {
    index: number;
}

const HomepageIcons: React.FC<HomepageIconsProps> = ({ index }) => {
    const generalClasses = "absolute rounded-full flex items-center justify-center before:bg-white/30 before:absolute before:-z-10 before:rounded-full";

    return (
        <div>
            <figure
                aria-hidden="true"
                className={`top-[20%] left-[10%] w-28 h-28  before:w-36 before:h-36
                    ${generalClasses}
                    ${index == 1 ? 'bg-white before:animate-pulse' : ''}`}
            >
                <img
                    src="/assets/svg/general/wlan.svg"
                    className="object-contain w-14" alt="" />
            </figure>

            <figure
                aria-hidden="true"
                className={`top-[35%] left-[30%] w-28 h-28 before:w-36 before:h-36
                    ${generalClasses}
                    ${index == 1 || index == 2 ? 'bg-white before:animate-pulse' : ''}`}
            >
                <img
                    src="/assets/svg/general/mobile.svg"
                    className="object-contain h-12 w-12" alt="" />
            </figure>

            <figure
                aria-hidden="true"
                className={`bottom-[10rem] left-[10%] w-28 h-28 ro before:w-36 before:h-36
                    ${generalClasses}
                    ${index == 1 ? 'bg-white before:animate-pulse' : ''}`}>
                <img
                    src="/assets/svg/general/gateway.svg"
                    className="object-contain w-14" alt="" />
            </figure>

            <figure
                aria-hidden="true"
                className={`bottom-[5rem] right-1/2 w-28 h-28  before:w-36 before:h-36
                    ${generalClasses}
                    ${index == 0 ? 'bg-white before:animate-pulse' : ''}`}
            >
                <img
                    src="/assets/svg/general/tensiometer.svg"
                    className="object-contain h-14 w-14" alt="" />
            </figure>

            <figure
                aria-hidden="true"
                className={`bottom-[6rem] right-[26%] w-20 h-20 before:w-28 before:h-28 2xl:right-[32%]"
                    ${generalClasses}
                    ${index == 0 ? 'bg-white before:animate-pulse' : ''}`}
            >
                <img
                    src="/assets/svg/general/tensiometer.svg"
                    className="object-contain h-12 w-12" alt="" />
            </figure>

            <figure
                aria-hidden="true"
                className={`bottom-[6rem] right-[10%] w-16 h-16 before:w-[5.5rem] before:h-[5.5rem] 2xl:right-[20%]"
                    ${generalClasses}
                    ${index == 0 ? 'bg-white before:animate-pulse' : ''}`}
            >
                <img
                    src="/assets/svg/general/tensiometer.svg"
                    className="object-contain h-10 w-10" alt="" />
            </figure>
        </div>
    );
}

export default HomepageIcons;
