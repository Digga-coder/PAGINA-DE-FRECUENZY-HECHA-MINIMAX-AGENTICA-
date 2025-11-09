
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-20 px-6 md:px-12 text-center border-t border-gray-smoke" id="contacto">
            <div className="flex justify-center gap-8 mb-8">
                <a href="#" className="text-white-matte no-underline text-lg font-semibold transition-colors duration-300 hover:text-magenta-neon">IG</a>
                <a href="#" className="text-white-matte no-underline text-lg font-semibold transition-colors duration-300 hover:text-magenta-neon">FB</a>
                <a href="#" className="text-white-matte no-underline text-lg font-semibold transition-colors duration-300 hover:text-magenta-neon">TW</a>
                <a href="#" className="text-white-matte no-underline text-lg font-semibold transition-colors duration-300 hover:text-magenta-neon">SC</a>
            </div>
            <p className="text-gray-fog text-sm">
                © 2025 FRECUENZY. El epicentro de la cultura electrónica.
            </p>
        </footer>
    );
};

export default Footer;
