import { useInfiniteQuery } from '@tanstack/react-query';
import { listProducts, fuzzySearch } from '../api.mts';

export function useProductList(limit = 8) {
    return useInfiniteQuery({
        queryKey: ['products', 'list', limit],
        queryFn: ({ pageParam }) => listProducts({ skip: pageParam, limit }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) =>
            lastPage.length === limit ? lastPageParam + limit : undefined,
    });
}

export function useProductSearch(query: string, limit = 8) {
    return useInfiniteQuery({
        queryKey: ['products', 'search', query, limit],
        queryFn: ({ pageParam }) => fuzzySearch(query, { skip: pageParam, limit }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) =>
            lastPage.length === limit ? lastPageParam + limit : undefined,
        enabled: query.trim().length > 0,
    });
}
