import Fuse from 'fuse.js';

function randomDelay(): Promise<void> {
    const ms = Math.floor(Math.random() * 700) + 100;
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export type GroceryItem = {
    id: number;
    emoji: string;
    name: string;
    price: number;
};

export const data: GroceryItem[] = [
    { id: 1, emoji: '🥚', name: 'Eggs - 12 pack', price: 180 },
    { id: 33, emoji: '🥚🥚', name: 'Eggs - 18 pack', price: 249 },
    { id: 2, emoji: '🥛🥛', name: 'Milk - 1 gallon', price: 425 },
    { id: 34, emoji: '🥛', name: 'Milk - half gallon', price: 249 },
    { id: 3, emoji: '🍞🍞', name: 'Sourdough loaf', price: 695 },
    { id: 35, emoji: '🍞', name: 'Sourdough - half loaf', price: 399 },
    { id: 4, emoji: '🧈', name: 'Butter - 1 lb', price: 549 },
    { id: 36, emoji: '🧈🧈', name: 'Butter - 2 lb', price: 999 },
    { id: 5, emoji: '🥕🥕', name: 'Organic carrots - 2 lb', price: 299 },
    { id: 37, emoji: '🥕', name: 'Organic carrots - 1 lb', price: 199 },
    { id: 6, emoji: '🍎', name: 'Honeycrisp apples - 3 lb bag', price: 699 },
    { id: 38, emoji: '🍎🍎', name: 'Honeycrisp apples - 5 lb bag', price: 1099 },
    { id: 7, emoji: '🥬', name: 'Baby spinach - 6 oz', price: 449 },
    { id: 39, emoji: '🥬🥬', name: 'Baby spinach - 16 oz', price: 799 },
    { id: 8, emoji: '🍗', name: 'Chicken breast - 1.5 lb', price: 899 },
    {
        id: 40,
        emoji: '🍗🍗',
        name: 'Chicken breast - 3 lb family pack',
        price: 1699,
    },
    { id: 9, emoji: '🧀', name: 'Cheddar cheese - 8 oz block', price: 649 },
    { id: 41, emoji: '🧀🧀', name: 'Cheddar cheese - 16 oz block', price: 1199 },
    { id: 10, emoji: '🍝', name: 'Pasta - 1 lb', price: 189 },
    { id: 42, emoji: '🍝🍝', name: 'Pasta - 3 lb', price: 449 },
    { id: 11, emoji: '🥫🥫', name: 'Tomato sauce - 28 oz', price: 279 },
    { id: 43, emoji: '🥫', name: 'Tomato sauce - 15 oz', price: 149 },
    { id: 12, emoji: '🫒', name: 'Extra virgin olive oil - 500 ml', price: 1299 },
    { id: 44, emoji: '🫒🫒', name: 'Extra virgin olive oil - 1 L', price: 2299 },
    { id: 13, emoji: '🥔', name: 'Russet potatoes - 5 lb', price: 399 },
    { id: 45, emoji: '🥔🥔', name: 'Russet potatoes - 10 lb', price: 699 },
    { id: 14, emoji: '🧅', name: 'Yellow onions - 3 lb', price: 249 },
    { id: 46, emoji: '🧅🧅', name: 'Yellow onions - 5 lb', price: 399 },
    { id: 15, emoji: '🍌', name: 'Bananas - 1 bunch', price: 119 },
    { id: 47, emoji: '🍌🍌', name: 'Bananas - 2 bunches', price: 219 },
    { id: 16, emoji: '🍊', name: 'Navel oranges - 4 lb bag', price: 599 },
    { id: 48, emoji: '🍊🍊', name: 'Navel oranges - 8 lb bag', price: 1099 },
    { id: 17, emoji: '🍓', name: 'Fresh strawberries - 1 lb', price: 449 },
    { id: 49, emoji: '🍓🍓', name: 'Fresh strawberries - 2 lb', price: 799 },
    { id: 18, emoji: '🥦', name: 'Broccoli crowns - 1 lb', price: 349 },
    { id: 50, emoji: '🥦🥦', name: 'Broccoli crowns - 2 lb', price: 599 },
    { id: 19, emoji: '🥩', name: 'Ground beef - 1 lb', price: 799 },
    { id: 51, emoji: '🥩🥩', name: 'Ground beef - 3 lb', price: 2199 },
    { id: 20, emoji: '🐟', name: 'Salmon fillet - 6 oz', price: 899 },
    { id: 52, emoji: '🐟🐟', name: 'Salmon fillet - 12 oz', price: 1699 },
    { id: 21, emoji: '🍚', name: 'Jasmine rice - 2 lb', price: 399 },
    { id: 53, emoji: '🍚🍚', name: 'Jasmine rice - 5 lb', price: 899 },
    { id: 22, emoji: '🫘', name: 'Black beans - 15 oz can', price: 169 },
    { id: 54, emoji: '🫘🫘', name: 'Black beans - 4 pack', price: 599 },
    { id: 23, emoji: '🥜', name: 'Peanut butter - 16 oz', price: 529 },
    { id: 55, emoji: '🥜🥜', name: 'Peanut butter - 28 oz', price: 799 },
    { id: 24, emoji: '🍯', name: 'Honey - 12 oz', price: 689 },
    { id: 56, emoji: '🍯🍯', name: 'Honey - 24 oz', price: 1199 },
    { id: 25, emoji: '🥒', name: 'English cucumber', price: 199 },
    { id: 57, emoji: '🥒🥒', name: 'English cucumber - 3 pack', price: 449 },
    { id: 26, emoji: '🍅', name: 'Cherry tomatoes - 1 pt', price: 399 },
    { id: 58, emoji: '🍅🍅', name: 'Cherry tomatoes - 2 pt', price: 699 },
    { id: 27, emoji: '🥑🥑', name: 'Avocado - 2 pack', price: 449 },
    { id: 59, emoji: '🥑', name: 'Avocado - single', price: 249 },
    { id: 28, emoji: '🧄', name: 'Garlic bulb', price: 99 },
    { id: 60, emoji: '🧄🧄', name: 'Garlic - 3 pack', price: 249 },
    { id: 29, emoji: '🍋', name: 'Lemons - 2 lb bag', price: 399 },
    { id: 61, emoji: '🍋🍋', name: 'Lemons - 5 lb bag', price: 849 },
    { id: 30, emoji: '🥛🥛', name: 'Greek yogurt - 32 oz', price: 549 },
    { id: 62, emoji: '🥛', name: 'Greek yogurt - 6 oz single', price: 129 },
    { id: 31, emoji: '🧁', name: 'Muffins - 4 pack', price: 499 },
    { id: 63, emoji: '🧁🧁', name: 'Muffins - 12 pack', price: 1299 },
    { id: 32, emoji: '🧂🧂', name: 'Sea salt - 26 oz', price: 399 },
    { id: 64, emoji: '🧂', name: 'Sea salt - 4 oz', price: 129 },
];

export async function getProduct(id: number) {
    await randomDelay();
    return data.find((item) => item.id === id) ?? null;
}

export async function listProducts(options?: { skip?: number; limit?: number }): Promise<GroceryItem[]> {
    await randomDelay();
    const skip = options?.skip ?? 0;
    const limit = options?.limit ?? 8;
    return data.slice(skip, skip + limit);
}

const fuse = new Fuse(data, {
    keys: ['name', 'emoji'],
    threshold: 0.4,
});

export async function fuzzySearch(query: string, options?: { skip?: number; limit?: number }): Promise<GroceryItem[]> {
    await randomDelay();
    if (!query.trim()) {
        return [];
    }

    const results = fuse.search(query);
    const items = results.map((r) => r.item);
    const skip = options?.skip ?? 0;
    const limit = options?.limit ?? 8;

    return items.slice(skip, skip + limit);
}
