import React, { useState, useEffect, useRef } from 'react';

const Header: React.FC = () => {
    const [hidden, setHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScroll = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;

            // Lógica para ocultar header en scroll
            if (currentScroll > lastScroll.current && currentScroll > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            lastScroll.current = currentScroll;
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Se ejecuta solo al montar

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false); // Cierra el menú
    };

    const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMobileMenuOpen(false); // Cierra el menú
    };


    return (
        // --- CAMBIO: p-4 (más corto) y bg-black-abyss (sólido) ---
        <header className={`
            fixed top-0 left-0 right-0 z-50 p-4 px-6 md:px-12 
            bg-black-abyss
            transition-transform duration-300 ease-in-out 
            ${hidden ? '-translate-y-full' : 'translate-y-0'}
        `}>
            <nav className="flex justify-between items-center max-w-[1400px] mx-auto">
                
                <a href="#" onClick={handleScrollToTop} className="no-underline z-20">
                    <img 
                        src="/logo-header.svg" 
                        alt="FRECUENZY Logo" 
                        // --- CAMBIO: h-10 (40px) ---
                        className="h-10 w-auto" 
                    />
                </a>

                {/* Botón de menú móvil */}
                <button 
                    className="md:hidden text-white-crisp text-4xl z-20" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Abrir menú"
                >
                    {isMobileMenuOpen ? '×' : '☰'}
                </button>
                
                {/* Menú responsive */}
                <ul className={`
                    ${isMobileMenuOpen ? 'flex' : 'hidden'} 
                    md:flex 
                    fixed md:relative top-0 left-0 w-full h-screen md:h-auto md:w-auto 
                    // --- CAMBIO: bg-black-abyss (sólido) ---
                    bg-black-abyss md:bg-transparent 
                    flex-col md:flex-row items-center justify-center md:justify-start 
                    gap-10 list-none z-10
                `}>
                    <li><a href="#eventos" onClick={(e) => handleScrollTo(e, 'eventos')} className="text-white-matte no-underline text-2xl md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Eventos</a></li>
                    <li><a href="#manifiesto" onClick={(e) => handleScrollTo(e, 'manifiesto')} className="text-white-matte no-underline text-2xl md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Manifiesto</a></li>
                    <li><a href="#comunidad" onClick={(e) => handleScrollTo(e, 'comunidad')} className="text-white-matte no-underline text-2xl md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Comunidad</a></li>
                    <li><a href="#contacto" onClick={(e) => handleScrollTo(e, 'contacto')} className="text-white-matte no-underline text-2xl md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Contacto</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
