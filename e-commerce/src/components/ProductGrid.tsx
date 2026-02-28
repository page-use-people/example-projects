import { useEffect, useRef } from 'react';
import type { GroceryItem } from '../api.mts';
import { ProductCard } from './ProductCard';

export function ProductGrid({
    products,
    isLoading,
    isLoadingMore,
    hasMore,
    onLoadMore,
    isInCart,
    getQuantity,
    onAddToCart,
    onIncrement,
    onDecrement,
}: {
    products: GroceryItem[];
    isLoading: boolean;
    isLoadingMore: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    isInCart: (id: number) => boolean;
    getQuantity: (id: number) => number;
    onAddToCart: (product: GroceryItem) => void;
    onIncrement: (productId: number) => void;
    onDecrement: (productId: number) => void;
}) {
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
                    onLoadMore();
                }
            },
            { threshold: 0 },
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, onLoadMore]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="h-44 animate-pulse border border-gray-300 bg-gray-100" />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return <p className="py-12 text-center text-sm text-black">No products found.</p>;
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        inCart={isInCart(product.id)}
                        quantity={getQuantity(product.id)}
                        onAddToCart={() => onAddToCart(product)}
                        onIncrement={() => onIncrement(product.id)}
                        onDecrement={() => onDecrement(product.id)}
                    />
                ))}
                {isLoadingMore &&
                    Array.from({ length: 4 }, (_, i) => (
                        <div key={`skeleton-${i}`} className="h-44 animate-pulse border border-gray-300 bg-gray-100" />
                    ))}
            </div>
            <div ref={sentinelRef} className="h-4" />
        </>
    );
}
