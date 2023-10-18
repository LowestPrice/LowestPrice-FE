import styled from 'styled-components';
import CategoryOffProduct from './CategoryOffProduct';
import { getCategory, getProducts } from '../../../../api/product';
import { useQueries } from 'react-query';
import Loading from '../../../../components/Loading';
import { useEffect } from 'react';
import Error from '../../../../components/Error';
interface Props {
  categoryId: number;
}

function CategoryOffProductList(props: Props) {
  // 리액트 쿼리로 데이터 불러오기 --------------------------------------
  const result = useQueries([
    {
      queryKey: ['products'],
      queryFn: getProducts,
    },
  ]);

  // 데이터 로딩 중 관리 -------------------------
  if (result[0].status === 'loading') {
    return <Loading />;
  }
  if (result[0].status === 'error') {
    return <Error />;
  }

  // 가져온 데이터 가공 ---------------------------------

  const products = result[0].data;

  // 처음 렌더링 할 랜덤 8가지 상품 ----------------------------

  const eightProducts = [];
  for (let i = 0; i < 8; i++) {
    eightProducts.push(products[Math.floor(Math.random() * 953)]);
  }

  return (
    <Wrap>
      {eightProducts.map((productItem, index) => (
        <CategoryOffProduct key={index} {...productItem} />
      ))}
    </Wrap>
  );
}

export default CategoryOffProductList;

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