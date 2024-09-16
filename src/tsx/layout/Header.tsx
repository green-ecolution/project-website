import { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import MainNavigation from '../components/navigation/MainNavigation';
import logoAnimation from '../../json/logoAnimation.json'

function Header() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    function toggleNavigation(state: boolean) {
        setOpen(state);
    }

    useEffect(() => {
        function handleResize() {
            if (window.matchMedia('(min-width: 1024px)').matches) {
                setOpen(false);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => { window.removeEventListener('resize', handleResize) };
    }, []);

    useEffect(() => {
        open
        ? document.body.classList.add('overflow-hidden')
        : document.body.classList.remove('overflow-hidden');

        return () => { document.body.classList.remove('overflow-hidden') };
    }, [open]);

    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
          scrollTop > 50 ? setIsScrolled(true) : setIsScrolled(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed w-screen inset-x-0 top-0 z-50 transition-all ease-in-out duration-300 before:w-screen before:transition-all before:ease-in-out before:duration-300 before:h-screen before:absolute before:bg-grey-900 before:-z-10 lg:before:transition-none
            ${open ? 'before:visible before:opacity-60' : 'before:opacity-0 before:invisible'}
            ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`
        }>
            <div className="relative px-4 py-5 max-w-screen-lg mx-auto flex justify-between items-center md:px-6 xl:max-w-screen-xl">
                <a href="/" aria-label="Zur Startseite navigieren" className={`flex items-center gap-x-4 xl:gap-x-5 ${open ? 'opacity-0' : ''}`}>
                    <figure className="w-24 xl:w-28">
                        <Lottie animationData={logoAnimation} />
                    </figure>
                    <p className="hidden text-green-dark-900 font-lato font-semibold text-xl md:block xl:text-2xl">
                        Green Ecolution
                    </p>
                </a>

                <button
                    id="main-navigation-toggle"
                    aria-expanded={open}
                    aria-controls="main-navigation"
                    aria-haspopup="menu"
                    aria-label="Hauptnavigation öffnen"
                    className="relative w-10 h-10 p-2 z-50 group lg:hidden"
                    onClick={() => toggleNavigation(!open)}
                >
                    <span className={`block w-6 h-0.5 transition-all ease-in-out duration-300 ${open ? 'bg-white rotate-45 absolute' : 'bg-grey-900 mb-1'}`}></span>
                    <span className={`block w-6 h-0.5 transition-all ease-in-out duration-300 ${open ? 'bg-white -rotate-45 absolute' : 'bg-grey-900 mb-1'}`}></span>
                </button>

                <MainNavigation isOpen={open} onClose={() => toggleNavigation(false)}/>
            </div>
        </header>
    );
}

export default Header;
