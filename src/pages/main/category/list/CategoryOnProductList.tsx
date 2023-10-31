import styled from 'styled-components';
import { useEffect } from 'react';

import CategoryOnProduct from '../CategoryProduct';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { Product } from '../../../../type';
import Observer from '../../../../components/Observer';
import { infiniteCategory, infiniteCategoryFilter } from '../../../../infiniteQueries/category';

interface Props {
  categoryId: number;
  filterName: string;
  isFilter: boolean;
  isSoldout: boolean;
}

function CategoryOnProductList(props: Props) {
  // 카테고리 이름 -----------------------------------------------------------------------

  const categoryNameList = ['iPad', 'iPad', 'MacBook', 'Mac', 'AirPods', 'iPhone', 'AppleWatch'];

  // 무한스크롤 데이터 불러오기 ---------------------------------------------------------------

  const infiniteCategoryData = infiniteCategory(categoryNameList[props.categoryId], props.isSoldout);

  const infiniteFilterData = infiniteCategoryFilter(categoryNameList[props.categoryId], props.filterName, props.isSoldout);

  // 카테고리, 필터가 변경될 때마다 서버로 refetch---------------------------------------------------------
  
  useEffect(() => {
    infiniteCategoryData.refetch();
    infiniteFilterData.refetch();
  }, [props.categoryId, props.filterName, props.isSoldout]);

  // 데이터 로딩 중 & 에러 관리 ----------------------------------------------------------------------------------

  if (infiniteCategoryData.status === 'loading') {
    return <Loading />;
  }
  if (infiniteCategoryData.status === 'error') {
    return <Error />;
  }
  if (infiniteFilterData.status === 'loading') {
    return <Loading />;
  }
  if (infiniteFilterData.status === 'error') {
    return <Error />;
  }

  // 이차원배열에서 일차원배열 --------------------------------------------------------

  const infiniteCategoryDataList = (): Product[] | undefined => {
    if (infiniteCategoryData.data) {
      const copyData: Product[][] = [...infiniteCategoryData.data?.pages];
      if (copyData[copyData.length - 1] === undefined) {
        copyData.pop();
      }
      const result = copyData.reduce(function (acc, cur) {
        return acc.concat(cur);
      });
      return result;
    }
  };

  const infiniteFilterDataList = (): Product[] | undefined => {
    if (infiniteFilterData.data) {
      const copyData: Product[][] = [...infiniteFilterData.data?.pages];
      if (copyData[copyData.length - 1] === undefined) {
        copyData.pop();
      }
      const result = copyData.reduce(function (acc, cur) {
        return acc.concat(cur);
      });
      return result;
    }
  };

  // Observer 인식 후, 다음 데이터 조회하기 -----------------------------------------

  const handleIntersection = () => {
    if ((props.isFilter ? infiniteCategoryData : infiniteFilterData).hasNextPage) {
      infiniteCategoryData.fetchNextPage();
      infiniteFilterData.fetchNextPage();
    }
  };

  return (
    <Wrap>
      {props.isFilter
        ? infiniteFilterDataList()?.map((productItem: Product, index: number) => <CategoryOnProduct key={index} {...productItem} />)
        : infiniteCategoryDataList()?.map((productItem: Product, index: number) => <CategoryOnProduct key={index} {...productItem} />)}
      {(props.isFilter ? infiniteCategoryData : infiniteFilterData).hasNextPage && <Observer handleIntersection={handleIntersection} />}
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
