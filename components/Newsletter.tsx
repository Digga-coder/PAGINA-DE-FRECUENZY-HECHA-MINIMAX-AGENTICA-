
import React, { useState } from 'react';

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <section className="py-32 px-6 md:px-12 text-center fade-in">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-bebas text-6xl mb-6">MANTENTE EN LA FRECUENCIA</h2>
                <p className="text-lg text-white-matte mb-12">
                    Recibe las últimas noticias, anuncios de eventos y contenido exclusivo directamente en tu inbox.
                </p>
                {!submitted ? (
                    <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="flex-1 py-4 px-6 bg-gray-carbon border border-gray-smoke text-white-crisp text-base outline-none transition-all duration-300 focus:border-magenta-neon"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="py-4 px-8 bg-magenta-neon text-white-crisp border-none text-sm font-semibold tracking-wider cursor-pointer transition-all duration-300 hover:bg-magenta-alt hover:scale-105 whitespace-nowrap">
                            SUSCRIBIRME
                        </button>
                    </form>
                ) : (
                    <div className="text-2xl text-magenta-neon font-semibold">
                        ¡Estás dentro! 🎧
                    </div>
                )}
            </div>
        </section>
    );
};

export default Newsletter;
