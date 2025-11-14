import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifiesto from './components/Manifiesto';
import Experience from './components/Experience';
import Events from './components/Events';
import FactorX from './components/FactorX';
import Community from './components/Community';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

const App: React.FC = () => {
    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Header />
            {/* --- CAMBIO: Añadimos padding-top de 72px para dejar espacio al header --- */}
            <main className="pt-[72px]">
                <Hero />
                <Manifiesto />
                <Experience />
                <Events />
                <FactorX />
                <Community />
                <Newsletter />
            </main>
            <Footer />
        </>
    );
};

export default App;
