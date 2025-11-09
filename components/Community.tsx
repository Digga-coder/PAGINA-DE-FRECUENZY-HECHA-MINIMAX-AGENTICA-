
import React from 'react';

const Community: React.FC = () => {
    return (
        <section className="py-32 px-6 md:px-12 bg-gray-carbon fade-in" id="comunidad">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                <div className="community-text">
                    <h2 className="font-bebas text-6xl mb-8">FORMA PARTE DE LA FAMILIA</h2>
                    <p className="text-xl leading-loose text-white-matte mb-8">
                        Frecuenzy es más que un club. Es una comunidad de melómanos que entienden que la música electrónica es un lenguaje universal.
                    </p>
                    <ul className="list-none mb-12 space-y-4">
                        <li className="text-lg text-white-matte pl-8 relative before:content-['✓'] before:absolute before:left-0 before:text-magenta-neon before:font-bold">Acceso prioritario a eventos</li>
                        <li className="text-lg text-white-matte pl-8 relative before:content-['✓'] before:absolute before:left-0 before:text-magenta-neon before:font-bold">Masterclasses con artistas internacionales</li>
                        <li className="text-lg text-white-matte pl-8 relative before:content-['✓'] before:absolute before:left-0 before:text-magenta-neon before:font-bold">Contenido exclusivo y cultura de club</li>
                    </ul>
                    <a href="#" className="inline-block py-4 px-12 bg-magenta-neon text-white-crisp text-sm font-semibold no-underline uppercase tracking-widest border-none cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,255,0.5)]">
                        SOLICITAR MEMBRESÍA
                    </a>
                </div>
                <div className="hidden md:block text-center text-[200px] text-magenta-neon opacity-30">
                    <span>◉</span>
                </div>
            </div>
        </section>
    );
};

export default Community;
