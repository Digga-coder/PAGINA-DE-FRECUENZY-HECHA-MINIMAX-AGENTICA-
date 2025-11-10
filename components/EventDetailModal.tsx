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
        bio: "Con más de dos décadas de trayectoria tras los platos, Scrapman es un DJ que representa la esencia más pura y atemporal del techno. Su historia comienza bajo el alias DJ Chatarri, un apodo familiar que años más tarde evolucionó a Scrapman —una traducción natural y más internacional de "chatarrero"—, nombre con el que ha consolidado su identidad dentro de la escena.\n\nDesde sus inicios en el formato vinilo, Scrapman ha desarrollado un estilo característico donde la energía del techno clásico se funde con los ritmos tribales que hoy marcan el sonido hardgroove. Su técnica, precisión y capacidad para leer la pista lo han convertido en un referente para quienes buscan sesiones con alma, contundencia y una narrativa perfectamente hilada.\n\nEn la actualidad, Scrapman se prepara para una nueva etapa como residente de la sala Frecuenzy, un espacio que nace como punto de encuentro para los amantes del techno más auténtico y que promete convertirse en uno de los proyectos más sólidos del panorama electrónico.\n\nCon un profundo respeto por la cultura del vinilo y una versatilidad que domina tanto los platos analógicos como los CDJs, Scrapman continúa fiel a una filosofía: mantener viva la esencia del techno y transmitirla con la misma pasión que cuando empezó."
    },
    {
        name: "MARK BROOM",
        image: "/events/29nov2025/broom.png",
        bio: "Available for techno DJ, LIVE and hybrid sets; as well as house & disco DJ sets. A truly prolific artist, Mark Broom has a myriad of production credits to his name having worked with world renowned labels such as Blueprint Records, Rekids, M-plant, EPM, Cocoon, Bpitch Control, Warp Records and the legendary Ifach with Baby Ford.\n\nIt all started in the summer of '89 when he landed in Tenerife on vacation and stumbled across the delights of the emerging sounds of Chicago and Acid House. Returning to the UK, he immediately went in search of this new found music, a pair of turntables were bought and with it a musical career was born. He has also had the pleasure of reworking material from artists such as Robert Hood, Floorplan, Alan Fitzpatrick and Gary Beck."
    },
    {
        name: "MARK WILLIAMS",
        image: "/events/29nov2025/willi.png",
        bio: "Mark Williams is a veteran that has paid his dues over more than two decades on the scene as a DJ and producer. Since the 80s, when he started his career at UK hot spots like the Ministry of Sound and Final Frontier, he has been laying the groundwork for his future success.\n\nHis production work has also gained him acclaim the world over and he has released a staggering catalogue of quality tracks on some of the most respected techno labels in the world including: Tortured, Dark House, Pure Plastic, Phont, Primate, and Carl Cox's Ultimate Trax imprint, to name a few.\n\nIn addition to releasing on other labels, Mark also has his own imprints: Artificial Vinyl, Real Sessions, Macumba and Real Vinyl. Mark has also gained worldwide recognition with his skillful and distinctive DJing style. Mixing tribal, tech house and techno on three decks and CDJs, his rocking performances have helped him to develop a strong fan base and facilitated gigs in places like Spain, Turkey, Slovenia, Japan, Brazil, Colombia, Macedonia, and Sweden."
    },
    {
        name: "PXT",
        image: "/events/29nov2025/pxt.JPEG",
        bio: "DJ residente de Frecuenzy, PXT aporta su talento y energía al lineup de este evento especial. Con un estilo que fusiona lo mejor del techno contemporáneo, PXT se encarga de crear la atmósfera perfecta para una noche inolvidable."
    }
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
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
            <div className="relative bg-gray-carbon border-2 border-magenta-neon shadow-[0_0_50px_rgba(255,0,255,0.5)] max-w-6xl w-full my-8 rounded-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Botón cerrar */}
                <button
                    className="absolute top-4 right-4 bg-magenta-neon text-white w-10 h-10 rounded-full text-2xl z-10 flex items-center justify-center transition-transform hover:scale-110"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div className="p-6 md:p-10">
                    {/* Título del evento */}
                    <h1 className="font-bebas text-4xl md:text-6xl text-center mb-8 bg-gradient-to-r from-magenta-neon to-purple-500 text-transparent bg-clip-text">
                        FRECUENZY 29 NOV 2025
                    </h1>

                    {/* Cartel del evento */}
                    <div className="mb-10 flex justify-center">
                        <img
                            src="/events/29nov2025/cartel.jpeg"
                            alt="Cartel Frecuenzy 29 NOV 2025"
                            className="w-full max-w-2xl rounded-lg border-2 border-magenta-neon shadow-[0_0_30px_rgba(255,0,255,0.3)]"
                        />
                    </div>

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
                        <p className="text-magenta-neon mt-3 text-lg">Desde 25€</p>
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
