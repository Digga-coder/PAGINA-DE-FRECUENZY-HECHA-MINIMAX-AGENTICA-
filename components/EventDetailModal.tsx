import React, { useEffect } from 'react';

interface EventDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBuyTickets: () => void;
}

interface DJ {
    name: string;
    image: string;
    bio: string;
}

const djs: DJ[] = [
    {
        name: "SCRAPMAN",
        image: "/events/29nov2025/srapman.JPG",
        bio: "Con más de dos décadas de trayectoria tras los platos, Scrapman es un DJ que representa la esencia más pura y atemporal del techno. Su historia comienza bajo el alias DJ Chatarri, un apodo familiar que años más tarde evolucionó a Scrapman —una traducción natural y más internacional de \"chatarrero\"—, nombre con el que ha consolidado su identidad dentro de la escena.\n\nDesde sus inicios en el formato vinilo, Scrapman ha desarrollado un estilo característico donde la energía del techno clásico se funde con los ritmos tribales que hoy marcan el sonido hardgroove. Su técnica, precisión y capacidad para leer la pista lo han convertido en un referente para quienes buscan sesiones con alma, contundencia y una narrativa perfectamente hilada.\n\nEn la actualidad, Scrapman se prepara para una nueva etapa como residente de la sala Frecuenzy, un espacio que nace como punto de encuentro para los amantes del techno más auténtico y que promete convertirse en uno de los proyectos más sólidos del panorama electrónico.\n\nCon un profundo respeto por la cultura del vinilo y una versatilidad que domina tanto los platos analógicos como los CDJs, Scrapman continúa fiel a una filosofía: mantener viva la esencia del techno y transmitirla con la misma pasión que cuando empezó."
    },
    {
        name: "MARK BROOM",
        image: "/events/29nov2025/broom.png",
        bio: "Disponible para sets de techno DJ, LIVE e híbridos, así como sets de house y disco. Un artista verdaderamente prolífico, Mark Broom tiene una infinidad de créditos de producción a su nombre, habiendo trabajado con sellos de renombre mundial como Blueprint Records, Rekids, M-plant, EPM, Cocoon, Bpitch Control, Warp Records y el legendario Ifach junto a Baby Ford.\n\nTodo comenzó en el verano del 89 cuando llegó a Tenerife de vacaciones y se topó con las delicias de los sonidos emergentes de Chicago y el Acid House. Al regresar al Reino Unido, inmediatamente se lanzó en busca de esta nueva música: compró un par de tocadiscos y con ellos nació una carrera musical. También ha tenido el placer de remezclar material de artistas como Robert Hood, Floorplan, Alan Fitzpatrick y Gary Beck."
    },
    {
        name: "MARK WILLIAMS",
        image: "/events/29nov2025/willi.png",
        bio: "Mark Williams es un veterano que ha pagado sus cuotas durante más de dos décadas en la escena como DJ y productor. Desde los años 80, cuando comenzó su carrera en lugares emblemáticos del Reino Unido como Ministry of Sound y Final Frontier, ha estado sentando las bases de su futuro éxito.\n\nSu trabajo de producción también le ha ganado reconocimiento en todo el mundo y ha lanzado un impresionante catálogo de temas de calidad en algunos de los sellos de techno más respetados del mundo, incluyendo: Tortured, Dark House, Pure Plastic, Phont, Primate y el sello Ultimate Trax de Carl Cox, por nombrar algunos.\n\nAdemás de lanzar en otros sellos, Mark también tiene sus propios sellos: Artificial Vinyl, Real Sessions, Macumba y Real Vinyl. Mark también ha ganado reconocimiento mundial con su hábil y distintivo estilo de DJ. Mezclando tribal, tech house y techno en tres platos y CDJs, sus enérgicas actuaciones le han ayudado a desarrollar una sólida base de fans y le han facilitado presentaciones en lugares como España, Turquía, Eslovenia, Japón, Brasil, Colombia, Macedonia y Suecia."
    },
    // --- INICIO DE LA MODIFICACIÓN: Biografía de PXT ---
    {
        name: "PXT",
        image: "/events/29nov2025/pxt.JPEG",
        bio: "Desde el corazón de Navarra, PxT (Nacho) se ha consolidado como una de las figuras más auténticas de la escena techno underground del norte. Con más de una década en cabina, su evolución musical refleja una conexión profunda con el sonido hipnótico, oscuro, y envolvente que define su identidad actual.\n\nInfluenciado por artistas como Oscar Mulero, Temudo, Lewis Fautzi o DVS1, PxT canaliza en cada set una energía cruda y mental que busca más que hacer bailar: pretende conectar, atrapar y hacer vibrar al oyente en un viaje sensorial donde el techno se siente, se vive y se respira.\n\nSu trayectoria le ha llevado a jugar en cabinas muy tops, en salas de referencia como Zul, Sonora o Ekho, además de ser fundador del movimiento PSYCHOSIS, una plataforma que impulsa la esencia más pura y mental del hardtechno actual.\n\nA día de hoy PxT, se va a hacer cargo de ser residente en Sala Frecuenzy, una sala nueva que viene con la idea de hacerse pionera dentro de la escena Techno, algo idóneo para los amantes del Techno, con muchas ganas, ambición y un proyecto que ilusiona.\n\nAntes de consolidar su actual alias, PxT exploró su faceta más dura bajo el nombre de Pechete, etapa en la que se sumergió en el sonido schranz y descubrió la intensidad que más tarde canalizaría hacia una expresión más introspectiva y profunda."
    }
    // --- FIN DE LA MODIFICACIÓN ---
];

