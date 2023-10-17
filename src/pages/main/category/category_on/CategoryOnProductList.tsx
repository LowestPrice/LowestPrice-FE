import styled from 'styled-components';
import { getCategory } from '../../../../api/product';
import { useQuery } from 'react-query';
import Loading from '../../../../components/Loading';
import { useEffect } from 'react';
import CategoryOnProduct from './CategoryOnProduct';
import Error from '../../../../components/Error';
interface Props {
  categoryId: number;
}

function CategoryOnProductList(props: Props) {
  // 카테고리 이름 -----------------------------------------------------------------------
  const categoryNameList = ['iPad', 'iPad', 'MacBook', 'Mac', 'AirPods', 'iPhone', 'AppleWatch'];

  // 리액트 쿼리로 데이터 불러오기 --------------------------------------
  const { isLoading, isError, data, refetch } = useQuery('categoryProduct', () => getCategory(categoryNameList[props.categoryId]));

  // 데이터가 변경될 때마다 실행 -------------------
  useEffect(() => {
    refetch();
    console.log(data);
  }, [props.categoryId]);

  // 데이터 로딩 중 관리 -------------------------
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  // 처음 렌더링 할 랜덤 8가지 상품 ----------------------------

  const eightProducts = [];
  for (let i = 0; i < 8; i++) {
    eightProducts.push(data[Math.floor(Math.random() * 10)]);
  }
  console.log(eightProducts);

  return (
    <Wrap>
      {eightProducts.map((productItem, index) => (
        <CategoryOnProduct key={index} {...productItem} />
      ))}
    </Wrap>
  );
}

export default CategoryOnProductList;

const Wrap = styled.div`
  width: 346px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  position: absolute;
  top: 210px;
  padding-bottom: 78px;
`;
