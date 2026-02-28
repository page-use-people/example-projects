import { useState, useEffect } from 'react';
import type { GroceryItem } from '../api.mts';
import { useProductList, useProductSearch } from '../hooks/useProducts';
import { SearchBar } from './SearchBar';
import { ProductGrid } from './ProductGrid';

export function ProductsColumn({
    isInCart,
    getQuantity,
    onAddToCart,
    onIncrement,
    onDecrement,
}: {
    isInCart: (id: number) => boolean;
    getQuantity: (id: number) => number;
    onAddToCart: (product: GroceryItem) => void;
    onIncrement: (productId: number) => void;
    onDecrement: (productId: number) => void;
}) {
    const [searchInput, setSearchInput] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(searchInput), 300);
        return () => clearTimeout(timer);
    }, [searchInput]);

    const isSearching = debouncedQuery.trim().length > 0;
    const listQuery = useProductList();
    const searchQuery = useProductSearch(debouncedQuery);
    const activeQuery = isSearching ? searchQuery : listQuery;

    const products = activeQuery.data?.pages.flat() ?? [];

    return (
        <div className="space-y-4">
            <SearchBar value={searchInput} onChange={setSearchInput} />
            <ProductGrid
                products={products}
                isLoading={activeQuery.isLoading}
                isLoadingMore={activeQuery.isFetchingNextPage}
                hasMore={activeQuery.hasNextPage}
                onLoadMore={() => activeQuery.fetchNextPage()}
                isInCart={isInCart}
                getQuantity={getQuantity}
                onAddToCart={onAddToCart}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
            />
        </div>
    );
}
