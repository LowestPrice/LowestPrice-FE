import { useInfiniteQuery } from 'react-query';
import { getCategory, getCategoryFilter } from '../api/product';

// 카테고리 상품 -------------------------------------------------------------

export const infiniteCategory = (categoryId: string | undefined, isSoldout: boolean) => {
  const result = useInfiniteQuery(['infiniteCategoryProduct', categoryId], ({ pageParam = '' }) => getCategory(categoryId, pageParam, isSoldout), {
    getNextPageParam: (categoryProducts) => (categoryProducts ? categoryProducts[categoryProducts.length - 1].productId : undefined),
  });
  return result;
};

// 필터링된 카테고리 상품 -------------------------------------------------------------

export const infiniteCategoryFilter = (categoryId: string | undefined, filterName: string | undefined, isSoldout: boolean) => {
  const result = useInfiniteQuery(
    ['infiniteCategoryFilterProduct', categoryId, filterName],
    ({ pageParam = '' }) => getCategoryFilter(categoryId, filterName, pageParam, isSoldout),
    {
      getNextPageParam: (filterProducts) => (filterProducts ? filterProducts[filterProducts.length - 1].productId : undefined),
    }
  );
  return result;
};
