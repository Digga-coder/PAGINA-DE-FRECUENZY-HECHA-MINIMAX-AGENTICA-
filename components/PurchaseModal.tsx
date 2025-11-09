
import React, { useState, useEffect, useMemo } from 'react';
import type { PurchaseSelection } from '../types';
import { createCheckoutSession } from '../services/stripeService';

interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TICKET_PRICE = 25;
const VIP_PRICE = 45;
const EXTRA_PRICES = {
    "burger": 15,
    "bus": 15,
    "tattoo": 50,
    "botella": 50
};
type ExtraKey = keyof typeof EXTRA_PRICES;

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
    const [tickets, setTickets] = useState({ general: 0, vip: 0 });
    const [extras, setExtras] = useState<{[K in ExtraKey]: number}>({ burger: 0, bus: 0, tattoo: 0, botella: 0 });
    const [ticketEmails, setTicketEmails] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const totalTickets = useMemo(() => tickets.general + tickets.vip, [tickets]);

    const summary = useMemo(() => {
        const ticketSubtotal = (tickets.general * TICKET_PRICE) + (tickets.vip * VIP_PRICE);

        const extrasSubtotal = Object.entries(extras).reduce((total, [key, quantity]) => {
            const price = EXTRA_PRICES[key as ExtraKey] || 0;
            return total + (price * quantity);
        }, 0);

        const extrasTypesCount = Object.values(extras).filter(q => q > 0).length;
        const discountPercentage = extrasTypesCount * 5;
        const discountAmount = extrasSubtotal * (discountPercentage / 100);
        const finalExtrasTotal = extrasSubtotal - discountAmount;
        
        const finalTotal = ticketSubtotal + finalExtrasTotal;

        return { ticketSubtotal, extrasSubtotal, discountAmount, finalTotal, extrasTypesCount, discountPercentage };
    }, [tickets, extras]);
    
    useEffect(() => {
        setTicketEmails(currentEmails => {
            const newEmails = Array(totalTickets).fill('');
            for (let i = 0; i < Math.min(totalTickets, currentEmails.length); i++) {
                newEmails[i] = currentEmails[i];
            }
            return newEmails;
        });
    }, [totalTickets]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEsc);
        } else {
            setTickets({ general: 0, vip: 0 });
            setExtras({ burger: 0, bus: 0, tattoo: 0, botella: 0 });
            setTicketEmails([]);
            setError(null);
            setIsLoading(false);
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    const handleTicketChange = (type: 'general' | 'vip', amount: number) => {
        setTickets(prev => ({ ...prev, [type]: Math.max(0, prev[type] + amount) }));
    };

    const handleExtraChange = (type: ExtraKey, amount: number) => {
        setExtras(prev => ({ ...prev, [type]: Math.max(0, prev[type] + amount) }));
    };
    
    const handleEmailChange = (index: number, value: string) => {
        const newEmails = [...ticketEmails];
        newEmails[index] = value;
        setTicketEmails(newEmails);
    };

    const handleStripePayment = async () => {
        if (totalTickets === 0) {
            setError("Por favor, selecciona al menos una entrada.");
            return;
        }

        const invalidEmails = ticketEmails.filter(email => !/^\S+@\S+\.\S+$/.test(email));
        if (invalidEmails.length > 0 || ticketEmails.some(e => e.trim() === '')) {
            setError("Por favor, introduce un email válido para cada entrada.");
            return;
        }

        setError(null);
        setIsLoading(true);

        const selection: PurchaseSelection = {
            tickets: tickets,
            extras: extras,
            emails: ticketEmails,
        };
        
        console.log("Sending to backend:", selection);
        
        setTimeout(() => {
            setIsLoading(false);
            if (Math.random() > 0.1) {
                alert("Redirigiendo a Stripe... (Simulación)");
                // const { url, error: apiError } = await createCheckoutSession(selection);
                // if (url) window.location.href = url;
                // else setError(apiError || "Error desconocido");
            } else {
                setError("No se pudo conectar con el servidor de pagos. Inténtalo de nuevo.");
            }
        }, 1500);
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/95 z-[9998] flex items-center justify-center p-5 overflow-y-auto" onClick={onClose}>
            <div className="relative bg-purchase-bg border-2 border-magenta-neon shadow-[0_0_50px_rgba(255,0,255,0.5)] max-w-4xl w-full my-auto rounded-2xl" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-4 right-4 bg-magenta-neon text-white w-10 h-10 rounded-full text-2xl z-10 flex items-center justify-center transition-transform hover:scale-110" onClick={onClose}>&times;</button>
                <div className="p-5 md:p-10 text-purchase-text">
                    <h1 className="text-3xl md:text-4xl font-bebas text-center mb-5 bg-gradient-to-r from-magenta-neon to-purple-500 text-transparent bg-clip-text">🎫 TU ENTRADA PARA FRECUENZY</h1>
                    
                    <h2 className="font-bebas text-3xl text-magenta-neon mt-10 mb-5 tracking-wider">PASO 1: Elige tus Entradas</h2>
                    <div className="flex flex-col gap-4">
                        <ItemCard label="Entrada General" description="Acceso general al evento (29 NOV 2025)" price={TICKET_PRICE} quantity={tickets.general} onIncrease={() => handleTicketChange('general', 1)} onDecrease={() => handleTicketChange('general', -1)} />
                        <ItemCard label="⭐ Entrada VIP ⭐" description="Acceso Sin Colas + Sala VIP + Copa de Bienvenida" price={VIP_PRICE} quantity={tickets.vip} onIncrease={() => handleTicketChange('vip', 1)} onDecrease={() => handleTicketChange('vip', -1)} />
                    </div>

                    {totalTickets > 0 && (
                        <>
                            <h2 className="font-bebas text-3xl text-magenta-neon mt-10 mb-5 tracking-wider">PASO 2: Datos de Asistentes</h2>
                            <div className="bg-magenta-neon/10 border-l-4 border-magenta-neon p-5 rounded-lg mb-5">
                                <p>Introduce un email para cada entrada. Aquí se enviará el ticket con el QR de acceso.</p>
                            </div>
                            <div className="space-y-4">
                                {ticketEmails.map((email, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                        <label htmlFor={`email-${index}`} className="text-purchase-gray w-full sm:w-28 shrink-0">Entrada {index + 1}:</label>
                                        <input id={`email-${index}`} type="email" placeholder="email@dominio.com" value={email} onChange={(e) => handleEmailChange(index, e.target.value)} className="w-full flex-1 py-3 px-4 bg-gray-carbon border border-gray-smoke text-white-crisp rounded-md outline-none transition-all duration-300 focus:border-magenta-neon" required />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    <h2 className="font-bebas text-3xl text-magenta-neon mt-10 mb-5 tracking-wider">PASO 3: Añade Extras</h2>
                    <div className="bg-magenta-neon/10 border-l-4 border-magenta-neon p-5 rounded-lg mb-5">
                        <h4 className="font-bold">¡NUEVO DESCUENTO!</h4>
                        <p>Obtén un <strong>5% de descuento en tus extras</strong> por CADA TIPO de extra que añadas.</p>
                        <p className="text-sm text-purchase-gray">(Ej: 2 tipos de extra = 10% Dto. sobre el total de los extras).</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(EXTRA_PRICES).map(([key, price]) => (
                             <ItemCard key={key} label={`🍔 ${key.charAt(0).toUpperCase() + key.slice(1)}`} price={price} quantity={extras[key as ExtraKey]} onIncrease={() => handleExtraChange(key as ExtraKey, 1)} onDecrease={() => handleExtraChange(key as ExtraKey, -1)} />
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-purchase-green/15 to-purchase-green/5 border-2 border-purchase-green rounded-2xl p-8 mt-10">
                        <h2 className="font-bebas text-3xl text-purchase-green mt-0 mb-5 tracking-wider">PASO 4: Tu Resumen</h2>
                        <div className="space-y-3 text-lg">
                            {summary.ticketSubtotal > 0 && <SummaryItem label="Entradas" value={`${summary.ticketSubtotal.toFixed(2)}€`} />}
                            {summary.extrasSubtotal > 0 && <SummaryItem label="Extras" value={`${summary.extrasSubtotal.toFixed(2)}€`} />}
                            {summary.discountAmount > 0 && <SummaryItem label={`Descuento Extras (${summary.discountPercentage}%)`} value={`-${summary.discountAmount.toFixed(2)}€`} className="text-purchase-pink-alt" />}
                        </div>
                        <div className="flex justify-between items-center pt-5 mt-5 border-t border-white/10">
                            <span className="text-2xl font-bebas text-purchase-green">TOTAL A PAGAR</span>
                            <span className="text-4xl font-bebas text-purchase-green">{summary.finalTotal.toFixed(2)}€</span>
                        </div>
                    </div>

                    {error && <div className="text-center text-alert-red mt-4 p-3 bg-alert-red/10 rounded">{error}</div>}

                    <div className="mt-8 text-center">
                        <button onClick={handleStripePayment} disabled={isLoading || totalTickets === 0} className="w-full md:w-auto py-4 px-12 bg-purchase-green text-black font-bebas text-2xl tracking-widest rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:scale-105">
                            {isLoading ? 'PROCESANDO...' : 'PAGAR CON STRIPE'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ItemCard: React.FC<{label: string, description?: string, price: number, quantity: number, onIncrease: () => void, onDecrease: () => void}> = ({ label, description, price, quantity, onIncrease, onDecrease }) => (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-gradient-to-br from-gray-carbon/80 to-gray-smoke/80 border-2 rounded-xl transition-all duration-200 ${quantity > 0 ? 'border-purchase-cyan' : 'border-white/20'}`}>
        <div className="flex-grow">
            <span className="font-semibold text-lg">{label}</span>
            {description && <span className="block text-sm text-purchase-gray">{description}</span>}
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
            <span className="text-xl font-bebas text-purchase-green">{price.toFixed(2)}€</span>
            <div className="flex items-center gap-3">
                <button onClick={onDecrease} disabled={quantity === 0} className="w-8 h-8 rounded-full bg-gray-smoke text-white-crisp text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-transform hover:scale-110 active:scale-95">-</button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button onClick={onIncrease} className="w-8 h-8 rounded-full bg-gray-smoke text-white-crisp text-lg transition-transform hover:scale-110 active:scale-95">+</button>
            </div>
        </div>
    </div>
);

const SummaryItem: React.FC<{label: string, value: string, className?: string}> = ({ label, value, className = '' }) => (
    <div className={`flex justify-between items-center py-2 border-b border-white/10 last:border-b-0 ${className}`}>
        <span>{label}</span>
        <span className="font-bold">{value}</span>
    </div>
);

export default PurchaseModal;
