import { Injectable, NgZone } from '@angular/core';
import { MenuItem } from '../models/menu-item';
import { Category } from '../models/category';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
    private categories: Category[] = [
        { id: 'all', name: 'All Items', icon: 'restaurant_menu' },
        { id: 'main', name: 'Main Dishes', icon: 'lunch_dining' },
        { id: 'starters', name: 'Starters', icon: 'appetizers' },
        { id: 'salads', name: 'Salads', icon: 'green_salad' },
        { id: 'grill', name: 'Grill', icon: 'outdoor_grill' },
        { id: 'desserts', name: 'Desserts', icon: 'cake' },
        { id: 'drinks', name: 'Drinks', icon: 'local_bar' },
        { id: 'kids', name: "Kids' Menu", icon: 'child_friendly' },
    ];

    private items: MenuItem[] = [
        // Main Dishes
        {
            id: 1,
            categoryId: 'main',
            title: 'Grilled Salmon',
            description: 'Served with crisp asparagus and a zesty lemon-dill sauce.',
            longDescription: 'Premium grilled salmon fillet with herb butter, served with roasted asparagus and golden potatoes. A perfect blend of flavors.',
            price: 28.50,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvy9baOkWqaMYy1x68ZfrJ6jnMC387FVXQuEzthD1Pa13nqNTSYnvyeny1lbvR1J1h5BSeZp8MjK5A7QiJuUROjUoWtKdJcy3GiLe0QmZwiwZwyYqsVMkIcMKTLudFAcQOOySjn2-kTnbg-WhYWzCJP2GgqaCdHHh64NPHGnvXl1NXPPCv4VlvwVPW5JenA_2G4shUrmT-PVKILVlgXJi8-XO0WMCdpD_NU49FRWo88rn1mkIq5VQMlyDQYwSesP_CGu7j_vT94xro',
            alt: 'Grilled Salmon',
            ingredients: 'Fresh Salmon, Asparagus, Potatoes, Lemon, Dill, Butter.',
            allergies: 'Contains: Fish. May contain traces of shellfish.',
            nutritionalInfo: 'Approx. 420 Calories. High in Omega-3 fatty acids.'
        },
        {
            id: 2,
            categoryId: 'main',
            title: 'Margherita Pizza',
            description: 'Fresh mozzarella, San Marzano tomatoes, and fragrant basil.',
            longDescription: 'Classic Italian pizza with fresh mozzarella, San Marzano tomatoes, fragrant basil, olive oil, and a crispy thin crust.',
            price: 18.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgheHJVnM2nR7-nQztI-amkdwHhkCq8xqMmONhPe3yM4n6efitWKBUILzdNfP_keKja3IVheXtJD9wE2mObJmqa4-cCIUmeWgS5ExlKw_zLjthzQDkbwIxy0yCuHtEgWn_THuVtY8Zof8soTC0TVIRY1dk3KVtx5HuwwNzd6sndxQYQE8i57YuYWHw-hqFvz3MrnWp4H6od5RqLU0nMVsCO3lF8fwL8LsDTiieOQ3FEfl9AltFcOvxojUTtYuzl-jj31X2R63XhdYN',
            alt: 'Margherita Pizza',
            ingredients: 'Mozzarella Cheese, San Marzano Tomatoes, Fresh Basil, Olive Oil, Dough.',
            allergies: 'Contains: Gluten, Dairy.',
            nutritionalInfo: 'Approx. 280 Calories per slice.'
        },
        {
            id: 3,
            categoryId: 'main',
            title: 'Classic Burger',
            description: 'Juicy beef patty with lettuce, tomato, and our special sauce.',
            longDescription: 'A juicy beef patty topped with fresh lettuce, ripe tomato, crispy bacon, cheese, pickles, and our signature special sauce.',
            price: 16.50,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-3oevr0URrBAGa88jrieR2hP5YgrYqBYSP3ACwYNRpjE_QC8CE9ih97RFf0LUc9qAnumvdM8X9i2PWrKwUwVPTw6ojux1Ss-MY1xIr9_6QHfEDpMK9xQA9eITM0BWZn6EDkx7ALiVfq4r9Y1VAs10czCeLhzYN0qbVspbJa43GmEJESfFWFv2LlR2Kjxps80BDPhXTRxoNh1lqnb9Kr6zcTsWRGPCK7JQdCCQqnwmbTVLsw5ZdTfWwwwVcxzfywikWY8jpNwPGxLU',
            alt: 'Classic Burger',
            ingredients: 'Beef Patty, Lettuce, Tomato, Cheese, Bacon, Pickles, Special Sauce.',
            allergies: 'Contains: Gluten, Dairy, Soy.',
            nutritionalInfo: 'Approx. 450 Calories.'
        },
        {
            id: 4,
            categoryId: 'main',
            title: 'Spaghetti Carbonara',
            description: 'A Roman classic with egg, pecorino cheese, and crispy guanciale.',
            longDescription: 'Authentic Italian pasta with creamy egg sauce, pancetta, and parmesan cheese.',
            price: 21.50,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbUtrL2bmag36zK-KCnPCl6Jf59Qjopk_zUVrMeiylc-0fUKlQR6jNh8StdNQgRTFWcZBdnMoQY96ejU55R4kKjeVwZYZnI5rxoZCnQ2GHQEDwAL_7Ox1pJYCwi4gElUP9nTiFWSHcLSjTGj7DJhmnrP41zzd_bgc6al_T5TqBUcWco_ZooLkIhUPQUCgPavyrWbO7tglS0FpqL6XQ1qsZrQV58ZfxD_ThHQ1zAoIqQNJA8fvAVkW54uMrPkFSclQsOaZYICDpKvVm',
            alt: 'Spaghetti Carbonara',
            ingredients: 'Spaghetti, Eggs, Pancetta, Parmesan Cheese.',
            allergies: 'Contains: Gluten, Dairy, Eggs.',
            nutritionalInfo: 'Approx. 520 Calories.'
        },
        {
            id: 5,
            categoryId: 'main',
            title: 'Beef Lasagna',
            description: 'Layers of fresh pasta, bolognese sauce, and béchamel.',
            longDescription: 'Homemade lasagna with slow-cooked beef ragù and creamy béchamel sauce.',
            price: 22.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9gDTIAdo7EWMBJnUJ32Y7phcnh_NQH2cfg5gedfl-xxjOsf482zSx5LbsWFWxguxl6ffF9SnS91b-ccqrRlwRfrg7_rQQjyHuS5N6hIFatYa3nrniSxvfiRVdKsenWAfiBrvKuFSM4lkJ-Pwd1PnYWUx2DJwuXahhJeaJK_QRH3NH10xjjRU7C2y-hiYv976FtPfBsXLDrfrjXR98VNDwR673DJrqbc1_UPrYvNrFfjN7pk9u0T-ZS-mqGXEQS4IpE1V6_GQqod0U',
            alt: 'Beef Lasagna',
            ingredients: 'Pasta Sheets, Ground Beef, Tomato Sauce, Béchamel, Cheese.',
            allergies: 'Contains: Gluten, Dairy, Eggs.',
            nutritionalInfo: 'Approx. 480 Calories.'
        },
        {
            id: 6,
            categoryId: 'main',
            title: 'Crispy Fried Chicken',
            description: 'Our signature recipe, perfectly seasoned and fried to perfection.',
            longDescription: 'Golden crispy fried chicken thighs and drumsticks with secret spice blend.',
            price: 19.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYHyl73mGxtSQGXcrPdOfwyD1YZyLqtNQ1l31e9TFoZduSAkz6ulNWyzR5tM8h7JvGQ7PFrhJrlxS-J3uXUMIv06Njpps81JIzi6COcrKkWQWcN3fQTPwpX2evVtBERJ_vKR2LIV-kk36OrytBwGpteldqFjb2CbPHEDhBNuIF8TFstcn0wB4SVTCWqr1HjZA14RGu2diIq9-lOhSXMeOfRdBBRjCZwurtYLrUvLEayaUwM7PsxqaNZtLvmRYZOCkPptegpAty09ws',
            alt: 'Crispy Fried Chicken',
            ingredients: 'Chicken Thighs, Drumsticks, Secret Spice Blend, Oil.',
            allergies: 'Contains: Gluten. May contain traces of nuts.',
            nutritionalInfo: 'Approx. 380 Calories.'
        },
        {
            id: 13,
            categoryId: 'main',
            title: 'Thai Green Curry',
            description: 'Fragrant green curry with coconut milk and basil.',
            longDescription: 'Aromatic Thai green curry with chicken, green chilies, and fresh basil.',
            price: 20.50,
            image: '',
            alt: 'Thai Green Curry',
            ingredients: 'Chicken, Coconut Milk, Green Chilies, Basil, Garlic.',
            allergies: 'Contains: Coconut. May contain traces of shellfish.',
            nutritionalInfo: 'Approx. 380 Calories.'
        },
        {
            id: 14,
            categoryId: 'main',
            title: 'Duck Confit',
            description: 'Tender duck leg slow-cooked in its own fat.',
            longDescription: 'Traditional French duck confit served with crispy pommes Anna.',
            price: 32.00,
            image: '',
            alt: 'Duck Confit',
            ingredients: 'Duck Leg, Salt, Garlic, Thyme, Potatoes.',
            allergies: 'Contains: Gluten. May contain traces of nuts.',
            nutritionalInfo: 'Approx. 520 Calories.'
        },

        // Starters
        {
            id: 15,
            categoryId: 'starters',
            title: 'Bruschetta',
            description: 'Grilled bread with tomatoes, garlic, and basil.',
            longDescription: 'Crispy toasted bread topped with fresh tomatoes, garlic, and basil.',
            price: 8.00,
            image: '',
            alt: 'Bruschetta',
            ingredients: 'Bread, Tomatoes, Garlic, Basil, Olive Oil.',
            allergies: 'Contains: Gluten.',
            nutritionalInfo: 'Approx. 120 Calories.'
        },
        {
            id: 16,
            categoryId: 'starters',
            title: 'Calamari Fritti',
            description: 'Crispy fried squid rings with lemon aioli.',
            longDescription: 'Golden fried squid rings served with homemade lemon aioli.',
            price: 12.50,
            image: '',
            alt: 'Calamari Fritti',
            ingredients: 'Squid, Flour, Oil, Lemon, Garlic.',
            allergies: 'Contains: Gluten, Shellfish.',
            nutritionalInfo: 'Approx. 250 Calories.'
        },
        {
            id: 17,
            categoryId: 'starters',
            title: 'Mozzarella Sticks',
            description: 'Breaded mozzarella served with marinara sauce.',
            longDescription: 'Golden breaded mozzarella sticks with warm marinara dipping sauce.',
            price: 9.50,
            image: '',
            alt: 'Mozzarella Sticks',
            ingredients: 'Mozzarella Cheese, Bread Crumbs, Oil, Marinara Sauce.',
            allergies: 'Contains: Gluten, Dairy, Eggs.',
            nutritionalInfo: 'Approx. 280 Calories.'
        },
        {
            id: 18,
            categoryId: 'starters',
            title: 'Shrimp Saganaki',
            description: 'Crispy shrimp with saganaki cheese and tomato sauce.',
            longDescription: 'Grilled shrimp with melted feta cheese and spicy tomato sauce.',
            price: 14.00,
            image: '',
            alt: 'Shrimp Saganaki',
            ingredients: 'Shrimp, Feta Cheese, Tomato Sauce, Olive Oil.',
            allergies: 'Contains: Shellfish, Dairy.',
            nutritionalInfo: 'Approx. 200 Calories.'
        },

        // Salads
        {
            id: 19,
            categoryId: 'salads',
            title: 'Caesar Salad',
            description: 'Crisp romaine, parmesan, and a house Caesar dressing.',
            longDescription: 'Classic Caesar salad with homemade dressing, croutons, and parmesan shavings.',
            price: 11.00,
            image: '',
            alt: 'Caesar Salad',
            ingredients: 'Romaine Lettuce, Parmesan Cheese, Croutons, Caesar Dressing.',
            allergies: 'Contains: Gluten, Dairy, Eggs, Fish.',
            nutritionalInfo: 'Approx. 180 Calories.'
        },
        {
            id: 20,
            categoryId: 'salads',
            title: 'Greek Salad',
            description: 'Tomatoes, cucumbers, olives, and feta cheese.',
            longDescription: 'Authentic Greek salad with fresh vegetables, kalamata olives, and feta cheese.',
            price: 12.00,
            image: '',
            alt: 'Greek Salad',
            ingredients: 'Tomatoes, Cucumbers, Olives, Feta Cheese, Olive Oil.',
            allergies: 'Contains: Dairy.',
            nutritionalInfo: 'Approx. 150 Calories.'
        },
        {
            id: 21,
            categoryId: 'salads',
            title: 'Caprese Salad',
            description: 'Fresh mozzarella, tomatoes, basil, and balsamic.',
            longDescription: 'Simple yet elegant salad with fresh mozzarella, ripe tomatoes, and basil.',
            price: 13.50,
            image: '',
            alt: 'Caprese Salad',
            ingredients: 'Fresh Mozzarella, Tomatoes, Basil, Balsamic Vinegar.',
            allergies: 'Contains: Dairy.',
            nutritionalInfo: 'Approx. 160 Calories.'
        },
        {
            id: 22,
            categoryId: 'salads',
            title: 'Quinoa Power Salad',
            description: 'Quinoa, roasted vegetables, and tahini dressing.',
            longDescription: 'Nutritious quinoa salad with roasted vegetables and creamy tahini dressing.',
            price: 14.00,
            image: '',
            alt: 'Quinoa Power Salad',
            ingredients: 'Quinoa, Roasted Vegetables, Tahini, Lemon.',
            allergies: 'Contains: Sesame.',
            nutritionalInfo: 'Approx. 280 Calories.'
        },

        // Grill
        {
            id: 23,
            categoryId: 'grill',
            title: 'Grilled Ribs',
            description: 'Smoky grilled ribs from the open flame.',
            longDescription: 'Fall-off-the-bone grilled ribs with smoky BBQ sauce.',
            price: 26.00,
            image: '',
            alt: 'Grilled Ribs',
            ingredients: 'Pork Ribs, BBQ Sauce, Spices.',
            allergies: 'No major allergens.',
            nutritionalInfo: 'Approx. 420 Calories.'
        },
        {
            id: 24,
            categoryId: 'grill',
            title: 'T-Bone Steak',
            description: 'Premium grilled T-bone steak with herb butter.',
            longDescription: 'Perfectly grilled premium T-bone steak served with herb butter and grilled vegetables.',
            price: 35.00,
            image: '',
            alt: 'T-Bone Steak',
            ingredients: 'T-Bone Steak, Butter, Herbs, Vegetables.',
            allergies: 'Contains: Dairy.',
            nutritionalInfo: 'Approx. 680 Calories.'
        },
        {
            id: 25,
            categoryId: 'grill',
            title: 'Grilled Lamb Chops',
            description: 'Tender lamb chops with garlic and rosemary.',
            longDescription: 'Succulent grilled lamb chops with fresh rosemary and garlic.',
            price: 32.00,
            image: '',
            alt: 'Grilled Lamb Chops',
            ingredients: 'Lamb Chops, Rosemary, Garlic, Olive Oil.',
            allergies: 'No major allergens.',
            nutritionalInfo: 'Approx. 450 Calories.'
        },

        // Desserts
        {
            id: 26,
            categoryId: 'desserts',
            title: 'Chocolate Lava Cake',
            description: 'Warm chocolate cake with a molten center.',
            longDescription: 'Decadent chocolate cake with a warm, gooey chocolate center.',
            price: 8.50,
            image: '',
            alt: 'Chocolate Lava Cake',
            ingredients: 'Chocolate, Butter, Eggs, Sugar, Flour.',
            allergies: 'Contains: Gluten, Dairy, Eggs.',
            nutritionalInfo: 'Approx. 380 Calories.'
        },
        {
            id: 27,
            categoryId: 'desserts',
            title: 'Tiramisu',
            description: 'Layers of mascarpone, espresso, and ladyfinger.',
            longDescription: 'Classic Italian tiramisu with layers of creamy mascarpone and espresso-soaked ladyfingers.',
            price: 7.50,
            image: '',
            alt: 'Tiramisu',
            ingredients: 'Mascarpone, Espresso, Ladyfinger, Cocoa Powder.',
            allergies: 'Contains: Gluten, Dairy, Eggs.',
            nutritionalInfo: 'Approx. 320 Calories.'
        },
        {
            id: 28,
            categoryId: 'desserts',
            title: 'Crème Brûlée',
            description: 'Silky custard with caramelized sugar top.',
            longDescription: 'Rich vanilla custard with a caramelized sugar crust.',
            price: 9.00,
            image: '',
            alt: 'Crème Brûlée',
            ingredients: 'Heavy Cream, Eggs, Vanilla, Sugar.',
            allergies: 'Contains: Dairy, Eggs.',
            nutritionalInfo: 'Approx. 350 Calories.'
        },
        {
            id: 29,
            categoryId: 'desserts',
            title: 'Cheesecake',
            description: 'New York style cheesecake with berry compote.',
            longDescription: 'Creamy New York cheesecake served with fresh berry compote.',
            price: 8.00,
            image: '',
            alt: 'Cheesecake',
            ingredients: 'Cream Cheese, Graham Crackers, Eggs, Sugar, Berries.',
            allergies: 'Contains: Gluten, Dairy, Eggs.',
            nutritionalInfo: 'Approx. 380 Calories.'
        },

        // Drinks
        {
            id: 30,
            categoryId: 'drinks',
            title: 'Fresh Lemonade',
            description: 'House-made lemonade, chilled and refreshing.',
            longDescription: 'Freshly squeezed lemonade made with real lemons.',
            price: 3.50,
            image: '',
            alt: 'Fresh Lemonade',
            ingredients: 'Lemons, Sugar, Water.',
            allergies: 'No major allergens.',
            nutritionalInfo: 'Approx. 80 Calories.'
        },
        {
            id: 31,
            categoryId: 'drinks',
            title: 'Iced Coffee',
            description: 'Cold brew coffee served over ice.',
            longDescription: 'Smooth cold brew coffee with ice and milk.',
            price: 4.00,
            image: '',
            alt: 'Iced Coffee',
            ingredients: 'Coffee, Milk, Ice.',
            allergies: 'Contains: Dairy.',
            nutritionalInfo: 'Approx. 60 Calories.'
        },
        {
            id: 32,
            categoryId: 'drinks',
            title: 'Smoothie',
            description: 'Blended fruit smoothie with yogurt.',
            longDescription: 'Refreshing blend of fresh fruits and yogurt.',
            price: 5.50,
            image: '',
            alt: 'Smoothie',
            ingredients: 'Mixed Fruits, Yogurt, Honey.',
            allergies: 'Contains: Dairy.',
            nutritionalInfo: 'Approx. 150 Calories.'
        },
        {
            id: 33,
            categoryId: 'drinks',
            title: 'Espresso',
            description: 'Strong Italian espresso shot.',
            longDescription: 'Double shot of authentic Italian espresso.',
            price: 2.50,
            image: '',
            alt: 'Espresso',
            ingredients: 'Coffee.',
            allergies: 'No major allergens.',
            nutritionalInfo: 'Approx. 5 Calories.'
        },

        // Kids Menu
        {
            id: 34,
            categoryId: 'kids',
            title: "Kids Nuggets",
            description: 'Breaded chicken nuggets served with fries.',
            longDescription: 'Golden crispy chicken nuggets with a side of fries and ketchup.',
            price: 6.50,
            image: '',
            alt: "Kids Nuggets",
            ingredients: 'Chicken, Bread Crumbs, Oil, Potatoes.',
            allergies: 'Contains: Gluten.',
            nutritionalInfo: 'Approx. 350 Calories.'
        },
        {
            id: 35,
            categoryId: 'kids',
            title: "Kids Burger",
            description: 'Mini burger with fries and juice.',
            longDescription: 'Small burger perfect for kids served with fries and juice.',
            price: 7.50,
            image: '',
            alt: "Kids Burger",
            ingredients: 'Beef Patty, Bread, Lettuce, Cheese, Potatoes.',
            allergies: 'Contains: Gluten, Dairy.',
            nutritionalInfo: 'Approx. 320 Calories.'
        },
        {
            id: 36,
            categoryId: 'kids',
            title: 'Mac and Cheese',
            description: 'Creamy mac and cheese with a fruit cup.',
            longDescription: 'Comfort food favorite - creamy mac and cheese with fresh fruit.',
            price: 6.00,
            image: '',
            alt: 'Mac and Cheese',
            ingredients: 'Pasta, Cheese Sauce, Butter.',
            allergies: 'Contains: Gluten, Dairy, Eggs.',
            nutritionalInfo: 'Approx. 280 Calories.'
        },
        {
            id: 37,
            categoryId: 'kids',
            title: 'Spaghetti',
            description: 'Simple spaghetti with marinara sauce.',
            longDescription: 'Kids portion of spaghetti with mild marinara sauce.',
            price: 5.50,
            image: '',
            alt: 'Spaghetti',
            ingredients: 'Spaghetti, Marinara Sauce.',
            allergies: 'Contains: Gluten, Dairy.',
            nutritionalInfo: 'Approx. 240 Calories.'
        },
    ];

    private cart: MenuItem[] = [];
    private cartCountSubject = new BehaviorSubject<number>(0);
    cartCount$ = this.cartCountSubject.asObservable();

    constructor(private ngZone: NgZone) { }

    getCategories(): Category[] {
        return this.categories;
    }

    getMenu(categoryId?: string | number): MenuItem[] {
        if (!categoryId || categoryId === 'all') {
            return this.items.slice();
        }
        return this.items.filter(item => item.categoryId === categoryId).slice();
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
