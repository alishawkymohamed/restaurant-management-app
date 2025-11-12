import { Injectable, NgZone } from '@angular/core';
import { MenuItem } from '../models/menu-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
    private items: MenuItem[] = [
        {
            id: 1,
            title: 'Grilled Salmon',
            description: 'Served with crisp asparagus and a zesty lemon-dill sauce.',
            longDescription: 'A delicious roll filled with fresh, spicy salmon, crisp cucumber, and avocado, wrapped in seasoned rice and nori. Topped with a drizzle of spicy mayo and sesame seeds for an extra kick.',
            price: 24.0,
            category: 'main',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBvy9baOkWqaMYy1x68ZfrJ6jnMC387FVXQuEzthD1Pa13nqNTSYnvyeny1lbvR1J1h5BSeZp8MjK5A7QiJuUROjUoWtKdJcy3GiLe0QmZwiwZwyYqsVMkIcMKTLudFAcQOOySjn2-kTnbg-WhYWzCJP2GgqaCdHHh64NPHGnvXl1NXPPCv4VlvwVPW5JenA_2G4shUrmT-PVKILVlgXJi8-XO0WMCdpD_NU49FRWo88rn1mkIq5VQMlyDQYwSesP_CGu7j_vT94xro',
            alt: 'Grilled Salmon',
            ingredients: 'Fresh Salmon, Rice, Cucumber, Avocado, Nori, Spicy Mayo, Sesame Seeds, Wasabi, Pickled Ginger.',
            allergies: 'Contains: Fish, Sesame. May contain traces of shellfish.',
            nutritionalInfo: 'Approx. 350 Calories per roll. Detailed nutritional information available upon request.'
        },
        {
            id: 2,
            title: 'Margherita Pizza',
            description: 'Fresh mozzarella, San Marzano tomatoes, and fragrant basil.',
            longDescription: 'Classic Italian pizza with fresh mozzarella, San Marzano tomatoes, fragrant basil, olive oil, and a crispy thin crust. A timeless favorite that celebrates simplicity and quality ingredients.',
            price: 18.0,
            category: 'main',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAgheHJVnM2nR7-nQztI-amkdwHhkCq8xqMmONhPe3yM4n6efitWKBUILzdNfP_keKja3IVheXtJD9wE2mObJmqa4-cCIUmeWgS5ExlKw_zLjthzQDkbwIxy0yCuHtEgWn_THuVtY8Zof8soTC0TVIRY1dk3KVtx5HuwwNzd6sndxQYQE8i57YuYWHw-hqFvz3MrnWp4H6od5RqLU0nMVsCO3lF8fwL8LsDTiieOQ3FEfl9AltFcOvxojUTtYuzl-jj31X2R63XhdYN',
            alt: 'Margherita Pizza',
            ingredients: 'Mozzarella Cheese, San Marzano Tomatoes, Fresh Basil, Olive Oil, Dough, Salt, Pepper.',
            allergies: 'Contains: Gluten, Dairy.',
            nutritionalInfo: 'Approx. 280 Calories per slice. Rich in calcium and protein.'
        },
        {
            id: 3,
            title: 'Classic Burger',
            description: 'Juicy beef patty with lettuce, tomato, and our special sauce.',
            longDescription: 'A juicy beef patty topped with fresh lettuce, ripe tomato, crispy bacon, cheese, pickles, and our signature special sauce. Served on a toasted bun with a side of fries.',
            price: 16.5,
            category: 'main',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuC-3oevr0URrBAGa88jrieR2hP5YgrYqBYSP3ACwYNRpjE_QC8CE9ih97RFf0LUc9qAnumvdM8X9i2PWrKwUwVPTw6ojux1Ss-MY1xIr9_6QHfEDpMK9xQA9eITM0BWZn6EDkx7ALiVfq4r9Y1VAs10czCeLhzYN0qbVspbJa43GmEJESfFWFv2LlR2Kjxps80BDPhXTRxoNh1lqnb9Kr6zcTsWRGPCK7JQdCCQqnwmbTVLsw5ZdTfWwwwVcxzfywikWY8jpNwPGxLU',
            alt: 'Classic Burger',
            ingredients: 'Beef Patty, Lettuce, Tomato, Cheese, Bacon, Pickles, Special Sauce, Bun.',
            allergies: 'Contains: Gluten, Dairy, Soy. May contain traces of sesame.',
            nutritionalInfo: 'Approx. 450 Calories. High in protein.'
        },
        {
            id: 4,
            title: 'Spaghetti Carbonara',
            description: 'A Roman classic with egg, pecorino cheese, and crispy guanciale.',
            price: 21.5,
            category: 'main',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBbUtrL2bmag36zK-KCnPCl6Jf59Qjopk_zUVrMeiylc-0fUKlQR6jNh8StdNQgRTFWcZBdnMoQY96ejU55R4kKjeVwZYZnI5rxoZCnQ2GHQEDwAL_7Ox1pJYCwi4gElUP9nTiFWSHcLSjTGj7DJhmnrP41zzd_bgc6al_T5TqBUcWco_ZooLkIhUPQUCgPavyrWbO7tglS0FpqL6XQ1qsZrQV58ZfxD_ThHQ1zAoIqQNJA8fvAVkW54uMrPkFSclQsOaZYICDpKvVm',
            alt: 'Spaghetti Carbonara',
        },
        {
            id: 5,
            title: 'Beef Lasagna',
            description: 'Layers of fresh pasta, bolognese sauce, and béchamel.',
            price: 22.0,
            category: 'main',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuA9gDTIAdo7EWMBJnUJ32Y7phcnh_NQH2cfg5gedfl-xxjOsf482zSx5LbsWFWxguxl6ffF9SnS91b-ccqrRlwRfrg7_rQQjyHuS5N6hIFatYa3nrniSxvfiRVdKsenWAfiBrvKuFSM4lkJ-Pwd1PnYWUx2DJwuXahhJeaJK_QRH3NH10xjjRU7C2y-hiYv976FtPfBsXLDrfrjXR98VNDwR673DJrqbc1_UPrYvNrFfjN7pk9u0T-ZS-mqGXEQS4IpE1V6_GQqod0U',
            alt: 'Beef Lasagna',
        },
        {
            id: 6,
            title: 'Crispy Fried Chicken',
            description: 'Our signature recipe, perfectly seasoned and fried to perfection.',
            price: 19.0,
            category: 'main',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCYHyl73mGxtSQGXcrPdOfwyD1YZyLqtNQ1l31e9TFoZduSAkz6ulNWyzR5tM8h7JvGQ7PFrhJrlxS-J3uXUMIv06Njpps81JIzi6COcrKkWQWcN3fQTPwpX2evVtBERJ_vKR2LIV-kk36OrytBwGpteldqFjb2CbPHEDhBNuIF8TFstcn0wB4SVTCWqr1HjZA14RGu2diIq9-lOhSXMeOfRdBBRjCZwurtYLrUvLEayaUwM7PsxqaNZtLvmRYZOCkPptegpAty09ws',
            alt: 'Crispy Fried Chicken',
        },
        {
            id: 7,
            title: 'Caesar Salad',
            description: 'Crisp romaine, parmesan, and a house Caesar dressing.',
            price: 10.0,
            category: 'salads',
            image: '',
            alt: 'Caesar Salad',
        },
        {
            id: 8,
            title: 'Bruschetta',
            description: 'Grilled bread with tomatoes, garlic, and basil.',
            price: 8.0,
            category: 'starters',
            image: '',
            alt: 'Bruschetta',
        },
        {
            id: 9,
            title: 'Chocolate Lava Cake',
            description: 'Warm chocolate cake with a molten center.',
            price: 7.5,
            category: 'desserts',
            image: '',
            alt: 'Chocolate Lava Cake',
        },
        {
            id: 10,
            title: 'Fresh Lemonade',
            description: 'House-made lemonade, chilled and refreshing.',
            price: 3.5,
            category: 'drinks',
            image: '',
            alt: 'Fresh Lemonade',
        },
        {
            id: 11,
            title: 'Kids Nuggets',
            description: 'Breaded chicken nuggets served with fries.',
            price: 6.5,
            category: 'kids',
            image: '',
            alt: 'Kids Nuggets',
        },
        {
            id: 12,
            title: 'Grilled Ribs',
            description: 'Smoky grilled ribs from the open flame.',
            price: 26.0,
            category: 'grill',
            image: '',
            alt: 'Grilled Ribs',
        },
    ];

    private cart: MenuItem[] = [];
    private cartCountSubject = new BehaviorSubject<number>(0);
    cartCount$ = this.cartCountSubject.asObservable();

    constructor(private ngZone: NgZone) { }

    getMenu() {
        return this.items.slice();
    }

    getMenuItemById(id: number | string): MenuItem | undefined {
        return this.items.find(i => i.id === Number(id));
    }

    addToCart(item: MenuItem) {
        const existingItem = this.cart.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            this.cart.push({ ...item });
        }
        this.updateCartCount();
    }

    private updateCartCount(): void {
        const count = this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        this.ngZone.run(() => {
            this.cartCountSubject.next(count);
        });
    }

    getCartCount() {
        return this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }

    getCartCountObservable() {
        return this.cartCount$;
    }

    getCart() {
        return this.cart;
    }

    removeFromCart(itemId: string | number) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.updateCartCount();
    }

    clearCart() {
        this.cart = [];
        this.updateCartCount();
    }
}
