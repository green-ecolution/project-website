import * as React from 'react';
import NavItem from './NavItem';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface MainNavigationProps {
    isOpen: boolean;
    onClose: () => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ isOpen, onClose }) => {

    const ref = useOutsideClick(() => {
        if (event.target !== document.getElementById('main-navigation-toggle')) {
            onClose();
        }
    });

    return (
        <nav
            id="main-navigation"
            ref={ref}
            aria-label="Hauptnavigation"
            className={`fixed inset-y-2 px-4 w-[60vw] z-10 bg-grey-900 max-w-96 rounded-tl-2xl rounded-bl-2xl transition-all ease-in-out duration-300 shadow-mainNav md:px-6 lg:visible lg:relative lg:block lg:right-auto lg:bg-transparent lg:shadow-none lg:transition-none lg:w-auto ${isOpen ? 'visible block right-0' : 'invisible -right-full'}`}
        >
            <p className="pt-[20vh] text-white/80 mb-6 md:text-lg lg:hidden">Hauptnavigation</p>
            <ul className="text-white lg:text-grey-900 lg:flex lg:gap-x-10 lg:justify-end lg:items-center">
                <NavItem label="Das Projekt" url="/das-projekt"/>
                <NavItem label="Kontakt" url="/kontakt"/>
                <NavItem label="GitHub" url="https://github.com/SmartCityFlensburg" isExternalLink/>
            </ul>

            <ul className="absolute bottom-6 text-white lg:text-grey-900 flex felx-wrap gap-x-5 items-center text-sm md:bottom-10 md:text-base lg:hidden">
                <li>
                    <a href="https://hs-flensburg.de/impressum" target="_blank" className="transition-color ease-in-out duration-300 hover:opacity-75">
                        Impressum
                    </a>
                </li>
                <li>
                    <a href="https://hs-flensburg.de/datenschutzerklaerung" target="_blank" className="transition-color ease-in-out duration-300 hover:opacity-75">
                        Datenschutz
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default MainNavigation;
