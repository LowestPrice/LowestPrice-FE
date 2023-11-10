import { useInfiniteQuery } from 'react-query';
import { getFilteredSearch, getSearch } from '../api/product';

export function infiniteSearch(searchWord: string | undefined, isSoldout: boolean) {
  const result = useInfiniteQuery(['infiniteSearchProduct', searchWord], ({ pageParam = '' }) => getSearch(searchWord, pageParam, isSoldout), {
    getNextPageParam: (searchProducts) => (searchProducts ? searchProducts[searchProducts.length - 1].productId : undefined),
  });
  return result;
}

export function infiniteSearchFilter(filterName: string | undefined, searchWord: string | undefined, isSoldout: boolean, filterButton: boolean[]) {
  const result = useInfiniteQuery(
    ['infiniteSearchFilterProduct', searchWord, filterName],
    ({ pageParam = '' }) => getFilteredSearch(filterName, searchWord, pageParam, isSoldout),
    {
      enabled: !!filterButton && !!isSoldout,
      getNextPageParam: (searchFilterProducts) => (searchFilterProducts ? searchFilterProducts[searchFilterProducts.length - 1].productId : undefined),
    }
  );
  return result;
}
