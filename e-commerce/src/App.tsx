import { useCart } from './hooks/useCart';
import { ProductsColumn } from './components/ProductsColumn';
import { CartColumn } from './components/CartColumn';

function App() {
    const { cart, addItem, incrementItem, decrementItem, removeItem, setDelivery, clearCart, totalItemsCost, deliveryCost, totalCost, isInCart, getQuantity } = useCart();

    return (
        <div className="min-h-screen bg-white">
            <main className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
                <div className="min-w-0 flex-[2]">
                    <ProductsColumn
                        isInCart={isInCart}
                        getQuantity={getQuantity}
                        onAddToCart={addItem}
                        onIncrement={incrementItem}
                        onDecrement={decrementItem}
                    />
                </div>
                <div className="w-80 shrink-0">
                    <CartColumn
                        items={cart.items}
                        delivery={cart.delivery}
                        incrementItem={incrementItem}
                        decrementItem={decrementItem}
                        removeItem={removeItem}
                        setDelivery={setDelivery}
                        clearCart={clearCart}
                        totalItemsCost={totalItemsCost}
                        deliveryCost={deliveryCost}
                        totalCost={totalCost}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
