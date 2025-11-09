
import React from 'react';

const experiences = [
    {
        icon: '◉',
        keyword: 'INMERSIVA',
        description: 'Un viaje sonoro que trasciende lo cotidiano. Cada detalle está calibrado para sumergirte en el sonido. Aquí, la música no es fondo, es el universo entero.'
    },
    {
        icon: '◈',
        keyword: 'POTENTE',
        description: 'Sistema de sonido de clase mundial. Siente cada frecuencia, desde los graves que retumban en tu pecho hasta los agudos cristalinos que cortan el aire.'
    },
    {
        icon: '◐',
        keyword: 'ACOGEDORA',
        description: 'Comunidad antes que multitud. Respeto absoluto. Un espacio donde puedes ser tú mismo, conectar con otros melómanos y sentir que has encontrado tu tribu.'
    }
];

const Experience: React.FC = () => {
    return (
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto fade-in">
            <h2 className="font-bebas text-6xl text-center mb-20 text-magenta-neon">UNA EXPERIENCIA</h2>
            <div className="grid md:grid-cols-3 gap-12 mt-16">
                {experiences.map((exp, index) => (
                    <div key={index} className="bg-gray-carbon p-12 border border-gray-smoke text-center transition-all duration-300 hover:-translate-y-2 hover:border-magenta-neon hover:shadow-[0_10px_40px_rgba(255,0,255,0.2)]">
                        <div className="text-6xl text-magenta-neon mb-6">{exp.icon}</div>
                        <h3 className="font-bebas text-4xl mb-4 text-magenta-neon">{exp.keyword}</h3>
                        <p className="text-base leading-relaxed text-white-matte">{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
