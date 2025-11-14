import React from 'react';

const Hero: React.FC = () => {
    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        // Esta línea NUEVA añade padding en móvil (pt-20) para que no lo tape el header
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
            <video
                // Esta línea NUEVA usa 'object-contain' en móvil (se ve entero) 
                // y 'object-cover' en PC (llena la pantalla)
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain pointer-events-none md:object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                {/* Vídeo de fondo principal */}
                <source src="/hero-background.mp4" type="video/mp4" />
                {/* <source src="/hero-background.webm" type="video/webm" /> */}
            </video>
            
            <div className="absolute inset-0 bg-black-abyss/60 z-10"></div>
            
            // Esta línea NUEVA sube un poco el texto en PC (-mt-10)
            <div className="relative z-20 text-center max-w-7xl px-6 mt-0 md:-mt-10">
                
                <img 
                    src="/logo-frecuenzy-hero.svg" 
                    alt="Logo FRECUENZY" 
                    className="w-full max-w-2xl mx-auto mb-8 animate-pulse" 
                />

                <h1 className="font-bebas text-5xl md:text-7xl mb-6 animate-glitchIn">NO SEGUIMOS MODAS. LAS CREAMOS.</h1>
                <p className="text-lg text-gray-fog font-medium mb-12">El epicentro de la cultura electrónica de vanguardia</p>
                <a href="#eventos" onClick={handleScrollTo} className="inline-block py-4 px-12 bg-magenta-neon text-white-crisp text-sm font-semibold no-underline uppercase tracking-widest border-none cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,255,0.5)]">
                    VER PRÓXIMOS EVENTOS
                </a>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-t from-magenta-neon to-transparent animate-scrollPulse z-20"></div>
        </section>
    );
};

export default Hero;
