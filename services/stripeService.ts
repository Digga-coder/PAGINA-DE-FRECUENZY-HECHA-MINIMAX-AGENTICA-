
import { PurchaseSelection } from '../types';

export const createCheckoutSession = async (selection: PurchaseSelection): Promise<{ url?: string; error?: string }> => {
    try {
        const response = await fetch('https://hvszfjmnqukpdlmbwnzc.supabase.co/functions/v1/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
