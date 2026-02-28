import type { GroceryItem } from '../api.mts';
import { QuantityControls } from './QuantityControls';

const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export function ProductCard({
    product,
    inCart,
    quantity,
    onAddToCart,
    onIncrement,
    onDecrement,
}: {
    product: GroceryItem;
    inCart: boolean;
    quantity: number;
    onAddToCart: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
}) {
    return (
        <div className="flex flex-col items-center border border-gray-300 bg-white p-4">
            <span className="text-5xl leading-none">{product.emoji}</span>
            <h3 className="mt-3 text-center text-base font-medium text-black">{product.name}</h3>
            <p className="mt-1 text-sm font-semibold text-black">{formatPrice(product.price)}</p>
            <div className="mt-auto w-full pt-3 text-center">
                {inCart ? (
                    <QuantityControls quantity={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
                ) : (
                    <button
                        onClick={onAddToCart}
                        className="w-full border-2 border-black bg-white px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}
