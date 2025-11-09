
export interface TicketSelection {
    general: number;
    vip: number;
}

export interface ExtrasSelection {
    [key: string]: number;
}

export interface PurchaseSelection {
    tickets: TicketSelection;
    extras: ExtrasSelection;
    emails: string[];
}
