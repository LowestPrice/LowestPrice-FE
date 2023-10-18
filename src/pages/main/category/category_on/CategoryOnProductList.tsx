import styled from 'styled-components';
import { useQueries } from 'react-query';
import { useEffect } from 'react';

import { getCategory } from '../../../../api/product';
import { getCategoryFilter } from '../../../../api/product';

import CategoryOnProduct from './CategoryOnProduct';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
interface Props {
  categoryId: number;
  filterName: string;
  isFilter: boolean;
}

function CategoryOnProductList(props: Props) {
  // 카테고리 이름 -----------------------------------------------------------------------
  const categoryNameList = ['iPad', 'iPad', 'MacBook', 'Mac', 'AirPods', 'iPhone', 'AppleWatch'];

  // 리액트 쿼리로 데이터 불러오기 --------------------------------------
  const result = useQueries([
    { queryKey: ['categoryProduct'], queryFn: () => getCategory(categoryNameList[props.categoryId]) },
    {
      queryKey: ['filterProduct'],
      queryFn: () => getCategoryFilter(categoryNameList[props.categoryId], props.filterName),
    },
  ]);

  // 데이터가 변경될 때마다 실행 -------------------
  useEffect(() => {
    result[0].refetch();
    result[1].refetch();
    console.log(result);
  }, [props.categoryId, props.filterName]);

  // 데이터 로딩 중 관리 -------------------------
  if (result[0].status === 'loading') {
    return <Loading />;
  }
  if (result[0].status === 'error') {
    return <Error />;
  }
  if (result[1].status === 'loading') {
    return <Loading />;
  }
  if (result[1].status === 'error') {
    return <Error />;
  }

  // 처음 렌더링 할 랜덤 8가지 상품 ----------------------------

  const categoryProducts = [...result[0].data].slice(0, 8);
  const filterProducts = [...result[1].data].slice(0, 8);

  console.log(filterProducts);

  // console.log(list.slice(0, 10));

  return (
    <Wrap>
      {props.isFilter
        ? filterProducts.map((productItem, index) => <CategoryOnProduct key={index} {...productItem} />)
        : categoryProducts.map((productItem, index) => <CategoryOnProduct key={index} {...productItem} />)}
    </Wrap>
  );
}

export default CategoryOnProductList;

const Wrap = styled.div`
  width: 370px;
  padding: 10px 40px 10px 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  position: absolute;
  top: 210px;
  padding-bottom: 78px;
`;
