import * as React from 'react';
import NavItem from "../components/navigation/NavItem";


function Header() {
    const [open, setOpen] = React.useState(false);

    function toggleNavigation() {
        setOpen(!open);
    }

    React.useEffect(() => {
        open
        ? document.body.classList.add('overflow-hidden')
        : document.body.classList.remove('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [open]);

    return (
        <header className={`fixed w-screen inset-x-0 top-0 z-50 before:w-screen before:transition-all before:ease-in-out before:duration-300 before:h-screen before:absolute before:bg-grey-900 before:-z-10 ${open ? 'before:visible before:opacity-20' : 'before:opacity-0 before:invisible'}`}>
            <div className="relative px-4 py-5 max-w-screen-lg mx-auto flex justify-between items-center md:px-6 2xl:max-w-screen-xl">
                <a href="/" aria-label="Zur Startseite navigieren" className="flex items-center gap-x-4 xl:gap-x-5">
                    <img
                        src="/assets/svg/logo/logo-large-color.svg"
                        className="w-24 xl:w-28" alt="Green Ecolution Logo"/>
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
                    <span className={`block w-6 h-0.5 transition-all ease-in-out duration-300 ${open ? 'bg-white rotate-45 absolute' : 'bg-grey-900 mb-1'}`}></span>
                    <span className={`block w-6 h-0.5 transition-all ease-in-out duration-300 ${open ? 'bg-white -rotate-45 absolute' : 'bg-grey-900 mb-1'}`}></span>
                </button>

                <nav
                    id="main-navigation"
                    className={`fixed inset-y-2 w-[60vw] z-10 text-white bg-grey-900 max-w-96 rounded-tl-2xl rounded-bl-2xl transition-all ease-in-out duration-300 shadow-mainNav ${open ? 'visible block right-0' : 'invisible -right-full'}`}
                >
                    <ul className="px-4 pt-[30vh] md:px-6">
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
