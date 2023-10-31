import { useInfiniteQuery } from 'react-query';
import { getSearch } from '../api/product';

export function infiniteSearch(searchWord: string | undefined, isSoldout: boolean) {
  const result = useInfiniteQuery(['infiniteSearchProduct', searchWord], ({ pageParam = '' }) => getSearch(searchWord, pageParam, isSoldout), {
    getNextPageParam: (searchProducts) => (searchProducts ? searchProducts[searchProducts.length - 1].productId : undefined),
  });
  return result;
}

export function infiniteSearchFilter(filterName: string | undefined, searchWord: string | undefined, isSoldout: boolean) {
  const result = useInfiniteQuery(['infiniteSearchFilterProduct', searchWord], ({ pageParam = '' }) => getSearch(searchWord, pageParam, isSoldout), {
    getNextPageParam: (searchProducts) => (searchProducts ? searchProducts[searchProducts.length - 1].productId : undefined),
  });
  return result;
}
