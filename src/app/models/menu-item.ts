export interface MenuItem {
    id: string | number;
    categoryId: string | number;
    title: string;
    description: string;
    longDescription?: string;
    price: number;
    image?: string;
    alt?: string;
    quantity?: number;
    ingredients?: string;
    allergies?: string;
    nutritionalInfo?: string;
}
