import React, { useState, useEffect, useRef } from 'react';

const Header: React.FC = () => {
    const [hidden, setHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
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

            // Lógica para fondo transparente
            if (currentScroll > 10) { // 10px de margen
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
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
        // El header se vuelve oscuro si se hace scroll O si el menú móvil está abierto
        <header className={`
            fixed top-0 left-0 right-0 z-50 p-6 px-6 md:px-12 
            transition-all duration-300 ease-in-out 
            ${hidden ? '-translate-y-full' : 'translate-y-0'}
            ${(isScrolled || isMobileMenuOpen) ? 'bg-black-abyss/80 backdrop-blur-md' : 'bg-transparent'}
        `}>
            <nav className="flex justify-between items-center max-w-[1400px] mx-auto">
                
                {/* Logo (h-12) y z-20 para estar sobre el menú */}
                <a href="#" onClick={handleScrollToTop} className="no-underline z-20">
                    <img 
                        src="/logo-header.svg" 
                        alt="FRECUENZY Logo" 
                        className="h-12 w-auto" 
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
                
                {/* --- INICIO DE LA MODIFICACIÓN --- */}
                {/* Cambiamos 'bg-black-abyss' por 'bg-black-abyss/90 backdrop-blur-lg'.
                  Esto hace que el fondo del menú abierto sea 90% opaco y desenfoque el fondo.
                */}
                <ul className={`
                    ${isMobileMenuOpen ? 'flex' : 'hidden'} 
                    md:flex 
                    fixed md:relative top-0 left-0 w-full h-screen md:h-auto md:w-auto 
                    bg-black-abyss/90 backdrop-blur-lg md:bg-transparent md:backdrop-blur-none
                    flex-col md:flex-row items-center justify-center md:justify-start 
                    gap-10 list-none z-10
                `}>
                {/* --- FIN DE LA MODIFICACIÓN --- */}
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
