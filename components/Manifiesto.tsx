import React from 'react';

const Manifiesto: React.FC = () => {
    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="manifiesto-section" id="manifiesto">
            <div className="relative h-[70vh] flex items-center justify-center overflow-hidden mb-32">
                 <video
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover pointer-events-none"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                >
                    {/* NOTE: Replace with actual video paths */}
                    <source src="/video2.mp4" type="video/mp4" />
                    <source src="/video2.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black-abyss via-black-abyss/80 to-transparent z-10"></div>
                <div className="relative z-20 text-center max-w-5xl px-6 md:px-12">
                    <h1 className="font-bebas text-5xl md:text-7xl leading-tight mb-6">AL FIN Y AL CABO, EL TECHNO ES MÁS QUE MÚSICA</h1>
                    <p className="text-2xl text-white-matte italic">Es un lenguaje. Una forma de vida. Un acto de resistencia cultural.</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <div className="mb-20 fade-in">
                    <h2 className="font-bebas text-5xl mb-8 text-magenta-neon">EL PORQUÉ</h2>
                    <p className="text-xl leading-loose text-white-matte mb-6">Frecuenzy nace de una necesidad: <span className="text-magenta-neon font-semibold">la necesidad de elevar la cultura de club</span>.</p>
                    <p className="text-xl leading-loose text-white-matte">En un mundo donde lo superficial reina, nosotros elegimos un camino diferente.</p>
                    <blockquote className="text-2xl italic text-white-crisp p-10 my-10 border-l-4 border-magenta-neon bg-magenta-neon/10">
                        "No queremos ser el club más grande. Queremos ser el mejor."
                    </blockquote>
                </div>

                <div className="mb-20 fade-in">
                    <h2 className="font-bebas text-5xl mb-8 text-magenta-neon">NUESTROS VALORES</h2>
                    <ul className="list-none p-0">
                        <li className="text-lg leading-loose text-white-matte mb-6 pl-8 relative before:content-['◉'] before:absolute before:left-0 before:text-magenta-neon before:text-xl"><strong>CALIDAD SOBRE CANTIDAD:</strong> Preferimos 300 personas que entienden la música a 3000 que solo buscan fotos.</li>
                        <li className="text-lg leading-loose text-white-matte mb-6 pl-8 relative before:content-['◉'] before:absolute before:left-0 before:text-magenta-neon before:text-xl"><strong>RESPETO ABSOLUTO:</strong> Tolerancia cero con el acoso o la discriminación.</li>
                        <li className="text-lg leading-loose text-white-matte mb-6 pl-8 relative before:content-['◉'] before:absolute before:left-0 before:text-magenta-neon before:text-xl"><strong>EXCELENCIA TÉCNICA:</strong> Invertimos en el mejor equipamiento y acústica. Sin atajos.</li>
                    </ul>
                </div>
            </div>

            <div className="text-center py-20 px-6 md:px-12 bg-gradient-to-r from-magenta-neon/10 via-black-abyss/50 to-magenta-neon/10 my-20 fade-in">
                <h2 className="font-bebas text-6xl mb-6">¿LISTO PARA EXPERIMENTARLO?</h2>
                <p className="text-lg text-white-matte mb-8">La verdadera experiencia sucede en la pista.</p>
                <a href="#eventos" onClick={handleScrollTo} className="inline-block py-4 px-12 bg-magenta-neon text-white-crisp text-sm font-semibold no-underline uppercase tracking-widest border-none cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,255,0.5)]">VER EVENTOS</a>
            </div>
        </section>
    );
};

export default Manifiesto;