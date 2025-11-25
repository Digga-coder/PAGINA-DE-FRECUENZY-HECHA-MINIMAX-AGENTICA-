import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const attemptPlay = () => {
            // Configuración crítica para iOS y Android
            video.muted = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');

            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => console.log('Video reproduciendo'))
                    .catch(error => {
                        console.log('Reintentando autoplay...', error);
                        setTimeout(() => video.play().catch(() => {}), 100);
                    });
            }
        };

        if (video.readyState >= 3) {
            attemptPlay();
        } else {
            video.addEventListener('canplay', attemptPlay, { once: true });
        }
        
        // Forzar reproducción al primer toque (solución para móviles estrictos)
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
        // CAMBIO: Usamos min-h para asegurar que cubra la pantalla pero permita scroll si es necesario
        <section className="relative w-full h-[calc(100vh-72px)] min-h-[500px] flex items-center justify-center overflow-hidden bg-black-abyss">
            
            {/* VIDEO DE FONDO */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                x-webkit-airplay="deny"
            >
                {/* Ruta correcta del video */}
                <source src="/events/29nov2025/hero-background.mp4" type="video/mp4" />
            </video>
            
            {/* CONTENIDO PRINCIPAL */}
            <div className="relative z-20 text-center max-w-7xl px-6 flex flex-col items-center justify-center w-full">
                
                <div className="mb-8 animate-pulse flex justify-center w-full">
                    {/* TRUCO DEFINITIVO PARA LA CAJA NEGRA:
                       - mix-blend-screen: Hace transparente lo negro.
                       - contrast-125 brightness-110: Aumenta el contraste para que el gris oscuro del fondo se convierta en negro puro y desaparezca totalmente.
                    */}
                    <img 
                        src="/events/29nov2025/logo-frecuenzy-hero.webp?v=final5" 
                        alt="FRECUENZY Logo" 
                        loading="eager"
                        className="w-[280px] md:w-[600px] h-auto object-contain mix-blend-screen contrast-125 brightness-110 drop-shadow-[0_0_25px_rgba(255,0,255,0.4)]"
                    />
                </div>

                <h1 className="font-bebas text-5xl md:text-7xl mb-6 animate-glitchIn drop-shadow-lg text-white-crisp mix-blend-screen">
                    NO SEGUIMOS MODAS. LAS CREAMOS.
                </h1>
                
                <p className="text-lg text-gray-fog font-medium mb-12 drop-shadow-md bg-black/40 inline-block px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
                    El epicentro de la cultura electrónica de vanguardia
                </p>
                
                <a href="#eventos" onClick={handleScrollTo} className="inline-block py-4 px-12 bg-magenta-neon text-white-crisp text-sm font-semibold no-underline uppercase tracking-widest border-none cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,255,0.5)]">
                    VER PRÓXIMOS EVENTOS
                </a>
            </div>
            
            {/* Indicador de scroll sutil */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-t from-magenta-neon to-transparent animate-scrollPulse z-20"></div>
        </section>
    );
};

export default Hero;
