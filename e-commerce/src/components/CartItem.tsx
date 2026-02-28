import type { CartItem as CartItemType } from '../hooks/useCart';
import { QuantityControls } from './QuantityControls';

const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export function CartItem({
    item,
    onIncrement,
    onDecrement,
    onRemove,
}: {
    item: CartItemType;
    onIncrement: () => void;
    onDecrement: () => void;
    onRemove: () => void;
}) {
    return (
        <div className="flex items-center gap-3 py-3">
            <span className="text-2xl leading-none">{item.product.emoji}</span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-black">{item.product.name}</p>
                <p className="text-xs text-black/60">{formatPrice(item.product.price)} each</p>
            </div>
            <QuantityControls quantity={item.quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
            <button
                onClick={onRemove}
                className="ml-1 text-xs text-black/40 transition-colors hover:text-black"
                title="Remove"
            >
                ✕
            </button>
        </div>
    );
}
