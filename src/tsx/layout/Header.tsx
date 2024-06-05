import * as React from 'react';
import NavItem from "../components/navigation/NavItem";


function Header() {
    const [open, setOpen] = React.useState(false);

    function toggleNavigation() {
        setOpen(!open);
    }

    return (
        <header className="bg-white fixed w-screen inset-x-0 top-0">
            <div className="px-4 py-5 max-w-screen-lg mx-auto flex justify-between items-center md:px-6 2xl:max-w-screen-xl">
                <a href="/" aria-label="Zur Startseite navigieren" className="flex items-center gap-x-4 xl:gap-x-5">
                    <img
                        src="/assets/svg/logo/logo-large-color.svg"
                        className="w-18 md:w-24 xl:w-28" alt="Green Ecolution Logo"/>
                    <p className="hidden text-green-dark-900 font-lato font-semibold text-xl md:block xl:text-3xl">
                        Green Ecolution
                    </p>
                </a>

                <button
                    aria-expanded={open}
                    aria-controls="main-navigation"
                    aria-haspopup="menu"
                    aria-label="Hauptnavigation öffnen"
                    className="relative w-10 h-10 p-2 z-50 group lg:hidden"
                    onClick={toggleNavigation}
                >
                    <span className={`block w-6 h-0.5 ${open ? 'bg-white rotate-45 absolute' : 'bg-grey-900 mb-1'}`}></span>
                    <span className={`block w-6 h-0.5 ${open ? 'bg-white -rotate-45 absolute' : 'bg-grey-900 mb-1'}`}></span>
                </button>

                <nav
                    id="main-navigation"
                    className={`fixed inset-y-0 right-0 w-[60vw] h-screen text-white bg-grey-900 z-40 ${open ? 'block' : 'hidden'}`}
                >
                    <ul className="pl-4 pr-8 pt-[20vh] md:pl-6 md:pr-12">
                        <li className="mb-4">
                            <NavItem label="Das Projekt" url="/das-projekt"/>
                        </li>
                        <li>
                            <NavItem label="Kontakt" url="/kontakt"/>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
