import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import { getProducts } from '../../../../api/product';

import CategoryProduct from '../CategoryProduct';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';

interface Props {
  isSoldout: boolean;
}

function CategoryOffProductList(props: Props) {
  // 리액트 쿼리로 데이터 불러오기 --------------------------------------

  const { status, data } = useQuery('products', () => getProducts(props.isSoldout));

  // 데이터 로딩 중 관리 -------------------------

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 처음 렌더링 할 랜덤 8가지 상품 ----------------------------

  const eightProducts = [];

  for (let i = 0; i < 8; i++) {
    eightProducts.push(data[Math.floor(Math.random() * 300)]);
  }

  console.log(eightProducts);

  return (
    <Wrap>
      {eightProducts.map((productItem, index) => (
        <CategoryProduct key={index} {...productItem} />
      ))}
    </Wrap>
  );
}

export default React.memo(CategoryOffProductList);

const Wrap = styled.div`
  width: 346px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  position: absolute;
  top: 210px;
  padding-bottom: 165px;
`;
