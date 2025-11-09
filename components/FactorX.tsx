
import React from 'react';

const FactorX: React.FC = () => {
    return (
        <section className="py-32 px-6 md:px-12 text-center bg-gradient-to-b from-black-abyss via-gray-carbon to-black-abyss fade-in">
            <h2 className="font-bebas text-4xl md:text-6xl leading-tight mb-12 max-w-6xl mx-auto">
                NUESTRO <span className="text-magenta-neon">'FACTOR X'</span> ES LA <span className="text-magenta-neon">OBSESIÓN POR EL DETALLE</span>
            </h2>
            <p className="text-xl leading-loose text-white-matte max-w-4xl mx-auto mb-20">
                Desde la acústica del espacio hasta la temperatura del aire, desde la selección de artistas hasta el diseño de cada rincón. No dejamos nada al azar.
            </p>
            <div className="flex justify-center gap-12 md:gap-20 flex-wrap">
                <div className="stat">
                    <span className="block font-bebas text-7xl text-magenta-neon mb-4">100K</span>
                    <span className="block text-base text-white-matte uppercase tracking-widest">Watios de potencia</span>
                </div>
                <div className="stat">
                    <span className="block font-bebas text-7xl text-magenta-neon mb-4">360°</span>
                    <span className="block text-base text-white-matte uppercase tracking-widest">Experiencia inmersiva</span>
                </div>
                <div className="stat">
                    <span className="block font-bebas text-7xl text-magenta-neon mb-4">24/7</span>
                    <span className="block text-base text-white-matte uppercase tracking-widest">Calibración perfecta</span>
                </div>
            </div>
        </section>
    );
};

export default FactorX;