const EventDetailModal: React.FC<EventDetailModalProps> = ({ isOpen, onClose, onBuyTickets }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/95 z-[9999] flex items-start md:items-center justify-center p-4 overflow-y-auto" 
            onClick={onClose}
        >
            <div className="relative bg-gray-carbon border-2 border-magenta-neon shadow-[0_0_50px_rgba(255,0,255,0.5)] max-w-6xl w-full my-8 rounded-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Botón cerrar */}
                <button
                    className="absolute top-4 right-4 bg-magenta-neon text-white w-10 h-10 rounded-full text-2xl z-10 flex items-center justify-center transition-transform hover:scale-110"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div className="p-6 md:p-10">
                    {/* Cartel del evento - PRINCIPAL Y DESTACADO */}
                    <div className="mb-10 flex justify-center">
                        <img
                            src="/events/29nov2025/cartel.jpeg"
                            alt="Cartel Frecuenzy 29 NOV 2025"
                            className="w-full max-w-4xl rounded-lg border-4 border-magenta-neon shadow-[0_0_50px_rgba(255,0,255,0.6)] hover:scale-[1.02] transition-transform duration-300"
                        />
                    </div>

                    {/* Título del evento */}
                    <h1 className="font-bebas text-4xl md:text-6xl text-center mb-8 bg-gradient-to-r from-magenta-neon to-purple-500 text-transparent bg-clip-text">
                        FRECUENZY 29 NOV 2025
                    </h1>

                    {/* Botón comprar entradas destacado */}
                    <div className="text-center mb-12">
                        <button
                            onClick={() => {
                                onClose();
                                onBuyTickets();
                            }}
                            className="py-4 px-12 bg-magenta-neon text-white-crisp font-bebas text-2xl tracking-widest rounded-lg transition-all duration-300 hover:bg-magenta-alt hover:scale-105 shadow-[0_0_20px_rgba(255,0,255,0.5)]"
                        >
                            COMPRAR ENTRADAS
                        </button>
                    </div>

                    {/* Sección DJs */}
                    <h2 className="font-bebas text-4xl text-magenta-neon text-center mb-8">
                        LINE UP
                    </h2>

                    <div className="space-y-8">
                        {djs.map((dj, index) => (
                            <div
                                key={index}
                                className="bg-black-abyss border border-gray-smoke rounded-xl p-6 hover:border-magenta-neon transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,255,0.2)]"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Foto del DJ */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src={dj.image}
                                            alt={dj.name}
                                            className="w-full md:w-48 h-48 object-cover rounded-lg border-2 border-magenta-neon"
                                        />
                                    </div>

                                    {/* Info del DJ */}
                                    <div className="flex-grow">
                                        <h3 className="font-bebas text-3xl text-magenta-neon mb-3">
                                            {dj.name}
                                        </h3>
                                        <p className="text-gray-fog text-sm md:text-base leading-relaxed whitespace-pre-line">
                                            {dj.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botón comprar entradas inferior */}
                    <div className="text-center mt-12">
                        <button
                            onClick={() => {
                                onClose();
                                onBuyTickets();
                            }}
                            className="py-4 px-12 bg-magenta-neon text-white-crisp font-bebas text-2xl tracking-widest rounded-lg transition-all duration-300 hover:bg-magenta-alt hover:scale-105 shadow-[0_0_20px_rgba(255,0,255,0.5)]"
                        >
                            COMPRAR ENTRADAS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailModal;
