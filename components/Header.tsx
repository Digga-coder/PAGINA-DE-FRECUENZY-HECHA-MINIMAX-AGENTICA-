import React, { useState, useEffect, useRef } from 'react';

const Header: React.FC = () => {
    const [hidden, setHidden] = useState(false);
    // --- INICIO DE CAMBIOS ---
    // 1. Añadimos estado para el menú móvil
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // --- FIN DE CAMBIOS ---
    
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

    // --- INICIO DE CAMBIOS ---
    // 2. Modificamos los handlers para que cierren el menú al hacer clic
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
    // --- FIN DE CAMBIOS ---


    return (
        <header className={`fixed top-0 left-0 right-0 z-50 p-6 px-6 md:px-12 bg-black-abyss/80 backdrop-blur-md transition-transform duration-300 ease-in-out ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
            <nav className="flex justify-between items-center max-w-[1400px] mx-auto">
                
                {/* --- INICIO DE CAMBIOS: Logo --- */}
                {/* 3. Logo más grande (h-12) y con z-20 para estar sobre el menú */}
                <a href="#" onClick={handleScrollToTop} className="no-underline z-20">
                    <img 
                        src="/logo-header.svg" 
                        alt="FRECUENZY Logo" 
                        className="h-12 w-auto" // TAMAÑO AUMENTADO
                    />
                </a>
                {/* --- FIN DE CAMBIOS --- */}

                {/* --- INICIO DE CAMBIOS: Botón Hamburguesa --- */}
                {/* 4. Botón de menú móvil (solo visible en < md) */}
                <button 
                    className="md:hidden text-white-crisp text-4xl z-20" // Hecho más grande
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Abrir menú"
                >
                    {isMobileMenuOpen ? '×' : '☰'}
                </button>
                {/* --- FIN DE CAMBIOS --- */}
                
                {/* --- INICIO DE CAMBIOS: Lista de enlaces --- */}
                {/* 5. Modificamos las clases para que sea un menú responsive */}
                <ul className={`
                    ${isMobileMenuOpen ? 'flex' : 'hidden'} 
                    md:flex 
                    fixed md:relative top-0 left-0 w-full h-screen md:h-auto md:w-auto 
                    bg-black-abyss md:bg-transparent 
                    flex-col md:flex-row items-center justify-center md:justify-start 
                    gap-10 list-none z-10
                `}>
                    <li><a href="#eventos" onClick={(e) => handleScrollTo(e, 'eventos')} className="text-white-matte no-underline text-2xl md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Eventos</a></li>
                    <li><a href="#manifiesto" onClick={(e) => handleScrollTo(e, 'manifiesto')} className="text-white-matte no-underline text-2xl md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Manifiesto</a></li>
                    <li><a href="#comunidad" onClick={(e) => handleScrollTo(e, 'comunidad')} className="text-white-matte no-underline text-2xl md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Comunidad</a></li>
                    <li><a href="#contacto" onClick={(e) => handleScrollTo(e, 'contacto')} className="text-white-matte no-underline text-2xl md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-magenta-neon">Contacto</a></li>
                </ul>
                {/* --- FIN DE CAMBIOS --- */}
            </nav>
        </header>
    );
};

export default Header;
