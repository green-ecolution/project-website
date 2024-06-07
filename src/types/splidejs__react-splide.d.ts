declare module '@splidejs/react-splide' {
    import { ComponentType, ReactNode } from 'react';

    interface SplideOptions {
        type?: 'slide' | 'loop' | 'fade';
        rewind?: boolean;
        speed?: number;
        perPage?: number;
        perMove?: number;
        gap?: string;
        arrows?: boolean;
        pagination?: boolean;
        autoplay?: boolean;
        interval?: number;
        pauseOnHover?: boolean;
        pauseOnFocus?: boolean;
        resetProgress?: boolean;
        keyboard?: boolean | 'global';
        drag?: boolean;
        direction?: 'ltr' | 'rtl' | 'ttb';
        width?: string;
        height?: string;
        fixedWidth?: string;
        fixedHeight?: string;
        autoWidth?: boolean;
        autoHeight?: boolean;
        start?: number;
        focus?: number | 'center';
        cloneStatus?: boolean;
        clones?: number;
        mediaQuery?: string;
        destroy?: boolean;
        breakpoints?: {
            [key: string]: SplideOptions;
        };
        classes?: {
            root?: string;
            slider?: string;
            track?: string;
            list?: string;
            slide?: string;
            container?: string;
            arrows?: string;
            arrow?: string;
            prev?: string;
            next?: string;
            pagination?: string;
            page?: string;
            clone?: string;
        };
        i18n?: {
            prev?: string;
            next?: string;
            first?: string;
            last?: string;
            slideX?: string;
            pageX?: string;
            carousel?: string;
            select?: string;
            slide?: string;
            slideLabel?: string;
        };
    }

    interface SplideProps {
        options?: SplideOptions;
        hasTrack?: boolean;
        tag?: string;
        id?: string;
        className?: string;
        style?: React.CSSProperties;
        children?: ReactNode;
    }

    interface SplideSlideProps {
        className?: string;
        style?: React.CSSProperties;
        children?: ReactNode;
    }

    export const Splide: ComponentType<SplideProps>;
    export const SplideSlide: ComponentType<SplideSlideProps>;
}
