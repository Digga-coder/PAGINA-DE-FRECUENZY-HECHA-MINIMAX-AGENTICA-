import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
    // --- LÓGICA DE VIDEO ---
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const attemptPlay = () => {
            // Configuración crítica para que funcione en iPhone/Android
            video.muted = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');

            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('Video Hero reproduciendo correctamente');
                    })
                    .catch(error => {
                        console.log('Autoplay bloqueado, reintentando...', error);
                        // Reintentar forzosamente
                        setTimeout(() => video.play().catch(() => {}), 100);
                    });
            }
        };

        if (video.readyState >= 3) {
            attemptPlay();
        } else {
            video.addEventListener('canplay', attemptPlay, { once: true });
        }
        
        // Truco extra para móviles "tercos": intentar reproducir al primer toque por si acaso
        const forcePlay = () => {
            if(video.paused) video.play();
        };
        window.addEventListener('touchstart', forcePlay, { once: true });
        window.addEventListener('click', forcePlay, { once: true });

        return () => {
            video.removeEventListener('canplay', attemptPlay);
            window.removeEventListener('touchstart', forcePlay);
            window.removeEventListener('click', forcePlay);
        };
    }, []);

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* VIDEO DE FONDO */}
            <video
                ref={videoRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover pointer-events-none"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                x-webkit-airplay="deny"
            >
                {/* RUTA CORREGIDA SEGÚN TU CAPTURA DE GITHUB */}
                <source src="/events/29nov2025/hero-background.mp4" type="video/mp4" />
            </video>
            
            {/* CAPA OSCURA (OVERLAY) */}
            <div className="absolute inset-0 bg-black-abyss/60 z-10"></div>
            
            <div className="relative z-20 text-center max-w-7xl px-6">
                
                {/* LOGO IMAGEN (WEBP) */}
                <div className="mb-8 animate-pulse flex justify-center">
                    {/* RUTA CORREGIDA + TRUCO ANTI-CACHÉ (?v=final) */}
                    <img 
                        src="/events/29nov2025/logo-frecuenzy-hero.webp?v=final" 
                        alt="FRECUENZY Logo" 
                        loading="eager"
                        className="w-[280px] md:w-[600px] h-auto object-contain drop-shadow-[0_0_15px_rgba(255,0,255,0.6)]"
                    />
                </div>

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
