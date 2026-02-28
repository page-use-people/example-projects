import type { DeliveryOption } from '../hooks/useCart';
import type { CartItem as CartItemType } from '../hooks/useCart';
import { CartItem } from './CartItem';
import { DeliverySelector } from './DeliverySelector';

const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export function CartColumn({
    items,
    delivery,
    incrementItem,
    decrementItem,
    removeItem,
    setDelivery,
    clearCart,
    totalItemsCost,
    deliveryCost,
    totalCost,
}: {
    items: CartItemType[];
    delivery: DeliveryOption;
    incrementItem: (productId: number) => void;
    decrementItem: (productId: number) => void;
    removeItem: (productId: number) => void;
    setDelivery: (delivery: DeliveryOption) => void;
    clearCart: () => void;
    totalItemsCost: number;
    deliveryCost: number;
    totalCost: number;
}) {
    const isEmpty = items.length === 0;

    const handleCheckout = () => {
        alert('Order placed!');
        clearCart();
    };

    return (
        <div className="sticky top-6 border border-gray-300 bg-white p-4">
            <h2 className="text-lg font-semibold text-black">Your Cart</h2>

            {isEmpty ? (
                <p className="py-8 text-center text-sm text-black/40">Your cart is empty</p>
            ) : (
                <div className="mt-2 divide-y divide-gray-200">
                    {items.map((item) => (
                        <CartItem
                            key={item.product.id}
                            item={item}
                            onIncrement={() => incrementItem(item.product.id)}
                            onDecrement={() => decrementItem(item.product.id)}
                            onRemove={() => removeItem(item.product.id)}
                        />
                    ))}
                </div>
            )}

            <div className="mt-4 border-t border-gray-200 pt-4">
                <DeliverySelector delivery={delivery} onChange={setDelivery} />
            </div>

            <div className="mt-4 space-y-1 border-t border-gray-200 pt-4 text-sm">
                <div className="flex justify-between text-black/70">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalItemsCost)}</span>
                </div>
                <div className="flex justify-between text-black/70">
                    <span>Delivery</span>
                    <span>{formatPrice(deliveryCost)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-semibold text-black">
                    <span>Total</span>
                    <span>{formatPrice(totalCost)}</span>
                </div>
            </div>

            <button
                onClick={handleCheckout}
                disabled={isEmpty}
                className="mt-4 w-full border-2 border-black bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400"
            >
                Checkout
            </button>
        </div>
    );
}
