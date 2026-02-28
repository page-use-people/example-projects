import { useReducer, useMemo, useCallback } from 'react';
import type { GroceryItem } from '../api.mts';

export type CartItem = {
    product: GroceryItem;
    quantity: number;
};

export type DeliveryOption = 'express' | 'regular';

type CartState = {
    items: CartItem[];
    delivery: DeliveryOption;
};

type CartAction =
    | { type: 'ADD_ITEM'; product: GroceryItem }
    | { type: 'INCREMENT'; productId: number }
    | { type: 'DECREMENT'; productId: number }
    | { type: 'REMOVE_ITEM'; productId: number }
    | { type: 'SET_DELIVERY'; delivery: DeliveryOption }
    | { type: 'CLEAR_CART' };

const DELIVERY_COSTS: Record<DeliveryOption, number> = {
    express: 100,
    regular: 40,
};

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.items.find((i) => i.product.id === action.product.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i,
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { product: action.product, quantity: 1 }],
            };
        }
        case 'INCREMENT':
            return {
                ...state,
                items: state.items.map((i) =>
                    i.product.id === action.productId ? { ...i, quantity: i.quantity + 1 } : i,
                ),
            };
        case 'DECREMENT': {
            const item = state.items.find((i) => i.product.id === action.productId);
            if (item && item.quantity <= 1) {
                return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
            }
            return {
                ...state,
                items: state.items.map((i) =>
                    i.product.id === action.productId ? { ...i, quantity: i.quantity - 1 } : i,
                ),
            };
        }
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
        case 'SET_DELIVERY':
            return { ...state, delivery: action.delivery };
        case 'CLEAR_CART':
            return { ...state, items: [], delivery: state.delivery };
    }
}

const initialState: CartState = { items: [], delivery: 'regular' };

export function useCart() {
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    const addItem = useCallback((product: GroceryItem) => dispatch({ type: 'ADD_ITEM', product }), []);
    const incrementItem = useCallback((productId: number) => dispatch({ type: 'INCREMENT', productId }), []);
    const decrementItem = useCallback((productId: number) => dispatch({ type: 'DECREMENT', productId }), []);
    const removeItem = useCallback((productId: number) => dispatch({ type: 'REMOVE_ITEM', productId }), []);
    const setDelivery = useCallback((delivery: DeliveryOption) => dispatch({ type: 'SET_DELIVERY', delivery }), []);
    const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

    const totalItemsCost = useMemo(() => cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0), [cart.items]);
    const deliveryCost = DELIVERY_COSTS[cart.delivery];
    const totalCost = totalItemsCost + deliveryCost;

    const isInCart = useCallback((productId: number) => cart.items.some((i) => i.product.id === productId), [cart.items]);
    const getQuantity = useCallback(
        (productId: number) => cart.items.find((i) => i.product.id === productId)?.quantity ?? 0,
        [cart.items],
    );

    return {
        cart,
        addItem,
        incrementItem,
        decrementItem,
        removeItem,
        setDelivery,
        clearCart,
        totalItemsCost,
        deliveryCost,
        totalCost,
        isInCart,
        getQuantity,
    };
}
