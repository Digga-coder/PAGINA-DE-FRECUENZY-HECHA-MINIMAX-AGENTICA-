import React, { useState, useEffect, useRef } from 'react';

const Header: React.FC = () => {
    const [hidden, setHidden] = useState(false);
    const lastScroll = useRef(0);
    const scrollTimeout = useRef<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollTimeout.current) return;

            scrollTimeout.current = window.setTimeout(() => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > lastScroll.current && currentScroll > 100) {
                    setHidden(true);
                } else {
                    setHidden(false);
                }

                lastScroll.current = currentScroll;
                scrollTimeout.current = null;
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, []);

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <header className={`fixed top-0 left-0 right-0 z-50 p-6 px-6 md:px-12 bg-black-abyss/80 backdrop-blur-md transition-transform duration-300 ease-in-out ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
            <nav className="flex justify-between items-center max-w-[1400px] mx-auto">
                <a href="#" onClick={handleScrollToTop} className="text-3xl font-bebas text-magenta-neon tracking-widest no-underline">FRECUENZY</a>
                <ul className="hidden md:flex gap-10 list-none">
                    <li><a href="#eventos" onClick={(e) => handleScrollTo(e, 'eventos')} className="text-white-matte no-underline text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Eventos</a></li>
                    <li><a href="#manifiesto" onClick={(e) => handleScrollTo(e, 'manifiesto')} className="text-white-matte no-underline text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Manifiesto</a></li>
                    <li><a href="#comunidad" onClick={(e) => handleScrollTo(e, 'comunidad')} className="text-white-matte no-underline text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Comunidad</a></li>
                    <li><a href="#contacto" onClick={(e) => handleScrollTo(e, 'contacto')} className="text-white-matte no-underline text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Contacto</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;