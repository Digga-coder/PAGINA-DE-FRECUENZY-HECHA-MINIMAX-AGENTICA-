import React, { useState } from 'react';
import VideoModal from './VideoModal';
import PurchaseModal from './PurchaseModal';
import EventDetailModal from './EventDetailModal';

const eventsData = [
    { date: '29 NOV 2025', price: '', soldOut: false, comingSoon: false },
    { date: 'DIC 2025', price: 'TBA', soldOut: false, comingSoon: true },
    { date: 'DIC 2025', price: 'TBA', soldOut: false, comingSoon: true },
    { date: 'ENE 2026', price: 'TBA', soldOut: false, comingSoon: true },
    { date: 'ENE 2026', price: 'TBA', soldOut: false, comingSoon: true },
    { date: 'FEB 2026', price: 'TBA', soldOut: false, comingSoon: true },
];

const Events: React.FC = () => {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [modalVideoSrc, setModalVideoSrc] = useState('');
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false);

    const openVideoModal = (videoSrc: string) => {
        setModalVideoSrc(videoSrc);
        setIsVideoModalOpen(true);
    };

    const closeVideoModal = () => setIsVideoModalOpen(false);
    const openPurchaseModal = () => setIsPurchaseModalOpen(true);
    const closePurchaseModal = () => setIsPurchaseModalOpen(false);
    const openEventDetailModal = () => setIsEventDetailModalOpen(true);
    const closeEventDetailModal = () => setIsEventDetailModalOpen(false);

    return (
        <>
            <section className="bg-gray-carbon py-32 px-6 md:px-12" id="eventos">
                <h2 className="font-bebas text-6xl text-center mb-20 text-magenta-neon">PRÓXIMOS EVENTOS</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {eventsData.map((event, index) => (
                        <div key={index} className="event-card bg-black-abyss border border-gray-smoke overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-magenta-neon hover:shadow-[0_8px_32px_rgba(255,0,255,0.3)] fade-in">
                            {/* Imagen del evento - para el 29 NOV mostramos el cartel */}
                            {index === 0 ? (
                                // --- INICIO DE LA MODIFICACIÓN: Contenedor de imagen ---
                                <div className="h-52 overflow-hidden cursor-pointer bg-black" onClick={openEventDetailModal}>
                                    <img
                                        src="/events/29nov2025/cartel.jpeg"
                                        alt="Cartel Frecuenzy 29 NOV 2025"
                                        className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                // --- FIN DE LA MODIFICACIÓN ---
                            ) : (
                                <div className="h-52 bg-gradient-to-br from-gray-smoke to-black-abyss flex items-center justify-center text-magenta-neon text-7xl">
                                    ♫
                                </div>
                            )}

                            <div className="p-6">
                                <div className="text-xs text-magenta-neon font-semibold tracking-widest mb-2">{event.date}</div>
                                {event.comingSoon ? (
                                    <>
                                        <div className="text-lg text-gray-fog text-center p-5 italic">Lineup próximamente</div>
                                        <div className="font-bebas text-3xl mb-4">{event.price}</div>
                                        <button className="w-full py-3 bg-gray-smoke text-gray-fog font-semibold tracking-wider cursor-not-allowed" disabled>
                                            PRÓXIMAMENTE
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="font-bebas text-3xl mb-4">{event.price}</div>
                                        {/* Para el evento del 29 NOV mostramos dos botones */}
                                        {index === 0 ? (
                                            <div className="space-y-2">
                                                <button
                                                    className="w-full py-3 bg-purple-600 text-white-crisp font-semibold tracking-wider transition-all duration-300 hover:bg-purple-500 hover:scale-105"
                                                    onClick={openEventDetailModal}
                                                >
                                                    VER LINE UP
                                                </button>
                                                <button
                                                    className="w-full py-3 bg-magenta-neon text-white-crisp font-semibold tracking-wider transition-all duration-300 hover:bg-magenta-alt hover:scale-105"
                                                    onClick={openPurchaseModal}
                                                >
                                                    COMPRAR ENTRADAS
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className={`w-full py-3 font-semibold tracking-wider transition-all duration-300 ${event.soldOut ? 'bg-gray-smoke text-gray-fog cursor-not-allowed' : 'bg-magenta-neon text-white-crisp hover:bg-magenta-alt hover:scale-105'}`}
                                                onClick={openPurchaseModal}
                                                disabled={event.soldOut}
                                            >
                                                {event.soldOut ? 'SOLD OUT' : 'COMPRAR ENTRADAS'}
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <VideoModal isOpen={isVideoModalOpen} videoSrc={modalVideoSrc} onClose={closeVideoModal} />
            <PurchaseModal isOpen={isPurchaseModalOpen} onClose={closePurchaseModal} />
            <EventDetailModal
                isOpen={isEventDetailModalOpen}
                onClose={closeEventDetailModal}
                onBuyTickets={openPurchaseModal}
            />
        </>
    );
};

export default Events;
