export interface MenuItem {
    id: string | number;
    title: string;
    description: string;
    longDescription?: string;
    price: number;
    image?: string;
    alt?: string;
    category?: string;
    quantity?: number;
    ingredients?: string;
    allergies?: string;
    nutritionalInfo?: string;
}
