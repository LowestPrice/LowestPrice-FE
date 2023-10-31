import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';
import { useEffect } from 'react';

import { getCategory } from '../../../../api/product';
import { getCategoryFilter } from '../../../../api/product';

import CategoryOnProduct from '../CategoryProduct';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { Product } from '../../../../type';
import Observer from '../Observer';

interface Props {
  categoryId: number;
  filterName: string;
  isFilter: boolean;
  isSoldout: boolean;
}

function CategoryOnProductList(props: Props) {
  // 카테고리 이름 -----------------------------------------------------------------------

  const categoryNameList = ['iPad', 'iPad', 'MacBook', 'Mac', 'AirPods', 'iPhone', 'AppleWatch'];

  const infiniteCategory = useInfiniteQuery(
    ['infiniteCategory'],
    ({ pageParam = '' }) => getCategory(categoryNameList[props.categoryId], pageParam, props.isSoldout),
    {
      getNextPageParam: (categoryProducts) => (categoryProducts ? categoryProducts[categoryProducts.length - 1].productId : undefined),
    }
  );

  const infiniteFilter = useInfiniteQuery(
    ['infiniteFilter'],
    ({ pageParam = '' }) => getCategoryFilter(categoryNameList[props.categoryId], props.filterName, pageParam, props.isSoldout),
    {
      getNextPageParam: (filterProducts) => (filterProducts ? filterProducts[filterProducts.length - 1].productId : undefined),
    }
  );

  // 카테고리, 필터가 변경될 때마다 서버로 refetch---------------------------------------------------------
  useEffect(() => {
    infiniteCategory.refetch();
    infiniteFilter.refetch();
  }, [props.categoryId, props.filterName, props.isSoldout]);

  // 데이터 로딩 중 & 에러 관리 ----------------------------------------------------------------------------------

  if (infiniteCategory.status === 'loading') {
    return <Loading />;
  }
  if (infiniteCategory.status === 'error') {
    return <Error />;
  }
  if (infiniteFilter.status === 'loading') {
    return <Loading />;
  }
  if (infiniteFilter.status === 'error') {
    return <Error />;
  }

  // 처음 렌더링 할 랜덤 8가지 상품 ----------------------------

  const infiniteCategoryData: Product[] = infiniteCategory.data?.pages.reduce(function (acc, cur) {
    return acc.concat(cur);
  });
  const infiniteFilterData: Product[] = infiniteFilter.data?.pages.reduce(function (acc, cur) {
    return acc.concat(cur);
  });

  const handleIntersection = () => {
    infiniteFilter.fetchNextPage();
    infiniteCategory.fetchNextPage();
  };

  return (
    <Wrap>
      {props.isFilter
        ? infiniteFilterData.map((productItem, index) => <CategoryOnProduct key={index} {...productItem} />)
        : infiniteCategoryData.map((productItem, index) => <CategoryOnProduct key={index} {...productItem} />)}
      {(props.isFilter ? infiniteFilter : infiniteCategory).hasNextPage && <Observer handleIntersection={handleIntersection} />}
    </Wrap>
  );
}

export default CategoryOnProductList;

const Wrap = styled.div`
  width: 346px;
  height: 700px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  position: absolute;
  top: 210px;
  padding-bottom: 80px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: rgba(181, 181, 181, 1);

    border-radius: 10px;
  }
`;
