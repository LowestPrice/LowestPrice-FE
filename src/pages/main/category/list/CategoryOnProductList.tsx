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

  // 2차원배열에서 1차원배열 --------------------------------------------------------

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
    if ((props.isFilter ? infiniteFilterData : infiniteCategoryData).hasNextPage) {
      infiniteCategoryData.fetchNextPage();
      infiniteFilterData.fetchNextPage();
    }
  };

  return (
    <div>
      <Wrap>
        {props.isFilter
          ? infiniteFilterDataList()?.map((productItem: Product, index: number) => <CategoryOnProduct key={index} {...productItem} />)
          : infiniteCategoryDataList()?.map((productItem: Product, index: number) => <CategoryOnProduct key={index} {...productItem} />)}
        {(props.isFilter ? infiniteFilterData : infiniteCategoryData).hasNextPage && <Observer handleIntersection={handleIntersection} />}
        <BusinessInfo>
          <h5>사업자 정보</h5>
          <div>대표자: 이준석</div>
          <div>전화번호: 010-3599-6345</div>
          <div>업체명: 아담 인터네셔널</div>
          <div>사업자 등록번호: 394-27-00969</div>
          <div>서울특별시 경희대로 26 삼의원 창업센터 311호</div>
        </BusinessInfo>
      </Wrap>
    </div>
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
  @media screen and (min-width: 744px) {
    width: 744px;
  }
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
`;

const BusinessInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 375px;
  height: 300px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.1;
  margin-top: -100px;
`;
