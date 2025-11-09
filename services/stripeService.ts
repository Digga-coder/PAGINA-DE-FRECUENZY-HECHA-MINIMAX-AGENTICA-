import { PurchaseSelection } from '../types';

// Configuración de Supabase
const SUPABASE_URL = 'https://hvszfjmnqukpdlmbwnzc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2c3pmam1ucXVrcGRsbWJ3bnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODgxNTIsImV4cCI6MjA3ODI2NDE1Mn0.J9nD-55CNpdwmSrS5S6AoDgG1YG97QB1PvBFgPhCFqU';

export const createCheckoutSession = async (selection: PurchaseSelection): Promise<{ url?: string; error?: string }> => {
    try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify(selection),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create checkout session.');
        }

        const session = await response.json();
        return { url: session.url };

    } catch (error) {
        console.error('Stripe checkout error:', error);
        return { error: error instanceof Error ? error.message : 'An unknown error occurred.' };
    }
};
