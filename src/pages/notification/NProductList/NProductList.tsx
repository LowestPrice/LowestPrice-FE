import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getAlarmProducts } from '../../../api/alarm';

import { Product } from '../../../type';

import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import NProductItem from './NProductItem';

export default function NProductList() {
  // 알림설정한 상품 불러오기 --------------------------------------------------------

  const { status, data } = useQuery('alarmProducts', getAlarmProducts);
  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  const isProduct = data.length === 0 ? false : true;

  // 화면 ----------------------------------------------------------------------

  return (
    <Wrap>
      {isProduct ? (
        <div></div>
      ) : (
        <NoProduct $isProduct={isProduct}>
          <div>알림설정한 상품이 존재하지 않습니다.</div>
          <div>알림설정은 해당 상품에서 설정하실 수 있습니다.</div>
        </NoProduct>
      )}
      {data.map((item: Product, index: number) => {
        return <NProductItem key={index} {...item} />;
      })}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  max-height: 75vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const NoProduct = styled.div<{ $isProduct: boolean }>`
  width: 76%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gray;
  div {
    font-size: 12px;
    line-height: 16px;
  }
`;
